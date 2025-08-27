import React, { useEffect, useRef, useState } from "react";

type Sender = "bot" | "user" | "alert";
interface Message {
    sender: Sender;
    text: string;
}
interface ChatBlock {
    id: string;
    messages: Message[];
}

// Chats grouped by use case
const chats: ChatBlock[] = [
    {
        id: "usecase1",
        messages: [
            { sender: "bot", text: "Hello, Baktrack is now connected with your cameras 📷" },
            { sender: "bot", text: "What do you want me to detect today?" },
            { sender: "user", text: "Can you look after my grandma? She is old and I want you to make sure of her safety" },
            { sender: "bot", text: "Don't worry about it, I will make sure of her safety and keep you updated." },
            { sender: "bot", text: "Hello, Baktrack is now connected with your cameras 📷" },
            { sender: "bot", text: "What do you want me to detect today?" },
            { sender: "user", text: "Can you look after my grandma? She is old and I want you to make sure of her safety" },
            { sender: "bot", text: "Don't worry about it, I will make sure of her safety and keep you updated." },
            { sender: "bot", text: "Hello, Baktrack is now connected with your cameras 📷" },
            { sender: "bot", text: "What do you want me to detect today?" },
            { sender: "user", text: "Can you look after my grandma? She is old and I want you to make sure of her safety" },
            { sender: "bot", text: "Don't worry about it, I will make sure of her safety and keep you updated." },
        ],
    },
    {
        id: "usecase2",
        messages: [
            { sender: "bot", text: "Hello, Baktrack is now connected with your cameras 📷" },
            { sender: "bot", text: "What do you want me to detect today?" },
            { sender: "user", text: "Can you look after my grandma? She is old and I want you to make sure of her safety" },
            { sender: "bot", text: "Don't worry about it, I will make sure of her safety and keep you updated." },
            { sender: "bot", text: "Hello, Baktrack is now connected with your cameras 📷" },
            { sender: "bot", text: "What do you want me to detect today?" },
            { sender: "user", text: "Can you look after my grandma? She is old and I want you to make sure of her safety" },
            { sender: "bot", text: "Don't worry about it, I will make sure of her safety and keep you updated." },
        ],
    },
    {
        id: "usecase3",
        messages: [
            { sender: "alert", text: "🚨 Elderly woman having breathing difficulty\nDate: March 15, 2024\nTime: 2:47 PM" },
        ],
    },
];

export default function ChatSection() {
    const [activeTab, setActiveTab] = useState<string>("usecase1");
    const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
    const containerRef = useRef<HTMLDivElement | null>(null);
    const lastScrollTop = useRef(0);
    const [scrollDir, setScrollDir] = useState<"up" | "down">("down");

    // Observe sections to highlight tab when section is centered
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveTab(entry.target.id);
                    }
                });
            },
            {
                root: null,
                threshold: 0.6,
            }
        );

        chats.forEach((chat) => {
            const el = sectionRefs.current[chat.id];
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const onScroll = () => {
            const st = container.scrollTop;
            setScrollDir(st > lastScrollTop.current ? "down" : "up");
            lastScrollTop.current = st <= 0 ? 0 : st;
        };

        container.addEventListener("scroll", onScroll);
        return () => container.removeEventListener("scroll", onScroll);
    }, []);
    console.log(scrollDir, "scrollDir");

    return (
        <div
            ref={containerRef}
            className="h-[calc(100vh-240px)] flex flex-col bg-gradient-to-b from-blue-50 via-white to-blue-50"
        >
            {/* Sticky Tab Bar */}
            <div className="sticky z-10" style={{ top: "200px" }}>
                <div className="flex justify-center space-x-6 p-3  rounded-xl ">
                    {chats.map((chat, idx) => (
                        <button
                            key={chat.id}
                            onClick={() =>
                                sectionRefs.current[chat.id]?.scrollIntoView({
                                    behavior: "smooth",
                                    block: "center",
                                })
                            }
                            className={`px-5 py-2 rounded-full text-sm font-medium transition ${activeTab === chat.id
                                ? "bg-blue-600 text-white"
                                : "bg-white text-gray-600 hover:bg-gray-200"
                                }`}
                        >
                            {`Use Case ${idx + 1}`}
                        </button>
                    ))}
                </div>
            </div>

            {/* Chat Sections */}
            <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-20">
                {chats.map((chat, idx) => (
                    <div
                        key={chat.id}
                        id={chat.id}
                        ref={(el) => {
                            sectionRefs.current[chat.id] = el;
                        }}
                        className="space-y-5 max-w-4xl mx-auto"
                    >
                        {/* Section Title */}
                        <div className="text-center mb-6">
                            <span className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full shadow text-sm font-semibold">
                                {`Use Case ${idx + 1}`}
                            </span>
                        </div>

                        {/* Messages */}
                        {chat.messages.map((msg, idxMsg) => (
                            <div
                                key={idxMsg}
                                className={` ${scrollDir === "down" ? "animate-fadeIn opacity-0" : "animate-fadeOut opacity-100"}`}
                                style={{ animationDelay: `${idxMsg * 150}ms` }}
                            >
                                {msg.sender === "bot" && (
                                    <div className="flex items-start space-x-2">
                                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-300 text-sm font-bold text-gray-700">
                                            B
                                        </div>
                                        <div className="bg-gray-200 px-4 py-2 rounded-2xl text-gray-800 shadow max-w-md">
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
                                    <div className="flex justify-center">
                                        <div className="bg-red-100 border border-red-400 text-red-800 px-4 py-3 rounded-lg max-w-lg shadow-lg text-sm">
                                            <strong className="block mb-1 text-red-700">🚨 Alert</strong>
                                            <span className="whitespace-pre-line">{msg.text}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Inline FadeIn Animation + No Scrollbar CSS */}
            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease forwards;
        }
              @keyframes fadeOut {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(-15px); }
        }
        .animate-fadeOut {
          animation: fadeOut 0.8s ease forwards;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none; 
          scrollbar-width: none;  
        }
      `}</style>
        </div>
    );
}
