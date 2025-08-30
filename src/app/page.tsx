'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import './globals.css';
import ContactUs from '@/Components/Contact/ContactUs';
import Header from '@/Components/Header/Header';
import Footer from '@/Components/Footer/Footer';
import ChatSection from '@/Components/ChatSection/ChatSection';
import Link from 'next/link';
import ComparisonSection from '@/Components/ComparisonSection/ComparisonSection';


// Animation hook for scroll-triggered animations
const useScrollAnimation = () => {
  const [animatedElements, setAnimatedElements] = useState(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimatedElements(prev => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.8, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return animatedElements;
};

// Parallax component
const ParallaxSection = ({ children, offset = 0.5, className = "" }: {
  children: React.ReactNode;
  offset?: number;
  className?: string;
}) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={className}
      style={{
        transform: `translateY(${scrollY * offset}px)`,
      }}
    >
      {children}
    </div>
  );
};

// News Ticker Component for Industry Focus
const IndustryTicker = () => {
  const [isPaused, setIsPaused] = useState(false);

  const industries = [
    'Residential', 'Retail', 'Healthcare', 'Manufacturing', 'Hospitality', 'Warehouse',
    'Logistics', 'Law Enforcement', 'Education', 'Banking', 'Transportation', 'Government',
    'Construction', 'Agriculture', 'Energy'
  ];

  return (
    <div className="mt-16">
      <p className="text-lg font-semibold text-gray-700 mb-6 uppercase tracking-wider text-center">Industry Focus</p>
      <div
        className="relative overflow-hidden w-full"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className={`flex whitespace-nowrap ${isPaused ? '' : 'animate-scroll'}`}>
          {/* First set of industries */}
          {industries.map((industry, index) => (
            <div
              key={`first-${index}`}
              className="inline-block text-gray-400 font-semibold hover:text-blue-600 transition-all duration-300 cursor-default px-4 md:px-8"
            >
              {industry}
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {industries.map((industry, index) => (
            <div
              key={`second-${index}`}
              className="inline-block text-gray-400 font-semibold hover:text-blue-600 transition-all duration-300 cursor-default px-4 md:px-8"
            >
              {industry}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Interactive Card Carousel Component
const InteractiveCardCarousel = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const conversations = [
    {
      id: 1,
      title: "Fire Detection",
      gradient: "from-orange-400 to-red-500",
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
        </svg>
      ),
      messages: [
        { sender: "Baktrack", text: "Hi! What would you like me to detect today?" },
        { sender: "User", text: "Monitor for fire in the kitchen" },
        { sender: "Baktrack", text: "Gotcha!! Detection has been started." }
      ]
    },
    {
      id: 2,
      title: "Shoplifting Detection",
      gradient: "from-purple-400 to-indigo-500",
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      messages: [
        { sender: "Baktrack", text: "Hi! What would you like me to detect today?" },
        { sender: "User", text: "Watch for shoplifting in store" },
        { sender: "Baktrack", text: "Gotcha!! Detection has been started." }
      ]
    },
    {
      id: 3,
      title: "Health Monitoring",
      gradient: "from-green-400 to-emerald-500",
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      messages: [
        { sender: "Baktrack", text: "Hi! What would you like me to detect today?" },
        { sender: "User", text: "Detect if elderly person falls in living room" },
        { sender: "Baktrack", text: "Gotcha!! Detection has been started." }
      ]
    },
    {
      id: 4,
      title: "Workplace Safety",
      gradient: "from-blue-400 to-cyan-500",
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      messages: [
        { sender: "Baktrack", text: "Hi! What would you like me to detect today?" },
        { sender: "User", text: "Check if workers wear safety helmets" },
        { sender: "Baktrack", text: "Gotcha!! Detection has been started." }
      ]
    }
  ];

  // Auto-cycle through cards
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentCard((prev) => (prev + 1) % conversations.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, conversations.length]);

  const nextCard = () => {
    setIsAutoPlaying(false);
    setCurrentCard((prev) => (prev + 1) % conversations.length);
    setTimeout(() => setIsAutoPlaying(true), 8000); // Resume auto-play after 8 seconds
  };

  const prevCard = () => {
    setIsAutoPlaying(false);
    setCurrentCard((prev) => (prev - 1 + conversations.length) % conversations.length);
    setTimeout(() => setIsAutoPlaying(true), 8000); // Resume auto-play after 8 seconds
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto h-96 flex items-center justify-center overflow-hidden">


      {/* Card Stack */}
      <div className="relative w-full h-96 flex items-center justify-center">
        {conversations.map((conversation, index) => {
          const isActive = index === currentCard;
          const isNext = index === (currentCard + 1) % conversations.length;
          const isPrev = index === (currentCard - 1 + conversations.length) % conversations.length;

          let transform = 'translateX(200%) scale(0.7)';
          let zIndex = 1;
          let opacity = 0;

          if (isActive) {
            transform = 'translateX(0%) scale(1)';
            zIndex = 10;
            opacity = 1;
          } else if (isNext) {
            transform = 'translateX(15%) scale(0.9)';
            zIndex = 5;
            opacity = 0.8;
          } else if (isPrev) {
            transform = 'translateX(-15%) scale(0.9)';
            zIndex = 5;
            opacity = 0.8;
          }

          return (
            <div
              key={conversation.id}
              className="absolute inset-0 transition-all duration-500 ease-in-out flex items-center justify-center"
              style={{
                transform,
                zIndex,
                opacity
              }}
            >
              <div
                className={`bg-gradient-to-br ${conversation.gradient} rounded-3xl p-6 shadow-2xl md:w-[500px] w-[300px]  h-[320px]`}
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
              >
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-5 h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center">
                      {conversation.icon}
                    </div>
                    <span className="text-white font-semibold text-lg">{conversation.title}</span>
                  </div>

                  {/* Conversation */}
                  <div className="space-y-2.5 flex-1 overflow-hidden">
                    {conversation.messages.map((message, msgIndex) => (
                      <div key={msgIndex} className={`w-full `}>
                        <div className={`md:max-w-full  ${message.sender === 'User' ? 'bg-white/30' : 'bg-white/20'} rounded-lg p-2 sm:p-2.5`}>
                          <div className="flex items-center gap-2">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${message.sender === 'Baktrack' ? 'bg-white/30 text-white' : 'bg-white text-gray-800'}`}>
                              {message.sender === 'Baktrack' ? 'B' : 'U'}
                            </div>
                            <span className="text-white text-xs sm:text-sm break-words">{message.text}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>


    </div>
  );
};

export default function Home() {
  const animatedElements = useScrollAnimation();
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
  const issues = [
    {
      title: "Too Late",
      description: "Perfect at showing you what you already lost.",
    },
    {
      title: "Time Wasted",
      description: "Rewind. Pause. Cry. Repeat.",
    },
    {
      title: "Damage Done",
      description: "Your valuables: gone. But hey, the footage looks great!",
    },
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 overflow-x-hidden">
      {/* Navigation */}
      <Header scrolled={scrolled} />

      {/* Hero Section - Interactive Neura Style */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 via-purple-50 to-blue-100 px-4 md:px-6 relative overflow-hidden mt-[130px]">
        <div className="max-w-6xl mx-auto text-center z-10">
          {/* Main Title */}
          <h1 className={`text-4xl sm:text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight ${animatedElements.has("banner-title")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
              }` }  id='banner-title' data-animate>
            AI Powered CCTV <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Copilot
            </span>
          </h1>

          {/* Subtitle */}
          <p className={`text-base sm:text-lg md:text-2xl text-gray-600 mb-10 max-w-2xl md:max-w-3xl mx-auto leading-relaxed ${animatedElements.has("banner-subtitle")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
              }` }  id='banner-subtitle' data-animate>
            Your Personalized Digital Security Guard
          </p>

          {/* CTA Button */}
          <Link href="/ContactUs">
            <button className="bg-gray-900 cursor-pointer text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-gray-800 transition-colors duration-300 mb-12 inline-flex items-center gap-2">
              Get Started
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </Link>
          {/* Interactive Card Carousel */}
          <InteractiveCardCarousel />

          {/* Industry Focus News Ticker */}
          <IndustryTicker />
        </div>
      </section>


      {/* Problem Agitation Section */}
      <section className="px-6 py-20 bg-gradient-to-b from-blue-100 via-blue-50 to-green-50 relative" id="features" data-animate>
        <div className="max-w-6xl mx-auto text-center">
          <h2
            className={`text-4xl font-bold text-gray-800 mb-6 transition-all duration-1000 ${animatedElements.has('problem-title') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            id="problem-title"
            data-animate>
            Your Current Camera System Is Failing You
          </h2>
          <p
            className={`text-lg text-center text-gray-600 mb-16 max-w-4xl mx-auto transition-all duration-1000 delay-200 ${animatedElements.has('problem-subtitle') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            id="problem-subtitle" data-animate>
            Traditional cameras don`t prevent Anything—they just film it in HD so you can cry in 1080p later.
          </p>

          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {issues.map((issue, idx) => (
                <div
                  key={idx}
                  className={`bg-white rounded-2xl shadow-md p-6 border-l-4 border-red-500 text-center 
                   hover:shadow-xl transform transition-transform duration-300 hover:scale-105 
                    ${animatedElements.has("falling-card")
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                    }`}
                  id='falling-card' data-animate
                >
                  <h3 className="text-lg font-bold mb-2 bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                    {issue.title}
                  </h3>
                  <p className="text-gray-600">{issue.description}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>


      <section className="bg-gradient-to-b from-green-50 via-white to-blue-50" id='benefits' data-animate>
        {/* Heading */}
        <div className='max-w-6xl mx-auto px-6 py-16 text-center'>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-12">
            Meet Your AI Powered Personalized Digital Security Guard
          </h2>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Feature 1 */}
            <div className={`flex flex-col items-center  ${animatedElements.has("feature-card-1")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
              }`}
              id='feature-card-1' data-animate>
              <span className="text-4xl mb-4">🔌</span>
              <h3 className="text-lg font-bold mb-2 bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
                Connects With Existing <br /> Camera System
              </h3>
              <p className="text-gray-600 text-sm">
                Plug into your current cameras. <br /> Instant AI upgrade.
              </p>
            </div>

            {/* Feature 2 */}
            <div className={`flex flex-col items-center  ${animatedElements.has("feature-card-2")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
              }`}
              id='feature-card-2' data-animate>
              <span className="text-4xl mb-4">⚡</span>
              <h3 className="text-lg font-bold mb-2 bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
                Prevention Real Time
              </h3>
              <p className="text-gray-600 text-sm">
                Real-time alerts. Act before damage occurs.
              </p>
            </div>

            {/* Feature 3 */}
            <div className={`flex flex-col items-center ${animatedElements.has("feature-card-3")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
              }`}
              id='feature-card-3' data-animate>
              <span className="text-4xl mb-4">💬</span>
              <h3 className="text-lg font-bold mb-2 bg-gradient-to-r from-green-500 to-green-700 bg-clip-text text-transparent">
                Natural Language Communication
              </h3>
              <p className="text-gray-600 text-sm">
                Just tell it what to watch. <br /> It understands perfectly.
              </p>
            </div>

            {/* Feature 4 */}
            <div className={`flex flex-col items-center ${animatedElements.has("feature-card-4")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
              }`}
              id='feature-card-4' data-animate>
              <span className="text-4xl mb-4">🧠</span>
              <h3 className="text-lg font-bold mb-2 bg-gradient-to-r from-purple-500 to-purple-700 bg-clip-text text-transparent">
                Intelligent Self Learning
              </h3>
              <p className="text-gray-600 text-sm">
                Learns, adapts, improves from user`s <br /> feedback realtime
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* How Baktrack Works Section - Scroll-Triggered Chat */}

      <ComparisonSection />
      <ChatSection />
      {/* <OurMenuSection/> */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-gray-50" data-animate>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Every Camera Gets Its Own Brain
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Enterprise security faces an impossible challenge: one guard monitoring 50+ camera feeds.
              Human attention can&apos;t handle this cognitive overload.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">


            <div className={`space-y-8 ${animatedElements.has("brain-card-1")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
              }`} id='brain-card-1' data-animate>
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent mb-2">The Problem</h3>
                  <p className="text-gray-600">Traditional Security Monitoring</p>
                </div>


                <div className="bg-gray-900 rounded-xl p-6 mb-6">
                  <div className="grid grid-cols-6 gap-1 mb-4">
                    {Array.from({ length: 24 }, (_, i) => (
                      <div key={i} className="aspect-video bg-gray-700 rounded border border-gray-600 flex items-center justify-center">
                        <span className="text-gray-400 text-xs">📹</span>
                      </div>
                    ))}
                  </div>
                  <div className="text-center">
                    <div className="inline-flex items-center space-x-2 bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                      <span>👤</span>
                      <span>1 Overwhelmed Guard</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-red-600">
                    <span className="text-xl">❌</span>
                    <span>50+ tiny camera feeds to monitor</span>
                  </div>
                  <div className="flex items-center space-x-3 text-red-600">
                    <span className="text-xl">❌</span>
                    <span>Human attention span limitations</span>
                  </div>
                  <div className="flex items-center space-x-3 text-red-600">
                    <span className="text-xl">❌</span>
                    <span>Critical events easily missed</span>
                  </div>
                </div>
              </div>
            </div>


            <div className={`space-y-8 ${animatedElements.has("brain-card-2")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
              }`} id='brain-card-2' data-animate>
           
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-green-500 to-green-700 bg-clip-text text-transparent mb-2">The Solution</h3>
                  <p className="text-gray-600">Baktrack AI Intelligence</p>
                </div>


                <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-6 mb-6">
                  <div className="grid grid-cols-6 gap-1 mb-4">
                    {Array.from({ length: 24 }, (_, i) => (
                      <div key={i} className="aspect-video bg-white rounded border-2 border-green-300 flex items-center justify-center relative">
                        <span className="text-green-600 text-xs">📹</span>
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">🧠</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="text-center">
                    <div className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      <span>👤</span>
                      <span>1 Guard + 50 AI Assistants</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-green-600">
                    <span className="text-xl">✅</span>
                    <span>Each camera has its own AI brain</span>
                  </div>
                  <div className="flex items-center space-x-3 text-green-600">
                    <span className="text-xl">✅</span>
                    <span>Understands human instructions</span>
                  </div>
                  <div className="flex items-center space-x-3 text-green-600">
                    <span className="text-xl">✅</span>
                    <span>Clear, actionable alerts only</span>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className={`text-center bg-white rounded-xl p-6 shadow-lg border border-gray-200 ${animatedElements.has("stat-card-1")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
              }`} id='stat-card-1' data-animate>
              <div className="text-3xl font-bold text-blue-600 mb-2">1 → 50+</div>
              <p className="text-gray-600">From One Guard to AI Assistants</p>
            </div>
            <div className={`text-center bg-white rounded-xl p-6 shadow-lg border border-gray-200 ${animatedElements.has("stat-card-2")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
              }`} id='stat-card-2' data-animate>
              <div className="text-3xl font-bold text-green-600 mb-2">0.3s</div>
              <p className="text-gray-600">Average Response Time</p>
            </div>
            <div className={`text-center bg-white rounded-xl p-6 shadow-lg border border-gray-200 ${animatedElements.has("stat-card-3")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
              }`} id='stat-card-3' data-animate>
              <div className="text-3xl font-bold text-purple-600 mb-2">0</div>
              <p className="text-gray-600">Cognitive Overload</p>
            </div>
          </div>
        </div>
      </section>
      {/* Target Audiences Section */}
      <section className="px-6 py-20 bg-gradient-to-b from-gray-50 to-white" >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800">
            Trusted by Forward-Thinking Users
          </h2>
          <p className="text-md text-gray-600 text-center mt-4 mx-auto mb-12">
            From individual users to enterprises, Baktrack adapts to your specific security needs.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Individual User Card */}
            <div className={`group relative ${animatedElements.has("user-card")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
              }`} id='user-card' data-animate>
              {/* Subtle Border */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-200 to-blue-300 rounded-2xl opacity-50"></div>

              {/* Card */}
              <div className="relative bg-white rounded-2xl p-8 shadow-lg border border-gray-100 h-full">
                {/* Icon */}
                <div className="mb-6">
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
                  Individual User
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Peace of mind for your family with intelligent home monitoring.
                </p>

                {/* Use Cases + Feature */}
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Elderly fall detection and medical emergencies
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Package delivery and break-in prevention
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Fire and safety monitoring
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Easy natural language setup
                  </li>
                </ul>
              </div>
            </div>

            {/* Business Card */}
            <div className={`group relative ${animatedElements.has("business-card")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
              }`} id='business-card' data-animate>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-green-200 to-green-300 rounded-2xl opacity-50"></div>

              <div className="relative bg-white rounded-2xl p-8 shadow-lg border border-gray-100 h-full">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-green-500 to-emerald-700 bg-clip-text text-transparent">
                  Businesses
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Protect your assets and ensure workplace safety.
                </p>

                <ul className="space-y-3">
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    Employee medical incidents and workplace injuries
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    Theft prevention and asset protection
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    Customer behavior and safety monitoring
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    Professional setup and support included
                  </li>
                </ul>
              </div>
            </div>

            {/* Enterprise Card */}
                 <div className={`group relative ${animatedElements.has("enterprise-card")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
              }`} id='enterprise-card' data-animate>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-200 to-purple-300 rounded-2xl opacity-50"></div>

              <div className="relative bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z"
                      />
                    </svg>
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">
                  Enterprise
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Mission-critical security for large-scale operations.
                </p>

                <ul className="space-y-3">
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                    Healthcare facility patient monitoring and emergencies
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                    Manufacturing safety and equipment monitoring
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                    Large-scale security and compliance monitoring
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                    Custom-trained models and dedicated support
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Testimonials Section */}
      <section className="px-6 py-20 bg-white" >
        <div className="max-w-6xl mx-auto">
          <h2
            className={`text-4xl font-bold text-center text-gray-800 mb-12 transition-all duration-1000 ${animatedElements.has('testimonials-title') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            id="testimonials-title"
            data-animate
          >
            What Our Users Are Saying
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              className={`bg-gray-50 rounded-xl p-6 transition-all duration-1000 delay-300 hover:shadow-lg hover:scale-105 ${animatedElements.has('testimonial-1') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              id="testimonial-1"
              data-animate
            >
              <p className="text-gray-600 mb-4 italic">&quot;Baktrack has completely changed how I think about home security. Instead of just recording break-ins, it actually prevents them. The natural language setup was so easy - I just told it what to watch for.&quot;</p>
              <div className="flex items-center">
                <div className="bg-blue-500 rounded-full w-10 h-10 flex items-center justify-center text-white font-semibold mr-3">S</div>
                <div>
                  <p className="font-semibold">Vijay Patel</p>
                  <p className="text-sm text-gray-500">Convenience Store Owner, Kitchener ON</p>
                </div>
              </div>
            </div>
            <div
              className={`bg-gray-50 rounded-xl p-6 transition-all duration-1000 delay-500 hover:shadow-lg hover:scale-105 ${animatedElements.has('testimonial-2') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              id="testimonial-2"
              data-animate
            >
              <p className="text-gray-600 mb-4 italic">&quot;What impressed me most is how I can shape this system exactly how I want. I told it to watch for unusual activity around my property and it actually understands what I`m asking for.&quot;</p>
              <div className="flex items-center">
                <div className="bg-green-500 rounded-full w-10 h-10 flex items-center justify-center text-white font-semibold mr-3">M</div>
                <div>
                  <p className="font-semibold">Jovian Nakamoto</p>
                  <p className="text-sm text-gray-500">Home Owner, Mississauga ON</p>
                </div>
              </div>
            </div>
            <div
              className={`bg-gray-50 rounded-xl p-6 transition-all duration-1000 delay-700 hover:shadow-lg hover:scale-105 ${animatedElements.has('testimonial-3') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              id="testimonial-3"
              data-animate
            >
              <p className="text-gray-600 mb-4 italic">&quot;After 3 package thefts last month, I was frustrated with neighborhood kids stealing my deliveries. Baktrack now watches my driveway 24/7 and alerts me instantly when packages arrive or if anyone suspicious approaches.&quot;</p>
              <div className="flex items-center">
                <div className="bg-purple-500 rounded-full w-10 h-10 flex items-center justify-center text-white font-semibold mr-3">J</div>
                <div>
                  <p className="font-semibold">Umair Ansari</p>
                  <p className="text-sm text-gray-500">Home Owner, Brampton ON</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="px-6 py-20 bg-gray-50" id="pricing" data-animate>
        <div className="max-w-6xl mx-auto">
          <h2
            className={`text-4xl font-bold text-center text-gray-800 mb-6 transition-all duration-1000 ${animatedElements.has("pricing-title")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
              }`}
            id="pricing-title"
            data-animate
          >
            Choose the Plan That Fits Your Needs
          </h2>
          <p
            className={`text-lg text-center text-gray-600 mb-12 max-w-3xl mx-auto transition-all duration-1000 delay-200 ${animatedElements.has("pricing-subtitle")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
              }`}
            id="pricing-subtitle"
            data-animate
          >
            Whether you&apos;re just starting out or looking to expand your capabilities,
            our plans provide the perfect solution for your security needs.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Individual */}
            <div
              className={`bg-white rounded-xl p-8 shadow-sm border transition-all duration-1000 delay-300 hover:shadow-lg hover:scale-105 ${animatedElements.has("pricing-1")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
                }`}
              id="pricing-1"
              data-animate
            >
              <h3 className="text-2xl font-bold mb-2">Individual</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">Custom</span>
                <span className="text-gray-500">/pricing</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-2">✓</span>
                  Normal analysis
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-2">✓</span>
                  Natural language commands
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-2">✓</span>
                  Customized monitoring hours every day
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-2">✓</span>
                  Customized number of cameras
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-2">✓</span>
                  Fully customizable system
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-2">✓</span>
                  Mobile alerts
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-2">✓</span>
                  Integration with your cameras
                </li>
              </ul>
              <Link href="/ContactUs">
                <button className="w-full bg-gray-800 text-white hover:bg-gray-900 transform hover:scale-105 transition-all duration-300 px-6 py-3 rounded-lg font-semibold">
                  Contact Sales
                </button>
              </Link>
            </div>

            {/* Business */}
            <div
              className={`bg-white rounded-xl p-8 shadow-lg border-2 border-blue-500 relative transition-all duration-1000 delay-500 hover:shadow-xl hover:scale-105 ${animatedElements.has("pricing-2")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
                }`}
              id="pricing-2"
              data-animate
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Business</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">Custom</span>
                <span className="text-gray-500">/pricing</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-2">✓</span>
                  Detailed analysis
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-2">✓</span>
                  Pre-tuned and tested integration
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-2">✓</span>
                  Natural language commands
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-2">✓</span>
                  Customized monitoring hours every day
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-2">✓</span>
                  Customized number of cameras
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-2">✓</span>
                  Mobile alerts
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-2">✓</span>
                  Integration with your cameras
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-2">✓</span>
                  Priority Support
                </li>
              </ul>
              <Link href="/ContactUs">
                <button className="w-full bg-blue-600 text-white hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 px-6 py-3 rounded-lg font-semibold">
                  Contact Sales
                </button>
              </Link>
            </div>

            {/* Enterprise */}
            <div
              className={`bg-white rounded-xl p-8 shadow-sm border transition-all duration-1000 delay-700 hover:shadow-lg hover:scale-105 ${animatedElements.has("pricing-3")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
                }`}
              id="pricing-3"
              data-animate
            >
              <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">Custom</span>
                <span className="text-gray-500">/pricing</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-2">✓</span>
                  Everything in Business
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-2">✓</span>
                  Unlimited cameras
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-2">✓</span>
                  Custom tuned and tested system integration
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-2">✓</span>
                  Dedicated alert system
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-2">✓</span>
                  Business insights
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-2">✓</span>
                  Dedicated support
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-2">✓</span>
                  SLA guarantees
                </li>
              </ul>
              <Link href="/ContactUs">
                <button className="w-full bg-gray-800 text-white hover:bg-gray-900 transform hover:scale-105 transition-all duration-300 px-6 py-3 rounded-lg font-semibold">
                  Contact Sales
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-gray-100 py-20 text-center">
        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          Don`t Wait for the Next Incident
        </h2>

        {/* Button */}
        <a
          href="#"
          className="inline-block bg-gray-800 text-white font-medium px-6 py-3 rounded-lg shadow-md hover:bg-gray-900 transition duration-300"
        >
          Contact Sales
        </a>
      </div>

      {/* <ContactUs /> */}
      {/* Footer */}
      <Footer />

    </div>
  );
}
