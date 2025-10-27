'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { Film, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center bg-background px-6 relative overflow-hidden">
      {/* Floating Background Effects */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
        animate={{ y: [-20, 20, -20] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
        animate={{ y: [10, -15, 10] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        <Film className="w-16 h-16 text-primary mx-auto mb-4" />
        <h1 className="text-6xl font-bold text-foreground mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-muted-foreground mb-6">
          Movie Not Found
        </h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Looks like the film you're searching for doesn't exist or has been removed.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all duration-300 hover:shadow-glow"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </motion.div>
    </section>
  );
}
