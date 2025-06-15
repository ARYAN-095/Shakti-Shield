import React, { useState } from 'react';
import { Home, Map, MessageSquare, User, Shield } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

function BottomNav() {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);
  
  const navItems = [
    { path: "/HomePage", icon: Home, label: "Home" },
    { path: "/map", icon: Map, label: "Safety Map" },
    { path: "/sos", icon: Shield, label: "SOS" },
    { path: "/reviews", icon: MessageSquare, label: "Reviews" },
    { path: "/profile", icon: User, label: "Profile" }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* Floating Navigation Container */}
      <div className="flex justify-center px-4 pb-4">
        <div className="bg-gradient-to-r from-purple-800 to-pink-700 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-2 w-full max-w-lg">
          <div className="flex justify-between items-center">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="flex-1 flex flex-col items-center justify-center py-2 relative group"
                onClick={() => setActiveItem(item.path)}
              >
                <div className={`relative p-3 rounded-full transition-all duration-300 ${
                  activeItem === item.path 
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500 shadow-lg'
                    : 'bg-transparent'
                }`}>
                  <item.icon 
                    className={`w-6 h-6 transition-colors duration-300 ${
                      activeItem === item.path ? 'text-black' : 'text-white'
                    }`} 
                  />
                  
                  {/* Active indicator pulse */}
                  {activeItem === item.path && (
                    <div className="absolute inset-0 rounded-full bg-yellow-500 animate-ping opacity-40"></div>
                  )}
                </div>
                
                {/* Label with slide-up animation */}
                <span className={`absolute -bottom-1 opacity-0 group-hover:opacity-100 group-hover:-translate-y-6 transition-all duration-300 text-xs font-medium ${
                  activeItem === item.path ? 'text-yellow-300' : 'text-purple-200'
                }`}>
                  {item.label}
                </span>
                
                {/* Active indicator bar */}
                <div className={`absolute bottom-0 w-8 h-1 rounded-full transition-all duration-300 ${
                  activeItem === item.path ? 'bg-yellow-400 scale-100' : 'scale-0'
                }`}></div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      {/* Floating SOS Button */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <Link
          to="/sos"
          className="w-16 h-16 rounded-full bg-gradient-to-br from-red-600 to-red-800 shadow-2xl flex items-center justify-center border-4 border-white transform hover:scale-110 transition-transform duration-300"
          onClick={() => setActiveItem("/sos")}
        >
          <Shield className="w-8 h-8 text-white" />
        </Link>
      </div>
    </div>
  );
}

export default BottomNav;