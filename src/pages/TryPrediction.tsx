import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, ExternalLink, Sparkles, Zap } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const TryPrediction: React.FC = () => {
  const [showAIModel, setShowAIModel] = useState(false);


  return (
    <div className="pt-20 min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: 'url("/assets/images/backgrounds/tryprediciton.webp")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed"
        }}
      />
      {/* Enhanced overlay for better text readability and professional look */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60" />
      
      {/* Main Content */}
      <div className="relative z-10 px-4 py-12">
        <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-6">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-red-300 via-pink-300 to-purple-300 bg-clip-text text-transparent mb-6 tracking-wider">
              Try Planet Detection
            </h1>
          </div>
          <p className="text-xl text-white/95 max-w-4xl mx-auto leading-relaxed mb-12">
            Experience the power of our comprehensive exoplanet detection system. Our unified AI platform combines 4 specialized models: 
            104-Input Kepler (94.5% accuracy), K2 Mission (78.8%), Kepler Mission (74.3%), and TESS Mission (69.2%). 
            Access our professional machine learning interface with advanced ensemble prediction capabilities.
          </p>
          
          {/* Single Launch Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12 flex justify-center"
          >
            <Button
              onClick={() => setShowAIModel(true)}
              className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-700 hover:via-pink-700 hover:to-red-700 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 px-12 py-6 text-2xl font-bold rounded-2xl border-2 border-white/30 hover:border-white/60 shadow-2xl shadow-purple-500/30"
              size="lg"
            >
              <Brain className="w-8 h-8 mr-4" />
              Launch AI Prediction Suite
              <Sparkles className="w-6 h-6 ml-4 animate-pulse" />
            </Button>
          </motion.div>
          
          <div className="flex justify-center items-center space-x-4">
            <div className="w-16 h-0.5 bg-red-400/60 rounded-full"></div>
            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
            <div className="w-16 h-0.5 bg-red-400/60 rounded-full"></div>
          </div>
        </motion.div>

        {/* Feature Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <Card className="p-12 bg-black/70 backdrop-blur-md border border-white/30 hover:border-white/50 transition-all duration-500 shadow-2xl shadow-red-500/10">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-red-300 via-pink-300 to-purple-300 bg-clip-text text-transparent mb-6 tracking-wider">
                Unified AI Prediction Platform
              </h2>
              <p className="text-lg text-white/90 max-w-4xl mx-auto leading-relaxed">
                Our advanced ensemble system combines the power of 4 specialized NASA mission models to deliver comprehensive exoplanet detection capabilities. 
                The unified platform automatically leverages the best-performing model for each prediction scenario.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { 
                  name: '104-Input Kepler', 
                  accuracy: '94.5%', 
                  features: '104', 
                  algorithm: 'GradientBoosting',
                  description: 'Flagship model with comprehensive feature set',
                  color: 'from-green-500 to-green-600'
                },
                { 
                  name: 'K2 Mission', 
                  accuracy: '78.8%', 
                  features: '18', 
                  algorithm: 'LightGBM',
                  description: 'Optimized for K2 mission characteristics',
                  color: 'from-cyan-500 to-cyan-600'
                },
                { 
                  name: 'Kepler Mission', 
                  accuracy: '74.3%', 
                  features: '15', 
                  algorithm: 'LightGBM',
                  description: 'Classical Kepler mission model',
                  color: 'from-blue-500 to-blue-600'
                },
                { 
                  name: 'TESS Mission', 
                  accuracy: '69.2%', 
                  features: '14', 
                  algorithm: 'XGBoost',
                  description: 'Specialized for TESS data patterns',
                  color: 'from-yellow-500 to-yellow-600'
                }
              ].map((model, index) => (
                <div key={index} className="text-center group">
                  <div className={`w-16 h-16 bg-gradient-to-r ${model.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-base font-semibold text-white mb-1 tracking-wide">{model.name}</h3>
                  <p className="text-sm text-green-400 font-semibold mb-1">{model.accuracy}</p>
                  <p className="text-xs text-white/60 mb-1">{model.features} features</p>
                  <p className="text-xs text-white/70 leading-relaxed">
                    {model.description}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>


        {/* AI Model Modal */}
        {showAIModel && (
          <div className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="relative w-full max-w-[95vw] h-[90vh] bg-black/95 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/40 shadow-2xl">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-white/10 to-white/5 border-b border-white/40 shadow-lg">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center">
                    <Brain className="w-5 h-5 mr-2 text-white" />
                    NASA Exoplanet AI Prediction Suite
                  </h3>
                  <p className="text-white/70 text-xs mt-1">
                    4 Models: 104-Input Kepler • K2 • Kepler • TESS
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <a
                    href="http://localhost:8501"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-1.5 bg-white text-black font-semibold rounded-lg transition-all duration-300 hover:bg-gray-200 hover:scale-105 text-sm"
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    New Tab
                  </a>
                  <button
                    onClick={() => setShowAIModel(false)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-all duration-200 text-white hover:text-red-400 border border-white/30 hover:border-red-400/50 hover:bg-red-500/20"
                    title="Close Modal"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* AI Model Info - Compact */}
              <div className="p-2 bg-white/5 border-b border-white/40">
                <div className="flex items-center space-x-2">
                  <div className="text-white text-sm">🤖</div>
                  <div>
                    <h4 className="text-white font-semibold text-sm">Multi-Model Ensemble System</h4>
                    <p className="text-white/80 text-xs">
                      Accuracies: 104-Input Kepler (94.5%) • K2 (78.8%) • Kepler (74.3%) • TESS (69.2%)
                    </p>
                  </div>
                </div>
              </div>
              
              <iframe
                src="http://localhost:8501"
                className="w-full border-0"
                style={{ height: 'calc(100% - 100px)' }}
                title="NASA Exoplanet AI Prediction Suite"
                allow="fullscreen"
                loading="lazy"
              />
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default TryPrediction;
