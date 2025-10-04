import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Eye, TrendingUp } from 'lucide-react';
import { ProcessedExoplanet, ExoplanetFilters as FilterState } from '../types/exoplanet';
import { fetchTop100ExoplanetsAxios, filterExoplanets } from '../services/exoplanetService';
import ExoplanetCard from '../components/ExoplanetCard';
import ExoplanetFilters from '../components/ExoplanetFilters';
import ExoplanetCharts from '../components/ExoplanetCharts';
import ExoplanetPagination from '../components/ExoplanetPagination';
import Card from '../components/ui/Card';

const ExoplanetExplorer: React.FC = () => {
  const [exoplanets, setExoplanets] = useState<ProcessedExoplanet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);
  const [showIframe, setShowIframe] = useState(false);

  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: '',
    statusFilter: 'all',
    missionFilter: 'all',
    sortBy: 'name',
    viewMode: 'grid',
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Fetch exoplanet data on component mount
  useEffect(() => {
    const loadExoplanetData = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('🔄 ExoplanetExplorer: Starting to fetch data...');
        const data = await fetchTop100ExoplanetsAxios(); // Fetch top 100 exoplanets from NASA API
        console.log('📊 ExoplanetExplorer: Received data:', data.length, 'planets');
        console.log('📊 ExoplanetExplorer: Sample data:', data[0]);
        setExoplanets(data);
      } catch (err) {
        setError('Failed to load exoplanet data. Using fallback data.');
        console.error('❌ ExoplanetExplorer: Error loading exoplanet data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadExoplanetData();
  }, []);

  // Filter and sort exoplanets based on current filters
  const filteredExoplanets = useMemo(() => {
    return filterExoplanets(
      exoplanets,
      filters.searchTerm,
      filters.statusFilter,
      filters.missionFilter,
      filters.sortBy
    );
  }, [exoplanets, filters.searchTerm, filters.statusFilter, filters.missionFilter, filters.sortBy]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredExoplanets.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedExoplanets = filteredExoplanets.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters.searchTerm, filters.statusFilter, filters.missionFilter, filters.sortBy]);

  // Handle filter changes
  const handleFiltersChange = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  // Handle page changes
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle planet visualization
  const handleVisualize = (planetName: string) => {
    setSelectedPlanet(planetName);
    setShowIframe(true);
  };

  // Handle light curve analysis
  const handleLightCurve = (planetName: string) => {
    const searchQuery = encodeURIComponent(planetName);
    const exoMastUrl = `https://exo.mast.stsci.edu/exomast_planet.html?planet=${searchQuery}`;
    window.open(exoMastUrl, '_blank', 'noopener,noreferrer');
  };

  // Loading state
  if (loading) {
    return (
      <div className="pt-20 min-h-screen px-4 py-12 relative overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/assets/images/backgrounds/PLANETS NASA EXPLORE.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-black/50" />
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-400 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-white mb-4">
              Loading Exoplanet Data...
            </h2>
            <p className="text-gray-300">
              Fetching the latest discoveries from NASA's Exoplanet Archive
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="pt-20 min-h-screen px-4 py-12 relative overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/assets/images/backgrounds/PLANETS NASA EXPLORE.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-black/50" />
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="text-red-400 text-6xl mb-6">⚠️</div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Unable to Load Live Data
            </h2>
            <p className="text-gray-300 mb-6">
              {error} Using sample data for demonstration.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Retry
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen px-4 py-12 relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/images/backgrounds/PLANETS NASA EXPLORE.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-black/50" />
      
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-5xl font-black bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent mb-6 tracking-wider">
              EXPLORE EXOPLANETS
            </h1>
            <p className="text-xl text-gray-300 font-light tracking-wide leading-relaxed">
              Journey through the cosmos and discover worlds beyond our solar system
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Data sourced from NASA's Exoplanet Archive • {exoplanets.length} planets loaded
            </p>
          </motion.div>

          {/* Filters */}
          <ExoplanetFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
            totalCount={exoplanets.length}
            filteredCount={filteredExoplanets.length}
          />

          {/* Content */}
          {filters.viewMode === 'grid' ? (
            /* Grid View */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {paginatedExoplanets.map((planet, index) => (
                <ExoplanetCard
                  key={planet.id}
                  planet={planet}
                  index={index}
                  onVisualize={handleVisualize}
                  onLightCurve={handleLightCurve}
                />
              ))}
            </motion.div>
          ) : (
            /* Chart View */
            <ExoplanetCharts
              exoplanets={exoplanets}
              filteredExoplanets={filteredExoplanets}
            />
          )}

          {/* Pagination - only show in grid view */}
          {filters.viewMode === 'grid' && (
            <ExoplanetPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              itemsPerPage={itemsPerPage}
              totalItems={filteredExoplanets.length}
              showingStart={startIndex + 1}
              showingEnd={Math.min(endIndex, filteredExoplanets.length)}
            />
          )}

          {/* No results message */}
          {filteredExoplanets.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="text-gray-400 text-6xl mb-6">🔍</div>
              <h3 className="text-2xl font-bold text-white mb-4">
                No Planets Found
              </h3>
              <p className="text-gray-300">
                Try adjusting your search terms or filters to find more exoplanets.
              </p>
            </motion.div>
          )}

          {/* NASA Tools Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16 mb-12 space-y-8"
          >
            {/* NASA Eyes on Exoplanets Card */}
            <Card glow className="p-8">
              <div className="text-center mb-6">
                <h3 className="text-4xl font-black bg-gradient-to-r from-blue-400 via-purple-500 to-red-100 bg-clip-text text-transparent mb-4 tracking-wider">
                  EXPLORE REAL EXOPLANETS WITH NASA
                </h3>
                <p className="text-lg text-gray-300 mb-6">
                  Want to see where scientists have discovered new worlds beyond our Solar System?
                </p>
                <p className="text-gray-400 mb-8">
                  NASA offers an official interactive tool where you can explore thousands of confirmed exoplanets in 3D.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-4 rounded-lg bg-black/30 border border-cyan-400/20">
                  <div className="text-3xl mb-3">🔭</div>
                  <h4 className="text-lg font-semibold text-cyan-400 mb-2">
                    Zoom Across the Galaxy
                  </h4>
                  <p className="text-sm text-gray-300">
                    Explore confirmed exoplanets in stunning 3D visualization
                  </p>
                </div>

                <div className="text-center p-4 rounded-lg bg-black/30 border border-purple-400/20">
                  <div className="text-3xl mb-3">📏</div>
                  <h4 className="text-lg font-semibold text-purple-400 mb-2">
                    Distance & Stars
                  </h4>
                  <p className="text-sm text-gray-300">
                    Learn how far they are from Earth and what stars they orbit
                  </p>
                </div>

                <div className="text-center p-4 rounded-lg bg-black/30 border border-yellow-400/20">
                  <div className="text-3xl mb-3">🌍</div>
                  <h4 className="text-lg font-semibold text-yellow-400 mb-2">
                    Real Scientific Data
                  </h4>
                  <p className="text-sm text-gray-300">
                    Visualize systems with the same data used by astronomers
                  </p>
                </div>
              </div>

              <div className="text-center">
                <p className="text-gray-400 mb-6">
                  This is the same resource used by astronomers, now available for everyone to explore.
                </p>
                <a
                  href="https://eyes.nasa.gov/apps/exo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-12 py-4 bg-gradient-to-r from-blue-800 to-blue-900 hover:from-blue-800 hover:to-blue-950 text-white font-black text-xl rounded-2xl shadow-2xl hover:shadow-blue-900/30 transition-all duration-500 transform hover:scale-110 border border-blue-800/50 tracking-wide"
                >
                  <img
                    src="/assets/images/logos/vectorseek.com-NASA-Logo-Vector.png"
                    alt="NASA Logo"
                    className="w-9 h-8 mr-3"
                  />
                  NASA Eyes on Exoplanets
                </a>
                <p className="text-sm text-gray-500 mt-4">
                  Take a journey beyond our solar system and see what worlds are out there!
                </p>
              </div>
            </Card>

            {/* MAST Exoplanet Archive Card */}
            <Card glow className="p-8">
              <div className="text-center mb-6">
                <h3 className="text-4xl font-black bg-gradient-to-r from-green-400 via-emerald-500 to-teal-400 bg-clip-text text-transparent mb-4 tracking-wider">
                  EXOPLANET DATA WITH MAST
                </h3>
                <p className="text-lg text-gray-300 mb-6">
                  Access comprehensive exoplanet data and light curves from NASA's Mikulski Archive for Space Telescopes
                </p>
                <p className="text-gray-400 mb-8">
                  MAST provides access to astronomical data from space-based missions, including detailed exoplanet observations and light curve analysis.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-4 rounded-lg bg-black/30 border border-green-500/20">
                  <div className="text-3xl mb-3">📊</div>
                  <h4 className="text-lg font-semibold text-green-400 mb-2">
                    Light Curves
                  </h4>
                  <p className="text-sm text-gray-300">
                    Analyze brightness variations that reveal planetary transits
                  </p>
                </div>

                <div className="text-center p-4 rounded-lg bg-black/30 border border-emerald-500/20">
                  <div className="text-3xl mb-3">🛰️</div>
                  <h4 className="text-lg font-semibold text-emerald-400 mb-2">
                    Mission Data
                  </h4>
                  <p className="text-sm text-gray-300">
                    Access data from Kepler, TESS, and other space telescopes
                  </p>
                </div>

                <div className="text-center p-4 rounded-lg bg-black/30 border border-teal-500/20">
                  <div className="text-3xl mb-3">🔬</div>
                  <h4 className="text-lg font-semibold text-teal-400 mb-2">
                    Scientific Analysis
                  </h4>
                  <p className="text-sm text-gray-300">
                    Professional tools for exoplanet research and discovery
                  </p>
                </div>
              </div>

              <div className="text-center">
                <p className="text-gray-400 mb-6">
                  The same archive used by professional astronomers worldwide for exoplanet research and discovery.
                </p>
                <a
                  href="https://exo.mast.stsci.edu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-12 py-4 bg-gradient-to-r from-green-700 to-emerald-800 hover:from-green-800 hover:to-emerald-900 text-white font-black text-xl rounded-2xl shadow-2xl hover:shadow-green-900/30 transition-all duration-500 transform hover:scale-110 border border-green-700/50 tracking-wide"
                >
                  <TrendingUp className="w-8 h-8 mr-3" />
                  MAST Exoplanet Archive
                </a>
                <p className="text-sm text-gray-500 mt-4">
                  Dive deep into the data behind exoplanet discoveries!
                </p>
              </div>
            </Card>
          </motion.div>

          {/* NASA Eyes Iframe Modal */}
          {showIframe && selectedPlanet && (
            <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-start justify-center pt-20 p-4">
              <div className="relative w-full max-w-7xl h-[calc(100vh-6rem)] bg-black/95 backdrop-blur-sm rounded-2xl overflow-hidden border border-cyan-400/40 shadow-2xl">
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 bg-gradient-to-r from-cyan-900/80 to-blue-900/80 border-b border-cyan-400/40 shadow-lg">
                  <h3 className="text-2xl font-bold text-white flex items-center">
                    <Eye className="w-6 h-6 mr-3 text-cyan-400" />
                    Exploring {selectedPlanet} - NASA Eyes on Exoplanets
                  </h3>
                  <button
                    onClick={() => {
                      setShowIframe(false);
                      setSelectedPlanet(null);
                    }}
                    className="p-3 hover:bg-cyan-500/20 rounded-lg transition-all duration-200 text-cyan-400 hover:text-red-400 border border-cyan-400/30 hover:border-red-400/50"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Iframe Container */}
                <div className="relative w-full h-full p-4">
                  {/* Security Notice */}
                  <div className="mb-4 p-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/40 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <div className="text-cyan-400 text-xl">⚠️</div>
                      <div>
                        <h4 className="text-cyan-400 font-semibold mb-2">Security Notice</h4>
                        <p className="text-white/90 text-sm">
                          For security reasons, NASA's website requires manual navigation. 
                          Please use the search function within the NASA Eyes on Exoplanets 
                          interface below to find and explore your desired planet.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <iframe
                    src="https://eyes.nasa.gov/apps/exo/"
                    className="w-full border-0 rounded-lg"
                    style={{ height: 'calc(100% - 120px)' }}
                    title="NASA Eyes on Exoplanets"
                    allow="fullscreen"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExoplanetExplorer;
