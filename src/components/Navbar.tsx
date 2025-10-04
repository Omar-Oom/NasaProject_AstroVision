import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Microscope, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { useUserMode } from "../contexts/UserModeContext";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();
  const { setUserMode, isResearcher } = useUserMode();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const normalNavItems = [
    { name: "Home", path: "/explore" },
    { name: "Explore Planets", path: "/explore-planets" },
    { name: "Try Prediction", path: "/try-prediction" },
    { name: "Learn More", path: "/learn-more" },
    { name: "About Our Model", path: "/about-our-model" },
    { name: "About Us", path: "/about" },
  ];

  const researcherNavSections = [
    {
      title: "Overview",
      items: [
        { name: "Dashboard", path: "/researcher-dashboard" },
        { name: "About Our Model", path: "/about-our-model" },
        { name: "About Us", path: "/about" },
      ]
    },
    {
      title: "Dataset",
      items: [
        { name: "Dataset Explorer", path: "/dataset-explorer" },
        { name: "Data Management", path: "/data-management" },
      ]
    },
    {
      title: "Model",
      items: [
        { name: "Model Training", path: "/model-training" },
        { name: "Model Performance", path: "/model-performance" },
        { name: "Uploaded Models", path: "/uploaded-models" },
      ]
    },
    {
      title: "Analysis",
      items: [
        { name: "Predictions", path: "/predictions" },
      ]
    }
  ];

  // Flatten researcher sections for backward compatibility
  const researcherNavItems = researcherNavSections.flatMap(section => section.items);
  const navItems = isResearcher ? researcherNavItems : normalNavItems;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50 bg-gradient-to-r from-black/95 via-red-900/20 to-black/95 backdrop-blur-xl border-b border-red-500/30 shadow-2xl shadow-red-500/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to={isResearcher ? "/researcher-dashboard" : "/explore"} className="flex items-center space-x-3 group">
            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.05, 1]
              }}
              transition={{
                rotate: { duration: 30, repeat: Infinity, ease: "linear" },
                scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }}
              className="relative"
            >
              {/* Enhanced Planet with Red Nebula Theme */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-400 via-pink-500 to-purple-600 shadow-lg shadow-red-500/50 relative overflow-hidden">
                {/* Planet's atmospheric bands */}
                <div className="absolute inset-0 opacity-70">
                  <div className="absolute top-1 left-0 right-0 h-0.5 bg-red-600/60"></div>
                  <div className="absolute top-3 left-0 right-0 h-0.5 bg-pink-500/60"></div>
                  <div className="absolute top-5 left-0 right-0 h-0.5 bg-purple-600/60"></div>
                  <div className="absolute top-7 left-0 right-0 h-0.5 bg-red-700/60"></div>
                </div>
                {/* Enhanced Red Spot */}
                <div className="absolute top-2 right-1 w-2 h-1.5 bg-red-300/80 rounded-full shadow-sm"></div>
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-400/20 to-transparent"></div>
              </div>
              
              {/* Enhanced Orbital ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 w-14 h-14 -top-2 -left-2"
              >
                <div className="w-full h-full border border-red-400/40 rounded-full shadow-sm shadow-red-400/30"></div>
                <div className="absolute top-0 left-1/2 w-1.5 h-1.5 bg-gradient-to-r from-red-400 to-pink-400 rounded-full -translate-x-0.5 -translate-y-0.5 shadow-sm shadow-red-400/50"></div>
              </motion.div>
            </motion.div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-red-300 via-pink-300 to-purple-300 bg-clip-text text-transparent tracking-wide group-hover:from-red-200 group-hover:via-pink-200 group-hover:to-purple-200 transition-all duration-300">
                Exoplanetary AI
              </span>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-red-400/70 font-medium tracking-widest uppercase">
                  Discovery Platform
                </span>
                <div className="w-1 h-1 bg-red-400/50 rounded-full"></div>
                <span className="text-xs text-pink-400/80 font-semibold tracking-wide">
                  by Astro Vision
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-baseline space-x-2">
              {!isResearcher ? (
                // Normal mode navigation
                normalNavItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`relative px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 group ${
                      location.pathname === item.path
                        ? "text-white bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-400/40 shadow-lg shadow-red-500/20 backdrop-blur-sm"
                        : "text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-red-500/10 hover:to-pink-500/10 hover:border hover:border-red-400/20 hover:backdrop-blur-sm"
                    }`}
                  >
                    <span className="relative z-10">{item.name}</span>
                    {location.pathname === item.path && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-pink-500/10 rounded-xl border border-red-400/30"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Link>
                ))
              ) : (
                // Research mode with separate dropdowns for each category
                researcherNavSections.map((section) => (
                  <div key={section.title} className="relative" ref={dropdownRef}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setOpenDropdown(openDropdown === section.title ? null : section.title)}
                      className={`flex items-center space-x-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                        section.items.some(item => location.pathname === item.path)
                          ? "text-white bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-400/40 shadow-lg shadow-red-500/20 backdrop-blur-sm"
                          : "text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-red-500/10 hover:to-pink-500/10 hover:border hover:border-red-400/20 hover:backdrop-blur-sm"
                      }`}
                    >
                      <span>{section.title}</span>
                      {openDropdown === section.title ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </motion.button>

                    <AnimatePresence>
                      {openDropdown === section.title && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-56 bg-gradient-to-b from-black/95 to-red-900/20 backdrop-blur-xl border border-red-400/30 rounded-2xl shadow-2xl shadow-red-500/20 overflow-hidden z-50"
                        >
                          <div className="py-2">
                            {section.items.map((item, itemIndex) => (
                              <Link
                                key={item.name}
                                to={item.path}
                                onClick={() => setOpenDropdown(null)}
                                className={`block px-5 py-3 text-sm font-medium transition-all duration-300 ${
                                  location.pathname === item.path
                                    ? "text-white bg-gradient-to-r from-red-500/20 to-pink-500/20 border-l-4 border-red-400"
                                    : "text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-red-500/10 hover:to-pink-500/10"
                                }`}
                              >
                                <motion.div
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: itemIndex * 0.05 }}
                                >
                                  {item.name}
                                </motion.div>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))
              )}
            </div>
            
            {/* Enhanced Mode Switcher */}
            <div className="flex items-center space-x-2 ml-8 pl-8 border-l border-red-400/30">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setUserMode(isResearcher ? 'normal' : 'researcher')}
                className="flex items-center space-x-3 px-5 py-3 rounded-xl bg-gradient-to-r from-red-500/10 to-pink-500/10 hover:from-red-500/20 hover:to-pink-500/20 border border-red-400/30 hover:border-red-400/50 transition-all duration-300 text-sm font-semibold text-white group"
              >
                <div className={`p-1.5 rounded-lg transition-all duration-300 ${
                  isResearcher 
                    ? 'bg-gradient-to-r from-pink-500/20 to-purple-500/20 group-hover:from-pink-500/30 group-hover:to-purple-500/30' 
                    : 'bg-gradient-to-r from-red-500/20 to-pink-500/20 group-hover:from-red-500/30 group-hover:to-pink-500/30'
                }`}>
                  {isResearcher ? <Sparkles className="w-4 h-4 text-pink-300" /> : <Microscope className="w-4 h-4 text-red-300" />}
                </div>
                <span className="bg-gradient-to-r from-red-300 to-pink-300 bg-clip-text text-transparent">
                  {isResearcher ? 'Explorer' : 'Research'} Mode
                </span>
              </motion.button>
            </div>
          </div>

          {/* Enhanced Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white transition-all duration-300 p-3 rounded-xl hover:bg-gradient-to-r hover:from-red-500/10 hover:to-pink-500/10 hover:border hover:border-red-400/20"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-gradient-to-b from-black/98 via-red-900/10 to-black/98 backdrop-blur-xl border-t border-red-500/30 shadow-2xl shadow-red-500/10"
        >
          <div className="px-4 pt-4 pb-6 space-y-2">
            {!isResearcher ? (
              // Normal mode mobile navigation
              normalNavItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-5 py-4 rounded-xl text-base font-semibold transition-all duration-300 ${
                    location.pathname === item.path
                      ? "text-white bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-400/40 shadow-lg shadow-red-500/20 backdrop-blur-sm"
                      : "text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-red-500/10 hover:to-pink-500/10 hover:border hover:border-red-400/20 hover:backdrop-blur-sm"
                  }`}
                >
                  {item.name}
                </Link>
              ))
            ) : (
              // Research mode mobile navigation with separate collapsible sections
              <div className="space-y-2">
                {researcherNavSections.map((section) => (
                  <div key={section.title} className="space-y-1">
                    <div className="px-5 py-4 rounded-xl bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-400/20">
                      <div className="flex items-center justify-between">
                        <span className="text-base font-semibold text-white">{section.title}</span>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setOpenDropdown(openDropdown === section.title ? null : section.title)}
                          className="p-1 rounded-lg hover:bg-red-500/20 transition-colors duration-200"
                        >
                          {openDropdown === section.title ? (
                            <ChevronUp className="w-5 h-5 text-red-300" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-red-300" />
                          )}
                        </motion.button>
                      </div>
                    </div>
                    
                    <AnimatePresence>
                      {openDropdown === section.title && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="ml-4 space-y-1 border-l-2 border-red-400/30 pl-4">
                            {section.items.map((item, itemIndex) => (
                              <Link
                                key={item.name}
                                to={item.path}
                                onClick={() => {
                                  setIsOpen(false);
                                  setOpenDropdown(null);
                                }}
                                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                                  location.pathname === item.path
                                    ? "text-white bg-gradient-to-r from-red-500/20 to-pink-500/20 border-l-4 border-red-400"
                                    : "text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-red-500/10 hover:to-pink-500/10"
                                }`}
                              >
                                <motion.div
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: itemIndex * 0.05 }}
                                >
                                  {item.name}
                                </motion.div>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            )}
            
            {/* Enhanced Mobile Mode Switcher */}
            <div className="pt-4 mt-4 border-t border-red-400/30">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setUserMode(isResearcher ? 'normal' : 'researcher');
                  setIsOpen(false);
                }}
                className="flex items-center space-x-3 w-full px-5 py-4 rounded-xl bg-gradient-to-r from-red-500/10 to-pink-500/10 hover:from-red-500/20 hover:to-pink-500/20 border border-red-400/30 hover:border-red-400/50 transition-all duration-300 text-base font-semibold text-white group"
              >
                <div className={`p-2 rounded-lg transition-all duration-300 ${
                  isResearcher 
                    ? 'bg-gradient-to-r from-pink-500/20 to-purple-500/20 group-hover:from-pink-500/30 group-hover:to-purple-500/30' 
                    : 'bg-gradient-to-r from-red-500/20 to-pink-500/20 group-hover:from-red-500/30 group-hover:to-pink-500/30'
                }`}>
                  {isResearcher ? <Sparkles className="w-5 h-5 text-pink-300" /> : <Microscope className="w-5 h-5 text-red-300" />}
                </div>
                <span className="bg-gradient-to-r from-red-300 to-pink-300 bg-clip-text text-transparent">
                  Switch to {isResearcher ? 'Explorer' : 'Research'} Mode
                </span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
