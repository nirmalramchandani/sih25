import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const linkClass =
  "relative text-sm font-medium text-foreground/80 hover:text-foreground transition-colors after:absolute after:-bottom-1 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:rounded-full after:bg-foreground/70 after:transition-all hover:after:w-8";

export const NavBar: React.FC<{ onGetStarted?: () => void; onSignIn?: () => void }> = ({
  onGetStarted,
  onSignIn,
}) => {
  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-background/70"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-slate-900" />
          <div className="text-lg font-bold tracking-tight">AyurWell</div>
        </div>
        <nav className="hidden items-center gap-6 md:flex">
          <a href="#features" className={linkClass}>
            Features
          </a>
          <a href="#plans" className={linkClass}>
            Plans
          </a>
          <a href="#app" className={linkClass}>
            App
          </a>
          <a href="#contact" className={linkClass}>
            Contact
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <button className="px-2 text-sm font-medium text-foreground/80 hover:text-foreground underline-offset-4 hover:underline" onClick={onSignIn}>
            Sign in
          </button>
          <Button className="rounded-full" onClick={onGetStarted}>
            Get Started
          </Button>
        </div>
      </div>
    </motion.header>
  );
};

export default NavBar;
