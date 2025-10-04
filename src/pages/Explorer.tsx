import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Globe, Star, Zap, Target } from "lucide-react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

interface Exoplanet {
  id: string;
  name: string;
  classification: "Confirmed" | "Candidate" | "False Positive";
  orbitalPeriod: number;
  planetRadius: number;
  stellarRadius: number;
  stellarMass: number;
  stellarTemperature: number;
  mission: "Kepler" | "K2" | "TESS";
  discoveryYear: number;
  x: number;
  y: number;
}

const Explorer: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClassification, setSelectedClassification] =
    useState<string>("All");
  const [selectedMission, setSelectedMission] = useState<string>("All");
  const [hoveredPlanet, setHoveredPlanet] = useState<Exoplanet | null>(null);

  // Mock data for visualization
  const exoplanets: Exoplanet[] = useMemo(() => {
    const classifications: ("Confirmed" | "Candidate" | "False Positive")[] = [
      "Confirmed",
      "Candidate",
      "False Positive",
    ];
    const missions: ("Kepler" | "K2" | "TESS")[] = ["Kepler", "K2", "TESS"];

    return Array.from({ length: 150 }, (_, i) => {
      const classification =
        classifications[Math.floor(Math.random() * classifications.length)];
      const mission = missions[Math.floor(Math.random() * missions.length)];
      const orbitalPeriod = Math.random() * 1000 + 1;
      const planetRadius = Math.random() * 20 + 0.5;

      return {
        id: `planet-${i}`,
        name: `Exoplanet ${i + 1}`,
        classification,
        orbitalPeriod,
        planetRadius,
        stellarRadius: Math.random() * 2 + 0.5,
        stellarMass: Math.random() * 2 + 0.3,
        stellarTemperature: Math.random() * 3000 + 3000,
        mission,
        discoveryYear: Math.floor(Math.random() * 20) + 2004,
        x: Math.random() * 800 + 100,
        y: Math.random() * 400 + 100,
      };
    });
  }, []);

  const filteredPlanets = useMemo(() => {
    return exoplanets.filter((planet) => {
      const matchesSearch = planet.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesClassification =
        selectedClassification === "All" ||
        planet.classification === selectedClassification;
      const matchesMission =
        selectedMission === "All" || planet.mission === selectedMission;

      return matchesSearch && matchesClassification && matchesMission;
    });
  }, [exoplanets, searchTerm, selectedClassification, selectedMission]);

  const getClassificationColor = (classification: string) => {
    switch (classification) {
      case "Confirmed":
        return "#00d4ff";
      case "Candidate":
        return "#ffd700";
      case "False Positive":
        return "#ff0080";
      default:
        return "#ffffff";
    }
  };

  const getMissionColor = (mission: string) => {
    switch (mission) {
      case "Kepler":
        return "#00d4ff";
      case "K2":
        return "#ffd700";
      case "TESS":
        return "#ff0080";
      default:
        return "#ffffff";
    }
  };

  const stats = {
    total: exoplanets.length,
    confirmed: exoplanets.filter((p) => p.classification === "Confirmed")
      .length,
    candidates: exoplanets.filter((p) => p.classification === "Candidate")
      .length,
    falsePositives: exoplanets.filter(
      (p) => p.classification === "False Positive"
    ).length,
  };

  return (
    <div className="pt-20 min-h-screen px-4 py-12 bg-explorer">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-glow mb-4">Data Explorer</h1>
          <p className="text-xl text-space-white/80">
            Interactive visualization of exoplanet data from Kepler, K2, and
            TESS missions
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8"
        >
          <Card className="p-6 text-center">
            <Globe className="w-8 h-8 text-space-cyan mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-glow">{stats.total}</h3>
            <p className="text-space-white/80">Total Exoplanets</p>
          </Card>
          <Card className="p-6 text-center">
            <Star className="w-8 h-8 text-space-cyan mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-glow">{stats.confirmed}</h3>
            <p className="text-space-white/80">Confirmed</p>
          </Card>
          <Card className="p-6 text-center">
            <Target className="w-8 h-8 text-space-yellow mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-glow">{stats.candidates}</h3>
            <p className="text-space-white/80">Candidates</p>
          </Card>
          <Card className="p-6 text-center">
            <Zap className="w-8 h-8 text-space-magenta mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-glow">
              {stats.falsePositives}
            </h3>
            <p className="text-space-white/80">False Positives</p>
          </Card>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <Card className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Input
                  label="Search"
                  placeholder="Search exoplanets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-space-cyan mb-2">
                  Classification
                </label>
                <select
                  value={selectedClassification}
                  onChange={(e) => setSelectedClassification(e.target.value)}
                  className="input-field w-full"
                >
                  <option value="All">All Classifications</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Candidate">Candidate</option>
                  <option value="False Positive">False Positive</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-space-cyan mb-2">
                  Mission
                </label>
                <select
                  value={selectedMission}
                  onChange={(e) => setSelectedMission(e.target.value)}
                  className="input-field w-full"
                >
                  <option value="All">All Missions</option>
                  <option value="Kepler">Kepler</option>
                  <option value="K2">K2</option>
                  <option value="TESS">TESS</option>
                </select>
              </div>

              <div className="flex items-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedClassification("All");
                    setSelectedMission("All");
                  }}
                  className="w-full"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Clear Filters
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="p-6">
            <h3 className="text-2xl font-bold text-glow mb-6">Orbital Map</h3>
            <div className="relative bg-black/50 rounded-lg p-8 min-h-[500px] overflow-hidden">
              {/* Background grid */}
              <div className="absolute inset-0 opacity-40">
                <svg width="100%" height="100%">
                  <defs>
                    <pattern
                      id="grid"
                      width="40"
                      height="40"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M 40 0 L 0 0 0 40"
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="1"
                      />
                      <circle
                        cx="0"
                        cy="0"
                        r="1"
                        fill="#00d4ff"
                        opacity="0.8"
                      />
                      <circle
                        cx="40"
                        cy="40"
                        r="1"
                        fill="#ff0080"
                        opacity="0.6"
                      />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>

              {/* Exoplanets */}
              {filteredPlanets.map((planet) => (
                <motion.div
                  key={planet.id}
                  className="absolute cursor-pointer"
                  style={{
                    left: planet.x,
                    top: planet.y,
                  }}
                  whileHover={{ scale: 1.2 }}
                  onHoverStart={() => setHoveredPlanet(planet)}
                  onHoverEnd={() => setHoveredPlanet(null)}
                >
                  <div
                    className="w-4 h-4 rounded-full border-2 border-white shadow-lg"
                    style={{
                      backgroundColor: getClassificationColor(
                        planet.classification
                      ),
                      boxShadow: `0 0 10px ${getClassificationColor(
                        planet.classification
                      )}`,
                    }}
                  />
                </motion.div>
              ))}

              {/* Legend */}
              <div className="absolute top-4 right-4 bg-black/90 backdrop-blur-sm rounded-lg p-4 space-y-2 border border-white/20">
                <h4 className="text-sm font-semibold text-space-cyan mb-2">
                  Classification
                </h4>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-space-cyan"></div>
                    <span className="text-xs text-space-white">Confirmed</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-space-yellow"></div>
                    <span className="text-xs text-space-white">Candidate</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-space-magenta"></div>
                    <span className="text-xs text-space-white">
                      False Positive
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Planet Details Tooltip */}
        {hoveredPlanet && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed z-50 bg-black/95 backdrop-blur-sm border border-white/30 rounded-lg p-4 shadow-2xl"
            style={{
              left: hoveredPlanet.x + 20,
              top: hoveredPlanet.y - 100,
              pointerEvents: "none",
            }}
          >
            <h4 className="text-lg font-bold text-glow mb-2">
              {hoveredPlanet.name}
            </h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-space-white/80">Classification:</span>
                <span
                  className={getClassificationColor(
                    hoveredPlanet.classification
                  )}
                >
                  {hoveredPlanet.classification}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-space-white/80">Mission:</span>
                <span style={{ color: getMissionColor(hoveredPlanet.mission) }}>
                  {hoveredPlanet.mission}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-space-white/80">Orbital Period:</span>
                <span className="text-space-white">
                  {hoveredPlanet.orbitalPeriod.toFixed(2)} days
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-space-white/80">Planet Radius:</span>
                <span className="text-space-white">
                  {hoveredPlanet.planetRadius.toFixed(2)} R⊕
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-space-white/80">Discovery Year:</span>
                <span className="text-space-white">
                  {hoveredPlanet.discoveryYear}
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* NASA Exoplanet Exploration Tool */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8"
        >
          <Card glow className="p-8">
            <div className="text-center mb-6">
              <h3 className="text-3xl font-bold text-glow mb-4">
                🌌 Explore Real Exoplanets with NASA
              </h3>
              <p className="text-lg text-space-white/90 mb-6">
                Want to see where scientists have discovered new worlds beyond
                our Solar System?
              </p>
              <p className="text-space-white/80 mb-8">
                NASA offers an official interactive tool where you can explore
                thousands of confirmed exoplanets in 3D.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4 rounded-lg bg-black/30 border border-space-cyan/20">
                <div className="text-3xl mb-3">🔭</div>
                <h4 className="text-lg font-semibold text-space-cyan mb-2">
                  Zoom Across the Galaxy
                </h4>
                <p className="text-sm text-space-white/70">
                  Explore confirmed exoplanets in stunning 3D visualization
                </p>
              </div>

              <div className="text-center p-4 rounded-lg bg-black/30 border border-space-magenta/20">
                <div className="text-3xl mb-3">📏</div>
                <h4 className="text-lg font-semibold text-space-magenta mb-2">
                  Distance & Stars
                </h4>
                <p className="text-sm text-space-white/70">
                  Learn how far they are from Earth and what stars they orbit
                </p>
              </div>

              <div className="text-center p-4 rounded-lg bg-black/30 border border-space-yellow/20">
                <div className="text-3xl mb-3">🌍</div>
                <h4 className="text-lg font-semibold text-space-yellow mb-2">
                  Real Scientific Data
                </h4>
                <p className="text-sm text-space-white/70">
                  Visualize systems with the same data used by astronomers
                </p>
              </div>
            </div>

            <div className="text-center">
              <p className="text-space-white/80 mb-6">
                This is the same resource used by astronomers, now available for
                everyone to explore.
              </p>
              <a
                href="https://eyes.nasa.gov/apps/exo/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-900 to-blue-1000 text-white font-bold text-lg rounded-xl hover:shadow-[0_0_30px_rgba(29,78,216,0.6)] transition-all duration-300 transform hover:scale-105 border border-blue-600/30"
              >
                <img
                  src="/assets/images/logos/vectorseek.com-NASA-Logo-Vector.png"
                  alt="NASA Logo"
                  className="w-9 h-8 mr-3"
                />
                NASA Eyes on Exoplanets
                <span className="ml-3"></span>
              </a>
              <p className="text-sm text-space-white/60 mt-4">
                Take a journey beyond our solar system and see what worlds are
                out there!
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Results Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="mt-8"
        >
          <Card className="p-6">
            <h3 className="text-xl font-bold text-glow mb-4">
              Results Summary
            </h3>
            <p className="text-space-white/80">
              Showing {filteredPlanets.length} of {exoplanets.length} exoplanets
              {searchTerm && ` matching "${searchTerm}"`}
              {selectedClassification !== "All" &&
                ` classified as ${selectedClassification}`}
              {selectedMission !== "All" && ` from ${selectedMission} mission`}
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Explorer;
