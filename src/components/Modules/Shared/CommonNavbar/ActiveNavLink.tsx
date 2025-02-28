import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const ActiveNavLink = ({ href, label }: { href: string; label: string }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <motion.div
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Link
        href={href}
        className={`block px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-in-out font-description  ${
        isActive
          ? "bg-primary text-white shadow-md"
          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
      }`}
      >
        {label}
      </Link>
    </motion.div>
  );
};

export default ActiveNavLink;
