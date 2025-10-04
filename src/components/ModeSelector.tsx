import React from 'react';
import { motion } from 'framer-motion';
import { User, Microscope, Sparkles } from 'lucide-react';
import { useUserMode, UserMode } from '../contexts/UserModeContext';
import Button from './ui/Button';

const ModeSelector: React.FC = () => {
  const { userMode, setUserMode } = useUserMode();

  const modes = [
    {
      id: 'normal' as UserMode,
      title: 'Explorer Mode',
      subtitle: 'For Students & Enthusiasts',
      description: 'Simple, fun, and educational experience to explore exoplanets',
      icon: <Sparkles className="w-8 h-8" />,
      features: ['Interactive Learning', 'Simple Predictions', 'Educational Content', 'Visual Exploration'],
      color: 'from-space-cyan to-space-blue',
      glowColor: 'shadow-cyan-500/50'
    },
    {
      id: 'researcher' as UserMode,
      title: 'Research Mode',
      subtitle: 'For Scientists & Researchers',
      description: 'Advanced tools for dataset analysis, model training, and research',
      icon: <Microscope className="w-8 h-8" />,
      features: ['Dataset Management', 'Model Training', 'Advanced Analytics', 'Batch Processing'],
      color: 'from-space-magenta to-space-purple',
      glowColor: 'shadow-magenta-500/50'
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Red Nebula Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)), url('/assets/images/backgrounds/red-nebula.1920x1080.mp4')`
        }}
      />
      
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-30"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/assets/images/backgrounds/red-nebula.1920x1080.mp4" type="video/mp4" />
      </video>
      
      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-400 via-pink-500 to-purple-600 bg-clip-text text-transparent drop-shadow-2xl leading-tight">
            Exoplanet Detection Platform
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto font-light leading-relaxed">
            Choose your experience level to get started with exoplanet discovery and analysis
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {modes.map((mode, index) => (
            <motion.div
              key={mode.id}
              initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className={`relative p-6 rounded-2xl border-2 transition-all duration-500 cursor-pointer backdrop-blur-sm ${
                userMode === mode.id
                  ? `border-red-400/60 bg-gradient-to-br from-red-900/30 via-pink-900/20 to-purple-900/30 shadow-2xl shadow-red-500/25`
                  : 'border-white/20 bg-black/40 hover:border-red-400/40 hover:bg-black/60 hover:shadow-lg hover:shadow-red-500/10'
              }`}
              onClick={() => setUserMode(mode.id)}
            >
              <div className="text-center mb-6">
                <div className={`inline-flex p-4 rounded-xl mb-4 transition-all duration-300 ${
                  userMode === mode.id 
                    ? 'bg-gradient-to-br from-red-500/20 to-pink-500/20 shadow-lg shadow-red-500/30' 
                    : 'bg-white/10 hover:bg-red-500/20'
                }`}>
                  <div className={`${userMode === mode.id ? 'text-red-300' : 'text-white/70'}`}>
                    {mode.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-red-300 to-pink-300 bg-clip-text text-transparent">
                  {mode.title}
                </h3>
                <p className="text-red-400 font-semibold text-base mb-3">{mode.subtitle}</p>
                <p className="text-white/80 text-sm leading-relaxed">{mode.description}</p>
              </div>

              <div className="space-y-2">
                {mode.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      userMode === mode.id 
                        ? 'bg-gradient-to-r from-red-400 to-pink-400 shadow-sm shadow-red-400/50' 
                        : 'bg-white/40'
                    }`}></div>
                    <span className="text-white/90 text-sm font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              {userMode === mode.id && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-red-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg shadow-red-400/50"
                >
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-12 py-4 text-lg font-bold text-white bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 rounded-xl shadow-2xl shadow-red-500/25 hover:shadow-red-500/40 transition-all duration-300 overflow-hidden"
            onClick={() => {
              // This will be handled by the parent component
              window.location.href = userMode === 'normal' ? '/explore' : '/researcher-dashboard';
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-pink-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center justify-center space-x-2">
              <User className="w-5 h-5" />
              <span>Continue as {userMode === 'normal' ? 'Explorer' : 'Researcher'}</span>
            </div>
          </motion.button>
          
          <p className="text-white/70 mt-4 text-sm font-light">
            You can switch modes anytime from the navigation menu
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ModeSelector;
