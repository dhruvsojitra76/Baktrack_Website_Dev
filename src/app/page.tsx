'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import './globals.css';
import ContactUs from '@/Components/Contact/ContactUs';
import Header from '@/Components/Header/Header';
import Footer from '@/Components/Footer/Footer';

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
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
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
      {/* Left Navigation Area */}
      {/* <button
        onClick={prevCard}
        className="absolute left-0 top-0 w-20 h-full z-20 flex items-center justify-start pl-4 opacity-0 hover:opacity-100 transition-opacity duration-300"
        aria-label="Previous card"
      >
        <div className="w-10 h-10 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/30 transition-colors">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </div>
      </button> */}

      {/* Right Navigation Area */}
      {/* <button
        onClick={nextCard}
        className="absolute right-0 top-0 w-20 h-full z-20 flex items-center justify-end pr-4 opacity-0 hover:opacity-100 transition-opacity duration-300"
        aria-label="Next card"
      >
        <div className="w-10 h-10 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/30 transition-colors">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </button> */}

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

      {/* Card Indicators */}
      {/* <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {conversations.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentCard(index);
              setIsAutoPlaying(false);
              setTimeout(() => setIsAutoPlaying(true), 8000);
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentCard ? 'bg-white' : 'bg-white/40'
            }`}
          />
        ))}
      </div> */}
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
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 overflow-x-hidden">
      {/* Navigation */}
      <Header scrolled={scrolled} />

      {/* Hero Section - Interactive Neura Style */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 via-purple-50 to-blue-100 px-4 md:px-6 relative overflow-hidden mt-[130px]">
        <div className="max-w-6xl mx-auto text-center z-10">
          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            AI Powered CCTV <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Copilot
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-2xl text-gray-600 mb-10 max-w-2xl md:max-w-3xl mx-auto leading-relaxed">
            Your Personalized Digital Security Guard
          </p>

          {/* CTA Button */}
          <button className="bg-gray-900 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-gray-800 transition-colors duration-300 mb-12 inline-flex items-center gap-2">
            Get started
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>

          {/* Interactive Card Carousel */}
          <InteractiveCardCarousel />

          {/* Industry Focus News Ticker */}
          <IndustryTicker />
        </div>
      </section>


      {/* Problem Agitation Section */}
      <section className="px-6 py-20 bg-gradient-to-b from-blue-100 via-blue-50 to-green-50 relative">
        <div className="max-w-6xl mx-auto text-center">
          <h2
            className={`text-4xl font-bold text-gray-800 mb-6 transition-all duration-1000 ${animatedElements.has('problem-title') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            id="problem-title"
            data-animate
          >
            Your Current Camera System Is Failing You
          </h2>

          <p
            className={`text-lg text-center text-gray-600 mb-16 max-w-4xl mx-auto transition-all duration-1000 delay-200 ${animatedElements.has('problem-subtitle') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            id="problem-subtitle"
            data-animate
          >
            Traditional CCTV systems are reactive, not proactive. By the time you see the footage, the damage is already done.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              className={`bg-white rounded-xl p-8 shadow-lg transition-all duration-1000 delay-300 hover:shadow-xl hover:scale-105 ${animatedElements.has('problem-1') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              id="problem-1"
              data-animate
            >
              <div className="text-6xl mb-4">😭</div>
              <h3 className="text-xl font-bold mb-3 text-red-600">Too Late</h3>
              <p className="text-gray-600">You find out about incidents after they happen. Cry in 1080p later while counting your losses.</p>
            </div>

            <div
              className={`bg-white rounded-xl p-8 shadow-lg transition-all duration-1000 delay-500 hover:shadow-xl hover:scale-105 ${animatedElements.has('problem-2') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              id="problem-2"
              data-animate
            >
              <div className="text-6xl mb-4">⏰</div>
              <h3 className="text-xl font-bold mb-3 text-orange-600">Time Wasted</h3>
              <p className="text-gray-600">Hours spent reviewing footage to find that one important moment. Your time is worth more than this.</p>
            </div>

            <div
              className={`bg-white rounded-xl p-8 shadow-lg transition-all duration-1000 delay-700 hover:shadow-xl hover:scale-105 ${animatedElements.has('problem-3') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              id="problem-3"
              data-animate
            >
              <div className="text-6xl mb-4">💸</div>
              <h3 className="text-xl font-bold mb-3 text-red-600">Damage Done</h3>
              <p className="text-gray-600">Prevention is impossible when your system only records. Stop being a victim of reactive security.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="px-6 py-20 bg-gradient-to-b from-green-50 via-white to-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2
            className={`text-4xl font-bold text-gray-800 mb-6 transition-all duration-1000 ${animatedElements.has('solution-title') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            id="solution-title"
            data-animate
          >
            Meet Your AI Powered Personalized Digital Security Guard
          </h2>

          <p
            className={`text-lg text-center text-gray-600 mb-16 max-w-4xl mx-auto transition-all duration-1000 delay-200 ${animatedElements.has('solution-subtitle') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            id="solution-subtitle"
            data-animate
          >
            Baktrack transforms your existing cameras into intelligent guardians that prevent incidents before they happen.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div
              className={`bg-white rounded-xl p-6 shadow-lg transition-all duration-1000 delay-300 hover:shadow-xl hover:scale-105 ${animatedElements.has('feature-1') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              id="feature-1"
              data-animate
            >
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-3 text-blue-600">Real-Time Detection</h3>
              <p className="text-gray-600">Instant alerts the moment something unusual happens</p>
            </div>

            <div
              className={`bg-white rounded-xl p-6 shadow-lg transition-all duration-1000 delay-500 hover:shadow-xl hover:scale-105 ${animatedElements.has('feature-2') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              id="feature-2"
              data-animate
            >
              <div className="text-4xl mb-4">🗣️</div>
              <h3 className="text-xl font-semibold mb-3 text-green-600">Natural Language Setup</h3>
              <p className="text-gray-600">Just tell it what to watch for in plain English</p>
            </div>

            <div
              className={`bg-white rounded-xl p-6 shadow-lg transition-all duration-1000 delay-700 hover:shadow-xl hover:scale-105 ${animatedElements.has('feature-3') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              id="feature-3"
              data-animate
            >
              <div className="text-4xl mb-4">🔮</div>
              <h3 className="text-xl font-semibold mb-3 text-purple-600">Predictive Intelligence</h3>
              <p className="text-gray-600">Spots patterns and prevents incidents before they escalate</p>
            </div>

            <div
              className={`bg-white rounded-xl p-6 shadow-lg transition-all duration-1000 delay-900 hover:shadow-xl hover:scale-105 ${animatedElements.has('feature-4') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              id="feature-4"
              data-animate
            >
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="text-xl font-semibold mb-3 text-purple-600">Intelligent Self Learning</h3>
              <p className="text-gray-600">Learns, adapts, improves from user&apos;s feedback realtime</p>
            </div>
          </div>
        </div>
      </section>

      {/* How Baktrack Works Section - Scroll-Triggered Chat */}
      {/* <section className="py-20 bg-gradient-to-b from-gray-50 to-blue-50" id="how-it-works">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How Baktrack Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how easy it is to set up intelligent security monitoring
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto space-y-8">
            

            <div 
              className={`transition-all duration-1000 ${
                animatedElements.has('chat-msg-1') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              id="chat-msg-1"
              data-animate
            >
              <div className="flex items-start space-x-3 justify-start">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-semibold">B</span>
                </div>
                <div className="bg-gray-100 rounded-2xl px-4 py-3 max-w-sm shadow-sm">
                  <p className="text-gray-800">Hello, Baktrack is now connected with your cameras 📹</p>
                </div>
              </div>
            </div>

 
            <div 
              className={`transition-all duration-1000 delay-300 ${
                animatedElements.has('chat-msg-2') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              id="chat-msg-2"
              data-animate
            >
              <div className="flex items-start space-x-3 justify-start">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-semibold">B</span>
                </div>
                <div className="bg-gray-100 rounded-2xl px-4 py-3 max-w-sm shadow-sm">
                  <p className="text-gray-800">What do you want me to detect today?</p>
                </div>
              </div>
            </div>

            
            <div 
              className={`transition-all duration-1000 delay-600 ${
                animatedElements.has('chat-msg-3') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              id="chat-msg-3"
              data-animate
            >
              <div className="flex items-start space-x-3 justify-end">
                <div className="bg-blue-600 rounded-2xl px-4 py-3 max-w-sm shadow-sm">
                  <p className="text-white">Can you look after my grandma? She is old and I want you to make sure of her safety</p>
                </div>
                <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-semibold">U</span>
                </div>
              </div>
            </div>

           
            <div 
              className={`transition-all duration-1000 delay-900 ${
                animatedElements.has('chat-msg-4') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              id="chat-msg-4"
              data-animate
            >
              <div className="flex items-start space-x-3 justify-start">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-semibold">B</span>
                </div>
                <div className="bg-gray-100 rounded-2xl px-4 py-3 max-w-sm shadow-sm">
                  <p className="text-gray-800">Don&apos;t worry about it, I will make sure of her safety and keep you updated.</p>
                </div>
              </div>
            </div>

           
            <div 
              className={`transition-all duration-1000 delay-1200 ${
                animatedElements.has('chat-msg-5') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              id="chat-msg-5"
              data-animate
            >
              <div className="flex items-start space-x-3 justify-end">
                <div className="bg-blue-600 rounded-2xl px-4 py-3 max-w-sm shadow-sm">
                  <p className="text-white">Also she is an asthma patient. Especially if you see her struggling to find her inhaler, tell me right away so I can send help.</p>
                </div>
                <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-semibold">U</span>
                </div>
              </div>
            </div>

          
            <div 
              className={`transition-all duration-1000 delay-1500 ${
                animatedElements.has('chat-msg-6') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              id="chat-msg-6"
              data-animate
            >
              <div className="flex items-start space-x-3 justify-start">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-semibold">B</span>
                </div>
                <div className="bg-gray-100 rounded-2xl px-4 py-3 max-w-sm shadow-sm">
                  <p className="text-gray-800">Got it! Let me know anytime if you want to add something.</p>
                </div>
              </div>
            </div>

           
            <div 
              className={`transition-all duration-1000 delay-1800 ${
                animatedElements.has('chat-msg-7') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              id="chat-msg-7"
              data-animate
            >
              <div className="flex items-start space-x-3 justify-start">
                <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-semibold">🚨</span>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-2xl px-4 py-3 max-w-sm shadow-sm">
                  <p className="text-red-800 font-semibold mb-2">Alert 🚨 Alert 🚨 Alert 🚨</p>
                  <p className="text-red-700 mb-3">Event Detected</p>
                  <Image src="/canava.png" alt="Elderly woman having breathing difficulty" width={300} height={200} className="w-full rounded-lg mb-3" />
                  <div className="text-sm text-red-600">
                    <p><strong>Date:</strong> March 15, 2024</p>
                    <p><strong>Time:</strong> 2:47 PM</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section> */}

      {/* Enterprise Scale Section */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2
              className={`text-4xl md:text-5xl font-bold text-gray-900 mb-6 transition-all duration-1000 ${animatedElements.has('enterprise-title') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              id="enterprise-title"
              data-animate
            >
              Every Camera Gets Its Own Brain
            </h2>
            <p
              className={`text-xl text-gray-600 max-w-3xl mx-auto transition-all duration-1000 delay-200 ${animatedElements.has('enterprise-subtitle') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              id="enterprise-subtitle"
              data-animate
            >
              Scale from 1 to 1000+ cameras with enterprise-grade intelligence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div
              className={`text-center transition-all duration-1000 delay-300 ${animatedElements.has('enterprise-1') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              id="enterprise-1"
              data-animate
            >
              <div className="text-5xl font-bold text-blue-600 mb-2">∞</div>
              <h3 className="text-xl font-semibold mb-2">Unlimited Scale</h3>
              <p className="text-gray-600">From single camera to enterprise deployments</p>
            </div>

            <div
              className={`text-center transition-all duration-1000 delay-500 ${animatedElements.has('enterprise-2') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              id="enterprise-2"
              data-animate
            >
              <div className="text-5xl font-bold text-green-600 mb-2">0.3s</div>
              <h3 className="text-xl font-semibold mb-2">Response Time</h3>
              <p className="text-gray-600">Lightning-fast threat detection and alerts</p>
            </div>

            <div
              className={`text-center transition-all duration-1000 delay-700 ${animatedElements.has('enterprise-3') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              id="enterprise-3"
              data-animate
            >
              <div className="text-5xl font-bold text-purple-600 mb-2">24/7</div>
              <h3 className="text-xl font-semibold mb-2">Always Watching</h3>
              <p className="text-gray-600">Continuous monitoring without fatigue</p>
            </div>

            <div
              className={`text-center transition-all duration-1000 delay-900 ${animatedElements.has('enterprise-4') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              id="enterprise-4"
              data-animate
            >
              <div className="text-5xl font-bold text-orange-600 mb-2">0</div>
              <h3 className="text-xl font-semibold mb-2">Cognitive Overload</h3>
              <p className="text-gray-600">AI handles complexity, you get simple alerts</p>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audiences Section */}
      <section className="px-6 py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <h2
            className={`text-4xl font-bold text-center text-gray-800 mb-12 transition-all duration-1000 ${animatedElements.has('audiences-title') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            id="audiences-title"
            data-animate
          >
            Trusted by Forward-Thinking Users
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Individual User Card */}
            <div
              className={`group relative transition-all duration-1000 delay-300 ${animatedElements.has('audience-1') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              id="audience-1"
              data-animate
            >
              {/* Subtle Border */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-200 to-blue-300 rounded-2xl opacity-50 group-hover:opacity-75 transition duration-500"></div>

              {/* Card */}
              <div className="relative bg-white rounded-2xl p-8 shadow-lg border border-gray-100 transform transition-all duration-500 group-hover:scale-105 group-hover:-rotate-1 group-hover:shadow-xl">
                {/* Icon */}
                <div className="mb-6 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-4 text-blue-600">
                  Individual User
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">Peace of mind for your family with intelligent home monitoring.</p>

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
            <div
              className={`group relative transition-all duration-1000 delay-500 ${animatedElements.has('audience-2') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              id="audience-2"
              data-animate
            >
              {/* Subtle Border */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-green-200 to-green-300 rounded-2xl opacity-50 group-hover:opacity-75 transition duration-500"></div>

              {/* Card */}
              <div className="relative bg-white rounded-2xl p-8 shadow-lg border border-gray-100 transform transition-all duration-500 group-hover:scale-105 group-hover:rotate-1 group-hover:shadow-xl">
                {/* Icon */}
                <div className="mb-6 transform transition-all duration-500 group-hover:scale-110 group-hover:-rotate-12">
                  <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-4 text-green-600">
                  Businesses
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">Protect your assets and ensure workplace safety.</p>

                {/* Use Cases + Feature */}
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
            <div
              className={`group relative transition-all duration-1000 delay-700 ${animatedElements.has('audience-3') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              id="audience-3"
              data-animate
            >
              {/* Subtle Border */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-200 to-purple-300 rounded-2xl opacity-50 group-hover:opacity-75 transition duration-500"></div>

              {/* Card */}
              <div className="relative bg-white rounded-2xl p-8 shadow-lg border border-gray-100 transform transition-all duration-500 group-hover:scale-105 group-hover:-rotate-1 group-hover:shadow-xl">
                {/* Icon */}
                <div className="mb-6 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
                  <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z" />
                    </svg>
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-4 text-purple-600">
                  Enterprise
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">Mission-critical security for large-scale operations.</p>

                {/* Use Cases + Feature */}
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
      <section className="px-6 py-20 bg-white">
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
                  <p className="font-semibold">Sarah Mitchell</p>
                  <p className="text-sm text-gray-500">Homeowner</p>
                </div>
              </div>
            </div>
            <div
              className={`bg-gray-50 rounded-xl p-6 transition-all duration-1000 delay-500 hover:shadow-lg hover:scale-105 ${animatedElements.has('testimonial-2') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              id="testimonial-2"
              data-animate
            >
              <p className="text-gray-600 mb-4 italic">&quot;We&apos;ve prevented three potential liability incidents in just two months. Baktrack spotted slip hazards and safety violations before they became problems. It&apos;s like having a safety manager that never sleeps.&quot;</p>
              <div className="flex items-center">
                <div className="bg-green-500 rounded-full w-10 h-10 flex items-center justify-center text-white font-semibold mr-3">M</div>
                <div>
                  <p className="font-semibold">Mike Rodriguez</p>
                  <p className="text-sm text-gray-500">Restaurant Owner</p>
                </div>
              </div>
            </div>
            <div
              className={`bg-gray-50 rounded-xl p-6 transition-all duration-1000 delay-700 hover:shadow-lg hover:scale-105 ${animatedElements.has('testimonial-3') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              id="testimonial-3"
              data-animate
            >
              <p className="text-gray-600 mb-4 italic">&quot;The predictive capabilities are incredible. Baktrack identified equipment overheating patterns that could have led to a major fire. It&apos;s not just monitoring - it&apos;s intelligent prevention.&quot;</p>
              <div className="flex items-center">
                <div className="bg-purple-500 rounded-full w-10 h-10 flex items-center justify-center text-white font-semibold mr-3">J</div>
                <div>
                  <p className="font-semibold">Jennifer Chen</p>
                  <p className="text-sm text-gray-500">Warehouse Manager</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="px-6 py-20 bg-gray-50" id="pricing">
        <div className="max-w-6xl mx-auto">
          <h2
            className={`text-4xl font-bold text-center text-gray-800 mb-6 transition-all duration-1000 ${animatedElements.has('pricing-title') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            id="pricing-title"
            data-animate
          >
            Choose the Plan That Fits Your Needs
          </h2>
          <p
            className={`text-lg text-center text-gray-600 mb-12 max-w-3xl mx-auto transition-all duration-1000 delay-200 ${animatedElements.has('pricing-subtitle') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            id="pricing-subtitle"
            data-animate
          >
            Whether you&apos;re just starting out or looking to expand your capabilities, our plans provide the perfect solution for your security needs.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              className={`bg-white rounded-xl p-8 shadow-sm border transition-all duration-1000 delay-300 hover:shadow-lg hover:scale-105 ${animatedElements.has('pricing-1') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              id="pricing-1"
              data-animate
            >
              <h3 className="text-2xl font-bold mb-2">Individual</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">$29</span>
                <span className="text-gray-500">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-2">✓</span>
                  Natural language commands
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-2">✓</span>
                  Up to 4 cameras
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-2">✓</span>
                  Basic incident detection
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-2">✓</span>
                  Mobile alerts
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-2">✓</span>
                  Self-service setup
                </li>
              </ul>
              <button className="w-full bg-gray-800 text-white hover:bg-gray-900 transform hover:scale-105 transition-all duration-300 px-6 py-3 rounded-lg font-semibold">Start Free Trial</button>
            </div>

            <div
              className={`bg-white rounded-xl p-8 shadow-lg border-2 border-blue-500 relative transition-all duration-1000 delay-500 hover:shadow-xl hover:scale-105 ${animatedElements.has('pricing-2') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              id="pricing-2"
              data-animate
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">Most Popular</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Business</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">$99</span>
                <span className="text-gray-500">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-2">✓</span>
                  Everything in Individual
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-2">✓</span>
                  Up to 20 cameras
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-2">✓</span>
                  Advanced analytics
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-2">✓</span>
                  Priority support
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-2">✓</span>
                  Custom integrations
                </li>
              </ul>
              <button className="w-full bg-blue-600 text-white hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 px-6 py-3 rounded-lg font-semibold">Start Free Trial</button>
            </div>

            <div
              className={`bg-white rounded-xl p-8 shadow-sm border transition-all duration-1000 delay-700 hover:shadow-lg hover:scale-105 ${animatedElements.has('pricing-3') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              id="pricing-3"
              data-animate
            >
              <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">Custom</span>
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
                  Custom AI models
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-2">✓</span>
                  Dedicated support
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-2">✓</span>
                  On-premise deployment
                </li>
              </ul>
              <button className="w-full bg-gray-800 text-white hover:bg-gray-900 transform hover:scale-105 transition-all duration-300 px-6 py-3 rounded-lg font-semibold">Contact Sales</button>
            </div>
          </div>
        </div>
      </section>
      {/* <ContactUs /> */}
      {/* Footer */}
      <Footer/>
      {/* <footer className="bg-gray-900 text-gray-300 px-6 py-12" id="contact">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Image src="/baktrack_logo_large.svg" alt="Baktrack" width={32} height={32} className="h-8 w-auto mr-2" />
              <span className="text-white font-bold text-xl">Baktrack</span>
            </div>
            <p className="text-sm mb-4">AI-powered security that prevents incidents before they happen.</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                </svg>
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-gray-800 text-center text-sm">
          <p>&copy; 2025. All rights reserved. Baktrack</p>
        </div>
      </footer> */}
    </div>
  );
}
