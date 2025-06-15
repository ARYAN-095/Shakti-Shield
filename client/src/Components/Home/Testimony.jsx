import React, { useEffect, useState } from "react";
import TestimonialCard from "../TestimonyCard";

/**
 * Testimony Section
 * Displays rotating testimonials with animated background shapes.
 */
function Testimony() {
  const testimonials = [
    { name: 'Alice Dorman',   content: '“Shakti Shield saved me when I felt unsafe. The SOS feature works instantly!”' },
    { name: 'John Smith',     content: '“I love the community map—always know where safe zones are nearby.”' },
    { name: 'Emma Wilson',    content: '“Managing emergency contacts is so easy and reassuring.”' },
    { name: 'Michael Brown',  content: '“The usability and design make me feel protected at all times.”' }
  ];

  // Simple carousel state
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const iv = setInterval(() => {
      setCurrent(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(iv);
  }, [testimonials.length]);

  return (
    <section className="relative overflow-hidden py-16 bg-gradient-to-r from-pink-100 via-purple-50 to-blue-100">
      {/* Animated blobs */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-20 right-20 w-56 h-56 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>

      <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
        <h2 className="text-4xl font-extrabold text-pink-600 mb-6 drop-shadow-md">
          What Our Users Say
        </h2>
        <div className="relative">
          {/* Background pattern */}
          <img 
            src="/background.svg" 
            alt="Testimonial Pattern" 
            className="absolute inset-0 w-full h-full object-cover opacity-10"
          />

          {/* Carousel wrapper */}
          <div className="flex items-center justify-center">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className={`transition-transform duration-700 ${
                  idx === current ? 'translate-x-0 opacity-100' : idx < current ? '-translate-x-full opacity-0' : 'translate-x-full opacity-0'
                } absolute w-full`}
              >
                <TestimonialCard name={t.name} content={t.content} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Carousel dots */}
      <div className="relative z-10 flex justify-center space-x-2 mt-12">
        {testimonials.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full transition-colors ${
              idx === current ? 'bg-pink-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>

      {/* Blob animations */}
      <style jsx global>{`
        @keyframes blob {
          0%,100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(30px,-50px) scale(1.1); }
          66% { transform: translate(-20px,20px) scale(0.9); }
        }
        .animate-blob { animation: blob 8s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
      `}</style>
    </section>
  );
}

export default Testimony;
