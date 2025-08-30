"use client";

import Footer from "@/Components/Footer/Footer";
import Header from "@/Components/Header/Header";
import React, { useEffect, useState } from "react";

export default function TermsAndConditions() {
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
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center px-6 py-12 mt-[70px]">
                <div className="max-w-3xl w-full bg-white shadow-xl rounded-2xl p-8 md:p-12">
                    {/* Header */}
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
                        Terms & Conditions
                    </h1>
                    <p className="text-gray-600 mb-10 text-center">
                        Welcome to <span className="font-semibold text-black-600">Baktrack</span> ("we," "us," "our").
                        By using our website, services, and software solution (collectively, the "Service"), you agree to these Terms & Conditions.
                        Please read them carefully.
                    </p>

                    {/* Sections */}
                    <div className="space-y-8 text-gray-700">
                        {/* 1. Acceptance */}
                        <section>
                            <h2 className="text-xl font-semibold text-gray-800 mb-3">
                                1. Acceptance of Terms
                            </h2>
                            <p>
                                By accessing or using our Service, you agree to comply with these Terms.
                                If you do not agree, you must not use the Service.
                            </p>
                        </section>

                        {/* 2. Description */}
                        <section>
                            <h2 className="text-xl font-semibold text-gray-800 mb-3">
                                2. Description of Service
                            </h2>
                            <p>
                                Baktrack empowers cameras with artificial intelligence to detect
                                security threats and safety concerns, providing alerts to enhance
                                security and streamline operations.
                            </p>
                        </section>

                        {/* 3. Ownership */}
                        <section>
                            <h2 className="text-xl font-semibold text-gray-800 mb-3">
                                3. Ownership and Use
                            </h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>
                                    When purchasing our software solution, you are granted a limited,
                                    non-transferable, non-exclusive license to use the Service for personal purposes.
                                </li>
                                <li>
                                    You may not resell, redistribute, or use the Service for commercial purposes
                                    beyond personal use.
                                </li>
                                <li>
                                    Unauthorized modification or configuration of devices outside personal use
                                    is strictly prohibited.
                                </li>
                            </ul>
                        </section>

                        {/* 4. User Data */}
                        <section>
                            <h2 className="text-xl font-semibold text-gray-800 mb-3">
                                4. User Data Collection
                            </h2>
                            <p className="mb-3">We collect the following personal data to provide and improve our Service:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Name</li>
                                <li>Email</li>
                                <li>Phone number</li>
                                <li>Payment information</li>
                            </ul>
                            <p className="mt-3">
                                We also collect non-personal data through web cookies.
                                Please refer to our <a href="/PrivacyPolicy" className="text-black-600 font-bold hover:underline">Privacy Policy</a>
                                &nbsp;for more details on data collection and usage.
                            </p>
                        </section>

                        {/* 5. Responsibilities */}
                        <section>
                            <h2 className="text-xl font-semibold text-gray-800 mb-3">
                                5. User Responsibilities
                            </h2>
                            <p>
                                Users are responsible for maintaining the confidentiality of their accounts,
                                ensuring compliance with applicable laws, and using the Service responsibly.
                            </p>
                        </section>

                        {/* 6. Updates */}
                        <section>
                            <h2 className="text-xl font-semibold text-gray-800 mb-3">
                                6. Updates to the Terms
                            </h2>
                            <p>
                                We may update these Terms from time to time. Users will be notified of significant changes via email.
                                Continued use of the Service after updates constitutes acceptance of the revised Terms.
                            </p>
                        </section>

                        {/* 7. Governing Law */}
                        <section>
                            <h2 className="text-xl font-semibold text-gray-800 mb-3">
                                7. Governing Law
                            </h2>
                            <p>
                                These Terms are governed by and construed under the laws of Canada.
                                Any disputes arising out of or related to these Terms shall be resolved in accordance with Canadian law.
                            </p>
                        </section>

                        {/* 8. Sensitive Content Policy */}
                        <section>
                            <h2 className="text-xl font-semibold text-gray-800 mb-3">
                                8. Sensitive Content Policy & User Agreement
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-medium">1. User Responsibility</h3>
                                    <p>
                                        You affirm that any video footage processed through Baktrack.co does not
                                        contain sensitive, private, or legally restricted content, including but
                                        not limited to personally identifiable medical data, intimate recordings,
                                        or content that violates privacy laws.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-medium">2. Compliance with Laws</h3>
                                    <p>
                                        You are solely responsible for ensuring that the video content complies
                                        with all applicable local, state, federal, and international laws,
                                        including data protection regulations and surveillance laws.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-medium">3. Content Ownership & Consent</h3>
                                    <p>
                                        You affirm that you either own the rights to the video footage or have
                                        obtained explicit consent from all relevant parties to process the video
                                        through Baktrack. You agree not to submit or process any video that
                                        infringes on the rights of third parties.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-medium">4. Prohibited Content</h3>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>Videos containing highly sensitive personal data</li>
                                        <li>Footage obtained without proper authorization in private settings</li>
                                        <li>Any content that is illegal, unethical, or violates human rights laws</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* 9. Contact */}
                        <section>
                            <h2 className="text-xl font-semibold text-gray-800 mb-3">
                                9. Contact Information
                            </h2>
                            <p>
                                For questions or concerns regarding these Terms, contact us at{" "}
                                <a href="mailto:contact@baktrack.co" className="text-black-600 font-bold hover:underline">
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
            <Footer/>
        </>
    );
}
