"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-gray-900 text-white py-8"
    >
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="flex flex-wrap justify-between items-center mb-8">
          {/* Left Side: Links */}
          <div className="flex flex-wrap gap-6 mb-4 md:mb-0">
            <Link href="/about" className="hover:text-gray-400 font-description">
              Shop
            </Link>
            <Link href="/contact" className="hover:text-gray-400 font-description">
              Contact
            </Link>
            <Link href="/contact" className="hover:text-gray-400 font-description">
              About
            </Link>
          </div>

          {/* Right Side: Email Subscription */}
          <div className="flex items-center">
            <input
              type="email"
              placeholder="Your email"
              className="p-2 rounded-l-lg text-black focus:outline-none"
              required
            />
            <Button
              variant="default"
              className="py-5 text-white font-description"
            >
              Subscribe
            </Button>
          </div>
        </div>

        {/* Middle Section: Social Links */}
        <div className="flex justify-center gap-6 mb-8">
          <Link
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="text-gray-400 hover:text-white font-description">Facebook</span>
          </Link>
          <Link
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="text-gray-400 hover:text-white font-description">Twitter</span>
          </Link>
          <Link
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="text-gray-400 hover:text-white font-description">Instagram</span>
          </Link>
          <Link
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="text-gray-400 hover:text-white font-description">LinkedIn</span>
          </Link>
        </div>

        {/* Bottom Section */}
        <div className="text-center border-t border-gray-700 pt-8">
          <p className="text-sm font-description">
            &copy; {new Date().getFullYear()} RanaMedStore. All Rights Reserved.
          </p>
          <p className="text-sm mt-2 font-description">
            Providing the best pharmaceutical products delivered to your door.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
