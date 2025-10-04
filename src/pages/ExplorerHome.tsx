import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";

const ExplorerHome: React.FC = () => {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-fit bg-center"
        style={{
          backgroundImage:
            "url('/assets/images/backgrounds/explore background.jpg')",
          backgroundSize: "contain",
          backgroundPosition: "center center",
        }}
      />
      <div className="absolute inset-0 bg-black/70" />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Hero Section with Overview */}
        <section className="flex-1 flex items-center px-8 py-20">
          <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="flex items-center space-x-6">
                <div className="text-8xl font-bold text-white/20 leading-none">
                  01
                </div>
                <div>
                  <h1 className="text-7xl font-bold text-white tracking-wider leading-tight">
                    OVERVIEW
                  </h1>
                </div>
              </div>

              <div className="space-y-6 text-white/80 text-lg leading-relaxed max-w-lg">
                <p>
                  Exoplanets are worlds beyond our solar system, orbiting
                  distant stars across the galaxy. Since the first confirmed
                  discovery in 1995, astronomers have found thousands of these
                  alien worlds using advanced detection methods.
                </p>
                <p>
                  The Transit Method detects planets when they pass in front of
                  their host star, causing tiny dips in brightness. Machine
                  learning algorithms analyze this data to identify planetary
                  signatures in vast datasets from space telescopes.
                </p>
                <p>
                  Our platform combines cutting-edge AI with real astronomical
                  data to help you explore and classify these distant worlds.
                </p>
              </div>
            </motion.div>

            {/* Right side - Cosmic Galaxy Visualization */}
            <div className="hidden lg:flex flex-col items-center justify-center">
              <div className="relative w-[400px] h-[400px] overflow-hidden">
                {/* Nebula Core - Central glowing nebula */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <motion.div
                    className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-500/40 via-blue-500/30 to-purple-600/40 blur-xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.6, 0.8, 0.6],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-r from-blue-400/50 to-purple-500/50 blur-lg"
                    animate={{
                      scale: [1.2, 1, 1.2],
                      opacity: [0.4, 0.7, 0.4],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1,
                    }}
                  />
                </div>

                {/* Twinkling Stars */}
                {[...Array(20)].map((_, i) => {
                  const starColors = ["bg-white", "bg-cyan-300", "bg-blue-400"];
                  const randomColor = starColors[i % starColors.length];
                  const randomX = Math.random() * 100;
                  const randomY = Math.random() * 100;
                  const randomDelay = Math.random() * 3;

                  return (
                    <motion.div
                      key={`star-${i}`}
                      className={`absolute w-1 h-1 rounded-full ${randomColor}`}
                      style={{
                        left: `${randomX}%`,
                        top: `${randomY}%`,
                      }}
                      animate={{
                        opacity: [0.2, 1, 0.2],
                        scale: [0.5, 1.2, 0.5],
                      }}
                      transition={{
                        duration: 2 + Math.random() * 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: randomDelay,
                      }}
                    />
                  );
                })}

                {/* Galaxy Spiral - Rotating star clusters */}
                <motion.div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  {/* Spiral arm 1 */}
                  <div className="absolute">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={`spiral1-${i}`}
                        className="absolute w-0.5 h-0.5 bg-cyan-300/60 rounded-full"
                        style={{
                          left: `${
                            Math.cos((i * Math.PI) / 4) * (60 + i * 8)
                          }px`,
                          top: `${
                            Math.sin((i * Math.PI) / 4) * (60 + i * 8)
                          }px`,
                        }}
                      />
                    ))}
                  </div>

                  {/* Spiral arm 2 */}
                  <div className="absolute">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={`spiral2-${i}`}
                        className="absolute w-0.5 h-0.5 bg-blue-400/60 rounded-full"
                        style={{
                          left: `${
                            Math.cos((i * Math.PI) / 4 + Math.PI) * (60 + i * 8)
                          }px`,
                          top: `${
                            Math.sin((i * Math.PI) / 4 + Math.PI) * (60 + i * 8)
                          }px`,
                        }}
                      />
                    ))}
                  </div>
                </motion.div>

                {/* Orbiting Planets */}
                {/* Planet 1 - Blue */}
                <motion.div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <div
                    className="absolute w-4 h-4 bg-blue-400 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.8)]"
                    style={{
                      left: "90px",
                      top: "-2px",
                    }}
                  />
                </motion.div>

                {/* Planet 2 - Green */}
                <motion.div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <div
                    className="absolute w-3 h-3 bg-green-400 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.8)]"
                    style={{
                      left: "130px",
                      top: "-1.5px",
                    }}
                  />
                </motion.div>

                {/* Planet 3 - Red */}
                <motion.div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <div
                    className="absolute w-5 h-5 bg-red-400 rounded-full shadow-[0_0_25px_rgba(248,113,113,0.8)]"
                    style={{
                      left: "170px",
                      top: "-2.5px",
                    }}
                  />
                </motion.div>

                {/* Additional cosmic dust particles */}
                {[...Array(15)].map((_, i) => {
                  const randomX = Math.random() * 100;
                  const randomY = Math.random() * 100;
                  const randomDelay = Math.random() * 4;

                  return (
                    <motion.div
                      key={`dust-${i}`}
                      className="absolute w-0.5 h-0.5 rounded-full bg-purple-300/40"
                      style={{
                        left: `${randomX}%`,
                        top: `${randomY}%`,
                      }}
                      animate={{
                        opacity: [0.1, 0.6, 0.1],
                        y: [0, -10, 0],
                      }}
                      transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: randomDelay,
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Section 02 - Transit Method */}
        <section className="flex-1 flex items-center px-8 py-20 bg-black/20">
          <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="flex items-center space-x-6">
                <div className="text-8xl font-bold text-white/20 leading-none">
                  02
                </div>
                <div>
                  <h1 className="text-5xl font-bold text-white tracking-wider leading-tight">
                    TRANSIT
                    <br />
                    METHOD
                  </h1>
                </div>
              </div>

              <div className="space-y-6 text-white/80 text-lg leading-relaxed max-w-lg">
                <p>
                  The Transit Method is one of the most widely used techniques
                  to discover exoplanets. When a planet passes in front of its
                  host star (from our point of view), it causes a tiny, periodic
                  dip in the star's brightness.
                </p>
                <p>From a single light curve, we can estimate:</p>
                <ul className="space-y-2 text-white/80">
                  <li className="flex items-start">
                    <span className="text-white/40 mr-2">•</span>
                    Orbital period (time between transits)
                  </li>
                  <li className="flex items-start">
                    <span className="text-white/40 mr-2">•</span>
                    Planet radius (from depth of the dip)
                  </li>
                  <li className="flex items-start">
                    <span className="text-white/40 mr-2">•</span>
                    Distance from its star
                  </li>
                  <li className="flex items-start">
                    <span className="text-white/40 mr-2">•</span>
                    Possible habitability indicators
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Right side - Transit Animation */}
            <div className="hidden lg:flex flex-col items-center justify-center">
              <div className="relative w-72 h-72">
                {/* Star */}
                <motion.div
                  className="absolute w-20 h-20 rounded-full 
                             bg-gradient-to-r from-yellow-300 to-orange-400 
                             shadow-[0_0_40px_rgba(255,255,255,0.8)]"
                  style={{
                    top: "30%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                />

                {/* Planet orbiting around the star */}
                <motion.div
                  className="absolute w-6 h-6"
                  style={{
                    top: "30%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <div
                    className="absolute w-6 h-6 bg-blue-400 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.8)]"
                    style={{
                      top: "50%",
                      left: "80px", // orbital radius
                      transform: "translateY(-50%)",
                    }}
                  />
                </motion.div>

                {/* Light curve visualization */}
                <div className="absolute bottom-0 left-0 w-full h-24 mt-4 flex items-end">
                  <motion.svg viewBox="0 0 400 100" className="w-full h-full">
                    {/* Baseline brightness */}
                    <line
                      x1="0"
                      y1="30"
                      x2="400"
                      y2="30"
                      stroke="#ffffff"
                      strokeWidth="2"
                      opacity="0.3"
                    />

                    {/* Transit dip - U-shaped curve */}
                    <motion.path
                      d="M 0 30 L 100 30 Q 125 30 130 50 Q 135 70 150 70 Q 165 70 170 50 Q 175 30 200 30 L 400 30"
                      stroke="#ffffff"
                      strokeWidth="3"
                      fill="transparent"
                      strokeDasharray="800"
                      animate={{
                        strokeDashoffset: [800, 0, -800],
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  </motion.svg>
                </div>
              </div>
              <p className="mt-4 text-sm text-white/70 italic text-center">
                Planet transiting star → brightness dip (light curve)
              </p>
            </div>
          </div>
        </section>

        {/* Section 03 - Machine Learning */}
        <section className="flex-1 flex items-center px-8 py-20 bg-black/10">
          <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="flex items-center space-x-6">
                <div className="text-8xl font-bold text-white/20 leading-none">
                  03
                </div>
                <div>
                  <h1 className="text-5xl font-bold text-white tracking-wider leading-tight">
                    MACHINE
                    <br />
                    LEARNING
                    <br />
                  </h1>
                </div>
              </div>

              <div className="space-y-6 text-white/80 text-lg leading-relaxed max-w-lg">
                <p>
                  Machine learning models analyze vast datasets of star
                  brightness and spectra to identify patterns that suggest the
                  presence of exoplanets. These AI algorithms can process
                  millions of light curves from space telescopes like Kepler and
                  TESS.
                </p>
                <p>Machine learning helps astronomers by:</p>
                <ul className="space-y-2 text-white/80">
                  <li className="flex items-start">
                    <span className="text-white/40 mr-2">•</span>
                    Automatically detecting transit signals in noisy data
                  </li>
                  <li className="flex items-start">
                    <span className="text-white/40 mr-2">•</span>
                    Distinguishing real planets from false positives
                  </li>
                  <li className="flex items-start">
                    <span className="text-white/40 mr-2">•</span>
                    Classifying different types of exoplanets
                  </li>
                  <li className="flex items-start">
                    <span className="text-white/40 mr-2">•</span>
                    Predicting planetary properties from spectral data
                  </li>
                </ul>
              </div>

              <div className="flex justify-center items-center mt-20">
                <Link to="/try-prediction">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-500 via-purple-600 to-green-600
                    px-8 py-4 text-lg text-white rounded-3xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30 hover:scale-105 group"
                  >
                    Try Planet Detection
                    <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Right side - Neural Network Visualization */}
            <div className="hidden lg:flex flex-col items-center justify-center">
              <div className="relative w-72 h-72">
                {/* Neural Network Visualization */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid grid-cols-3 gap-8 items-center">
                    {/* Input Layer */}
                    <div className="flex flex-col space-y-3">
                      {[...Array(4)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-4 h-4 rounded-full bg-blue-400"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.2,
                          }}
                        />
                      ))}
                    </div>

                    {/* Hidden Layer */}
                    <div className="flex flex-col space-y-2">
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-3 h-3 rounded-full bg-purple-400"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: 0.5 + i * 0.1,
                          }}
                        />
                      ))}
                    </div>

                    {/* Output Layer */}
                    <div className="flex flex-col space-y-4">
                      {[...Array(2)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-5 h-5 rounded-full bg-green-400"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: 1 + i * 0.3,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Connection Lines */}
                <svg className="absolute inset-0 w-full h-full">
                  {/* Input to Hidden */}
                  {[...Array(4)].map((_, i) =>
                    [...Array(6)].map((_, j) => (
                      <motion.line
                        key={`${i}-${j}`}
                        x1="25%"
                        y1={`${20 + i * 15}%`}
                        x2="50%"
                        y2={`${15 + j * 12}%`}
                        stroke="#60a5fa"
                        strokeWidth="1"
                        opacity="0.3"
                        animate={{ opacity: [0.1, 0.5, 0.1] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.2 + j * 0.1,
                        }}
                      />
                    ))
                  )}

                  {/* Hidden to Output */}
                  {[...Array(6)].map((_, i) =>
                    [...Array(2)].map((_, j) => (
                      <motion.line
                        key={`h-${i}-${j}`}
                        x1="50%"
                        y1={`${15 + i * 12}%`}
                        x2="75%"
                        y2={`${30 + j * 20}%`}
                        stroke="#a78bfa"
                        strokeWidth="1"
                        opacity="0.3"
                        animate={{ opacity: [0.1, 0.5, 0.1] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: 0.5 + i * 0.1 + j * 0.3,
                        }}
                      />
                    ))
                  )}
                </svg>
              </div>
              <p className="mt-4 text-sm text-white/70 italic text-center">
                Neural network processing light curve data → planet
                classification
              </p>
            </div>
          </div>
        </section>

        {/* Ready to Explore Section */}
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
                exoplanet science
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
                <Link to="/learn-more">
                  <Button
                    variant="outline"
                    size="lg"
                    className="px-6 py-3 border-white text-white hover:bg-white hover:text-black"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section at Bottom */}
        <section className="px-8 py-16 bg-black/80">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-center"
              >
                <div className="text-sm text-white/60 uppercase tracking-wider mb-2">
                  CONFIRMED EXOPLANETS
                </div>
                <div className="text-6xl font-light text-white">6000</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <div className="text-sm text-white/60 uppercase tracking-wider mb-2">
                  DISTANCE TO NEAREST
                </div>
                <div className="text-6xl font-light text-white">4.24</div>
                <div className="text-lg text-white/60">light years</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <div className="text-sm text-white/60 uppercase tracking-wider mb-2">
                  YEARS OF DISCOVERY
                </div>
                <div className="text-6xl font-light text-white">30+</div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ExplorerHome;
