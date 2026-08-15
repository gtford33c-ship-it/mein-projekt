"use client";

import { motion } from "framer-motion";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#16181d]/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-bold text-2xl tracking-wider text-white"
        >
          TRINI
        </motion.div>

        <nav className="hidden md:flex gap-10 text-sm text-gray-400">
          <a href="#home" className="hover:text-white transition">
            Start
          </a>

          <a href="#team" className="hover:text-white transition">
            Team
          </a>

          <a href="#angebote" className="hover:text-white transition">
            Angebote
          </a>

          <a href="#kontakt" className="hover:text-white transition">
            Kontakt
          </a>
        </nav>
      </div>
    </header>
  );
}