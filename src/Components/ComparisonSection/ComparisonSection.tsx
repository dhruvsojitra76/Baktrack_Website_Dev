// import React from "react";

// const ComparisonSection = () => {
//     return (
//         <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 via-white to-blue-50 px-6 py-12">
//             {/* Heading */}
//             <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
//                 Traditional Object Detection vs. Baktrack: What Sets Us Apart
//             </h1>
//             <p className="mt-3 text-gray-600 text-center max-w-2xl">
//                 Most CCTV systems use basic object detection. Here`s why that`s not enough.
//             </p>

//             {/* Cards Section */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 w-full max-w-6xl">
//                 {/* Traditional Object Detection */}
//                 <div className="p-[16px] rounded-2xl bg-gradient-to-r from-blue-400 to-blue-600 animate-fadeIn">
//                     <div className="bg-white text-black rounded-2xl shadow-lg h-full p-8">
//                         <div className="flex justify-center">
//                             <div className="bg-blue-300/20 p-4 rounded-full">
//                                 <span className="text-2xl">🚨</span>
//                             </div>
//                         </div>
//                         <h2 className="text-xl font-semibold text-center mt-4">
//                             Traditional Object Detection
//                         </h2>
//                         <p className="text-center text-sm opacity-80">`Limited & Unreliable`</p>

//                         <h3 className="mt-6 font-semibold">❌ PROBLEMS:</h3>
//                         <ul className="mt-3 space-y-2 text-sm">
//                             <li>• Detects only specific pre-trained objects</li>
//                             <li>• No understanding of context or intention</li>
//                             <li>• High false positives (e.g., bag-like objects detected as bags)</li>
//                             <li>• Misses new variations (different looking backpacks)</li>
//                             <li>• Simple motion alerts with no intelligence</li>
//                             <li>• Pre-programmed logic - can`t adapt</li>
//                         </ul>

//                         <div className="mt-6 bg-blue-300/20 p-4 rounded-lg text-sm">
//                             💡 <b>Example:</b> <br />
//                             `Trained on 10,000 backpack images → confused by new backpack design OR
//                             detects pillow as backpack (false positive)`
//                         </div>
//                     </div>
//                 </div>

//                 {/* Baktrack Intelligence */}
//                <div className="p-[16px] rounded-2xl bg-gradient-to-r from-purple-400 to-purple-600 animate-fadeIn">
//                     <div className="bg-white text-black rounded-2xl shadow-lg h-full p-8">
//                     <div className="flex justify-center">
//                         <div className="bg-purple-300/20 p-4 rounded-full">
//                             <span className="text-2xl">🧠</span>
//                         </div>
//                     </div>
//                     <h2 className="text-xl font-semibold text-center mt-4">
//                         Baktrack Intelligence
//                     </h2>
//                     <p className="text-center text-sm opacity-80">`Context-Aware & Adaptive`</p>

//                     <h3 className="mt-6 font-semibold">✅ ADVANTAGES:</h3>
//                     <ul className="mt-3 space-y-2 text-sm">
//                         <li>• Understands whole frame context</li>
//                         <li>• Analyzes spatio-temporal data</li>
//                         <li>• Recognizes intentions and actions</li>
//                         <li>• Learns from previous frames</li>
//                         <li>• Significantly higher accuracy</li>
//                         <li>• Adapts to new situations</li>
//                     </ul>

//                     <div className="mt-6 bg-purple-300/20 p-4 rounded-lg text-sm">
//                         💡 <b>Example:</b> <br />
//                         `Sees person + backpack + nervous behavior + restricted area →
//                         `Suspicious activity detected` (not just `backpack detected`)`
//                     </div>
//                 </div>
//             </div>
//             </div>
//              <style>{`
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(15px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-fadeIn {
//           opacity: 0;
//           animation: fadeIn 0.8s ease forwards;
//         }
//       `}</style>
//         </div>
//     );
// };

// export default ComparisonSection;
import React, { useEffect, useRef, useState } from "react";

const FadeInOnScroll = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target); // trigger once
          }
        });
      },
      { threshold: 0.2 } // 20% visible
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {children}
    </div>
  );
};

const ComparisonSection = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 via-white to-blue-50 px-6 py-12">
      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
        Traditional Object Detection vs. Baktrack: What Sets Us Apart
      </h1>
      <p className="mt-3 text-gray-600 text-center max-w-2xl">
        Most CCTV systems use basic object detection. Here`s why that`s not enough.
      </p>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 w-full max-w-6xl">
        {/* Traditional Object Detection */}
        <FadeInOnScroll>
          <div className="p-[16px] rounded-2xl bg-gradient-to-r from-blue-400 to-blue-600">
            <div className="bg-white text-black rounded-2xl shadow-lg h-full p-8">
              <div className="flex justify-center">
                <div className="bg-blue-300/20 p-4 rounded-full">
                  <span className="text-2xl">🚨</span>
                </div>
              </div>
              <h2 className="text-xl font-semibold text-center mt-4">
                Traditional Object Detection
              </h2>
              <p className="text-center text-sm opacity-80">`Limited & Unreliable`</p>

              <h3 className="mt-6 font-semibold">❌ PROBLEMS:</h3>
              <ul className="mt-3 space-y-2 text-sm">
                <li>• Detects only specific pre-trained objects</li>
                <li>• No understanding of context or intention</li>
                <li>• High false positives (e.g., bag-like objects detected as bags)</li>
                <li>• Misses new variations (different looking backpacks)</li>
                <li>• Simple motion alerts with no intelligence</li>
                <li>• Pre-programmed logic - can`t adapt</li>
              </ul>

              <div className="mt-6 bg-blue-300/20 p-4 rounded-lg text-sm">
                💡 <b>Example:</b> <br />
                `Trained on 10,000 backpack images → confused by new backpack design OR
                detects pillow as backpack (false positive)`
              </div>
            </div>
          </div>
        </FadeInOnScroll>

        {/* Baktrack Intelligence */}
        <FadeInOnScroll>
          <div className="p-[16px] rounded-2xl bg-gradient-to-r from-purple-400 to-purple-600">
            <div className="bg-white text-black rounded-2xl shadow-lg h-full p-8">
              <div className="flex justify-center">
                <div className="bg-purple-300/20 p-4 rounded-full">
                  <span className="text-2xl">🧠</span>
                </div>
              </div>
              <h2 className="text-xl font-semibold text-center mt-4">
                Baktrack Intelligence
              </h2>
              <p className="text-center text-sm opacity-80">`Context-Aware & Adaptive`</p>

              <h3 className="mt-6 font-semibold">✅ ADVANTAGES:</h3>
              <ul className="mt-3 space-y-2 text-sm">
                <li>• Understands whole frame context</li>
                <li>• Analyzes spatio-temporal data</li>
                <li>• Recognizes intentions and actions</li>
                <li>• Learns from previous frames</li>
                <li>• Significantly higher accuracy</li>
                <li>• Adapts to new situations</li>
              </ul>

              <div className="mt-6 bg-purple-300/20 p-4 rounded-lg text-sm">
                💡 <b>Example:</b> <br />
                `Sees person + backpack + nervous behavior + restricted area →
                `Suspicious activity detected` (not just `backpack detected`)`
              </div>
            </div>
          </div>
        </FadeInOnScroll>
      </div>
    </div>
  );
};

export default ComparisonSection;
