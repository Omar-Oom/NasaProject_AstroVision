import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Github,
  Twitter,
  Mail,
  Globe,
  Rocket,
  Star,
  ExternalLink,
  Heart,
} from "lucide-react";
import { useUserMode } from "../contexts/UserModeContext";

const Footer: React.FC = () => {
  const { isNormal, isResearcher } = useUserMode();

  const normalLinks = [
    { name: "Home", path: "/explore" },
    { name: "Explore Planets", path: "/explore-planets" },
    { name: "Try Prediction", path: "/try-prediction" },
    { name: "Learn More", path: "/learn-more" },
  ];

  const researcherLinks = [
    { name: "Dashboard", path: "/researcher-dashboard" },
    { name: "Dataset Explorer", path: "/dataset-explorer" },
    { name: "Predictions", path: "/predictions" },
    { name: "Model Training", path: "/model-training" },
    { name: "Performance", path: "/model-performance" },
    { name: "Data Management", path: "/data-management" },
  ];

  const resourceLinks = [
    {
      name: "NASA Exoplanet Archive",
      url: "https://exoplanetarchive.ipac.caltech.edu/",
    },
    { name: "Kepler Mission", url: "https://www.nasa.gov/kepler" },
    {
      name: "TESS Mission",
      url: "https://www.nasa.gov/tess-transiting-exoplanet-survey-satellite",
    },
    { name: "James Webb Space Telescope", url: "https://www.jwst.nasa.gov/" },
  ];

  const socialLinks = [
    { name: "GitHub", icon: <Github className="w-5 h-5" />, url: "#" },
    { name: "Twitter", icon: <Twitter className="w-5 h-5" />, url: "#" },
    {
      name: "Email",
      icon: <Mail className="w-5 h-5" />,
      url: "mailto:contact@exoplanet-platform.com",
    },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-black via-gray-900 to-black border-t border-red-500/30 mt-0 z-20">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Enhanced Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-400 via-pink-500 to-purple-600 flex items-center justify-center">
                  <Rocket className="w-6 h-6 text-white" />
                </div>
                <Star className="w-3 h-3 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-red-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                  Exoplanetary AI
                </span>
                <span className="text-xs text-red-400/80 font-medium tracking-wide">
                  by Astro Vision
                </span>
              </div>
            </div>
            <p className="text-white/80 text-sm mb-6 leading-relaxed">
              Advancing exoplanet discovery through cutting-edge AI technology
              and making space science accessible to everyone.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-xl bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-400/30 
                           hover:border-red-400/50 hover:bg-gradient-to-r hover:from-red-500/20 hover:to-pink-500/20 
                           transition-all duration-300 group"
                  title={social.name}
                >
                  <div className="text-red-300 group-hover:text-white transition-colors duration-300">
                    {social.icon}
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Enhanced Navigation Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xl font-bold text-white mb-6 bg-gradient-to-r from-red-300 to-pink-300 bg-clip-text text-transparent">
              Navigation
            </h3>
            <ul className="space-y-3">
              {(isNormal ? normalLinks : researcherLinks).map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-white/70 hover:text-red-300 transition-all duration-300 
                             text-sm flex items-center group py-2 px-3 rounded-lg hover:bg-red-500/10"
                  >
                    <div className="w-2 h-2 bg-red-400/50 rounded-full mr-3 group-hover:bg-red-300 transition-colors duration-300"></div>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Enhanced Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-xl font-bold text-white mb-6 bg-gradient-to-r from-red-300 to-pink-300 bg-clip-text text-transparent">
              Resources
            </h3>
            <ul className="space-y-3">
              {resourceLinks.map((resource) => (
                <li key={resource.name}>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-red-300 transition-all duration-300 
                             text-sm flex items-center group py-2 px-3 rounded-lg hover:bg-red-500/10"
                  >
                    <div className="w-2 h-2 bg-red-400/50 rounded-full mr-3 group-hover:bg-red-300 transition-colors duration-300"></div>
                    <span className="group-hover:translate-x-1 transition-transform duration-300 flex-1">
                      {resource.name}
                    </span>
                    <ExternalLink className="w-3 h-3 ml-2 opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Enhanced Contact & Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-xl font-bold text-white mb-6 bg-gradient-to-r from-red-300 to-pink-300 bg-clip-text text-transparent">
              Platform
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about"
                  className="text-white/70 hover:text-red-300 transition-all duration-300 
                           text-sm flex items-center group py-2 px-3 rounded-lg hover:bg-red-500/10"
                >
                  <div className="w-2 h-2 bg-red-400/50 rounded-full mr-3 group-hover:bg-red-300 transition-colors duration-300"></div>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    About Us
                  </span>
                </Link>
              </li>
              <li>
                <a
                  href="mailto:contact@exoplanet-platform.com"
                  className="text-white/70 hover:text-red-300 transition-all duration-300 
                           text-sm flex items-center group py-2 px-3 rounded-lg hover:bg-red-500/10"
                >
                  <div className="w-2 h-2 bg-red-400/50 rounded-full mr-3 group-hover:bg-red-300 transition-colors duration-300"></div>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    Contact
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/70 hover:text-red-300 transition-all duration-300 
                           text-sm flex items-center group py-2 px-3 rounded-lg hover:bg-red-500/10"
                >
                  <div className="w-2 h-2 bg-red-400/50 rounded-full mr-3 group-hover:bg-red-300 transition-colors duration-300"></div>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    Privacy Policy
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/70 hover:text-red-300 transition-all duration-300 
                           text-sm flex items-center group py-2 px-3 rounded-lg hover:bg-red-500/10"
                >
                  <div className="w-2 h-2 bg-red-400/50 rounded-full mr-3 group-hover:bg-red-300 transition-colors duration-300"></div>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    Terms of Service
                  </span>
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Enhanced Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="border-t border-red-500/30 mt-12 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
              <div className="flex items-center space-x-2 text-white/80 text-sm">
                <span>© 2025 ExoPlanet Detection Platform</span>
                <div className="w-1 h-1 bg-red-400/50 rounded-full"></div>
                <span className="flex items-center text-red-300 font-medium">
                  Made with Passion by Astro Vision 🌑
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-6 text-white/70 text-sm">
              <div className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-400/20">
                <Globe className="w-4 h-4 text-red-300" />
                <span>Discovering worlds beyond our solar system</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="w-4 h-4 text-red-400 animate-pulse" />
                <span className="text-red-300 font-medium">
                  Space Exploration
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
