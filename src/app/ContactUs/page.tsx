"use client";  // 👈 add this at the top

import React , { useEffect, useState } from "react";
import ContactUs from "@/Components/Contact/ContactUs";
import Header from "@/Components/Header/Header";
import Footer from "@/Components/Footer/Footer";

export default function Contact() {
      const [scrolled, setScrolled] = useState(false);
    
      useEffect(() => {
        const handleScroll = () => {
          if (window.scrollY > 20) {
            setScrolled(true);
          } else {
            setScrolled(false);
          }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
      }, []);
    return (
        <>
        <Header scrolled={scrolled}/>
        <div className="mt-[120px]">
            <ContactUs />
        </div>
        <Footer/>
        </>
    )
}