import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw, Sparkles, TrendingUp, AlertCircle, CheckCircle, Globe, Upload, Download, Filter, Search, Settings, RefreshCw, Calendar, Clock, Database, BarChart3, FileText, Trash2, Eye } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

interface PredictionJob {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  progress: number;
  startTime: string;
  estimatedCompletion?: string;
  inputRecords: number;
  processedRecords: number;
  results?: {
    confirmed: number;
    candidates: number;
    falsePositives: number;
  };
}

const Predictions: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'single' | 'batch' | 'history'>('single');
  const [singlePrediction, setSinglePrediction] = useState({
    orbitalPeriod: '',
    planetRadius: '',
    transitDuration: '',
    stellarMagnitude: '',
    transitDepth: '',
    snr: ''
  });
  const [batchFile, setBatchFile] = useState<File | null>(null);

  const predictionJobs: PredictionJob[] = [
    {
      id: '1',
      name: 'TESS Sector 45 Batch Analysis',
      status: 'completed',
      progress: 100,
      startTime: '2024-03-15 14:30',
      inputRecords: 15847,
      processedRecords: 15847,
      results: {
        confirmed: 234,
        candidates: 1456,
        falsePositives: 14157
      }
    },
    {
      id: '2',
      name: 'K2 Campaign 19 Classification',
      status: 'running',
      progress: 67,
      startTime: '2024-03-18 09:15',
      estimatedCompletion: '2024-03-18 16:45',
      inputRecords: 8932,
      processedRecords: 5985,
    },
    {
      id: '3',
      name: 'Ground-based Follow-up Validation',
      status: 'pending',
      progress: 0,
      startTime: '2024-03-18 12:00',
      inputRecords: 456,
      processedRecords: 0,
    }
  ];

  const handleSinglePrediction = () => {
    // Simulate prediction
    console.log('Running single prediction with:', singlePrediction);
  };

  const handleBatchUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setBatchFile(file);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-neon-green" />;
      case 'running':
        return <div className="w-5 h-5 border-2 border-space-cyan border-t-transparent rounded-full animate-spin" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-space-yellow" />;
      case 'failed':
        return <AlertCircle className="w-5 h-5 text-space-magenta" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-neon-green';
      case 'running':
        return 'text-space-cyan';
      case 'pending':
        return 'text-space-yellow';
      case 'failed':
        return 'text-space-magenta';
      default:
        return 'text-space-white';
    }
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
          <h1 className="text-4xl font-bold text-glow mb-4">Prediction & Classification</h1>
          <p className="text-xl text-space-white/80">
            Run single predictions or batch process datasets for exoplanet classification
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex space-x-1 bg-space-dark/50 p-1 rounded-lg w-fit">
            {[
              { id: 'single', label: 'Single Prediction', icon: <Settings className="w-4 h-4" /> },
              { id: 'batch', label: 'Batch Processing', icon: <Upload className="w-4 h-4" /> },
              { id: 'history', label: 'Job History', icon: <BarChart3 className="w-4 h-4" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-space-cyan text-space-black font-medium'
                    : 'text-space-white/70 hover:text-space-white hover:bg-space-white/10'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'single' && (
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Input Form */}
              <Card className="p-8">
                <h2 className="text-2xl font-bold text-glow mb-6">Single Prediction</h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-space-cyan mb-2">
                        Orbital Period (days)
                      </label>
                      <Input
                        type="number"
                        placeholder="e.g., 365.25"
                        value={singlePrediction.orbitalPeriod}
                        onChange={(e) => setSinglePrediction(prev => ({ ...prev, orbitalPeriod: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-space-cyan mb-2">
                        Planet Radius (R⊕)
                      </label>
                      <Input
                        type="number"
                        step="0.1"
                        placeholder="e.g., 1.0"
                        value={singlePrediction.planetRadius}
                        onChange={(e) => setSinglePrediction(prev => ({ ...prev, planetRadius: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-space-cyan mb-2">
                        Transit Duration (hours)
                      </label>
                      <Input
                        type="number"
                        step="0.1"
                        placeholder="e.g., 3.2"
                        value={singlePrediction.transitDuration}
                        onChange={(e) => setSinglePrediction(prev => ({ ...prev, transitDuration: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-space-cyan mb-2">
                        Stellar Magnitude
                      </label>
                      <Input
                        type="number"
                        step="0.1"
                        placeholder="e.g., 12.5"
                        value={singlePrediction.stellarMagnitude}
                        onChange={(e) => setSinglePrediction(prev => ({ ...prev, stellarMagnitude: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-space-cyan mb-2">
                        Transit Depth (ppm)
                      </label>
                      <Input
                        type="number"
                        placeholder="e.g., 500"
                        value={singlePrediction.transitDepth}
                        onChange={(e) => setSinglePrediction(prev => ({ ...prev, transitDepth: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-space-cyan mb-2">
                        Signal-to-Noise Ratio
                      </label>
                      <Input
                        type="number"
                        step="0.1"
                        placeholder="e.g., 15.2"
                        value={singlePrediction.snr}
                        onChange={(e) => setSinglePrediction(prev => ({ ...prev, snr: e.target.value }))}
                      />
                    </div>
                  </div>

                  <Button 
                    onClick={handleSinglePrediction}
                    className="w-full"
                    size="lg"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Run Prediction
                  </Button>
                </div>
              </Card>

              {/* Model Selection & Settings */}
              <Card className="p-8">
                <h2 className="text-2xl font-bold text-glow mb-6">Model Configuration</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-space-cyan mb-2">
                      Select Model
                    </label>
                    <select className="w-full px-3 py-2 bg-space-dark border border-space-white/20 rounded-lg text-space-white focus:border-space-cyan focus:outline-none">
                      <option>Ensemble Model v2.1 (Recommended)</option>
                      <option>Neural Network v1.3</option>
                      <option>Random Forest v2.0</option>
                      <option>XGBoost v1.8</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-space-cyan mb-2">
                      Confidence Threshold
                    </label>
                    <input
                      type="range"
                      min="0.5"
                      max="0.95"
                      step="0.05"
                      defaultValue="0.8"
                      className="w-full h-2 bg-space-dark rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-space-white/60 mt-1">
                      <span>50%</span>
                      <span>80%</span>
                      <span>95%</span>
                    </div>
                  </div>

                  <div className="bg-space-dark/30 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-space-yellow mb-3">Model Performance</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-space-white/70">Accuracy</span>
                        <span className="text-neon-green font-medium">96.3%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-space-white/70">Precision</span>
                        <span className="text-space-cyan font-medium">95.8%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-space-white/70">Recall</span>
                        <span className="text-space-yellow font-medium">94.2%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-space-white/70">F1 Score</span>
                        <span className="text-space-magenta font-medium">95.0%</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-space-white/20" defaultChecked />
                      <span className="text-space-white/80">Include confidence scores</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-space-white/20" defaultChecked />
                      <span className="text-space-white/80">Generate feature importance</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-space-white/20" />
                      <span className="text-space-white/80">Save to prediction history</span>
                    </label>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'batch' && (
            <div className="space-y-8">
              {/* Upload Section */}
              <Card className="p-8">
                <h2 className="text-2xl font-bold text-glow mb-6">Batch Processing</h2>
                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-space-cyan mb-4">Upload Dataset</h3>
                    <div className="border-2 border-dashed border-space-white/20 rounded-lg p-8 text-center">
                      <Upload className="w-12 h-12 text-space-white/50 mx-auto mb-4" />
                      <p className="text-space-white/70 mb-2">Drop your CSV file here or click to browse</p>
                      <p className="text-space-white/50 text-sm mb-4">Maximum file size: 500MB</p>
                      <input
                        type="file"
                        accept=".csv,.xlsx"
                        onChange={handleBatchUpload}
                        className="hidden"
                        id="batch-upload"
                      />
                      <label htmlFor="batch-upload">
                        <Button variant="outline" className="cursor-pointer">
                          Select File
                        </Button>
                      </label>
                    </div>
                    {batchFile && (
                      <div className="mt-4 p-4 bg-space-dark/30 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileText className="w-5 h-5 text-space-cyan" />
                          <div>
                            <div className="text-space-white font-medium">{batchFile.name}</div>
                            <div className="text-space-white/60 text-sm">
                              {(batchFile.size / 1024 / 1024).toFixed(2)} MB
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-space-cyan mb-4">Processing Options</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-space-white/80 mb-2">
                          Job Name
                        </label>
                        <Input placeholder="e.g., TESS Sector 51 Analysis" />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-space-white/80 mb-2">
                          Processing Priority
                        </label>
                        <select className="w-full px-3 py-2 bg-space-dark border border-space-white/20 rounded-lg text-space-white focus:border-space-cyan focus:outline-none">
                          <option>Normal</option>
                          <option>High</option>
                          <option>Low</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded border-space-white/20" defaultChecked />
                          <span className="text-space-white/80">Email notification on completion</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded border-space-white/20" />
                          <span className="text-space-white/80">Auto-export results</span>
                        </label>
                      </div>

                      <Button className="w-full" size="lg" disabled={!batchFile}>
                        <Play className="w-5 h-5 mr-2" />
                        Start Batch Processing
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Template Download */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-space-cyan mb-4">CSV Template</h3>
                <p className="text-space-white/80 mb-4">
                  Download our CSV template to ensure your data is formatted correctly for batch processing.
                </p>
                <div className="flex gap-4">
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download Template
                  </Button>
                  <Button variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    View Documentation
                  </Button>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-6">
              {predictionJobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(job.status)}
                        <div>
                          <h3 className="text-xl font-bold text-glow">{job.name}</h3>
                          <p className={`text-sm ${getStatusColor(job.status)}`}>
                            {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        {job.status === 'completed' && (
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-1" />
                            Export
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Progress Bar */}
                    {job.status === 'running' && (
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-space-white/70 mb-1">
                          <span>Progress</span>
                          <span>{job.progress}%</span>
                        </div>
                        <div className="w-full bg-space-dark rounded-full h-2">
                          <div 
                            className="bg-space-cyan h-2 rounded-full transition-all duration-300"
                            style={{ width: `${job.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-space-white/60">Started:</span>
                        <div className="text-space-white font-medium">{job.startTime}</div>
                      </div>
                      <div>
                        <span className="text-space-white/60">Records:</span>
                        <div className="text-space-cyan font-medium">
                          {job.processedRecords.toLocaleString()} / {job.inputRecords.toLocaleString()}
                        </div>
                      </div>
                      {job.estimatedCompletion && (
                        <div>
                          <span className="text-space-white/60">ETA:</span>
                          <div className="text-space-yellow font-medium">{job.estimatedCompletion}</div>
                        </div>
                      )}
                      {job.results && (
                        <div>
                          <span className="text-space-white/60">Results:</span>
                          <div className="text-space-white font-medium">
                            {job.results.confirmed}C / {job.results.candidates}P / {job.results.falsePositives}F
                          </div>
                        </div>
                      )}
                    </div>

                    {job.results && (
                      <div className="mt-4 grid grid-cols-3 gap-4">
                        <div className="text-center p-3 bg-space-cyan/10 rounded-lg">
                          <div className="text-2xl font-bold text-space-cyan">{job.results.confirmed}</div>
                          <div className="text-xs text-space-white/70">Confirmed</div>
                        </div>
                        <div className="text-center p-3 bg-space-yellow/10 rounded-lg">
                          <div className="text-2xl font-bold text-space-yellow">{job.results.candidates}</div>
                          <div className="text-xs text-space-white/70">Candidates</div>
                        </div>
                        <div className="text-center p-3 bg-space-magenta/10 rounded-lg">
                          <div className="text-2xl font-bold text-space-magenta">{job.results.falsePositives}</div>
                          <div className="text-xs text-space-white/70">False Positives</div>
                        </div>
                      </div>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Predictions;
