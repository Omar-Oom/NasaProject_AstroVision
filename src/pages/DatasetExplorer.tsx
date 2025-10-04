import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Upload, Download, Filter, Search, Eye, Trash2, FileText, BarChart3, Settings, RefreshCw } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface Dataset {
  id: string;
  name: string;
  mission: string;
  uploadDate: string;
  size: string;
  records: number;
  status: 'processed' | 'processing' | 'error';
  description: string;
}

interface DataPoint {
  id: string;
  orbitalPeriod: number;
  planetRadius: number;
  transitDuration: number;
  stellarMagnitude: number;
  status: 'confirmed' | 'candidate' | 'false_positive';
  snr: number;
}

const DatasetExplorer: React.FC = () => {
  const [selectedDataset, setSelectedDataset] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'processed' | 'processing' | 'error'>('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'visualization'>('list');

  // Mock datasets
  const datasets: Dataset[] = [
    {
      id: '1',
      name: 'Kepler Q1-Q17 DR25',
      mission: 'Kepler',
      uploadDate: '2024-01-15',
      size: '2.3 GB',
      records: 197096,
      status: 'processed',
      description: 'Complete Kepler mission data release 25 with stellar parameters and TCEs'
    },
    {
      id: '2',
      name: 'TESS Sector 45-50',
      mission: 'TESS',
      uploadDate: '2024-02-20',
      size: '1.8 GB',
      records: 156432,
      status: 'processed',
      description: 'Recent TESS observations from sectors 45-50 with 2-minute cadence'
    },
    {
      id: '3',
      name: 'K2 Campaign 19',
      mission: 'K2',
      uploadDate: '2024-03-10',
      size: '890 MB',
      records: 78234,
      status: 'processing',
      description: 'K2 extended mission data from campaign 19 in the forward-facing direction'
    },
    {
      id: '4',
      name: 'Ground-based Follow-up',
      mission: 'Various',
      uploadDate: '2024-03-25',
      size: '245 MB',
      records: 12456,
      status: 'error',
      description: 'Ground-based photometric follow-up observations of TESS candidates'
    }
  ];

  // Mock data points for visualization
  const dataPoints: DataPoint[] = useMemo(() => {
    const points: DataPoint[] = [];
    for (let i = 0; i < 1000; i++) {
      points.push({
        id: `point-${i}`,
        orbitalPeriod: Math.random() * 500 + 1,
        planetRadius: Math.random() * 10 + 0.5,
        transitDuration: Math.random() * 15 + 0.5,
        stellarMagnitude: Math.random() * 10 + 8,
        status: ['confirmed', 'candidate', 'false_positive'][Math.floor(Math.random() * 3)] as any,
        snr: Math.random() * 50 + 5
      });
    }
    return points;
  }, []);

  const filteredDatasets = useMemo(() => {
    return datasets.filter(dataset => {
      const matchesSearch = dataset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           dataset.mission.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || dataset.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processed':
        return 'text-neon-green';
      case 'processing':
        return 'text-space-yellow';
      case 'error':
        return 'text-space-magenta';
      default:
        return 'text-space-white';
    }
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case 'processed':
        return `${baseClasses} bg-neon-green/20 text-neon-green border border-neon-green/30`;
      case 'processing':
        return `${baseClasses} bg-space-yellow/20 text-space-yellow border border-space-yellow/30`;
      case 'error':
        return `${baseClasses} bg-space-magenta/20 text-space-magenta border border-space-magenta/30`;
      default:
        return baseClasses;
    }
  };

  const distributionData = useMemo(() => {
    const confirmed = dataPoints.filter(p => p.status === 'confirmed').length;
    const candidate = dataPoints.filter(p => p.status === 'candidate').length;
    const falsePositive = dataPoints.filter(p => p.status === 'false_positive').length;
    
    return [
      { name: 'Confirmed', value: confirmed, color: '#00d4ff' },
      { name: 'Candidates', value: candidate, color: '#ffd700' },
      { name: 'False Positives', value: falsePositive, color: '#ff0080' }
    ];
  }, [dataPoints]);

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
              <h1 className="text-4xl font-bold text-glow mb-4">Dataset Explorer</h1>
              <p className="text-xl text-space-white/80">
                Upload, manage, and analyze exoplanet datasets from various missions
              </p>
            </div>
            <div className="flex gap-3 mt-6 lg:mt-0">
              <Button 
                variant="outline" 
                onClick={() => setShowUploadModal(true)}
                className="px-4 py-2"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Dataset
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
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-space-white/50 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search datasets..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-space-white/50 w-5 h-5" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as any)}
                    className="pl-10 pr-8 py-2 bg-space-dark border border-space-white/20 rounded-lg text-space-white focus:border-space-cyan focus:outline-none appearance-none"
                  >
                    <option value="all">All Status</option>
                    <option value="processed">Processed</option>
                    <option value="processing">Processing</option>
                    <option value="error">Error</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  onClick={() => setViewMode('list')}
                  className="px-4 py-2"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  List
                </Button>
                <Button
                  variant={viewMode === 'visualization' ? 'default' : 'outline'}
                  onClick={() => setViewMode('visualization')}
                  className="px-4 py-2"
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Visualize
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {viewMode === 'list' ? (
          /* Dataset List View */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {filteredDatasets.map((dataset, index) => (
              <motion.div
                key={dataset.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 hover:border-space-cyan/50 transition-all duration-300">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-bold text-glow">{dataset.name}</h3>
                        <span className={getStatusBadge(dataset.status)}>
                          {dataset.status}
                        </span>
                      </div>
                      <p className="text-space-white/70 mb-3">{dataset.description}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-space-white/60">Mission:</span>
                          <div className="text-space-cyan font-medium">{dataset.mission}</div>
                        </div>
                        <div>
                          <span className="text-space-white/60">Records:</span>
                          <div className="text-space-yellow font-medium">{dataset.records.toLocaleString()}</div>
                        </div>
                        <div>
                          <span className="text-space-white/60">Size:</span>
                          <div className="text-space-magenta font-medium">{dataset.size}</div>
                        </div>
                        <div>
                          <span className="text-space-white/60">Uploaded:</span>
                          <div className="text-space-white font-medium">{dataset.uploadDate}</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4 lg:mt-0 lg:ml-6">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-1" />
                        Export
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4 mr-1" />
                        Process
                      </Button>
                      <Button variant="outline" size="sm" className="text-space-magenta border-space-magenta/30 hover:bg-space-magenta/10">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          /* Visualization View */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-8"
          >
            {/* Data Distribution */}
            <Card className="p-6">
              <h3 className="text-2xl font-bold text-glow mb-6">Classification Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={distributionData}>
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
                  <Bar dataKey="value" fill="#00d4ff" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Parameter Correlations */}
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="p-6">
                <h3 className="text-2xl font-bold text-glow mb-6">Orbital Period vs Planet Radius</h3>
                <ResponsiveContainer width="100%" height={350}>
                  <ScatterChart data={dataPoints.slice(0, 200)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                      dataKey="orbitalPeriod" 
                      stroke="#9ca3af"
                      label={{ value: 'Orbital Period (days)', position: 'insideBottom', offset: -10 }}
                    />
                    <YAxis 
                      dataKey="planetRadius" 
                      stroke="#9ca3af"
                      label={{ value: 'Planet Radius (R⊕)', angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1a1a2e', 
                        border: '1px solid #00d4ff',
                        borderRadius: '8px',
                        color: '#ffffff'
                      }}
                    />
                    <Scatter dataKey="planetRadius" fill="#00d4ff" />
                  </ScatterChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-6">
                <h3 className="text-2xl font-bold text-glow mb-6">Signal-to-Noise Ratio vs Stellar Magnitude</h3>
                <ResponsiveContainer width="100%" height={350}>
                  <ScatterChart data={dataPoints.slice(0, 200)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                      dataKey="stellarMagnitude" 
                      stroke="#9ca3af"
                      label={{ value: 'Stellar Magnitude', position: 'insideBottom', offset: -10 }}
                    />
                    <YAxis 
                      dataKey="snr" 
                      stroke="#9ca3af"
                      label={{ value: 'Signal-to-Noise Ratio', angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1a1a2e', 
                        border: '1px solid #00d4ff',
                        borderRadius: '8px',
                        color: '#ffffff'
                      }}
                    />
                    <Scatter dataKey="snr" fill="#ffd700" />
                  </ScatterChart>
                </ResponsiveContainer>
              </Card>
            </div>

            {/* Data Quality Metrics */}
            <Card className="p-6">
              <h3 className="text-2xl font-bold text-glow mb-6">Data Quality Overview</h3>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-neon-green mb-2">98.2%</div>
                  <div className="text-space-white/80">Data Completeness</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-space-cyan mb-2">1.8%</div>
                  <div className="text-space-white/80">Missing Values</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-space-yellow mb-2">0.3%</div>
                  <div className="text-space-white/80">Outliers Detected</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-space-magenta mb-2">15.2</div>
                  <div className="text-space-white/80">Avg SNR</div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-space-dark border border-space-white/20 rounded-2xl p-8 max-w-md w-full"
            >
              <h3 className="text-2xl font-bold text-glow mb-6">Upload Dataset</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-space-cyan mb-2">
                    Dataset Name
                  </label>
                  <Input placeholder="e.g., TESS Sector 51" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-space-cyan mb-2">
                    Mission
                  </label>
                  <select className="w-full px-3 py-2 bg-space-dark border border-space-white/20 rounded-lg text-space-white focus:border-space-cyan focus:outline-none">
                    <option>Select Mission</option>
                    <option>Kepler</option>
                    <option>K2</option>
                    <option>TESS</option>
                    <option>Ground-based</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-space-cyan mb-2">
                    File Upload
                  </label>
                  <div className="border-2 border-dashed border-space-white/20 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 text-space-white/50 mx-auto mb-2" />
                    <p className="text-space-white/70">Drop files here or click to browse</p>
                    <p className="text-space-white/50 text-sm mt-1">Supports CSV, FITS, HDF5</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-8">
                <Button 
                  variant="outline" 
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button className="flex-1">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DatasetExplorer;
