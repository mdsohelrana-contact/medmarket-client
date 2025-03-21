"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import { CrossIcon, Icon, LucideListOrdered, MenuIcon, Package, ShoppingCart } from "lucide-react";
import ActiveNavLink from "./ActiveNavLink";
// import { navItems } from "./navItems";
import { Button } from "@/components/ui/button";
import ThemeToggle from "../ThemeToggle";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { currentUser, logOut } from "@/redux/features/user/authSlice";
import Image from "next/image";
import { getUserById } from "@/utils/actions/user/userActions";
import { UserProfile } from "../UserProfile/UserProfile";
import { useRouter } from "next/navigation";

const AppNavbar = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector(currentUser);
  const [userData, setUserData] = useState<IUser | null>(null);

  // fetch current user information
  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserById(user?.userId as string);

      setUserData(data?.data);
    };

    fetchUserData();
  }, [user?.userId]);

  // Define base nav items
  const baseNavItems = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  // Conditionally add role-based items
  const navItems = useMemo(() => {
    if (!user) return baseNavItems;
    if (user.role === "admin") {
      return [...baseNavItems, { label: "Dashboard", href: "/dashboard" }];
    }
    if (user.role === "customer") {
      return [
        ...baseNavItems,
        { label: <ShoppingCart className="w-5 h-5" />, href: "/cart" },
        { label: "Orders", href: "/orders" },
      ];
    }

    return baseNavItems;
  }, [user]);

  // Toggle the mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle logout
  const handleLogout = () => {
    dispatch(logOut());
    localStorage.removeItem("accessToken");
    document.cookie =
      "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    router.push("/");
  };

  return (
    <header className="bg-white dark:bg-[#020817] fixed top-0 left-0 w-full z-50 shadow-lg">
      <div className="max-w-screen-2xl mx-auto px-4 py-5">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            data-aos="fade-up"
          >
            <Link
              href="/"
              className="text-2xl font-bold text-dark dark:text-white"
            >
              <motion.div
                className="text-3xl md:text-4xl  font-bold text-transparent bg-clip-text"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #3B82F6, #9333EA)", // Gradient using #3B82F6 and two complementary colors
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <Image width={50} height={50} src="./logo.svg" alt="logo" />
              </motion.div>
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-1">
            {navItems?.map((navItem, index) => (
              <ActiveNavLink
                key={index}
                href={navItem?.href}
                label={navItem?.label}
              />
            ))}
            <div>
              <ThemeToggle />
            </div>
          </div>

          {
            // User Dropdown Menu
            userData ? (
              <div className="flex items-center space-x-4">
                <motion.div
                  className="flex items-center space-x-2 text-sm font-medium dark:text-white"
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <UserProfile user={userData} logoutFn={handleLogout} />
                </motion.div>
              </div>
            ) : (
              <div className="hidden md:flex">
                <Button variant="outline">
                  <Link href="/login">Login</Link>
                </Button>
              </div>
            )
          }

          {/* Mobile Menu Button */}
          <motion.button
            onClick={toggleMenu}
            className="md:hidden text-2xl text-body-color dark:text-white"
            initial={false}
            animate={{
              rotate: isMenuOpen ? 45 : 0,
              transition: { duration: 0.3 },
            }}
          >
            <div
              className={`transition-all ${
                isMenuOpen ? "transform rotate-45" : "transform rotate-0"
              }`}
            >
              {isMenuOpen ? (
                <CrossIcon aria-label="Close Menu" />
              ) : (
                <MenuIcon aria-label="Open Menu" />
              )}
            </div>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden p-4">
          {navItems?.map((navItem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 + index * 0.1 }}
            >
              <ActiveNavLink
                key={index}
                href={navItem?.href}
                label={navItem?.label}
              />
            </motion.div>
          ))}

          <motion.div
            className="my-2 flex flex-col space-y-2"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
        

            {/* Auth Button */}
            <div className="">
              {userData ? (
                 <div className="flex items-center space-x-4">
                 <motion.div
                   className="flex items-center space-x-2 text-sm font-medium dark:text-white"
                   initial={{ opacity: 0, x: -100 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ duration: 0.5 }}
                 >
                   <UserProfile user={userData} logoutFn={handleLogout} />
                 </motion.div>
               </div>
              ) : (
                <Button variant="outline">
                  <Link href="/login" className="font-description">Login</Link>
                </Button>
              )}
            </div>
            
            {/* <ModeToggle /> */}
            <div className="ml-3">
              <ThemeToggle />
            </div>
          </motion.div>
        </div>
      )}
    </header>
  );
};

export default AppNavbar;
