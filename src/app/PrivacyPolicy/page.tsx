"use client";

import Footer from "@/Components/Footer/Footer";
import Header from "@/Components/Header/Header";
import React, { useEffect, useState } from "react";

export default function PrivacyPolicy() {
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
            <Header scrolled={scrolled} />
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center px-6 pb-12 mt-[120px]">
                <div className="max-w-3xl w-full bg-white shadow-xl rounded-2xl p-8 md:p-12">
                    {/* Header */}
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
                        Privacy Policy
                    </h1>
                    <p className="text-gray-600 mb-10 text-center">
                        Welcome to <span className="font-semibold text-black-600">Baktrack</span>.
                        Your privacy is important to us. This Privacy Policy explains how we collect,
                        use, and protect your information when you use our services.
                    </p>

                    {/* Sections */}
                    <div className="space-y-8">
                        {/* Information We Collect */}
                        <section>
                            <h2 className="text-xl font-semibold text-gray-800 mb-3">
                                Information We Collect
                            </h2>
                            <ul className="list-disc pl-6 text-gray-700 space-y-2">
                                <li>
                                    <span className="font-medium">Personal Data:</span> Name, email, phone number, and payment information.
                                </li>
                                <li>
                                    <span className="font-medium">Non-Personal Data:</span> Web cookies for improving website functionality.
                                </li>
                            </ul>
                        </section>

                        {/* Purpose of Data Collection */}
                        <section>
                            <h2 className="text-xl font-semibold text-gray-800 mb-3">
                                Purpose of Data Collection
                            </h2>
                            <ul className="list-disc pl-6 text-gray-700 space-y-2">
                                <li>Process orders and payments</li>
                                <li>Provide alerts for security threats and safety concerns</li>
                            </ul>
                        </section>

                        {/* Data Sharing */}
                        <section>
                            <h2 className="text-xl font-semibold text-gray-800 mb-3">
                                Data Sharing
                            </h2>
                            <p className="text-gray-700">
                                We do not share your personal data with any third parties.
                            </p>
                        </section>

                        {/* Children's Privacy */}
                        <section>
                            <h2 className="text-xl font-semibold text-gray-800 mb-3">
                                Children's Privacy
                            </h2>
                            <p className="text-gray-700">
                                Baktrack does not knowingly collect data from children under the age of 13.
                            </p>
                        </section>

                        {/* Updates */}
                        <section>
                            <h2 className="text-xl font-semibold text-gray-800 mb-3">
                                Updates to the Privacy Policy
                            </h2>
                            <p className="text-gray-700">
                                We may update this Privacy Policy periodically. Any updates will be
                                communicated to users via email.
                            </p>
                        </section>

                        {/* Contact */}
                        <section>
                            <h2 className="text-xl font-semibold text-gray-800 mb-3">
                                Contact Us
                            </h2>
                            <p className="text-gray-700">
                                If you have any questions or concerns about this Privacy Policy,
                                please contact us at{" "}
                                <a
                                    href="mailto:contact@baktrack.co"
                                    className="text-black-600 font-bold hover:underline"
                                >
                                    contact@baktrack.co
                                </a>.
                            </p>
                        </section>
                    </div>

                    {/* Footer */}
                    {/* <div className="mt-10 pt-6 border-t border-gray-200 text-center">
                        <p className="text-sm text-gray-500">
                            © {new Date().getFullYear()} Baktrack. All rights reserved.
                        </p>
                    </div> */}
                </div>
            </div>
            <Footer />
        </>
    );
}
