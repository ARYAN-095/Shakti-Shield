import React from 'react';
import { FaInstagram, FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <footer className="relative bg-gradient-to-t from-blue-200 via-purple-200 to-pink-200 pt-16 pb-8 overflow-hidden">
      {/* Animated decorative blobs */}
      <div className="absolute bottom-0 left-0 w-56 h-56 bg-pink-300 rounded-full mix-blend-multiply filter blur-2xl animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-10 right-10 w-48 h-48 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl animate-blob animation-delay-4000"></div>

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About */}
        <div className="space-y-4">
          <img src="/logo.jpeg" alt="Shakti Shield Logo" className="h-12 w-12 rounded-full shadow-lg" />
          <p className="text-gray-700 font-light">
            Shakti Shield is your companion in safety — empowering women to feel secure, confident, and connected.
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-pink-600">Quick Links</h3>
          <a href="/HomePage" className="block text-gray-600 hover:text-pink-600 transition">Home</a>
          <a href="/reviews" className="block text-gray-600 hover:text-pink-600 transition">Reviews</a>
          <a href="/profile" className="block text-gray-600 hover:text-pink-600 transition">Profile</a>
          <a href="/settings" className="block text-gray-600 hover:text-pink-600 transition">Settings</a>
        </div>

        {/* Newsletter & Social */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-pink-600">Stay Connected</h3>
          <div className="flex space-x-2">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 p-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
            <button className="px-4 py-2 bg-pink-600 text-white rounded-full font-semibold hover:bg-pink-700 transition">
              Subscribe
            </button>
          </div>
          <div className="flex space-x-4 mt-2">
            <FaInstagram className="h-6 w-6 text-pink-600 hover:text-pink-700 transition cursor-pointer" />
            <FaFacebook className="h-6 w-6 text-blue-600 hover:text-blue-700 transition cursor-pointer" />
            <FaLinkedin className="h-6 w-6 text-purple-600 hover:text-purple-700 transition cursor-pointer" />
            <FaTwitter className="h-6 w-6 text-cyan-500 hover:text-cyan-600 transition cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="relative z-10 max-w-6xl mx-auto mt-12 border-t border-gray-300"></div>

      {/* Legal */}
      <div className="relative z-10 max-w-6xl mx-auto mt-6 px-4 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm space-y-2 md:space-y-0">
        <div className="flex space-x-4">
          <a href="/terms" className="hover:underline">Terms of Service</a>
          <a href="/privacy" className="hover:underline">Privacy Policy</a>
          <a href="/disclaimer" className="hover:underline">Disclaimer</a>
        </div>
        <p>© 2025 Shakti Shield. All rights reserved.</p>
      </div>

      {/* Blob animations keyframes */}
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
    </footer>
  );
}

export default Footer;
