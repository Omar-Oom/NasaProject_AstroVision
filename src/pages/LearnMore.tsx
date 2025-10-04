import React from "react";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Search,
  Satellite,
  BookOpen,
  Users,
  Globe,
  Star,
  Rocket,
} from "lucide-react";
import Button from "../components/ui/Button";

/**
 * Learn More Page Component
 * 
 * Educational content about exoplanets organized in sections:
 * 1. Key Concepts in Exoplanet Science
 * 2. Space Missions & Timeline
 * 3. Educational Resources
 * 4. Interactive Learning & Fun Facts
 */
const LearnMore: React.FC = () => {
  // Space missions data for Section 02
  const missions = [
    {
      name: "Kepler Space Telescope",
      period: "2009-2018",
      discoveries: "2,600+ confirmed exoplanets",
      description:
        "Revolutionary mission that discovered most known exoplanets using the transit method.",
      icon: <Search className="w-8 h-8" />,
      color: "text-space-cyan",
    },
    {
      name: "K2 Mission",
      period: "2014-2018",
      discoveries: "500+ confirmed exoplanets",
      description:
        "Extended Kepler mission that continued exoplanet hunting in different star fields.",
      icon: <Satellite className="w-8 h-8" />,
      color: "text-space-yellow",
    },
    {
      name: "TESS",
      period: "2018-Present",
      discoveries: "7,000+ planet candidates",
      description:
        "Transiting Exoplanet Survey Satellite scanning the entire sky for nearby exoplanets.",
      icon: <Star className="w-8 h-8" />,
      color: "text-space-magenta",
    },
  ];

  const resources = [
    {
      title: "NASA Exoplanet Archive",
      description: "Official database of confirmed exoplanets and candidates",
      url: "https://exoplanetarchive.ipac.caltech.edu/",
      type: "Database",
    },
    {
      title: "Exoplanet Exploration (NASA)",
      description: "Educational resources and latest discoveries",
      url: "https://exoplanets.nasa.gov/",
      type: "Educational",
    },
    {
      title: "Kepler/K2 Science Center",
      description: "Mission data and analysis tools",
      url: "https://keplerscience.arc.nasa.gov/",
      type: "Research",
    },
    {
      title: "TESS Mission Website",
      description: "Current mission status and discoveries",
      url: "https://tess.mit.edu/",
      type: "Mission",
    },
    {
      title: "Planet Hunters",
      description: "Citizen science project for finding exoplanets",
      url: "https://www.planethunters.org/",
      type: "Citizen Science",
    },
    {
      title: "Exoplanet Travel Bureau",
      description: "Creative visualizations of exoplanets",
      url: "https://exoplanets.nasa.gov/alien-worlds/exoplanet-travel-bureau/",
      type: "Visualization",
    },
  ];

  const concepts = [
    {
      title: "Transit Photometry",
      description:
        "The primary method for detecting exoplanets by measuring the dimming of starlight when a planet passes in front of its host star.",
      details: [
        "Measures periodic dips in stellar brightness",
        "Can determine planet size and orbital period",
        "Requires precise photometric measurements",
        "Most successful detection method to date",
      ],
    },
    {
      title: "Habitable Zone",
      description:
        'The region around a star where liquid water could exist on a planet\'s surface, also known as the "Goldilocks Zone".',
      details: [
        "Distance depends on star's temperature and size",
        "Too close: water boils away",
        "Too far: water freezes",
        "Key factor in assessing habitability",
      ],
    },
    {
      title: "False Positives",
      description:
        "Signals that mimic planetary transits but are caused by other astrophysical phenomena.",
      details: [
        "Eclipsing binary star systems",
        "Background eclipsing binaries",
        "Stellar activity and spots",
        "Instrumental artifacts",
      ],
    },
    {
      title: "Machine Learning in Exoplanet Detection",
      description:
        "AI algorithms that help identify planetary signals in noisy data and distinguish real planets from false positives.",
      details: [
        "Pattern recognition in light curves",
        "Automated candidate classification",
        "Noise reduction and signal enhancement",
        "Scalable analysis of large datasets",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Page Background Image */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage:
            'url("/assets/images/backgrounds/learn%20more%20background.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed"
        }}
      />
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Main Content Container */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* ========== SECTION 01: KEY CONCEPTS ========== */}
        <section className="relative flex-1 flex items-center px-8 py-20">
          <div className="relative z-10 max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
            {/* Key Concepts Information */}
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
                    KEY CONCEPTS
                  </h1>
                </div>
              </div>

              <div className="space-y-6 text-white/80 text-lg leading-relaxed max-w-lg">
                <p>
                  Understanding the fundamental principles behind exoplanet 
                  detection and the methods scientists use to discover 
                  distant worlds orbiting other stars.
                </p>
                <p>Essential concepts include:</p>
                <ul className="space-y-2 text-white/80">
                  <li className="flex items-start">
                    <span className="text-white/40 mr-2">•</span>
                    Transit photometry and light curve analysis
                  </li>
                  <li className="flex items-start">
                    <span className="text-white/40 mr-2">•</span>
                    Habitable zones and planetary characteristics
                  </li>
                  <li className="flex items-start">
                    <span className="text-white/40 mr-2">•</span>
                    False positive identification and validation
                  </li>
                  <li className="flex items-start">
                    <span className="text-white/40 mr-2">•</span>
                    Machine learning applications in astronomy
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Concept Cards */}
            <div className="grid gap-6">
              {concepts.slice(0, 2).map((concept, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:bg-black/60 transition-all duration-300"
                >
                  <h3 className="text-xl font-bold text-white mb-3">
                    {concept.title}
                  </h3>
                  <p className="text-white/70 mb-4">{concept.description}</p>
                  <ul className="space-y-1">
                    {concept.details.slice(0, 2).map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-white/60 text-sm">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== SECTION 02: SPACE MISSIONS ========== */}
        <section className="flex-1 flex items-center px-8 py-20 bg-black/20">
          <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
            {/* Mission Information */}
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
                    SPACE MISSIONS
                  </h1>
                </div>
              </div>

              <div className="space-y-6 text-white/80 text-lg leading-relaxed max-w-lg">
                <p>
                  Revolutionary space telescopes have transformed our understanding 
                  of exoplanets, discovering thousands of distant worlds through 
                  precise photometric observations and advanced detection methods.
                </p>
                <p>Major missions include:</p>
                <ul className="space-y-2 text-white/80">
                  <li className="flex items-start">
                    <span className="text-white/40 mr-2">•</span>
                    Kepler Space Telescope (2009-2018)
                  </li>
                  <li className="flex items-start">
                    <span className="text-white/40 mr-2">•</span>
                    K2 Extended Mission (2014-2018)
                  </li>
                  <li className="flex items-start">
                    <span className="text-white/40 mr-2">•</span>
                    TESS All-Sky Survey (2018-Present)
                  </li>
                  <li className="flex items-start">
                    <span className="text-white/40 mr-2">•</span>
                    James Webb Space Telescope (2021-Present)
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Mission Cards */}
            <div className="grid gap-6">
              {missions.map((mission, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:bg-black/60 transition-all duration-300"
                >
                  <div className={`${mission.color} mb-4`}>{mission.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {mission.name}
                  </h3>
                  <p className="text-cyan-400 font-medium mb-2">{mission.period}</p>
                  <p className="text-yellow-400 font-semibold mb-3">{mission.discoveries}</p>
                  <p className="text-white/70 text-sm">{mission.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== SECTION 03: EDUCATIONAL RESOURCES ========== */}
        <section className="flex-1 flex items-center px-8 py-20 bg-black/10">
          <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
            {/* Resources Overview */}
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
                    RESOURCES
                  </h1>
                </div>
              </div>

              <div className="space-y-6 text-white/80 text-lg leading-relaxed max-w-lg">
                <p>
                  Explore comprehensive educational materials, databases, and 
                  interactive tools to deepen your understanding of exoplanet 
                  science and participate in citizen science projects.
                </p>
                <p>Available resources:</p>
                <ul className="space-y-2 text-white/80">
                  <li className="flex items-start">
                    <span className="text-white/40 mr-2">•</span>
                    NASA's official exoplanet databases and archives
                  </li>
                  <li className="flex items-start">
                    <span className="text-white/40 mr-2">•</span>
                    Mission data and analysis tools
                  </li>
                  <li className="flex items-start">
                    <span className="text-white/40 mr-2">•</span>
                    Citizen science participation platforms
                  </li>
                  <li className="flex items-start">
                    <span className="text-white/40 mr-2">•</span>
                    Educational visualizations and simulations
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Resource Cards */}
            <div className="grid gap-4 max-h-96 overflow-y-auto">
              {resources.slice(0, 4).map((resource, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg p-4 hover:bg-black/60 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-white flex-1">
                      {resource.title}
                    </h3>
                    <span className="text-xs bg-cyan-400/20 text-cyan-400 px-2 py-1 rounded-full ml-2">
                      {resource.type}
                    </span>
                  </div>
                  <p className="text-white/70 text-sm mb-3">{resource.description}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => window.open(resource.url, "_blank")}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Visit Resource
                  </Button>
                </motion.div>
              ))}
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
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-cyan-400/20 rounded-full">
                  <Rocket className="w-12 h-12 text-cyan-400" />
                </div>
              </div>
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to Become an Exoplanet Hunter?
              </h2>
              <p className="text-lg text-white/80 mb-8">
                Join thousands of citizen scientists helping to discover new
                worlds. Your contributions could lead to the next major
                exoplanet discovery!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={() =>
                    window.open("https://www.planethunters.org/", "_blank")
                  }
                  className="bg-gradient-to-r from-blue-500 via-purple-600 to-green-600
                  px-8 py-4 text-lg text-white rounded-3xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30 hover:scale-105"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Join Planet Hunters
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-4 border-white text-white hover:bg-white hover:text-black"
                  onClick={() =>
                    window.open("https://exoplanets.nasa.gov/", "_blank")
                  }
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  NASA Exoplanets
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LearnMore;
