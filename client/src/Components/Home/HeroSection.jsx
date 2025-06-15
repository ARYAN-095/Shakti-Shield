import React, { useEffect } from 'react';
import Testimony from './Testimony';
import Footer from '../Footer';

function HeroSection() {
  useEffect(() => {
    // Create floating shield animation effect
    const shields = document.querySelectorAll('.floating-shield');
    shields.forEach(shield => {
      shield.style.animation = `floatAnimation ${Math.random() * 3 + 3}s infinite ease-in-out`;
    });
  }, []);

  const features = [
    {
      icon: '🔔',
      title: 'Instant SOS Alerts',
      description: 'One-tap emergency notification to trusted contacts'
    },
    {
      icon: '📍',
      title: 'Live Location Tracking',
      description: 'Real-time position sharing with loved ones'
    },
    {
      icon: '🛡️',
      title: 'Safety Network',
      description: 'Connect with your personal security circle'
    },
    {
      icon: '📱',
      title: 'Discreet Alerts',
      description: 'Silent notifications when in danger'
    }
  ];

  return (
    <div className="w-full min-h-screen overflow-hidden bg-gradient-to-br from-purple-900 via-fuchsia-700 to-rose-600">
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div 
            key={i}
            className="absolute floating-shield"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `scale(${Math.random() * 0.5 + 0.5}) rotate(${Math.random() * 360}deg)`,
              opacity: Math.random() * 0.3 + 0.1,
              animationDelay: `${Math.random() * 2}s`
            }}
          >
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="0.5">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Branding & Tagline */}
        <div className="text-center mb-16 animate-fade-in-down">
          <div className="flex justify-center mb-6">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full animate-pulse">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-20 h-20 rounded-full flex items-center justify-center shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-4 animate-fade-in">
            Shakti Shield
          </h1>
          
          <div className="inline-block relative">
            <h2 className="text-2xl md:text-3xl font-semibold text-yellow-300 tracking-wide bg-black/30 px-6 py-3 rounded-full animate-pulse-slow">
              Empowering Safety, Anytime, Anywhere
            </h2>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4/5 h-1 bg-yellow-400 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20 animate-fade-in-up">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2 shadow-lg"
            >
              <div className="text-4xl mb-4 text-yellow-300">{feature.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-purple-100">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* App Showcase */}
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-20">
          <div className="lg:w-1/2 animate-slide-in-left">
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-4">Your Safety, In Your Hands</h3>
                <p className="text-purple-100 mb-6">
                  Shakti Shield is more than an app - it's a movement. We empower women with technology that provides immediate assistance, community support, and peace of mind wherever you go.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-full font-bold hover:from-purple-700 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                    Watch Demo
                  </button>
                  <button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-6 py-3 rounded-full font-bold hover:from-yellow-600 hover:to-orange-600 transition-all transform hover:scale-105 shadow-lg flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Download App
                  </button>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-12 h-12 rounded-full bg-yellow-400 animate-ping opacity-30"></div>
              <div className="absolute -bottom-4 -left-4 w-8 h-8 rounded-full bg-pink-500 animate-ping opacity-20"></div>
            </div>
          </div>
          
          <div className="lg:w-1/2 flex justify-center animate-slide-in-right">
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-800 to-pink-700 rounded-[40px] p-6 shadow-2xl w-64 h-[520px] relative overflow-hidden border-8 border-black/30">
                <div className="absolute top-0 left-0 w-full h-8 bg-black/50 rounded-t-[32px]"></div>
                <div className="mt-10 px-4">
                  <div className="flex justify-center mb-8">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white text-center mb-6">Shakti Shield Activated</h3>
                  
                  <div className="space-y-4">
                    <div className="bg-white/10 rounded-xl p-3 flex items-center">
                      <div className="bg-purple-500 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white">👤</span>
                      </div>
                      <div>
                        <p className="text-sm text-white font-medium">Safety Network</p>
                        <p className="text-xs text-purple-200">5 contacts connected</p>
                      </div>
                    </div>
                    
                    <div className="bg-white/10 rounded-xl p-3 flex items-center">
                      <div className="bg-pink-500 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white">📍</span>
                      </div>
                      <div>
                        <p className="text-sm text-white font-medium">Location Sharing</p>
                        <p className="text-xs text-purple-200">Active for 2 hours</p>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-xl p-3 mt-8 text-center">
                      <p className="text-white font-bold">SOS Ready</p>
                    </div>
                  </div>
                </div>
                
                {/* App screen decorative elements */}
                <div className="absolute bottom-4 left-0 w-full px-4">
                  <div className="h-1 bg-white/20 rounded-full mx-auto w-32"></div>
                </div>
              </div>
              
              {/* Glow effect */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-500 rounded-full filter blur-[100px] opacity-30 animate-pulse-slow"></div>
            </div>
          </div>
        </div>

        {/* Testimony Section */}
        <div className="mb-20 animate-fade-in">
          <Testimony />
        </div>

        {/* Empowerment Section */}
        <div className="bg-gradient-to-r from-purple-800 to-pink-700 rounded-3xl p-8 md:p-12 text-center mb-20 border border-white/20 shadow-2xl animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Join the Movement</h2>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-8">
            Every woman deserves to feel safe and empowered. Shakti Shield is building a global community dedicated to creating safer spaces for women everywhere.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl w-48 hover:bg-white/20 transition-all duration-300">
              <div className="text-5xl mb-4">🌍</div>
              <p className="text-white font-bold">500K+</p>
              <p className="text-purple-200">Users Worldwide</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl w-48 hover:bg-white/20 transition-all duration-300">
              <div className="text-5xl mb-4">🛡️</div>
              <p className="text-white font-bold">24/7</p>
              <p className="text-purple-200">Safety Monitoring</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl w-48 hover:bg-white/20 transition-all duration-300">
              <div className="text-5xl mb-4">❤️</div>
              <p className="text-white font-bold">98%</p>
              <p className="text-purple-200">User Satisfaction</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Global Styles for Animations */}
      <style jsx global>{`
        @keyframes floatAnimation {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        
        @keyframes pulse-slow {
          0% { opacity: 0.8; }
          50% { opacity: 1; }
          100% { opacity: 0.8; }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s infinite;
        }
        
        .animate-fade-in-down {
          animation: fadeInDown 1s ease-out;
        }
        
        @keyframes fadeInDown {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 1.5s ease-out;
        }
        
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out;
        }
        
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slide-in-left {
          animation: slideInLeft 1s ease-out;
        }
        
        @keyframes slideInLeft {
          0% {
            opacity: 0;
            transform: translateX(-50px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-slide-in-right {
          animation: slideInRight 1s ease-out;
        }
        
        @keyframes slideInRight {
          0% {
            opacity: 0;
            transform: translateX(50px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}

export default HeroSection;