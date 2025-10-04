import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Target, RefreshCw, Activity, Database, Upload, Download, Calendar, Users } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

const ResearcherDashboard: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

  const overviewStats = [
    { 
      title: 'Total Datasets', 
      value: '12', 
      change: '+2 this month',
      icon: <Database className="w-6 h-6" />,
      color: 'text-space-cyan'
    },
    { 
      title: 'Model Accuracy', 
      value: '94.2%', 
      change: '+1.3% from last training',
      icon: <Target className="w-6 h-6" />,
      color: 'text-space-yellow'
    },
    { 
      title: 'Predictions Made', 
      value: '15,847', 
      change: '+2,341 this week',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'text-space-magenta'
    },
    { 
      title: 'Active Models', 
      value: '8', 
      change: '3 training, 5 deployed',
      icon: <Activity className="w-6 h-6" />,
      color: 'text-neon-green'
    }
  ];

  const modelPerformanceData = [
    { name: 'Random Forest', accuracy: 94.2, precision: 92.8, recall: 91.5, f1: 92.1 },
    { name: 'XGBoost', accuracy: 93.8, precision: 91.2, recall: 93.1, f1: 92.1 },
    { name: 'Neural Network', accuracy: 95.1, precision: 94.3, recall: 92.8, f1: 93.5 },
    { name: 'SVM', accuracy: 89.7, precision: 88.2, recall: 87.9, f1: 88.0 },
    { name: 'Ensemble', accuracy: 96.3, precision: 95.8, recall: 94.2, f1: 95.0 }
  ];

  const datasetDistribution = [
    { name: 'Kepler', value: 4500, color: '#00d4ff' },
    { name: 'K2', value: 2800, color: '#ffd700' },
    { name: 'TESS', value: 6200, color: '#ff0080' },
    { name: 'Ground-based', value: 1200, color: '#00ff00' }
  ];

  const trainingHistory = [
    { date: '2024-01', accuracy: 89.2, loss: 0.24 },
    { date: '2024-02', accuracy: 91.1, loss: 0.19 },
    { date: '2024-03', accuracy: 92.8, loss: 0.16 },
    { date: '2024-04', accuracy: 93.5, loss: 0.14 },
    { date: '2024-05', accuracy: 94.2, loss: 0.12 },
    { date: '2024-06', accuracy: 94.8, loss: 0.11 }
  ];

  const recentActivity = [
    { time: '2 hours ago', action: 'Model training completed', type: 'success', details: 'Random Forest v2.1 - 94.2% accuracy' },
    { time: '5 hours ago', action: 'Dataset uploaded', type: 'info', details: 'TESS Sector 45 - 1,247 light curves' },
    { time: '1 day ago', action: 'Batch prediction completed', type: 'success', details: '2,341 candidates processed' },
    { time: '2 days ago', action: 'Model deployment', type: 'info', details: 'Neural Network v1.3 deployed to production' },
    { time: '3 days ago', action: 'Data preprocessing', type: 'warning', details: '156 corrupted files detected and cleaned' }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <div className="w-2 h-2 bg-neon-green rounded-full"></div>;
      case 'warning':
        return <div className="w-2 h-2 bg-space-yellow rounded-full"></div>;
      case 'info':
        return <div className="w-2 h-2 bg-space-cyan rounded-full"></div>;
      default:
        return <div className="w-2 h-2 bg-space-white rounded-full"></div>;
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
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-glow mb-4">Research Dashboard</h1>
              <p className="text-xl text-space-white/80">
                Monitor model performance, manage datasets, and track research progress
              </p>
            </div>
            <div className="flex gap-3 mt-6 lg:mt-0">
              <Button variant="outline" className="px-4 py-2">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
              <Button className="px-4 py-2">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh Data
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Overview Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {overviewStats.map((stat, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={stat.color}>
                  {stat.icon}
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-glow">{stat.value}</div>
                  <div className="text-xs text-space-white/60">{stat.change}</div>
                </div>
              </div>
              <h3 className="text-space-white/80 font-medium">{stat.title}</h3>
            </Card>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Model Performance Comparison */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="p-6">
              <h3 className="text-2xl font-bold text-glow mb-6">Model Performance Comparison</h3>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={modelPerformanceData}>
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
                  <Bar dataKey="accuracy" fill="#00d4ff" name="Accuracy %" />
                  <Bar dataKey="precision" fill="#ffd700" name="Precision %" />
                  <Bar dataKey="recall" fill="#ff0080" name="Recall %" />
                  <Bar dataKey="f1" fill="#00ff00" name="F1 Score %" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>

          {/* Dataset Distribution */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="p-6">
              <h3 className="text-2xl font-bold text-glow mb-6">Dataset Distribution</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={datasetDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {datasetDistribution.map((entry, index) => (
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
                {datasetDistribution.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-space-white/80 text-sm">{item.name}</span>
                    </div>
                    <span className="text-space-white font-medium text-sm">{item.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Training History */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-glow">Training History</h3>
                <div className="flex gap-2">
                  {(['7d', '30d', '90d', '1y'] as const).map((period) => (
                    <button
                      key={period}
                      onClick={() => setSelectedTimeframe(period)}
                      className={`px-3 py-1 rounded text-sm transition-all ${
                        selectedTimeframe === period
                          ? 'bg-space-cyan text-space-black'
                          : 'text-space-white/60 hover:text-space-white'
                      }`}
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={trainingHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="date" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1a1a2e', 
                      border: '1px solid #00d4ff',
                      borderRadius: '8px',
                      color: '#ffffff'
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="accuracy" 
                    stroke="#00d4ff" 
                    fill="#00d4ff"
                    fillOpacity={0.3}
                    name="Accuracy %"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
          >
            <Card className="p-6">
              <h3 className="text-2xl font-bold text-glow mb-6">Recent Activity</h3>
              <div className="space-y-4 max-h-80 overflow-y-auto">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-space-dark/30 rounded-lg">
                    <div className="mt-2">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-space-white font-medium text-sm">{activity.action}</span>
                        <span className="text-space-white/50 text-xs">{activity.time}</span>
                      </div>
                      <p className="text-space-white/70 text-xs">{activity.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <Card className="p-8">
            <h3 className="text-2xl font-bold text-glow mb-6 text-center">Quick Actions</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button className="p-6 h-auto flex-col space-y-2" variant="outline">
                <Upload className="w-8 h-8" />
                <span>Upload Dataset</span>
              </Button>
              <Button className="p-6 h-auto flex-col space-y-2" variant="outline">
                <RefreshCw className="w-8 h-8" />
                <span>Train New Model</span>
              </Button>
              <Button className="p-6 h-auto flex-col space-y-2" variant="outline">
                <BarChart3 className="w-8 h-8" />
                <span>Run Predictions</span>
              </Button>
              <Button className="p-6 h-auto flex-col space-y-2" variant="outline">
                <Calendar className="w-8 h-8" />
                <span>Schedule Analysis</span>
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* System Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="mt-8"
        >
          <Card className="p-6">
            <h3 className="text-xl font-bold text-glow mb-4">System Status</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-neon-green rounded-full animate-pulse"></div>
                <div>
                  <div className="text-space-white font-medium">GPU Cluster</div>
                  <div className="text-space-white/60 text-sm">8/8 nodes online</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-neon-green rounded-full animate-pulse"></div>
                <div>
                  <div className="text-space-white font-medium">Data Pipeline</div>
                  <div className="text-space-white/60 text-sm">Processing normally</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-space-yellow rounded-full animate-pulse"></div>
                <div>
                  <div className="text-space-white font-medium">Storage</div>
                  <div className="text-space-white/60 text-sm">78% capacity used</div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ResearcherDashboard;
