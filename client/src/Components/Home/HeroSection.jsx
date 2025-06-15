import React, { useState, useEffect } from 'react';
import Testimony from './Testimony';

function HeroSection() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [mapData, setMapData] = useState([]);
  const [userPosition, setUserPosition] = useState({ x: 50, y: 50 });

  // Safety features data
  const features = [
    {
      title: "Emergency SOS",
      description: "Instant alert to authorities and trusted contacts",
      icon: "🆘"
    },
    {
      title: "Safety Map",
      description: "Real-time view of safe zones and resources nearby",
      icon: "📍"
    },
    {
      title: "Community Watch",
      description: "Connect with verified community safety volunteers",
      icon: "👭"
    },
    {
      title: "Safe Route Planner",
      description: "Intelligent pathfinding through well-lit, populated areas",
      icon: "🗺️"
    }
  ];

  // Generate map data
  useEffect(() => {
    const generateMapData = () => {
      const data = [];
      const types = ['police', 'hospital', 'safehouse', 'community', 'lighting', 'camera'];
      
      for (let i = 0; i < 25; i++) {
        data.push({
          id: i,
          type: types[Math.floor(Math.random() * types.length)],
          x: Math.random() * 90 + 5,
          y: Math.random() * 80 + 10,
          active: false
        });
      }
      
      // Add some safe zones
      data.push(
        { id: 100, type: 'safezone', x: 20, y: 30, active: false },
        { id: 101, type: 'safezone', x: 70, y: 60, active: false }
      );
      
      setMapData(data);
    };
    
    generateMapData();
    
    // Simulate user movement
    const interval = setInterval(() => {
      setUserPosition(prev => ({
        x: Math.min(95, Math.max(5, prev.x + (Math.random() * 4 - 2)),
        y: Math.min(85, Math.max(15, prev.y + (Math.random() * 4 - 2))
      }));
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  // Feature carousel effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % features.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [features.length]);

  // Get icon for map point
  const getMapIcon = (type) => {
    const icons = {
      police: '👮‍♀️',
      hospital: '🏥',
      safehouse: '🏠',
      community: '👥',
      lighting: '💡',
      camera: '📹',
      safezone: '🛡️'
    };
    return icons[type] || '📍';
  };

  return (
    <div className="w-full min-h-screen overflow-hidden bg-gradient-to-br from-purple-900 via-fuchsia-800 to-rose-700">
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
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
              className={`bg-white/10 backdrop-blur-md rounded-2xl p-6 border-2 transition-all duration-300 hover:-translate-y-2 shadow-lg ${
                index === activeFeature 
                  ? 'border-yellow-400 bg-yellow-500/20 scale-105' 
                  : 'border-white/20'
              }`}
              onMouseEnter={() => setActiveFeature(index)}
            >
              <div className="text-4xl mb-4 text-yellow-300">{feature.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-purple-100">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Interactive Safety Map */}
        <div className="mb-20 bg-black/30 backdrop-blur-sm rounded-3xl p-6 border border-white/20 shadow-2xl animate-fade-in">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-2/3">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-white">Community Safety Map</h2>
                <div className="flex items-center space-x-2 bg-purple-700/50 px-4 py-2 rounded-full">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-white text-sm">Live</span>
                </div>
              </div>
              
              {/* Map Visualization */}
              <div className="relative h-[500px] bg-purple-900/50 rounded-2xl border border-white/20 overflow-hidden">
                {/* Map grid */}
                <div className="absolute inset-0 bg-grid-pattern bg-[length:40px_40px] opacity-10"></div>
                
                {/* Safe zones */}
                <div 
                  className="absolute w-40 h-40 rounded-full bg-green-500/10 border-2 border-green-400/50"
                  style={{ top: '25%', left: '15%' }}
                >
                  <div className="absolute inset-0 rounded-full border-2 border-green-400/30 animate-ping"></div>
                </div>
                
                <div 
                  className="absolute w-32 h-32 rounded-full bg-green-500/10 border-2 border-green-400/50"
                  style={{ top: '60%', left: '65%' }}
                >
                  <div className="absolute inset-0 rounded-full border-2 border-green-400/30 animate-ping"></div>
                </div>
                
                {/* Safety resources */}
                {mapData.map(point => (
                  <div
                    key={point.id}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ${
                      point.active ? 'scale-125' : 'scale-100'
                    }`}
                    style={{ 
                      left: `${point.x}%`,
                      top: `${point.y}%`,
                      zIndex: point.type === 'safezone' ? 5 : 10
                    }}
                    onMouseEnter={() => setMapData(prev => 
                      prev.map(p => p.id === point.id ? { ...p, active: true } : p)
                    }
                    onMouseLeave={() => setMapData(prev => 
                      prev.map(p => p.id === point.id ? {...p, active: false} : p)
                    }
                  >
                    <div className="text-3xl cursor-pointer transform hover:scale-125 transition-transform">
                      {getMapIcon(point.type)}
                    </div>
                    {point.active && (
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-black/80 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap">
                        {point.type.charAt(0).toUpperCase() + point.type.slice(1)}
                      </div>
                    )}
                  </div>
                ))}
                
                {/* User position */}
                <div 
                  className="absolute w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg border-2 border-white transform -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center"
                  style={{ left: `${userPosition.x}%`, top: `${userPosition.y}%` }}
                >
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                  <div className="absolute inset-0 rounded-full bg-cyan-400 animate-ping opacity-40"></div>
                </div>
                
                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm p-4 rounded-xl text-white text-sm">
                  <div className="font-bold mb-2">Safety Resources:</div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center"><span className="text-xl mr-2">👮‍♀️</span> Police</div>
                    <div className="flex items-center"><span className="text-xl mr-2">🏥</span> Hospital</div>
                    <div className="flex items-center"><span className="text-xl mr-2">🏠</span> Safe House</div>
                    <div className="flex items-center"><span className="text-xl mr-2">👥</span> Community</div>
                    <div className="flex items-center"><span className="text-xl mr-2">💡</span> Good Lighting</div>
                    <div className="flex items-center"><span className="text-xl mr-2">📹</span> Security Camera</div>
                    <div className="flex items-center"><span className="text-xl mr-2">🛡️</span> Safe Zone</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Map Info Panel */}
            <div className="md:w-1/3 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h3 className="text-2xl font-bold text-yellow-300 mb-4">Safety in Your Community</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <div className="text-2xl mr-3">✅</div>
                  <p className="text-purple-100">Real-time monitoring of safe zones and resources</p>
                </div>
                <div className="flex items-start">
                  <div className="text-2xl mr-3">🌆</div>
                  <p className="text-purple-100">Verified community safety volunteers near you</p>
                </div>
                <div className="flex items-start">
                  <div className="text-2xl mr-3">🔄</div>
                  <p className="text-purple-100">Live updates during emergencies</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-700 to-pink-600 rounded-xl p-4 mb-6">
                <h4 className="font-bold text-white mb-2">Safety Rating</h4>
                <div className="flex items-center">
                  <div className="text-3xl mr-2">⭐</div>
                  <div className="text-white font-bold text-2xl">8.7/10</div>
                </div>
                <p className="text-purple-200 text-sm mt-2">Current safety level in your area</p>
              </div>
              
              <div className="bg-black/30 rounded-xl p-4">
                <h4 className="font-bold text-white mb-3">Community Safety</h4>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-purple-200">Active Volunteers</span>
                  <span className="text-yellow-300 font-bold">42</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-purple-200">Safe Zones</span>
                  <span className="text-yellow-300 font-bold">8</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-purple-200">Recent Incidents</span>
                  <span className="text-yellow-300 font-bold">2</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Empowerment Section */}
        <div className="bg-gradient-to-r from-purple-800 to-pink-700 rounded-3xl p-8 md:p-12 text-center mb-20 border border-white/20 shadow-2xl animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Join the Safety Revolution</h2>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-8">
            Shakti Shield is building a global community dedicated to creating safer spaces for women everywhere.
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
          
          <div className="mt-10">
            <button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-8 py-4 rounded-full font-bold hover:from-yellow-600 hover:to-orange-600 transition-all transform hover:scale-105 shadow-lg text-lg">
              Become a Safety Advocate
            </button>
          </div>
        </div>
        
        {/* Testimony Section */}
        <div className="mb-20 animate-fade-in">
          <Testimony />
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
        
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px);
        }
      `}</style>
    </div>
  );
}

export default HeroSection;