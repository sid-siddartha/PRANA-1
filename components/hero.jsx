"use client";

import React from "react";
import Image from "next/image";
import { Button } from "../components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

// Simple slide-up animation
const slideUp = {
  hidden: { y: 0, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 1.5, ease: "easeOut" },
  },
};

const HeroSection = () => {
  return (
    <section className="pt-40 pb-20 px-4 bg-gradient-to-r from-[#ffe7ce] via-[#f2eaff] to-[#eae0fc]">
      <div className="container mx-auto text-center">
        {/* Heading */}
        <motion.h1
          variants={slideUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="text-5xl md:text-8xl lg:text-[105px] pb-6 font-extrabold tracking-tighter w-full bg-gradient-to-r from-[#18063d] to-[#4b0f7a] text-transparent bg-clip-text"
        >
          A Safe place to <br /> Talk, Heal and Grow
        </motion.h1>

        {/* Paragraph */}
        <motion.p
          variants={slideUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="text-small md:text-xl text-[#515157] mb-8 max-w-4xl mx-auto"
        >
          An AI-powered mental health platform that helps students monitor
          wellbeing, access personalized coping strategies and connect with
          counselors and peer support.
        </motion.p>

        {/* Buttons */}
        <motion.div
          variants={slideUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="flex justify-center space-x-4"
        >
          <Link href="/sign-in">
            <Button size="lg" className="px-8">
              Get Started
            </Button>
          </Link>
          <Link href="/">
            <Button size="lg" variant="outline" className="px-8">
              Watch Demo
            </Button>
          </Link>
        </motion.div>

        {/* Image */}
        <motion.div
          variants={slideUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="hero-image-wrapper mt-5 md:mt-4"
        >
          <div className="hero-image">
            <Image
              src="/banner.png"
              width={1280}
              height={720}
              alt="Dashboard Preview"
              className="rounded-lg shadow-2xl border mx-auto"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
