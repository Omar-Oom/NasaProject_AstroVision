import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Square, Settings, BarChart3, Download, Upload, RefreshCw } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface TrainingJob {
  id: string;
  name: string;
  status: 'idle' | 'training' | 'paused' | 'completed' | 'failed';
  progress: number;
  currentEpoch: number;
  totalEpochs: number;
  accuracy: number;
  loss: number;
  startTime: string;
  estimatedCompletion?: string;
}

const ModelTraining: React.FC = () => {
  const [selectedDataset, setSelectedDataset] = useState('kepler-dr25');
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('neural-network');
  const [hyperparameters, setHyperparameters] = useState({
    learningRate: 0.001,
    batchSize: 32,
    epochs: 100,
    hiddenLayers: 3,
    dropout: 0.2,
    regularization: 0.01
  });

  const [currentJob, setCurrentJob] = useState<TrainingJob>({
    id: '1',
    name: 'Neural Network v2.1',
    status: 'training',
    progress: 45,
    currentEpoch: 45,
    totalEpochs: 100,
    accuracy: 93.2,
    loss: 0.156,
    startTime: '2024-03-18 14:30',
    estimatedCompletion: '2024-03-18 18:15'
  });

  const trainingHistory = [
    { epoch: 1, accuracy: 65.2, loss: 0.89, valAccuracy: 62.1, valLoss: 0.92 },
    { epoch: 5, accuracy: 78.4, loss: 0.65, valAccuracy: 76.8, valLoss: 0.68 },
    { epoch: 10, accuracy: 84.1, loss: 0.48, valAccuracy: 82.3, valLoss: 0.52 },
    { epoch: 15, accuracy: 87.9, loss: 0.38, valAccuracy: 85.7, valLoss: 0.42 },
    { epoch: 20, accuracy: 89.8, loss: 0.32, valAccuracy: 87.9, valLoss: 0.36 },
    { epoch: 25, accuracy: 91.2, loss: 0.28, valAccuracy: 89.1, valLoss: 0.32 },
    { epoch: 30, accuracy: 92.1, loss: 0.25, valAccuracy: 90.2, valLoss: 0.29 },
    { epoch: 35, accuracy: 92.7, loss: 0.23, valAccuracy: 90.8, valLoss: 0.27 },
    { epoch: 40, accuracy: 93.0, loss: 0.21, valAccuracy: 91.2, valLoss: 0.25 },
    { epoch: 45, accuracy: 93.2, loss: 0.20, valAccuracy: 91.4, valLoss: 0.24 }
  ];

  const modelComparison = [
    { name: 'Random Forest', accuracy: 89.2, trainTime: '15 min', complexity: 'Medium' },
    { name: 'XGBoost', accuracy: 91.8, trainTime: '25 min', complexity: 'Medium' },
    { name: 'Neural Network', accuracy: 93.2, trainTime: '2.5 hours', complexity: 'High' },
    { name: 'SVM', accuracy: 87.4, trainTime: '45 min', complexity: 'Low' },
    { name: 'Ensemble', accuracy: 94.1, trainTime: '3 hours', complexity: 'High' }
  ];

  const datasets = [
    { id: 'kepler-dr25', name: 'Kepler DR25', records: '197,096', size: '2.3 GB' },
    { id: 'tess-sectors', name: 'TESS Sectors 1-50', records: '156,432', size: '1.8 GB' },
    { id: 'k2-campaigns', name: 'K2 All Campaigns', records: '78,234', size: '890 MB' },
    { id: 'combined', name: 'Combined Dataset', records: '431,762', size: '5.1 GB' }
  ];

  const algorithms = [
    { id: 'neural-network', name: 'Neural Network', description: 'Deep learning with multiple hidden layers' },
    { id: 'random-forest', name: 'Random Forest', description: 'Ensemble of decision trees' },
    { id: 'xgboost', name: 'XGBoost', description: 'Gradient boosting framework' },
    { id: 'svm', name: 'Support Vector Machine', description: 'Kernel-based classification' }
  ];

  const updateHyperparameter = (key: keyof typeof hyperparameters, value: number) => {
    setHyperparameters(prev => ({ ...prev, [key]: value }));
  };

  const handleTrainingControl = (action: 'start' | 'pause' | 'stop') => {
    setCurrentJob(prev => ({
      ...prev,
      status: action === 'start' ? 'training' : action === 'pause' ? 'paused' : 'idle'
    }));
  };

  return (
    <div className="pt-20 min-h-screen px-4 py-12 bg-space-gradient">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-glow mb-4">Model Training & Fine-Tuning</h1>
          <p className="text-xl text-space-white/80">
            Train and optimize machine learning models for exoplanet classification
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Training Configuration */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-glow mb-6">Training Configuration</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-space-cyan mb-2">
                    Dataset
                  </label>
                  <select
                    value={selectedDataset}
                    onChange={(e) => setSelectedDataset(e.target.value)}
                    className="w-full px-3 py-2 bg-space-dark border border-space-white/20 rounded-lg text-space-white focus:border-space-cyan focus:outline-none"
                  >
                    {datasets.map(dataset => (
                      <option key={dataset.id} value={dataset.id}>
                        {dataset.name} ({dataset.records} records)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-space-cyan mb-2">
                    Algorithm
                  </label>
                  <select
                    value={selectedAlgorithm}
                    onChange={(e) => setSelectedAlgorithm(e.target.value)}
                    className="w-full px-3 py-2 bg-space-dark border border-space-white/20 rounded-lg text-space-white focus:border-space-cyan focus:outline-none"
                  >
                    {algorithms.map(algo => (
                      <option key={algo.id} value={algo.id}>
                        {algo.name}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-space-white/60 mt-1">
                    {algorithms.find(a => a.id === selectedAlgorithm)?.description}
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-space-yellow">Hyperparameters</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-space-white/80 mb-2">
                      Learning Rate: {hyperparameters.learningRate}
                    </label>
                    <input
                      type="range"
                      min="0.0001"
                      max="0.01"
                      step="0.0001"
                      value={hyperparameters.learningRate}
                      onChange={(e) => updateHyperparameter('learningRate', parseFloat(e.target.value))}
                      className="w-full h-2 bg-space-dark rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-space-white/80 mb-2">
                      Batch Size: {hyperparameters.batchSize}
                    </label>
                    <input
                      type="range"
                      min="16"
                      max="128"
                      step="16"
                      value={hyperparameters.batchSize}
                      onChange={(e) => updateHyperparameter('batchSize', parseInt(e.target.value))}
                      className="w-full h-2 bg-space-dark rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-space-white/80 mb-2">
                      Epochs: {hyperparameters.epochs}
                    </label>
                    <input
                      type="range"
                      min="50"
                      max="200"
                      step="10"
                      value={hyperparameters.epochs}
                      onChange={(e) => updateHyperparameter('epochs', parseInt(e.target.value))}
                      className="w-full h-2 bg-space-dark rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-space-white/80 mb-2">
                      Dropout Rate: {hyperparameters.dropout}
                    </label>
                    <input
                      type="range"
                      min="0.1"
                      max="0.5"
                      step="0.1"
                      value={hyperparameters.dropout}
                      onChange={(e) => updateHyperparameter('dropout', parseFloat(e.target.value))}
                      className="w-full h-2 bg-space-dark rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    onClick={() => handleTrainingControl('start')}
                    disabled={currentJob.status === 'training'}
                    className="flex-1"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start Training
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => handleTrainingControl('pause')}
                    disabled={currentJob.status !== 'training'}
                  >
                    <Pause className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => handleTrainingControl('stop')}
                    disabled={currentJob.status === 'idle'}
                  >
                    <Square className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Training Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-glow">Training Progress</h2>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  currentJob.status === 'training' ? 'bg-space-cyan/20 text-space-cyan' :
                  currentJob.status === 'paused' ? 'bg-space-yellow/20 text-space-yellow' :
                  'bg-space-white/20 text-space-white'
                }`}>
                  {currentJob.status.charAt(0).toUpperCase() + currentJob.status.slice(1)}
                </div>
              </div>

              {/* Current Job Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-space-dark/30 rounded-lg">
                  <div className="text-2xl font-bold text-space-cyan">{currentJob.currentEpoch}</div>
                  <div className="text-sm text-space-white/70">Current Epoch</div>
                </div>
                <div className="text-center p-4 bg-space-dark/30 rounded-lg">
                  <div className="text-2xl font-bold text-space-yellow">{currentJob.accuracy}%</div>
                  <div className="text-sm text-space-white/70">Accuracy</div>
                </div>
                <div className="text-center p-4 bg-space-dark/30 rounded-lg">
                  <div className="text-2xl font-bold text-space-magenta">{currentJob.loss}</div>
                  <div className="text-sm text-space-white/70">Loss</div>
                </div>
                <div className="text-center p-4 bg-space-dark/30 rounded-lg">
                  <div className="text-2xl font-bold text-neon-green">{currentJob.progress}%</div>
                  <div className="text-sm text-space-white/70">Progress</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-space-white/70 mb-2">
                  <span>Epoch {currentJob.currentEpoch} of {currentJob.totalEpochs}</span>
                  <span>ETA: {currentJob.estimatedCompletion}</span>
                </div>
                <div className="w-full bg-space-dark rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-space-cyan to-space-magenta h-3 rounded-full transition-all duration-300"
                    style={{ width: `${currentJob.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Training Charts */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-space-cyan mb-3">Accuracy</h4>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={trainingHistory}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="epoch" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1a1a2e', 
                          border: '1px solid #00d4ff',
                          borderRadius: '8px',
                          color: '#ffffff'
                        }} 
                      />
                      <Line type="monotone" dataKey="accuracy" stroke="#00d4ff" strokeWidth={2} name="Training" />
                      <Line type="monotone" dataKey="valAccuracy" stroke="#ffd700" strokeWidth={2} name="Validation" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-space-magenta mb-3">Loss</h4>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={trainingHistory}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="epoch" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1a1a2e', 
                          border: '1px solid #00d4ff',
                          borderRadius: '8px',
                          color: '#ffffff'
                        }} 
                      />
                      <Line type="monotone" dataKey="loss" stroke="#ff0080" strokeWidth={2} name="Training" />
                      <Line type="monotone" dataKey="valLoss" stroke="#ff6b6b" strokeWidth={2} name="Validation" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Model Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-glow mb-6">Model Performance Comparison</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={modelComparison}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1a1a2e', 
                    border: '1px solid #00d4ff',
                    borderRadius: '8px',
                    color: '#ffffff'
                  }} 
                />
                <Bar dataKey="accuracy" fill="#00d4ff" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Training History & Model Management */}
        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Card className="p-6">
              <h3 className="text-2xl font-bold text-glow mb-6">Saved Models</h3>
              <div className="space-y-4">
                {[
                  { name: 'Neural Network v2.1', accuracy: '93.2%', date: '2024-03-18', status: 'Active' },
                  { name: 'Ensemble v1.8', accuracy: '94.1%', date: '2024-03-15', status: 'Deployed' },
                  { name: 'XGBoost v2.0', accuracy: '91.8%', date: '2024-03-12', status: 'Archived' }
                ].map((model, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-space-dark/30 rounded-lg">
                    <div>
                      <div className="font-semibold text-space-white">{model.name}</div>
                      <div className="text-sm text-space-white/70">
                        {model.accuracy} • {model.date}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded text-xs ${
                        model.status === 'Active' ? 'bg-neon-green/20 text-neon-green' :
                        model.status === 'Deployed' ? 'bg-space-cyan/20 text-space-cyan' :
                        'bg-space-white/20 text-space-white'
                      }`}>
                        {model.status}
                      </span>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.0 }}
          >
            <Card className="p-6">
              <h3 className="text-2xl font-bold text-glow mb-6">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="p-4 h-auto flex-col space-y-2">
                  <Upload className="w-6 h-6" />
                  <span>Load Model</span>
                </Button>
                <Button variant="outline" className="p-4 h-auto flex-col space-y-2">
                  <Settings className="w-6 h-6" />
                  <span>Auto-Tune</span>
                </Button>
                <Button variant="outline" className="p-4 h-auto flex-col space-y-2">
                  <BarChart3 className="w-6 h-6" />
                  <span>Compare Models</span>
                </Button>
                <Button variant="outline" className="p-4 h-auto flex-col space-y-2">
                  <RefreshCw className="w-6 h-6" />
                  <span>Resume Training</span>
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ModelTraining;
