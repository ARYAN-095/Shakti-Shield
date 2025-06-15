import React from 'react';
import Testimony from './Testimony';
import Footer from '../Footer';

function HeroSection() {
  return (
    <section className="w-full bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 pb-16 overflow-hidden">
      {/* Hero Banner */}
      <div className="relative flex flex-col items-center text-center pt-20 px-4">
        {/* Decorative animated blobs */}
        <div className="absolute top-0 left-0 w-48 h-48 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-10 right-10 w-56 h-56 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>

        {/* Logo & Title */}
        <div className="relative z-10 flex items-center space-x-4 mb-6">
          <img src="/logo.jpeg" alt="Shakti Shield Logo" className="h-16 w-16 rounded-full shadow-lg" />
          <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg">
            Shakti Shield
          </h1>
        </div>

        {/* Tagline */}
        <p className="relative z-10 max-w-2xl text-xl md:text-2xl text-white font-light mb-8">
          Empowering Safety, Anytime, Anywhere
        </p>

        {/* Call to Action Buttons */}
        <div className="relative z-10 flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => window.location.replace('/register')}
            className="px-8 py-3 bg-white text-pink-600 font-semibold rounded-full shadow-lg hover:scale-105 transform transition"
          >
            Get Started
          </button>
          <button
            onClick={() => window.location.replace('/HomePage')}
            className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-full shadow-lg hover:bg-white hover:text-pink-600 transform transition"
          >
            Learn More
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 mt-20 px-4 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {[
          {
            icon: '/icons/location.svg',
            title: 'Live Location Share',
            desc: 'Share your real-time location with trusted contacts at the press of a button.',
          },
          {
            icon: '/icons/alert.svg',
            title: 'Instant Alerts',
            desc: 'Send emergency SMS & email alerts automatically when you feel unsafe.',
          },
          {
            icon: '/icons/contacts.svg',
            title: 'Trusted Network',
            desc: 'Manage a personalized list of emergency contacts for quick access.',
          },
        ].map((feat, i) => (
          <div
            key={i}
            className="bg-white bg-opacity-80 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition"
          >
            <img src={feat.icon} alt={feat.title} className="h-12 w-12 mb-4" />
            <h3 className="text-xl font-bold text-pink-600 mb-2">
              {feat.title}
            </h3>
            <p className="text-gray-700 font-light">
              {feat.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Testimonial Carousel */}
      <div className="relative z-10 mt-20 px-4">
        <Testimony />
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-20">
        <Footer />
      </div>

      {/* Blob keyframes */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 8s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
}

export default HeroSection;
