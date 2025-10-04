import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Database, Trash2, Download, Upload, RefreshCw, Search, Filter, Archive, Settings } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

interface DataItem {
  id: string;
  name: string;
  type: 'dataset' | 'model' | 'results' | 'backup';
  size: string;
  created: string;
  lastAccessed: string;
  status: 'active' | 'archived' | 'processing';
  description: string;
}

const DataManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'dataset' | 'model' | 'results' | 'backup'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'archived' | 'processing'>('all');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const dataItems: DataItem[] = [
    {
      id: '1',
      name: 'Kepler DR25 Complete Dataset',
      type: 'dataset',
      size: '2.3 GB',
      created: '2024-01-15',
      lastAccessed: '2024-03-18',
      status: 'active',
      description: 'Complete Kepler mission data release 25 with stellar parameters'
    },
    {
      id: '2',
      name: 'Neural Network v2.1 Model',
      type: 'model',
      size: '145 MB',
      created: '2024-03-10',
      lastAccessed: '2024-03-18',
      status: 'active',
      description: 'Trained neural network for exoplanet classification'
    },
    {
      id: '3',
      name: 'TESS Sector 45 Analysis Results',
      type: 'results',
      size: '89 MB',
      created: '2024-03-15',
      lastAccessed: '2024-03-17',
      status: 'active',
      description: 'Classification results from TESS sector 45 batch processing'
    },
    {
      id: '4',
      name: 'K2 Campaign 1-19 Archive',
      type: 'dataset',
      size: '1.2 GB',
      created: '2023-12-01',
      lastAccessed: '2024-02-28',
      status: 'archived',
      description: 'Historical K2 mission data from all campaigns'
    },
    {
      id: '5',
      name: 'System Backup March 2024',
      type: 'backup',
      size: '5.7 GB',
      created: '2024-03-01',
      lastAccessed: '2024-03-01',
      status: 'archived',
      description: 'Complete system backup including models and datasets'
    },
    {
      id: '6',
      name: 'Ground-based Follow-up Processing',
      type: 'results',
      size: '23 MB',
      created: '2024-03-18',
      lastAccessed: '2024-03-18',
      status: 'processing',
      description: 'Currently processing ground-based validation data'
    }
  ];

  const filteredItems = dataItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const storageStats = {
    total: '10 TB',
    used: '7.2 TB',
    available: '2.8 TB',
    usagePercentage: 72
  };

  const typeStats = [
    { type: 'Datasets', count: 12, size: '8.9 GB', color: '#00d4ff' },
    { type: 'Models', count: 8, size: '1.2 GB', color: '#ffd700' },
    { type: 'Results', count: 24, size: '2.1 GB', color: '#ff0080' },
    { type: 'Backups', count: 6, size: '15.8 GB', color: '#00ff00' }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'dataset':
        return <Database className="w-5 h-5 text-space-cyan" />;
      case 'model':
        return <Settings className="w-5 h-5 text-space-yellow" />;
      case 'results':
        return <Archive className="w-5 h-5 text-space-magenta" />;
      case 'backup':
        return <RefreshCw className="w-5 h-5 text-neon-green" />;
      default:
        return <Database className="w-5 h-5 text-space-white" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-neon-green';
      case 'archived':
        return 'text-space-yellow';
      case 'processing':
        return 'text-space-cyan';
      default:
        return 'text-space-white';
    }
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case 'active':
        return `${baseClasses} bg-neon-green/20 text-neon-green border border-neon-green/30`;
      case 'archived':
        return `${baseClasses} bg-space-yellow/20 text-space-yellow border border-space-yellow/30`;
      case 'processing':
        return `${baseClasses} bg-space-cyan/20 text-space-cyan border border-space-cyan/30`;
      default:
        return baseClasses;
    }
  };

  const toggleItemSelection = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const selectAllItems = () => {
    setSelectedItems(filteredItems.map(item => item.id));
  };

  const clearSelection = () => {
    setSelectedItems([]);
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
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-glow mb-4">Data Management</h1>
              <p className="text-xl text-space-white/80">
                Manage datasets, models, results, and system backups
              </p>
            </div>
            <div className="flex gap-3 mt-6 lg:mt-0">
              <Button variant="outline" className="px-4 py-2">
                <Upload className="w-4 h-4 mr-2" />
                Upload Data
              </Button>
              <Button className="px-4 py-2">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Storage Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-glow mb-6">Storage Overview</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-space-cyan mb-2">{storageStats.total}</div>
                <div className="text-space-white/80">Total Storage</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-space-magenta mb-2">{storageStats.used}</div>
                <div className="text-space-white/80">Used</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-neon-green mb-2">{storageStats.available}</div>
                <div className="text-space-white/80">Available</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-space-yellow mb-2">{storageStats.usagePercentage}%</div>
                <div className="text-space-white/80">Usage</div>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between text-sm text-space-white/70 mb-2">
                <span>Storage Usage</span>
                <span>{storageStats.usagePercentage}%</span>
              </div>
              <div className="w-full bg-space-dark rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-neon-green to-space-yellow h-3 rounded-full transition-all duration-300"
                  style={{ width: `${storageStats.usagePercentage}%` }}
                ></div>
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              {typeStats.map((stat, index) => (
                <div key={index} className="text-center p-3 bg-space-dark/30 rounded-lg">
                  <div className="text-lg font-bold" style={{ color: stat.color }}>
                    {stat.count}
                  </div>
                  <div className="text-sm text-space-white/80">{stat.type}</div>
                  <div className="text-xs text-space-white/60">{stat.size}</div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <Card className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-space-white/50 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search data items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-space-white/50 w-5 h-5" />
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value as any)}
                    className="pl-10 pr-8 py-2 bg-space-dark border border-space-white/20 rounded-lg text-space-white focus:border-space-cyan focus:outline-none appearance-none"
                  >
                    <option value="all">All Types</option>
                    <option value="dataset">Datasets</option>
                    <option value="model">Models</option>
                    <option value="results">Results</option>
                    <option value="backup">Backups</option>
                  </select>
                </div>

                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as any)}
                    className="px-4 py-2 bg-space-dark border border-space-white/20 rounded-lg text-space-white focus:border-space-cyan focus:outline-none appearance-none pr-8"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="archived">Archived</option>
                    <option value="processing">Processing</option>
                  </select>
                </div>
              </div>

              {selectedItems.length > 0 && (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={clearSelection}>
                    Clear ({selectedItems.length})
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-1" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm" className="text-space-magenta border-space-magenta/30">
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Results Count & Bulk Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-6 flex items-center justify-between"
        >
          <p className="text-space-white/80">
            Showing {filteredItems.length} of {dataItems.length} items
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={selectAllItems}>
              Select All
            </Button>
          </div>
        </motion.div>

        {/* Data Items List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="space-y-4"
        >
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-6 hover:border-space-cyan/50 transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => toggleItemSelection(item.id)}
                    className="rounded border-space-white/20"
                  />
                  
                  <div className="flex-shrink-0">
                    {getTypeIcon(item.type)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-bold text-glow truncate">{item.name}</h3>
                      <span className={getStatusBadge(item.status)}>
                        {item.status}
                      </span>
                    </div>
                    <p className="text-space-white/70 text-sm mb-3">{item.description}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-space-white/60">Type:</span>
                        <div className="text-space-cyan font-medium capitalize">{item.type}</div>
                      </div>
                      <div>
                        <span className="text-space-white/60">Size:</span>
                        <div className="text-space-yellow font-medium">{item.size}</div>
                      </div>
                      <div>
                        <span className="text-space-white/60">Created:</span>
                        <div className="text-space-white font-medium">{item.created}</div>
                      </div>
                      <div>
                        <span className="text-space-white/60">Last Accessed:</span>
                        <div className="text-space-white font-medium">{item.lastAccessed}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Archive className="w-4 h-4" />
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

        {/* Cleanup Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12"
        >
          <Card className="p-6">
            <h3 className="text-2xl font-bold text-glow mb-6">Storage Optimization</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-space-yellow/10 rounded-lg border border-space-yellow/30">
                <div className="text-2xl font-bold text-space-yellow mb-2">3</div>
                <div className="text-space-white/80 mb-2">Old Backups</div>
                <div className="text-xs text-space-white/60">Can be archived to save 2.1 GB</div>
              </div>
              <div className="text-center p-4 bg-space-magenta/10 rounded-lg border border-space-magenta/30">
                <div className="text-2xl font-bold text-space-magenta mb-2">7</div>
                <div className="text-space-white/80 mb-2">Unused Results</div>
                <div className="text-xs text-space-white/60">Not accessed in 90+ days</div>
              </div>
              <div className="text-center p-4 bg-space-cyan/10 rounded-lg border border-space-cyan/30">
                <div className="text-2xl font-bold text-space-cyan mb-2">2</div>
                <div className="text-space-white/80 mb-2">Duplicate Files</div>
                <div className="text-xs text-space-white/60">Potential duplicates detected</div>
              </div>
            </div>
            <div className="mt-6 text-center">
              <Button className="px-6 py-3">
                <Settings className="w-5 h-5 mr-2" />
                Run Cleanup Wizard
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default DataManagement;
