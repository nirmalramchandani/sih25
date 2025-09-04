import React from "react";
import { motion } from "framer-motion";

export const Footer: React.FC = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className="bg-transparent py-8 text-white/90"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
        <div className="flex items-center gap-3">
          <div className="h-6 w-6 rounded-md bg-white/30" />
          <span className="text-sm font-semibold">AyurWell</span>
        </div>
        <nav className="text-xs">
          <ul className="flex items-center gap-4">
            <li><a className="transition-colors hover:text-white" href="#">Privacy</a></li>
            <li><a className="transition-colors hover:text-white" href="#">Terms</a></li>
            <li><a className="transition-colors hover:text-white" href="#">Contact</a></li>
          </ul>
        </nav>
      </div>
      <div className="mx-auto max-w-6xl px-6 pt-4 text-[11px] text-white/70">© {new Date().getFullYear()} AyurWell. All rights reserved.</div>
    </motion.footer>
  );
};

export default Footer;
