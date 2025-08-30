// import React, { useEffect, useRef, useState } from "react";

// type Sender = "bot" | "user" | "alert";
// interface Message {
//     sender: Sender;
//     text: string;
// }
// interface ChatBlock {
//     id: string;
//     messages: Message[];
// }

// // Chats grouped by use case
// const chats: ChatBlock[] = [
//     {
//         id: "usecase1",
//         messages: [
//             { sender: "bot", text: "Hello, Baktrack is now connected with your cameras 📷" },
//             { sender: "bot", text: "What do you want me to detect today?" },
//             { sender: "user", text: "Can you look after my grandma? She is old and I want you to make sure of her safety" },
//             { sender: "bot", text: "Don't worry about it, I will make sure of her safety and keep you updated." },
//             { sender: "bot", text: "Hello, Baktrack is now connected with your cameras 📷" },
//             { sender: "bot", text: "What do you want me to detect today?" },
//             { sender: "user", text: "Can you look after my grandma? She is old and I want you to make sure of her safety" },
//             { sender: "bot", text: "Don't worry about it, I will make sure of her safety and keep you updated." },
//             { sender: "bot", text: "Hello, Baktrack is now connected with your cameras 📷" },
//             { sender: "bot", text: "What do you want me to detect today?" },
//             { sender: "user", text: "Can you look after my grandma? She is old and I want you to make sure of her safety" },
//             { sender: "bot", text: "Don't worry about it, I will make sure of her safety and keep you updated." },
//         ],
//     },
//     {
//         id: "usecase2",
//         messages: [
//             { sender: "bot", text: "Hello, Baktrack is now connected with your cameras 📷" },
//             { sender: "bot", text: "What do you want me to detect today?" },
//             { sender: "user", text: "Can you look after my grandma? She is old and I want you to make sure of her safety" },
//             { sender: "bot", text: "Don't worry about it, I will make sure of her safety and keep you updated." },
//             { sender: "bot", text: "Hello, Baktrack is now connected with your cameras 📷" },
//             { sender: "bot", text: "What do you want me to detect today?" },
//             { sender: "user", text: "Can you look after my grandma? She is old and I want you to make sure of her safety" },
//             { sender: "bot", text: "Don't worry about it, I will make sure of her safety and keep you updated." },
//         ],
//     },
//     {
//         id: "usecase3",
//         messages: [
//             { sender: "alert", text: "🚨 Elderly woman having breathing difficulty\nDate: March 15, 2024\nTime: 2:47 PM" },
//         ],
//     },
// ];

// export default function ChatSection() {
//     const [activeTab, setActiveTab] = useState<string>("usecase1");
//     const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
//     const containerRef = useRef<HTMLDivElement | null>(null);
//     const lastScrollTop = useRef(0);
//     const [scrollDir, setScrollDir] = useState<"up" | "down">("down");

//     // Observe sections to highlight tab when section is centered
//     useEffect(() => {
//         const observer = new IntersectionObserver(
//             (entries) => {
//                 entries.forEach((entry) => {
//                     if (entry.isIntersecting) {
//                         setActiveTab(entry.target.id);
//                     }
//                 });
//             },
//             {
//                 root: null,
//                 threshold: 0.6,
//             }
//         );

//         chats.forEach((chat) => {
//             const el = sectionRefs.current[chat.id];
//             if (el) observer.observe(el);
//         });

//         return () => observer.disconnect();
//     }, []);
//     useEffect(() => {
//         const container = containerRef.current;
//         if (!container) return;

//         const onScroll = () => {
//             const st = container.scrollTop;
//             setScrollDir(st > lastScrollTop.current ? "down" : "up");
//             lastScrollTop.current = st <= 0 ? 0 : st;
//         };

//         container.addEventListener("scroll", onScroll);
//         return () => container.removeEventListener("scroll", onScroll);
//     }, []);
//     console.log(scrollDir, "scrollDir");

//     return (
//         <div
//             ref={containerRef}
//             className="h-[calc(100vh-240px)] flex flex-col bg-gradient-to-b from-blue-50 via-white to-blue-50"
//         >
//             {/* Sticky Tab Bar */}
//             <div className="sticky z-10" style={{ top: "200px" }}>
//                 <div className="flex justify-center space-x-6 p-3  rounded-xl ">
//                     {chats.map((chat, idx) => (
//                         <button
//                             key={chat.id}
//                             onClick={() =>
//                                 sectionRefs.current[chat.id]?.scrollIntoView({
//                                     behavior: "smooth",
//                                     block: "center",
//                                 })
//                             }
//                             className={`px-5 py-2 rounded-full text-sm font-medium transition ${activeTab === chat.id
//                                 ? "bg-blue-600 text-white"
//                                 : "bg-white text-gray-600 hover:bg-gray-200"
//                                 }`}
//                         >
//                             {`Use Case ${idx + 1}`}
//                         </button>
//                     ))}
//                 </div>
//             </div>

//             {/* Chat Sections */}
//             <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-20">
//                 {chats.map((chat, idx) => (
//                     <div
//                         key={chat.id}
//                         id={chat.id}
//                         ref={(el) => {
//                             sectionRefs.current[chat.id] = el;
//                         }}
//                         className="space-y-5 max-w-4xl mx-auto"
//                     >
//                         {/* Section Title */}
//                         <div className="text-center mb-6">
//                             <span className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full shadow text-sm font-semibold">
//                                 {`Use Case ${idx + 1}`}
//                             </span>
//                         </div>

//                         {/* Messages */}
//                         {chat.messages.map((msg, idxMsg) => (
//                             <div
//                                 key={idxMsg}
//                                 className={` ${scrollDir === "down" ? "animate-fadeIn opacity-0" : "animate-fadeOut opacity-100"}`}
//                                 style={{ animationDelay: `${idxMsg * 150}ms` }}
//                             >
//                                 {msg.sender === "bot" && (
//                                     <div className="flex items-start space-x-2">
//                                         <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-300 text-sm font-bold text-gray-700">
//                                             B
//                                         </div>
//                                         <div className="bg-gray-200 px-4 py-2 rounded-2xl text-gray-800 shadow max-w-md">
//                                             {msg.text}
//                                         </div>
//                                     </div>
//                                 )}
//                                 {msg.sender === "user" && (
//                                     <div className="flex justify-end items-start space-x-2">
//                                         <div className="bg-blue-600 text-white px-4 py-2 rounded-2xl shadow max-w-md">
//                                             {msg.text}
//                                         </div>
//                                         <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
//                                             U
//                                         </div>
//                                     </div>
//                                 )}
//                                 {msg.sender === "alert" && (
//                                     <div className="flex justify-center">
//                                         <div className="bg-red-100 border border-red-400 text-red-800 px-4 py-3 rounded-lg max-w-lg shadow-lg text-sm">
//                                             <strong className="block mb-1 text-red-700">🚨 Alert</strong>
//                                             <span className="whitespace-pre-line">{msg.text}</span>
//                                         </div>
//                                     </div>
//                                 )}
//                             </div>
//                         ))}
//                     </div>
//                 ))}
//             </div>

//             {/* Inline FadeIn Animation + No Scrollbar CSS */}
//             <style>{`
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(15px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-fadeIn {
//           animation: fadeIn 0.8s ease forwards;
//         }
//               @keyframes fadeOut {
//           from { opacity: 1; transform: translateY(0); }
//           to { opacity: 0; transform: translateY(-15px); }
//         }
//         .animate-fadeOut {
//           animation: fadeOut 0.8s ease forwards;
//         }
//         .no-scrollbar::-webkit-scrollbar {
//           display: none;
//         }
//         .no-scrollbar {
//           -ms-overflow-style: none; 
//           scrollbar-width: none;  
//         }
//       `}</style>
//         </div>
//     );
// }
import React, { useState, useRef, useEffect } from "react";

type Sender = "bot" | "user" | "alert";
interface Message {
    sender: Sender;
    text: string;
}
interface ChatBlock {
    id: string;
    title: string;
    messages: Message[];
}

const chats: ChatBlock[] = [
    {
        id: "usecase1",
        title: "Personal - Elderly Care Monitoring",
        messages: [
            { sender: "bot", text: "Hello, Baktrack is now connected with your cameras 📹" },
            { sender: "bot", text: "What do you want me to detect today?" },
            { sender: "user", text: "Can you look after my grandma? She is old and I want you to make sure of her safety" },
            { sender: "bot", text: "Don't worry about it, I will make sure of her safety and keep you updated." },
            { sender: "user", text: "Also she is an asthma patient. Especially if you see her struggling to find her inhaler, tell me right away so I can send help." },
            { sender: "bot", text: "Got it! Let me know anytime if you want to add something." },
            { sender: "alert", text: "🚨  Elderly woman having breathing difficulty\nDate:  March 15, 2024\nTime: 2:47 PM" },
        ],
    },
    {
        id: "usecase2",
        title: "Personal - Outdoor Security Monitoring",
        messages: [
            { sender: "bot", text: "Hello, Baktrack is now connected with your cameras 📹" },
            { sender: "bot", text: "What would you like me to monitor today?" },
            { sender: "user", text: "I need you to watch my outdoor cameras for security issues" },
            { sender: "bot", text: "Absolutely! I'll monitor your outdoor areas. What specific concerns do you have?" },
            { sender: "user", text: "Watch for package theft at my front door and any suspicious people checking car door handles" },
            { sender: "bot", text: "Got it! I'll alert you for package theft attempts and anyone tampering with vehicles." },
            { sender: "user", text: "Also, if you see someone looking through windows or trying door handles, that's a break-in attempt" },
            { sender: "bot", text: "Perfect! I'll watch for trespassing and break-in attempts. Anything else?" },
            { sender: "user", text: "If anyone jumps my fence or enters the backyard without permission, alert me immediately" },
            { sender: "bot", text: "All set! I'm now monitoring for package theft, car tampering, break-in attempts, and unauthorized backyard access." },
            { sender: "alert", text: "🚨   Suspicious package theft attempt detected\nDate:  March 15, 2024\nTime: 2:47 PM" },
        ],
    },
    {
        id: "usecase3",
        title: "Business - Shoplifting Prevention",
        messages: [
            { sender: "bot", text: "Hello, Baktrack is now connected with your cameras 📹" },
            { sender: "bot", text: "How can I help secure your business today?" },
            { sender: "user", text: "I'm having a serious shoplifting problem in my store. Can you help?" },
            { sender: "bot", text: "Absolutely! I can monitor for suspicious shopping behavior. Tell me more about your concerns." },
            { sender: "user", text: "People are concealing items in bags, pockets, or under clothing. I need alerts when this happens" },
            { sender: "bot", text: "I'll watch for concealment behaviors and alert you in real-time." },
            { sender: "user", text: "Also watch for people removing security tags or switching price tags" },
            { sender: "bot", text: "Got it! I'll monitor for tag removal and price switching attempts." },
            { sender: "user", text: "Sometimes groups work together - one distracts while another steals. Can you detect that?" },
            { sender: "bot", text: "Yes! I'll analyze group behaviors and alert you to coordinated suspicious activities." },
            { sender: "user", text: "Perfect. I need to catch this before they leave the store" },
            { sender: "bot", text: "I'm now monitoring for concealment, tag tampering, price switching, and coordinated theft attempts. You'll get instant alerts!" },
            { sender: "alert", text: "🚨   Suspicious package theft attempt detected\nDate:  March 15, 2024\nTime: 2:47 PM" },
        ],
    },
    {
        id: "usecase4",
        title: "Enterprise - Warehouse Safety Monitoring",
        messages: [
            { sender: "bot", text: "Hello, Baktrack is now connected with your cameras 📹" },
            { sender: "bot", text: "What safety protocols should I monitor in your warehouse?" },
            { sender: "user", text: "I need comprehensive safety monitoring for our 200,000 sq ft warehouse" },
            { sender: "bot", text: "I'll help ensure worker safety. What are your main safety concerns?" },
            { sender: "user", text: "Monitor for forklift accidents - workers not wearing high-vis vests in forklift zones" },
            { sender: "bot", text: "I'll watch forklift areas and alert for missing safety equipment violations." },
            { sender: "user", text: "Also watch for people entering restricted areas without proper authorization" },
            { sender: "bot", text: "Got it! I'll monitor access control and unauthorized area entries." },
            { sender: "user", text: "We have chemical storage areas - alert if anyone enters without proper PPE" },
            { sender: "bot", text: "I'll monitor chemical zones for PPE compliance violations." },
            { sender: "user", text: "Sometimes workers climb on equipment unsafely or bypass safety barriers" },
            { sender: "bot", text: "I'll watch for unsafe climbing and safety barrier violations." },
            { sender: "user", text: "Can you also detect if someone appears injured or needs medical assistance?" },
            { sender: "bot", text: "Absolutely! I'm now monitoring for safety violations, unauthorized access, PPE compliance, unsafe behaviors, and medical emergencies across your entire facility." },
            { sender: "alert", text: "🚨  Elderly woman having breathing difficulty\nDate:  March 15, 2024\nTime: 2:47 PM" },
        ],
    },
];

// 👇 Message component with fade-in animation
const AnimatedMessage: React.FC<{ children: React.ReactNode; delay: number }> = ({
    children,
    delay,
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        observer.unobserve(entry.target); // animate once
                    }
                });
            },
            { threshold: 0.2 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={isVisible ? "animate-fadeIn" : ""}
            style={{ animationDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

export default function ChatSlider() {
    const [activeIndex, setActiveIndex] = useState(0);

    const nextSlide = () => setActiveIndex((prev) => (prev + 1) % chats.length);
    const prevSlide = () => setActiveIndex((prev) => (prev - 1 + chats.length) % chats.length);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 via-white to-blue-50 px-4 py-12" id="works">
            {/* Heading */}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
                How Baktrack Works in Natural Language
            </h2>
            <p className="mt-3 text-gray-600 text-center max-w-2xl">
                See how easy it is to set up intelligent security monitoring with natural language commands
            </p>

            {/* Slider Navigation */}
            <div className="flex items-center justify-between w-full max-w-3xl mt-8">
                <button
                    onClick={prevSlide}
                    className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700"
                >
                    ◀ Previous
                </button>
                <h3 className="font-semibold text-gray-800">{chats[activeIndex].title}</h3>
                <button
                    onClick={nextSlide}
                    className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700"
                >
                    Next ▶
                </button>
            </div>

            {/* Chat Messages */}
            <div className="relative w-full max-w-3xl mt-6  rounded-xl p-6 transition-all duration-500">
                {chats[activeIndex].messages.map((msg, idx) => (
                    <AnimatedMessage key={idx} delay={idx * 150}>
                        <div className="mb-4">
                            {msg.sender === "bot" && (
                                <div className="flex items-start space-x-2">
                                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-300 text-sm font-bold text-gray-700">
                                        B
                                    </div>
                                    <div className="bg-gray-100 px-4 py-2 rounded-2xl text-gray-800 shadow max-w-md">
                                        {msg.text}
                                    </div>
                                </div>
                            )}
                            {msg.sender === "user" && (
                                <div className="flex justify-end items-start space-x-2">
                                    <div className="bg-blue-600 text-white px-4 py-2 rounded-2xl shadow max-w-md">
                                        {msg.text}
                                    </div>
                                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                                        U
                                    </div>
                                </div>
                            )}
                            {msg.sender === "alert" && (
                                <div className="flex items-start space-x-2">
                                    {/* Alert Avatar (like U/B icons) */}
                                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500 text-sm font-bold text-white">
                                        🚨
                                    </div>

                                    {/* Alert Message Box */}
                                    <div className="bg-red-100 border border-red-400 text-red-800 px-4 py-3 rounded-2xl shadow-lg text-sm max-w-md">
                                        <strong className="block mb-1 text-red-700">🚨 Alert</strong>
                                        <div className="flex justify-center my-5">
                                             <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center border-4 border-black shadow-lg cursor-pointer hover:bg-gray-800 transition-colors"><div className="w-12 h-12 bg-white rounded-full flex items-center justify-center"><div className="w-0 h-0 border-l-[8px] border-l-black border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ml-1"></div></div></div>
                                        </div>
                                        <span className="whitespace-pre-line">{msg.text}</span>
                                    </div>
                                </div>
                            )}

                        </div>
                    </AnimatedMessage>
                ))}
            </div>

            {/* Dots Pagination */}
            <div className="flex space-x-2 mt-6">
                {chats.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setActiveIndex(i)}
                        className={`w-3 h-3 rounded-full transition ${i === activeIndex
                            ? "bg-blue-600 scale-110"
                            : "bg-gray-400 hover:bg-gray-500"
                            }`}
                    ></button>
                ))}
            </div>

            {/* Animation Styles */}
            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          opacity: 0;
          animation: fadeIn 0.8s ease forwards;
        }
      `}</style>
        </div>
    );
}
