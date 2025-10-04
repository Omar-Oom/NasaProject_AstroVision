import React from "react";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Brain,
  Database,
  BarChart3,
  TestTube,
  Target,
  Users,
  BookOpen,
  Globe,
  Star,
  Rocket,
  Microscope,
  Sparkles,
  TrendingUp,
  Shield,
  Zap,
} from "lucide-react";
import Button from "../components/ui/Button";
import { useUserMode } from "../contexts/UserModeContext";

/**
 * About Our Model Page Component
 * 
 * Comprehensive information about the exoplanet detection model organized in sections:
 * 1. Introduction to the Model
 * 2. Scientific Foundation
 * 3. Model Architecture & Approach
 * 4. Experiments & Validation
 * 5. Results & Insights
 * 6. For Researchers
 * 7. For Explorers
 */
const AboutOurModel: React.FC = () => {
  const { isResearcher } = useUserMode();

  // Model features and capabilities
  const modelFeatures = [
    {
      title: "Multi-Method Detection",
      description: "Combines transit photometry, radial velocity, and direct imaging data",
      icon: <Target className="w-8 h-8" />,
      color: "text-cyan-400",
    },
    {
      title: "Real-time Processing",
      description: "Processes telescope data streams in real-time for immediate results",
      icon: <Zap className="w-8 h-8" />,
      color: "text-yellow-400",
    },
    {
      title: "Habitable Zone Analysis",
      description: "Automatically calculates and visualizes habitable zones for discovered planets",
      icon: <Globe className="w-8 h-8" />,
      color: "text-green-400",
    },
    {
      title: "False Positive Filtering",
      description: "Advanced ML algorithms to distinguish real planets from stellar activity",
      icon: <Shield className="w-8 h-8" />,
      color: "text-red-400",
    },
  ];

  // Scientific methods and data sources - Based on actual model performance
  const scientificMethods = [
    {
      name: "104-Input Kepler Model",
      description: "Flagship model with 104 comprehensive features achieving best performance",
      accuracy: "94.5%",
      auc: "99.0%",
      features: "104",
      algorithm: "LightGBM",
      icon: <Star className="w-6 h-6" />,
    },
    {
      name: "K2 Mission Model",
      description: "Specialized model for K2 mission characteristics and data quality",
      accuracy: "78.8%",
      auc: "90.5%",
      features: "18",
      algorithm: "LightGBM",
      icon: <TrendingUp className="w-6 h-6" />,
    },
    {
      name: "Kepler Mission Model",
      description: "Classical Kepler mission model with standard feature set",
      accuracy: "74.3%",
      auc: "88.7%",
      features: "15",
      algorithm: "LightGBM",
      icon: <Shield className="w-6 h-6" />,
    },
    {
      name: "TESS Mission Model",
      description: "High-performance model for TESS data with excellent accuracy",
      accuracy: "69.2%",
      auc: "85.0%",
      features: "14",
      algorithm: "XGBoost",
      icon: <Globe className="w-6 h-6" />,
    },
  ];

  // Data sources - Based on actual datasets used
  const dataSources = [
    {
      name: "Kepler Mission Data",
      records: "kepler_clean.csv",
      description: "Classical Kepler mission data with transit photometry measurements and orbital parameters",
    },
    {
      name: "K2 Mission Data",
      records: "k2_clean.csv",
      description: "K2 mission data optimized for different observing strategy and field characteristics",
    },
    {
      name: "TESS Mission Data",
      records: "tess_clean.csv",
      description: "TESS mission data with improved sensitivity and all-sky survey coverage",
    },
    {
      name: "104-Feature Dataset",
      records: "df_new.csv",
      description: "Comprehensive feature set with 104 input parameters for advanced classification",
    },
  ];

  // Model performance metrics - Actual results from our analysis
  const performanceMetrics = [
    { metric: "104-Input Kepler Accuracy", value: "94.5%", color: "text-green-400" },
    { metric: "104-Input Kepler AUC-ROC", value: "0.9906", color: "text-cyan-400" },
    { metric: "K2 Mission Accuracy", value: "78.8%", color: "text-blue-400" },
    { metric: "Kepler Mission Accuracy", value: "74.3%", color: "text-yellow-400" },
    { metric: "TESS Mission Accuracy", value: "69.2%", color: "text-purple-400" },
    { metric: "Best Algorithm", value: "LightGBM", color: "text-pink-400" },
  ];

  // Key findings - Based on actual model results
  const keyFindings = [
    {
      title: "104-Input Model Excellence",
      description: "Flagship Kepler model achieves 94.5% accuracy with 0.9906 AUC-ROC, best performance across all models",
      impact: "High",
      icon: <Target className="w-6 h-6" />,
    },
    {
      title: "Multi-Mission Approach",
      description: "Specialized models for K2 (78.8%), Kepler (74.3%), and TESS (69.2%) missions with optimized feature sets",
      impact: "High",
      icon: <Brain className="w-6 h-6" />,
    },
    {
      title: "Algorithm Diversity",
      description: "LightGBM dominates most models, while XGBoost excels on TESS data, showing mission-specific optimization",
      impact: "High",
      icon: <Database className="w-6 h-6" />,
    },
    {
      title: "Feature Engineering Excellence",
      description: "From 14 features (TESS) to 104 features (Kepler), comprehensive feature engineering drives performance",
      impact: "High",
      icon: <BarChart3 className="w-6 h-6" />,
    },
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Page Background Image */}
       <div
         className="absolute inset-0 w-full h-full"
         style={{
           backgroundImage:
             'url("/assets/images/backgrounds/home background.png")',
           backgroundSize: "cover",
           backgroundPosition: "center",
           backgroundAttachment: "fixed"
         }}
       />
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Main Content Container */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* ========== SECTION 01: INTRODUCTION TO THE MODEL ========== */}
        <section className="relative flex-1 flex items-center px-8 py-20">
          <div className="relative z-10 max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
            {/* Introduction Information */}
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
                    INTRODUCTION
                  </h1>
                </div>
              </div>

              <div className="space-y-6 text-white/95 text-lg leading-relaxed max-w-lg">
                <p>
                  Our advanced exoplanet detection model represents a breakthrough 
                  in astronomical data analysis, combining cutting-edge machine learning 
                  with decades of space mission data to discover and characterize 
                  distant worlds.
                </p>
                <p><strong className="text-white">What the model does:</strong></p>
                <ul className="space-y-2 text-white/95">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    Predicts and identifies exoplanet candidates from telescope data
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    Analyzes habitable zone potential and planetary characteristics
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    Filters out false positives and stellar activity signals
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    Provides real-time analysis of ongoing space missions
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Model Features Cards */}
            <div className="grid gap-6">
              {modelFeatures.slice(0, 2).map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="bg-black/60 backdrop-blur-sm border border-white/20 rounded-lg p-6 hover:bg-black/70 transition-all duration-300"
                >
                  <div className={`${feature.color} mb-4`}>{feature.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-white/85">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== SECTION 02: SCIENTIFIC FOUNDATION ========== */}
        <section className="flex-1 flex items-center px-8 py-20 bg-black/30">
          <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
            {/* Scientific Foundation Information */}
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
                    SCIENTIFIC FOUNDATION
                  </h1>
                </div>
              </div>

              <div className="space-y-6 text-white/95 text-lg leading-relaxed max-w-lg">
                <p>
                  Our model is built on the Kepler Mission's transit photometry data, 
                  using machine learning to classify Kepler Objects of Interest (KOI) 
                  into three categories: CANDIDATE, CONFIRMED, and FALSE POSITIVE.
                </p>
                <p><strong>Key Features Used:</strong></p>
                <ul className="space-y-2 text-white/95">
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    KOI score and quality flags for reliability assessment
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    Transit parameters (period, depth, duration)
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    Stellar properties (temperature, radius, mass)
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    Planetary characteristics and orbital elements
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Detection Methods Grid */}
            <div className="grid grid-cols-2 gap-4">
              {scientificMethods.map((method, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="bg-black/60 backdrop-blur-sm border border-white/20 rounded-lg p-4 hover:bg-black/70 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-cyan-400">{method.icon}</div>
                    <span className="text-green-400 font-bold text-sm">{method.accuracy}</span>
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1">{method.name}</h3>
                  <p className="text-white/85 text-xs">{method.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== SECTION 03: MODEL ARCHITECTURE ========== */}
        <section className="flex-1 flex items-center px-8 py-20 bg-black/20">
          <div className="max-w-7xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="flex items-center justify-center space-x-6 mb-8">
                <div className="text-8xl font-bold text-cyan-300/60 leading-none">
                  03
                </div>
                <div>
                  <h1 className="text-5xl font-bold text-white tracking-wider leading-tight">
                    MODEL ARCHITECTURE
                  </h1>
                </div>
              </div>
              <p className="text-white/95 text-lg max-w-4xl mx-auto">
                Our model employs a comprehensive machine learning approach, testing 17 different algorithms 
                and selecting HistGradientBoosting as the optimal solution for exoplanet classification 
                with exceptional performance metrics.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Architecture Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-black/60 backdrop-blur-sm border border-white/20 rounded-lg p-6"
              >
                <div className="text-cyan-400 mb-4">
                  <Brain className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Flagship Model: 104-Input Kepler</h3>
                <ul className="space-y-2 text-white/85">
                  <li>• Algorithm: LightGBM (optimized)</li>
                  <li>• Features: 104 comprehensive inputs</li>
                  <li>• Accuracy: 94.5%</li>
                  <li>• Test AUC-ROC: 0.9906</li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="bg-black/60 backdrop-blur-sm border border-white/20 rounded-lg p-6"
              >
                <div className="text-yellow-400 mb-4">
                  <Database className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Multi-Mission Dataset</h3>
                <ul className="space-y-2 text-white/85">
                  <li>• Kepler: 9,564 samples (104 features)</li>
                  <li>• K2: 4,006 samples (18 features)</li>
                  <li>• TESS: 7,695 samples (14 features)</li>
                  <li>• 3 classes: CANDIDATE, CONFIRMED, FALSE POSITIVE</li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="bg-black/60 backdrop-blur-sm border border-white/20 rounded-lg p-6"
              >
                <div className="text-green-400 mb-4">
                  <BarChart3 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Mission Model Comparison</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white/85 text-sm">104-Input Kepler</span>
                    <span className="text-green-400 font-bold">94.5%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/85 text-sm">K2 Mission</span>
                    <span className="text-cyan-400 font-bold">78.8%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/85 text-sm">Kepler Mission</span>
                    <span className="text-blue-400 font-bold">74.3%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/85 text-sm">TESS Mission</span>
                    <span className="text-yellow-400 font-bold">69.2%</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ========== SECTION 04: EXPERIMENTS & VALIDATION ========== */}
        <section className="flex-1 flex items-center px-8 py-20 bg-black/30">
          <div className="max-w-7xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="flex items-center justify-center space-x-6 mb-8">
                <div className="text-8xl font-bold text-purple-400/60 leading-none">
                  04
                </div>
                <div>
                  <h1 className="text-5xl font-bold text-white tracking-wider leading-tight">
                    EXPERIMENTS & VALIDATION
                  </h1>
                </div>
              </div>
              <p className="text-white/95 text-lg max-w-4xl mx-auto">
                Our comprehensive evaluation tested 17 different machine learning algorithms 
                using 3-fold cross-validation and randomized hyperparameter search to ensure 
                optimal performance and reliability.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Validation Methods */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold text-white mb-6">Validation Process</h3>
                <div className="space-y-4">
                  <div className="bg-black/60 backdrop-blur-sm border border-white/20 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-white mb-2">3-Fold Cross-Validation</h4>
                    <p className="text-white/85 text-sm">Stratified CV on 6,694 training samples</p>
                  </div>
                  <div className="bg-black/60 backdrop-blur-sm border border-white/20 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-white mb-2">Holdout Testing</h4>
                    <p className="text-white/85 text-sm">30% holdout set (2,870 samples) with known KOI labels</p>
                  </div>
                  <div className="bg-black/60 backdrop-blur-sm border border-white/20 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-white mb-2">Hyperparameter Optimization</h4>
                    <p className="text-white/85 text-sm">RandomizedSearchCV with 12 iterations per algorithm</p>
                  </div>
                </div>
              </motion.div>

              {/* Performance Results */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold text-white mb-6">Performance Results</h3>
                <div className="space-y-4">
                  {performanceMetrics.map((metric, index) => (
                    <div key={index} className="bg-black/60 backdrop-blur-sm border border-white/20 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="text-white/95">{metric.metric}</span>
                        <span className={`${metric.color} font-bold text-lg`}>{metric.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ========== SECTION 05: MODEL COMPARISON ========== */}
        <section className="flex-1 flex items-center px-8 py-20 bg-black/20">
          <div className="max-w-7xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="flex items-center justify-center space-x-6 mb-8">
                <div className="text-8xl font-bold text-orange-400/60 leading-none">
                  05
                </div>
                <div>
                  <h1 className="text-5xl font-bold text-white tracking-wider leading-tight">
                    MODEL COMPARISON
                  </h1>
                </div>
              </div>
              <p className="text-white/95 text-lg max-w-4xl mx-auto">
                We evaluated 17 different machine learning algorithms to find the optimal 
                solution for exoplanet classification. Here are the top-performing models.
              </p>
            </motion.div>

            {/* Model Comparison Visualization */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <div className="bg-black/60 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">Model Performance Comparison</h3>
                <div className="flex justify-center">
                  <img 
                    src="/model%20+%20model%20summary/output.png" 
                    alt="Model Comparison Results"
                    className="max-w-full h-auto rounded-lg shadow-2xl"
                    style={{ maxHeight: '600px' }}
                  />
                </div>
                <p className="text-white/80 text-sm text-center mt-4">
                  Comprehensive comparison of 17 machine learning algorithms showing test AUC-ROC scores and performance metrics
                </p>
              </div>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Top Models Performance */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold text-white mb-6">All 4 Mission Models</h3>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 backdrop-blur-sm border border-green-400/30 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-lg font-semibold text-white">104-Input Kepler Model</h4>
                      <span className="text-green-400 font-bold">94.5%</span>
                    </div>
                    <p className="text-white/85 text-sm">LightGBM • 104 features • 0.9906 AUC</p>
                  </div>
                  <div className="bg-gradient-to-r from-cyan-500/20 to-cyan-600/20 backdrop-blur-sm border border-cyan-400/30 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-lg font-semibold text-white">K2 Mission Model</h4>
                      <span className="text-cyan-400 font-bold">78.8%</span>
                    </div>
                    <p className="text-white/85 text-sm">LightGBM • 18 features • 0.9054 AUC</p>
                  </div>
                  <div className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 backdrop-blur-sm border border-blue-400/30 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-lg font-semibold text-white">Kepler Mission Model</h4>
                      <span className="text-blue-400 font-bold">74.3%</span>
                    </div>
                    <p className="text-white/85 text-sm">LightGBM • 15 features • 0.8867 AUC</p>
                  </div>
                  <div className="bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 backdrop-blur-sm border border-yellow-400/30 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-lg font-semibold text-white">TESS Mission Model</h4>
                      <span className="text-yellow-400 font-bold">69.2%</span>
                    </div>
                    <p className="text-white/85 text-sm">XGBoost • 14 features • 0.8499 AUC</p>
                  </div>
                </div>
              </motion.div>

              {/* Why HistGradientBoosting Won */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold text-white mb-6">Why 104-Input Model Wins?</h3>
                <div className="space-y-4">
                  <div className="bg-black/60 backdrop-blur-sm border border-white/20 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-white mb-2">Comprehensive Feature Set</h4>
                    <p className="text-white/85 text-sm">104 features capture all aspects of planetary and stellar properties</p>
                  </div>
                  <div className="bg-black/60 backdrop-blur-sm border border-white/20 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-white mb-2">Mission-Specific Optimization</h4>
                    <p className="text-white/85 text-sm">Each model tailored to specific mission characteristics and data quality</p>
                  </div>
                  <div className="bg-black/60 backdrop-blur-sm border border-white/20 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-white mb-2">Algorithm Selection</h4>
                    <p className="text-white/85 text-sm">LightGBM excels on most missions, XGBoost optimal for TESS data</p>
                  </div>
                  <div className="bg-black/60 backdrop-blur-sm border border-white/20 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-white mb-2">Proven Performance</h4>
                    <p className="text-white/85 text-sm">94.5% accuracy with 0.9906 AUC-ROC on flagship model</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ========== SECTION 06: RESULTS & INSIGHTS ========== */}
        <section className="flex-1 flex items-center px-8 py-20 bg-black/20">
          <div className="max-w-7xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="flex items-center justify-center space-x-6 mb-8">
                <div className="text-8xl font-bold text-green-400/60 leading-none">
                  06
                </div>
                <div>
                  <h1 className="text-5xl font-bold text-white tracking-wider leading-tight">
                    RESULTS & INSIGHTS
                  </h1>
                </div>
              </div>
              <p className="text-white/95 text-lg max-w-4xl mx-auto">
                Our model has achieved significant breakthroughs in exoplanet detection, 
                providing valuable insights for both scientific research and public education.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
              {keyFindings.map((finding, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="bg-black/60 backdrop-blur-sm border border-white/20 rounded-lg p-6 hover:bg-black/70 transition-all duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="text-cyan-400 mt-1">{finding.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-bold text-white">{finding.title}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          finding.impact === 'High' ? 'bg-green-400/20 text-green-400' : 'bg-yellow-400/20 text-yellow-400'
                        }`}>
                          {finding.impact} Impact
                        </span>
                      </div>
                      <p className="text-white/85 text-sm">{finding.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== SECTION 07: FOR RESEARCHERS ========== */}
        {isResearcher && (
          <section className="flex-1 flex items-center px-8 py-20 bg-black/30">
            <div className="max-w-7xl mx-auto w-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <div className="flex items-center justify-center space-x-6 mb-8">
                  <div className="text-8xl font-bold text-blue-400/60 leading-none">
                    07
                  </div>
                  <div>
                    <h1 className="text-5xl font-bold text-white tracking-wider leading-tight">
                      FOR RESEARCHERS
                    </h1>
                  </div>
                </div>
                <p className="text-white/95 text-lg max-w-4xl mx-auto">
                  Access our datasets, contribute to model development, and integrate 
                  our tools into your research workflow.
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-3 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-black/60 backdrop-blur-sm border border-white/20 rounded-lg p-6"
                >
                  <div className="text-cyan-400 mb-4">
                    <Database className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">Dataset Access</h3>
                  <ul className="space-y-2 text-white/85 text-sm">
                    <li>• Download processed light curves</li>
                    <li>• Access validation datasets</li>
                    <li>• Real-time data streaming</li>
                    <li>• API endpoints for integration</li>
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="bg-black/60 backdrop-blur-sm border border-white/20 rounded-lg p-6"
                >
                  <div className="text-yellow-400 mb-4">
                    <Microscope className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">Model Integration</h3>
                  <ul className="space-y-2 text-white/85 text-sm">
                    <li>• Upload your own models</li>
                    <li>• Compare performance metrics</li>
                    <li>• Collaborative development</li>
                    <li>• Version control and tracking</li>
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="bg-black/60 backdrop-blur-sm border border-white/20 rounded-lg p-6"
                >
                  <div className="text-green-400 mb-4">
                    <BookOpen className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">Research Resources</h3>
                  <ul className="space-y-2 text-white/85 text-sm">
                    <li>• Scientific paper references</li>
                    <li>• Methodology documentation</li>
                    <li>• Code repositories</li>
                    <li>• Community forums</li>
                  </ul>
                </motion.div>
              </div>
            </div>
          </section>
        )}

        {/* ========== SECTION 08: FOR EXPLORERS ========== */}
        <section className="flex-1 flex items-center px-8 py-20 bg-black/20">
          <div className="max-w-7xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="flex items-center justify-center space-x-6 mb-8">
                <div className="text-8xl font-bold text-pink-400/60 leading-none">
                  {isResearcher ? '08' : '07'}
                </div>
                <div>
                  <h1 className="text-5xl font-bold text-white tracking-wider leading-tight">
                    FOR EXPLORERS
                  </h1>
                </div>
              </div>
              <p className="text-white/95 text-lg max-w-4xl mx-auto">
                Discover the wonders of exoplanet science through interactive visualizations, 
                educational content, and hands-on exploration tools.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold text-white mb-6">Interactive Features</h3>
                <div className="space-y-4">
                  <div className="bg-black/60 backdrop-blur-sm border border-white/20 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-white mb-2">Planet Explorer</h4>
                    <p className="text-white/85 text-sm">Visualize discovered exoplanets in 3D with detailed characteristics</p>
                  </div>
                  <div className="bg-black/60 backdrop-blur-sm border border-white/20 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-white mb-2">Habitable Zone Calculator</h4>
                    <p className="text-white/85 text-sm">Interactive tool to explore habitable zones around different star types</p>
                  </div>
                  <div className="bg-black/60 backdrop-blur-sm border border-white/20 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-white mb-2">What-If Scenarios</h4>
                    <p className="text-white/85 text-sm">Experiment with different planetary parameters and see the results</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold text-white mb-6">Educational Content</h3>
                <div className="space-y-4">
                  <div className="bg-black/60 backdrop-blur-sm border border-white/20 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-white mb-2">Discovery Stories</h4>
                    <p className="text-white/85 text-sm">Learn about the most fascinating exoplanet discoveries</p>
                  </div>
                  <div className="bg-black/60 backdrop-blur-sm border border-white/20 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-white mb-2">Science Explained</h4>
                    <p className="text-white/85 text-sm">Simplified explanations of complex astronomical concepts</p>
                  </div>
                  <div className="bg-black/60 backdrop-blur-sm border border-white/20 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-white mb-2">Mission Updates</h4>
                    <p className="text-white/85 text-sm">Latest news from space missions and discoveries</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ========== CALL TO ACTION SECTION ========== */}
        <section className="px-8 py-20 bg-black/40">
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
                Ready to Explore the Universe?
              </h2>
              <p className="text-lg text-white/95 mb-8">
                {isResearcher 
                  ? "Access our research tools and contribute to the next generation of exoplanet discovery."
                  : "Start your journey of discovery and learn about the fascinating worlds beyond our solar system."
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={() => window.location.href = isResearcher ? '/researcher-dashboard' : '/explore'}
                  className="bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600
                  px-8 py-4 text-lg text-white rounded-3xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30 hover:scale-105"
                >
                  {isResearcher ? <Microscope className="w-5 h-5 mr-2" /> : <Sparkles className="w-5 h-5 mr-2" />}
                  {isResearcher ? 'Access Research Tools' : 'Start Exploring'}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-4 border-white text-white hover:bg-white hover:text-black"
                  onClick={() => window.location.href = '/learn-more'}
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  Learn More
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutOurModel;
