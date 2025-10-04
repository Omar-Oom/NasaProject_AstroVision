import React from "react";
import { motion } from "framer-motion";
import { Zap, BarChart3, Database, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";

/**
 * About Page Component
 *
 * Displays information about AstroVision team and the Exoplanetary AI Explorer platform
 * Organized in 4 main sections:
 * 1. AstroVision Team Introduction
 * 2. Our Mission Statement
 * 3. Platform Features
 * 4. Key Data Variables
 */
const About: React.FC = () => {
  // Platform features data for Section 03
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "AI-Powered Analysis",
      description:
        "Advanced machine learning algorithms analyze transit data to classify exoplanets with high accuracy.",
      color: "text-space-cyan",
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Real-time Visualization",
      description:
        "Interactive charts and orbital diagrams help visualize exoplanet characteristics and relationships.",
      color: "text-space-magenta",
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Comprehensive Dataset",
      description:
        "Access to NASA's complete exoplanet archive including Kepler, K2, and TESS mission data.",
      color: "text-space-yellow",
    },
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Page Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-fit bg-center"
        style={{
          backgroundImage:
            "url('/assets/images/backgrounds/about us background .jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      />
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Main Content Container */}
      <div className="relative z-10 min-h-screen flex flex-col ">
        {/* ========== SECTION 01: ASTROVISION TEAM ========== */}
        <section className="relative flex-1 flex items-center px-8 py-20">
          {/* AstroVision logo as subtle section background */}
          <div
            className="absolute inset-0 opacity-50 pointer-events-none"
            style={{
              backgroundImage: "url('/assets/images/logos/teamlogo.png')",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "94% center",
              backgroundSize: "830px auto",
              mixBlendMode: "screen",
            }}
          />
          <div className="relative z-10 max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
            {/* Team Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="flex items-center space-x-6">
                <div className="text-8xl font-bold text-cyan-400/40 leading-none">
                  01
                </div>
                <div>
                  <h1 className="text-5xl font-bold text-white tracking-wider leading-tight">
                    ASTROVISION
                  </h1>
                </div>
              </div>

              <div className="space-y-6 text-white/80 text-lg leading-relaxed max-w-lg">
                <p>
                  We are AstroVision, a passionate team of researchers, data
                  scientists, and space enthusiasts dedicated to advancing
                  exoplanet discovery through cutting-edge AI technology.
                </p>
                <p>Our team combines expertise in:</p>
                <ul className="space-y-2 text-white/80">
                  <li className="flex items-start">
                    <span className="text-white/40 mr-2">•</span>
                    Astrophysics and exoplanet detection methods
                  </li>
                  <li className="flex items-start">
                    <span className="text-white/40 mr-2">•</span>
                    Machine learning and AI algorithm development
                  </li>
                  <li className="flex items-start">
                    <span className="text-white/40 mr-2">•</span>
                    Data visualization and interactive design
                  </li>
                  <li className="flex items-start">
                    <span className="text-white/40 mr-2">•</span>
                    Space mission data analysis and processing
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Right side - Logo displayed via background */}
            <div className="hidden lg:block" />
          </div>
        </section>

        {/* ========== SECTION 02: OUR MISSION ========== */}
        <section className="flex-1 flex items-center px-8 py-20 bg-black/20">
          <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
            {/* Mission Statement */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="flex items-center space-x-6">
                <div className="text-8xl font-bold text-blue-700/60 leading-none">
                  02
                </div>
                <div>
                  <h1 className="text-5xl font-bold text-white tracking-wider leading-tight">
                    OUR MISSION
                  </h1>
                </div>
              </div>

              <div className="space-y-6 text-white/80 text-lg leading-relaxed max-w-lg">
                <p>
                  The Exoplanetary AI Explorer represents the next frontier in
                  exoplanet research. By leveraging state-of-the-art machine
                  learning algorithms and NASA's extensive exoplanet datasets,
                  we're making the discovery and classification of distant
                  worlds more accurate, efficient, and accessible than ever
                  before.
                </p>
                <p>
                  Our platform processes data from the Kepler, K2, and TESS
                  missions to identify exoplanet candidates, confirm planetary
                  status, and distinguish between genuine discoveries and false
                  positives with unprecedented precision.
                </p>
              </div>
            </motion.div>

            {/* Light Curve & ML Visualization */}
            <div className="absolute top-50 right-40">
              <div className="relative w-[730px] h-[400px] bg-black/40 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-6">
                {/* Light Curve Chart */}
                <div className="relative w-full h-full">
                  {/* Chart Title */}
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-semibold text-green-400 tracking-wider  ">
                      Exoplanet Transit Detection
                    </h3>
                    <p className="text-sm text-white/60">
                      AI analyzing stellar brightness over time
                    </p>
                  </div>

                  {/* Simulated Light Curve */}
                  <div className="relative w-full h-32 border-l-2 border-b-2 border-white/30">
                    {/* Y-axis label */}
                    <div className="absolute -left-16 top-1/2 transform -rotate-90 text-xs text-white/60">
                      Brightness
                    </div>

                    {/* X-axis label */}
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-white/60">
                      Time (hours)
                    </div>

                    {/* Light curve path with transit dip */}
                    <svg
                      className="absolute inset-0 w-full h-full"
                      viewBox="0 0 320 120"
                    >
                      <motion.path
                        d="M 10 20 L 80 22 L 120 25 L 140 45 L 160 65 L 180 45 L 200 25 L 280 22 L 310 20"
                        stroke="url(#lightCurveGradient)"
                        strokeWidth="3"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          repeatDelay: 2,
                        }}
                      />

                      {/* Gradient definition */}
                      <defs>
                        <linearGradient
                          id="lightCurveGradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="0%"
                        >
                          <stop offset="0%" stopColor="#06b6d4" />
                          <stop offset="50%" stopColor="#3b82f6" />
                          <stop offset="100%" stopColor="#8b5cf6" />
                        </linearGradient>
                      </defs>

                      {/* Transit detection marker */}
                      <motion.circle
                        cx="160"
                        cy="65"
                        r="4"
                        fill="#f59e0b"
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.7, 1, 0.7],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                        }}
                      />
                    </svg>
                  </div>

                  {/* AI Processing Indicators */}
                  <div className="flex justify-between items-center mt-6">
                    <div className="flex items-center space-x-2">
                      <motion.div
                        className="w-2 h-2 rounded-full bg-green-400"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                      <span className="text-xs text-white/70">
                        ML Processing
                      </span>
                    </div>

                    <div className="text-center">
                      <div className="text-sm font-semibold text-yellow-400">
                        EXOPLANET DETECTED
                      </div>
                      <div className="text-xs text-white/60">
                        Confidence: 94.7%
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <motion.div
                        className="w-2 h-2 rounded-full bg-blue-400"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                      />
                      <span className="text-xs text-white/70">
                        Neural Network
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========== SECTION 03: PLATFORM FEATURES ========== */}
        <section className="flex-1 flex items-center px-8 py-20 bg-black/10">
          <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
            {/* Features Overview */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="flex items-center space-x-6">
                <div className="text-8xl font-bold text-cyan-300/60 leading-none">
                  03
                </div>
                <div>
                  <h1 className="text-5xl font-bold text-white tracking-wider leading-tight">
                    PLATFORM FEATURES
                  </h1>
                </div>
              </div>

              <div className="space-y-6 text-white/80 text-lg leading-relaxed max-w-lg">
                <p>
                  Our platform combines cutting-edge AI technology with
                  comprehensive datasets to deliver unprecedented capabilities
                  in exoplanet research:
                </p>
                <ul className="space-y-2 text-white/80">
                  <li className="flex items-start">
                    <span className="text-white/40 mr-2">•</span>
                    Advanced machine learning algorithms for transit analysis
                  </li>
                  <li className="flex items-start">
                    <span className="text-white/40 mr-2">•</span>
                    Real-time visualization of exoplanet characteristics
                  </li>
                  <li className="flex items-start">
                    <span className="text-white/40 mr-2">•</span>
                    Access to NASA's complete exoplanet archive
                  </li>
                  <li className="flex items-start">
                    <span className="text-white/40 mr-2">•</span>
                    Interactive orbital diagrams and data exploration
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Feature Cards */}
            <div className="grid gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:bg-black/60 transition-all duration-300"
                >
                  <div className={`${feature.color} mb-4`}>{feature.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-white/70">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== SECTION 04: KEY DATA VARIABLES ========== */}
        <section className="flex-1 flex items-center px-8 py-20 bg-black/30">
          <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
            {/* Data Variables Overview */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="flex items-center space-x-6">
                <div className="text-8xl font-bold text-green-800/60 leading-none">
                  04
                </div>
                <div>
                  <h1 className="text-5xl font-bold text-white tracking-wider leading-tight">
                    KEY DATA VARIABLES
                  </h1>
                </div>
              </div>

              <div className="space-y-6 text-white/80 text-lg leading-relaxed max-w-lg">
                <p>
                  Our AI models analyze multiple key parameters from
                  astronomical observations to accurately classify exoplanets
                  and distinguish them from false positives in the data.
                </p>
                <p>Key variables include:</p>
                <ul className="space-y-2 text-white/80">
                  <li className="flex items-start">
                    <span className="text-white/40 mr-2">•</span>
                    Orbital period and transit duration
                  </li>
                  <li className="flex items-start">
                    <span className="text-white/40 mr-2">•</span>
                    Planet and stellar radius measurements
                  </li>
                  <li className="flex items-start">
                    <span className="text-white/40 mr-2">•</span>
                    Stellar mass and temperature properties
                  </li>
                  <li className="flex items-start">
                    <span className="text-white/40 mr-2">•</span>
                    Light curve depth and shape analysis
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Data Parameter Cards */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg p-6">
                <h3 className="text-xl font-bold text-cyan-400 mb-4">
                  Planetary Parameters
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-white mb-2">
                      Orbital Period
                    </h4>
                    <p className="text-white/70 text-sm">
                      Time for one complete orbit around the star (days)
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">
                      Transit Duration
                    </h4>
                    <p className="text-white/70 text-sm">
                      Time the planet takes to cross the star's disk (hours)
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">
                      Planet Radius
                    </h4>
                    <p className="text-white/70 text-sm">
                      Size of the planet relative to Earth (Earth radii)
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg p-6">
                <h3 className="text-xl font-bold text-cyan-400 mb-4">
                  Stellar Parameters
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-white mb-2">
                      Stellar Radius
                    </h4>
                    <p className="text-white/70 text-sm">
                      Size of the host star relative to the Sun (Solar radii)
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">
                      Stellar Mass
                    </h4>
                    <p className="text-white/70 text-sm">
                      Mass of the host star relative to the Sun (Solar masses)
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">
                      Stellar Temperature
                    </h4>
                    <p className="text-white/70 text-sm">
                      Surface temperature of the host star (Kelvin)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========== CALL TO ACTION SECTION ========== */}
        <section className="px-8 py-20 bg-black/30">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to Explore?
              </h2>
              <p className="text-lg text-white/80 mb-8">
                Dive into our interactive tools and discover the wonders of
                exoplanet science with cutting-edge AI technology
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/explore-planets">
                  <Button
                    variant="outline"
                    size="lg"
                    className="px-6 py-3 border-white text-white hover:bg-white hover:text-black"
                  >
                    Browse Planets
                  </Button>
                </Link>
                <Link to="/try-prediction">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-500 via-purple-600 to-green-600
                    px-8 py-4 text-lg text-white rounded-3xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30 hover:scale-105 group"
                  >
                    Try AI Detection
                    <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ========== STATISTICS SECTION ========== */}
        <section className="px-8 py-16 bg-black/80">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* AI Accuracy Statistic */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-center"
              >
                <div className="text-sm text-white/60 uppercase tracking-wider mb-2">
                  AI ACCURACY RATE
                </div>
                <div className="text-6xl font-light text-white">95.7%</div>
              </motion.div>

              {/* Datasets Processed Statistic */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <div className="text-sm text-white/60 uppercase tracking-wider mb-2">
                  DATASETS PROCESSED
                </div>
                <div className="text-6xl font-light text-white">3</div>
                <div className="text-lg text-white/60">NASA missions</div>
              </motion.div>

              {/* Light Curves Analyzed Statistic */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <div className="text-sm text-white/60 uppercase tracking-wider mb-2">
                  LIGHT CURVES ANALYZED
                </div>
                <div className="text-6xl font-light text-white">1M+</div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
