import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, Target, RefreshCw, Activity } from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'

const Dashboard: React.FC = () => {
  const [isRetraining, setIsRetraining] = useState(false)
  const [hyperparameters, setHyperparameters] = useState({
    learningRate: 0.01,
    maxDepth: 10,
    nEstimators: 100,
    minSamplesSplit: 2,
    minSamplesLeaf: 1
  })

  const performanceMetrics = [
    { name: 'Accuracy', value: '94.2%', color: 'text-space-cyan', icon: <Target className="w-6 h-6" /> },
    { name: 'Precision', value: '92.8%', color: 'text-space-magenta', icon: <TrendingUp className="w-6 h-6" /> },
    { name: 'Recall', value: '91.5%', color: 'text-space-yellow', icon: <Activity className="w-6 h-6" /> },
    { name: 'F1 Score', value: '92.1%', color: 'text-space-cyan', icon: <BarChart3 className="w-6 h-6" /> }
  ]

  const confusionMatrixData = [
    { name: 'Confirmed', Confirmed: 1200, Candidate: 45, 'False Positive': 12 },
    { name: 'Candidate', Confirmed: 38, Candidate: 850, 'False Positive': 25 },
    { name: 'False Positive', Confirmed: 8, Candidate: 18, 'False Positive': 320 }
  ]

  const rocData = [
    { name: '0.0', TPR: 0, FPR: 0 },
    { name: '0.1', TPR: 0.15, FPR: 0.02 },
    { name: '0.2', TPR: 0.35, FPR: 0.05 },
    { name: '0.3', TPR: 0.55, FPR: 0.08 },
    { name: '0.4', TPR: 0.72, FPR: 0.12 },
    { name: '0.5', TPR: 0.85, FPR: 0.18 },
    { name: '0.6', TPR: 0.92, FPR: 0.25 },
    { name: '0.7', TPR: 0.96, FPR: 0.35 },
    { name: '0.8', TPR: 0.98, FPR: 0.48 },
    { name: '0.9', TPR: 0.99, FPR: 0.65 },
    { name: '1.0', TPR: 1.0, FPR: 1.0 }
  ]

  const classDistributionData = [
    { name: 'Confirmed', value: 1257, color: '#00d4ff' },
    { name: 'Candidate', value: 913, color: '#ffd700' },
    { name: 'False Positive', value: 361, color: '#ff0080' }
  ]

  const updateHyperparameter = (key: keyof typeof hyperparameters, value: number) => {
    setHyperparameters(prev => ({ ...prev, [key]: value }))
  }

  const handleRetrain = async () => {
    setIsRetraining(true)
    // Simulate retraining process
    await new Promise(resolve => setTimeout(resolve, 3000))
    setIsRetraining(false)
  }

  return (
    <div className="pt-20 min-h-screen px-4 py-12 bg-dashboard">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-glow mb-4">Model Dashboard</h1>
          <p className="text-xl text-space-white/80">
            Monitor model performance and retrain with updated parameters
          </p>
        </motion.div>

        {/* Performance Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {performanceMetrics.map((metric, index) => (
            <Card key={index} className="p-6">
              <div className={`${metric.color} mb-4`}>
                {metric.icon}
              </div>
              <h3 className="text-2xl font-bold text-glow mb-2">{metric.value}</h3>
              <p className="text-space-white/80">{metric.name}</p>
            </Card>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Confusion Matrix */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-6">
              <h3 className="text-2xl font-bold text-glow mb-6">Confusion Matrix</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={confusionMatrixData}>
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
                  <Bar dataKey="Confirmed" fill="#00d4ff" />
                  <Bar dataKey="Candidate" fill="#ffd700" />
                  <Bar dataKey="False Positive" fill="#ff0080" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>

          {/* ROC Curve */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="p-6">
              <h3 className="text-2xl font-bold text-glow mb-6">ROC Curve</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={rocData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="FPR" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
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
                    dataKey="TPR" 
                    stroke="#00d4ff" 
                    strokeWidth={3}
                    dot={{ fill: '#00d4ff', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Class Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Card className="p-6">
              <h3 className="text-2xl font-bold text-glow mb-6">Class Distribution</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={classDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {classDistributionData.map((entry, index) => (
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
            </Card>
          </motion.div>

          {/* Hyperparameters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="lg:col-span-2"
          >
            <Card className="p-6">
              <h3 className="text-2xl font-bold text-glow mb-6">Model Hyperparameters</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-space-cyan mb-2">
                      Learning Rate
                    </label>
                    <input
                      type="range"
                      min="0.001"
                      max="0.1"
                      step="0.001"
                      value={hyperparameters.learningRate}
                      onChange={(e) => updateHyperparameter('learningRate', parseFloat(e.target.value))}
                      className="w-full h-2 bg-space-dark rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="text-sm text-space-white/80 mt-1">
                      {hyperparameters.learningRate.toFixed(3)}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-space-cyan mb-2">
                      Max Depth
                    </label>
                    <input
                      type="range"
                      min="5"
                      max="20"
                      step="1"
                      value={hyperparameters.maxDepth}
                      onChange={(e) => updateHyperparameter('maxDepth', parseInt(e.target.value))}
                      className="w-full h-2 bg-space-dark rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="text-sm text-space-white/80 mt-1">
                      {hyperparameters.maxDepth}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-space-cyan mb-2">
                      N Estimators
                    </label>
                    <input
                      type="range"
                      min="50"
                      max="200"
                      step="10"
                      value={hyperparameters.nEstimators}
                      onChange={(e) => updateHyperparameter('nEstimators', parseInt(e.target.value))}
                      className="w-full h-2 bg-space-dark rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="text-sm text-space-white/80 mt-1">
                      {hyperparameters.nEstimators}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-space-cyan mb-2">
                      Min Samples Split
                    </label>
                    <input
                      type="range"
                      min="2"
                      max="10"
                      step="1"
                      value={hyperparameters.minSamplesSplit}
                      onChange={(e) => updateHyperparameter('minSamplesSplit', parseInt(e.target.value))}
                      className="w-full h-2 bg-space-dark rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="text-sm text-space-white/80 mt-1">
                      {hyperparameters.minSamplesSplit}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-space-cyan mb-2">
                      Min Samples Leaf
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      step="1"
                      value={hyperparameters.minSamplesLeaf}
                      onChange={(e) => updateHyperparameter('minSamplesLeaf', parseInt(e.target.value))}
                      className="w-full h-2 bg-space-dark rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="text-sm text-space-white/80 mt-1">
                      {hyperparameters.minSamplesLeaf}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Retrain Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="text-center"
        >
          <Button
            size="lg"
            onClick={handleRetrain}
            disabled={isRetraining}
            className="px-12"
          >
            {isRetraining ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-space-black mr-2" />
                Retraining Model...
              </>
            ) : (
              <>
                <RefreshCw className="w-5 h-5 mr-2" />
                Retrain Model
              </>
            )}
          </Button>
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard
