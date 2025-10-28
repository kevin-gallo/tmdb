'use client'

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        }

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [])

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <AnimatePresence>
            {isVisible && (
            <motion.button
                key="scroll-to-top"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                onClick={scrollToTop}
                className="cursor-pointer fixed bottom-8 right-8 z-50 p-3 md:p-4 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 hover:shadow-glow transition-all"
            >
                <ArrowUp className="w-5 h-5 md:w-6 md:h-6" />
            </motion.button>
            )}
        </AnimatePresence> 
    )
}