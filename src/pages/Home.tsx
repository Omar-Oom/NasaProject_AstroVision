import React from "react";
import { motion, useAnimation } from "framer-motion";
import { Link } from "react-router-dom";
import { Upload, BarChart3, Search, Zap, Star, Globe } from "lucide-react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import OrbitalAnimation from "../components/OrbitalAnimation";

const Home: React.FC = () => {
  const features = [
    {
      icon: <Upload className="w-8 h-8" />,
      title: "Upload Data",
      description: "Upload CSV or FITS files for analysis",
      link: "/upload",
      color: "text-space-cyan",
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Model Dashboard",
      description: "View performance metrics and retrain models",
      link: "/dashboard",
      color: "text-space-magenta",
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: "Data Explorer",
      description: "Interactive visualization of exoplanet data",
      link: "/explorer",
      color: "text-space-yellow",
    },
  ];

  const stats = [
    {
      label: "Exoplanets Analyzed",
      value: "4,000+",
      icon: <Star className="w-6 h-6" />,
    },
    {
      label: "Accuracy Rate",
      value: "94.2%",
      icon: <Zap className="w-6 h-6" />,
    },
    {
      label: "Datasets Processed",
      value: "50+",
      icon: <Globe className="w-6 h-6" />,
    },
  ];

  const TransitMethod: React.FC = () => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-16"
      >
        <Card className="p-8">
          <h2 className="text-3xl font-bold text-glow mb-6">
            The Transit Method
          </h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {/* --- Explanation --- */}
            <div>
              <p className="text-lg text-space-white/80 leading-relaxed mb-6">
                The{" "}
                <span className="text-space-cyan font-semibold">
                  Transit Method
                </span>{" "}
                is one of the most widely used techniques to discover
                exoplanets. When a planet passes in front of its host star (from
                our point of view), it causes a tiny, periodic dip in the star's
                brightness. Measuring these dips reveals valuable details about
                the planet.
              </p>
              <p className="text-lg text-space-white/80 leading-relaxed mb-6">
                From a single light curve, we can estimate:
              </p>
              <ul className="space-y-2 text-space-white/80">
                <li className="flex items-start">
                  <span className="text-space-cyan mr-2">•</span>
                  Orbital period (time between transits)
                </li>
                <li className="flex items-start">
                  <span className="text-space-cyan mr-2">•</span>
                  Planet radius (from depth of the dip)
                </li>
                <li className="flex items-start">
                  <span className="text-space-cyan mr-2">•</span>
                  Distance from its star
                </li>
                <li className="flex items-start">
                  <span className="text-space-cyan mr-2">•</span>
                  Possible habitability indicators
                </li>
              </ul>
            </div>

            {/* --- Animation --- */}
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-72 h-72">
                {/* Star */}
                <motion.div
                  className="absolute top-1/2 left-1/2 w-20 h-20 rounded-full 
                             bg-gradient-to-r from-yellow-300 to-yellow-500 
                             shadow-[0_0_40px_rgba(255,215,0,0.8)]"
                  style={{ transform: "translate(-50%, -50%)" }}
                  id="star"
                />

                {/* Planet moving left-right across star (transit) */}
                <motion.div
                  className="absolute w-6 h-6 bg-space-cyan rounded-full shadow-[0_0_15px_rgba(0,212,255,0.8)]"
                  style={{
                    top: "35%", // higher than 50% → moves above the light curve
                    transform: "translateY(-50%)",
                  }}
                  animate={{
                    x: ["-200px", "0px", "200px"], // left → cross star → right
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                {/* Light curve visualization */}
                <div className="absolute bottom-0 left-0 w-full h-24 mt-4 flex items-end">
                  <motion.svg viewBox="0 0 400 100" className="w-full h-full">
                    <motion.div
                      className="absolute w-6 h-6 bg-space-cyan rounded-full shadow-[0_0_15px_rgba(0,212,255,0.8)]"
                      style={{ top: "50%", transform: "translateY(-50%)" }}
                      animate={{
                        x: ["-200px", "0px", "200px"], // enter from left → cross star → exit right
                      }}
                      transition={{
                        duration: 10, // slower = more natural
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  </motion.svg>
                </div>
              </div>
              <p className="mt-4 text-sm text-space-white/70 italic">
                Animation: planet transiting its star → brightness dip (light
                curve).
              </p>
            </div>
          </div>
        </Card>
      </motion.div>
    );
  };

  return (
    <div className="pt-16 bg-home min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-5xl lg:text-7xl font-bold text-glow"
              >
                Exoplanetary
                <br />
                <span className="text-glow-pink">AI Explorer</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-xl text-space-white/80 max-w-2xl"
              >
                AI-powered analysis of NASA's Kepler, K2, and TESS data to
                classify exoplanets, candidates, and false positives with
                unprecedented accuracy.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/upload">
                <Button size="lg" className="w-full sm:w-auto">
                  <Upload className="w-5 h-5 mr-2" />
                  Upload Data
                </Button>
              </Link>
              <Link to="/explorer">
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  <Search className="w-5 h-5 mr-2" />
                  Explore Dataset
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <OrbitalAnimation size={400} planetCount={4} />
          </motion.div>
        </div>
      </section>

      {/* Transit Method Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <TransitMethod />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {stats.map((stat, index) => (
              <Card key={index} className="text-center p-8">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  className="text-glow mb-4 flex justify-center"
                >
                  {stat.icon}
                </motion.div>
                <h3 className="text-3xl font-bold text-glow mb-2">
                  {stat.value}
                </h3>
                <p className="text-space-white/80">{stat.label}</p>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-glow mb-4">
              Platform Features
            </h2>
            <p className="text-xl text-space-white/80 max-w-3xl mx-auto">
              Advanced machine learning tools for exoplanet detection and
              classification
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
              >
                <Card hover glow className="p-8 h-full">
                  <div className={`${feature.color} mb-6`}>{feature.icon}</div>
                  <h3 className="text-2xl font-bold text-glow mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-space-white/80 mb-6">
                    {feature.description}
                  </p>
                  <Link to={feature.link}>
                    <Button variant="outline" className="w-full">
                      Learn More
                    </Button>
                  </Link>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="card p-12"
          >
            <h2 className="text-4xl font-bold text-glow mb-6">
              Ready to Discover New Worlds?
            </h2>
            <p className="text-xl text-space-white/80 mb-8">
              Start analyzing exoplanet data with our advanced AI platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/upload">
                <Button size="lg">
                  <Upload className="w-5 h-5 mr-2" />
                  Get Started
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="secondary" size="lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
