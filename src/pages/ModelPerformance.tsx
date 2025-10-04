import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Target, BarChart3, Download, RefreshCw, Calendar, Filter } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const ModelPerformance: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState('ensemble-v2.1');
  const [timeRange, setTimeRange] = useState('30d');

  const models = [
    { id: 'ensemble-v2.1', name: 'Ensemble v2.1', status: 'Active' },
    { id: 'neural-net-v1.3', name: 'Neural Network v1.3', status: 'Deployed' },
    { id: 'random-forest-v2.0', name: 'Random Forest v2.0', status: 'Archived' },
    { id: 'xgboost-v1.8', name: 'XGBoost v1.8', status: 'Testing' }
  ];

  const performanceMetrics = [
    { name: 'Accuracy', value: 96.3, target: 95.0, color: '#00d4ff' },
    { name: 'Precision', value: 95.8, target: 94.0, color: '#ffd700' },
    { name: 'Recall', value: 94.2, target: 93.0, color: '#ff0080' },
    { name: 'F1 Score', value: 95.0, target: 93.5, color: '#00ff00' },
    { name: 'AUC-ROC', value: 98.1, target: 96.0, color: '#ff6b6b' }
  ];

  const confusionMatrix = [
    { actual: 'Confirmed', predicted: { Confirmed: 1245, Candidate: 23, 'False Positive': 8 } },
    { actual: 'Candidate', predicted: { Confirmed: 18, Candidate: 892, 'False Positive': 34 } },
    { actual: 'False Positive', predicted: { Confirmed: 5, Candidate: 28, 'False Positive': 1156 } }
  ];

  const rocData = [
    { fpr: 0.0, tpr: 0.0 },
    { fpr: 0.01, tpr: 0.12 },
    { fpr: 0.02, tpr: 0.28 },
    { fpr: 0.03, tpr: 0.45 },
    { fpr: 0.05, tpr: 0.62 },
    { fpr: 0.08, tpr: 0.75 },
    { fpr: 0.12, tpr: 0.84 },
    { fpr: 0.18, tpr: 0.91 },
    { fpr: 0.25, tpr: 0.95 },
    { fpr: 0.35, tpr: 0.97 },
    { fpr: 0.50, tpr: 0.99 },
    { fpr: 1.0, tpr: 1.0 }
  ];

  const performanceHistory = [
    { date: '2024-01', accuracy: 92.1, precision: 91.5, recall: 89.8, f1: 90.6 },
    { date: '2024-02', accuracy: 93.4, precision: 92.8, recall: 91.2, f1: 92.0 },
    { date: '2024-03', accuracy: 94.7, precision: 94.1, recall: 92.9, f1: 93.5 },
    { date: '2024-04', accuracy: 95.2, precision: 94.8, recall: 93.6, f1: 94.2 },
    { date: '2024-05', accuracy: 95.8, precision: 95.3, recall: 94.1, f1: 94.7 },
    { date: '2024-06', accuracy: 96.3, precision: 95.8, recall: 94.2, f1: 95.0 }
  ];

  const classificationBreakdown = [
    { name: 'Confirmed Planets', value: 1276, percentage: 34.2, color: '#00d4ff' },
    { name: 'Planet Candidates', value: 944, percentage: 25.3, color: '#ffd700' },
    { name: 'False Positives', value: 1189, percentage: 31.9, color: '#ff0080' },
    { name: 'Inconclusive', value: 321, percentage: 8.6, color: '#9ca3af' }
  ];

  const featureImportance = [
    { feature: 'Transit Depth', importance: 0.28, color: '#00d4ff' },
    { feature: 'Orbital Period', importance: 0.24, color: '#ffd700' },
    { feature: 'Transit Duration', importance: 0.18, color: '#ff0080' },
    { feature: 'Signal-to-Noise', importance: 0.15, color: '#00ff00' },
    { feature: 'Stellar Magnitude', importance: 0.09, color: '#ff6b6b' },
    { feature: 'Planet Radius', importance: 0.06, color: '#9ca3af' }
  ];

  const radarData = [
    { metric: 'Accuracy', value: 96.3, fullMark: 100 },
    { metric: 'Precision', value: 95.8, fullMark: 100 },
    { metric: 'Recall', value: 94.2, fullMark: 100 },
    { metric: 'F1 Score', value: 95.0, fullMark: 100 },
    { metric: 'Specificity', value: 97.1, fullMark: 100 },
    { metric: 'AUC-ROC', value: 98.1, fullMark: 100 }
  ];

  return (
    <div className="pt-20 min-h-screen px-4 py-12 bg-space-gradient">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-glow mb-4">Model Performance</h1>
              <p className="text-xl text-space-white/80">
                Comprehensive analysis of model accuracy, metrics, and performance trends
              </p>
            </div>
            <div className="flex gap-3 mt-6 lg:mt-0">
              <Button variant="outline" className="px-4 py-2">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
              <Button className="px-4 py-2">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-space-white/50 w-5 h-5" />
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="pl-10 pr-8 py-2 bg-space-dark border border-space-white/20 rounded-lg text-space-white focus:border-space-cyan focus:outline-none appearance-none"
                  >
                    {models.map(model => (
                      <option key={model.id} value={model.id}>
                        {model.name} ({model.status})
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-space-white/50 w-5 h-5" />
                  <select
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                    className="pl-10 pr-8 py-2 bg-space-dark border border-space-white/20 rounded-lg text-space-white focus:border-space-cyan focus:outline-none appearance-none"
                  >
                    <option value="7d">Last 7 days</option>
                    <option value="30d">Last 30 days</option>
                    <option value="90d">Last 90 days</option>
                    <option value="1y">Last year</option>
                  </select>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12"
        >
          {performanceMetrics.map((metric, index) => (
            <Card key={index} className="p-6 text-center">
              <div className="mb-4">
                <div className="text-3xl font-bold text-glow" style={{ color: metric.color }}>
                  {metric.value}%
                </div>
                <div className="text-sm text-space-white/60">Target: {metric.target}%</div>
              </div>
              <h3 className="text-space-white/80 font-medium">{metric.name}</h3>
              <div className="mt-2">
                <div className="w-full bg-space-dark rounded-full h-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${(metric.value / 100) * 100}%`,
                      backgroundColor: metric.color
                    }}
                  ></div>
                </div>
              </div>
            </Card>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Performance Radar Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="p-6">
              <h3 className="text-2xl font-bold text-glow mb-6">Performance Overview</h3>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#374151" />
                  <PolarAngleAxis dataKey="metric" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                  <PolarRadiusAxis 
                    angle={90} 
                    domain={[0, 100]} 
                    tick={{ fill: '#9ca3af', fontSize: 10 }}
                  />
                  <Radar
                    name="Performance"
                    dataKey="value"
                    stroke="#00d4ff"
                    fill="#00d4ff"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>

          {/* ROC Curve */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Card className="p-6">
              <h3 className="text-2xl font-bold text-glow mb-6">ROC Curve (AUC: 0.981)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={rocData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="fpr" 
                    stroke="#9ca3af"
                    label={{ value: 'False Positive Rate', position: 'insideBottom', offset: -10 }}
                  />
                  <YAxis 
                    stroke="#9ca3af"
                    label={{ value: 'True Positive Rate', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1a1a2e', 
                      border: '1px solid #00d4ff',
                      borderRadius: '8px',
                      color: '#ffffff'
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="tpr" 
                    stroke="#00d4ff" 
                    strokeWidth={3}
                    dot={{ fill: '#00d4ff', strokeWidth: 2, r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="fpr" 
                    stroke="#ff0080" 
                    strokeWidth={1}
                    strokeDasharray="5 5"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Classification Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
          >
            <Card className="p-6">
              <h3 className="text-2xl font-bold text-glow mb-6">Classification Results</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={classificationBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {classificationBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1a1a2e', 
                      border: '1px solid #00d4ff',
                      borderRadius: '8px',
                      color: '#ffffff'
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {classificationBreakdown.map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-space-white/80">{item.name}</span>
                    </div>
                    <span className="text-space-white font-medium">{item.percentage}%</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Feature Importance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <Card className="p-6">
              <h3 className="text-2xl font-bold text-glow mb-6">Feature Importance</h3>
              <div className="space-y-4">
                {featureImportance.map((feature, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-space-white/80 text-sm">{feature.feature}</span>
                      <span className="text-space-white font-medium text-sm">
                        {(feature.importance * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-space-dark rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${feature.importance * 100}%`,
                          backgroundColor: feature.color
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Model Comparison */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
          >
            <Card className="p-6">
              <h3 className="text-2xl font-bold text-glow mb-6">Model Comparison</h3>
              <div className="space-y-4">
                {[
                  { name: 'Ensemble v2.1', accuracy: 96.3, status: 'current' },
                  { name: 'Neural Net v1.3', accuracy: 93.2, status: 'previous' },
                  { name: 'Random Forest v2.0', accuracy: 89.7, status: 'baseline' }
                ].map((model, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-space-dark/30 rounded-lg">
                    <div>
                      <div className="font-semibold text-space-white">{model.name}</div>
                      <div className={`text-xs ${
                        model.status === 'current' ? 'text-neon-green' :
                        model.status === 'previous' ? 'text-space-yellow' :
                        'text-space-white/60'
                      }`}>
                        {model.status === 'current' ? 'Current Model' :
                         model.status === 'previous' ? 'Previous Version' :
                         'Baseline'}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-space-cyan">{model.accuracy}%</div>
                      <div className="text-xs text-space-white/60">Accuracy</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Performance History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
        >
          <Card className="p-6">
            <h3 className="text-2xl font-bold text-glow mb-6">Performance Trends</h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={performanceHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" domain={[85, 100]} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1a1a2e', 
                    border: '1px solid #00d4ff',
                    borderRadius: '8px',
                    color: '#ffffff'
                  }} 
                />
                <Line type="monotone" dataKey="accuracy" stroke="#00d4ff" strokeWidth={3} name="Accuracy" />
                <Line type="monotone" dataKey="precision" stroke="#ffd700" strokeWidth={2} name="Precision" />
                <Line type="monotone" dataKey="recall" stroke="#ff0080" strokeWidth={2} name="Recall" />
                <Line type="monotone" dataKey="f1" stroke="#00ff00" strokeWidth={2} name="F1 Score" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ModelPerformance;
