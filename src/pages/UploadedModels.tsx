import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, FileText, Calendar, Trash2, Play, BarChart3, Download, AlertCircle, CheckCircle, X } from 'lucide-react'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Card from '../components/ui/Card'

interface UploadedModel {
  id: string
  name: string
  framework: string
  uploadedDate: string
  size: string
  status: 'active' | 'processing' | 'error'
  accuracy?: number
}

interface PredictionFormData {
  stellarMass: string
  stellarRadius: string
  orbitalPeriod: string
  planetRadius: string
  equilibriumTemp: string
  selectedModel: string
}

const UploadedModels: React.FC = () => {
  const [models, setModels] = useState<UploadedModel[]>([
    {
      id: '1',
      name: 'ExoNet_v2.1.onnx',
      framework: 'ONNX',
      uploadedDate: '2024-01-15',
      size: '45.2 MB',
      status: 'active',
      accuracy: 94.2
    },
    {
      id: '2',
      name: 'TransitDetector_TF.zip',
      framework: 'TensorFlow',
      uploadedDate: '2024-01-10',
      size: '128.7 MB',
      status: 'active',
      accuracy: 91.8
    },
    {
      id: '3',
      name: 'DeepExo_PyTorch.pt',
      framework: 'PyTorch',
      uploadedDate: '2024-01-08',
      size: '67.3 MB',
      status: 'processing'
    }
  ])

  const [dragActive, setDragActive] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<number | null>(null)
  const [showPredictionForm, setShowPredictionForm] = useState(false)
  const [predictionData, setPredictionData] = useState<PredictionFormData>({
    stellarMass: '',
    stellarRadius: '',
    orbitalPeriod: '',
    planetRadius: '',
    equilibriumTemp: '',
    selectedModel: ''
  })
  const [predictionResult, setPredictionResult] = useState<any>(null)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }, [])

  const handleFiles = (files: FileList) => {
    const file = files[0]
    const allowedTypes = ['.onnx', '.zip', '.pt', '.h5', '.pb', '.pkl']
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase()

    if (!allowedTypes.includes(fileExtension)) {
      alert('Please upload a valid model file (.onnx, .zip, .pt, .h5, .pb, .pkl)')
      return
    }

    // Simulate upload progress
    setUploadProgress(0)
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev === null) return 0
        if (prev >= 100) {
          clearInterval(interval)
          // Add new model to list
          const newModel: UploadedModel = {
            id: Date.now().toString(),
            name: file.name,
            framework: getFrameworkFromExtension(fileExtension),
            uploadedDate: new Date().toISOString().split('T')[0],
            size: formatFileSize(file.size),
            status: 'processing'
          }
          setModels(prev => [newModel, ...prev])
          setUploadProgress(null)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const getFrameworkFromExtension = (ext: string): string => {
    const frameworkMap: { [key: string]: string } = {
      '.onnx': 'ONNX',
      '.zip': 'TensorFlow',
      '.pt': 'PyTorch',
      '.h5': 'Keras',
      '.pb': 'TensorFlow',
      '.pkl': 'Scikit-learn'
    }
    return frameworkMap[ext] || 'Unknown'
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
  }

  const handleDeleteModel = (modelId: string) => {
    setModels(prev => prev.filter(model => model.id !== modelId))
  }

  const handleUseForPrediction = (model: UploadedModel) => {
    setPredictionData(prev => ({ ...prev, selectedModel: model.id }))
    setShowPredictionForm(true)
  }

  const handlePredictionSubmit = () => {
    // Simulate prediction
    const selectedModel = models.find(m => m.id === predictionData.selectedModel)
    const mockResult = {
      probability: Math.random() * 0.4 + 0.6, // 60-100%
      confidence: Math.random() * 0.3 + 0.7, // 70-100%
      modelUsed: selectedModel?.name || 'Unknown',
      processingTime: Math.random() * 2 + 1 // 1-3 seconds
    }
    setPredictionResult(mockResult)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case 'processing':
        return <AlertCircle className="w-5 h-5 text-yellow-400" />
      case 'error':
        return <X className="w-5 h-5 text-red-400" />
      default:
        return <FileText className="w-5 h-5 text-gray-400" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-space-black via-space-purple/20 to-space-black text-white pt-24 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-space-cyan to-space-magenta bg-clip-text text-transparent mb-4">
            Uploaded Models
          </h1>
          <p className="text-lg md:text-xl text-space-cyan/80">
            Manage your custom exoplanet detection models
          </p>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="xl:col-span-1"
          >
            <Card className="p-6">
              <h2 className="text-xl md:text-2xl font-bold text-space-cyan mb-6 flex items-center">
                <Upload className="w-5 h-5 md:w-6 md:h-6 mr-2" />
                Upload New Model
              </h2>

              {/* Drag & Drop Area */}
              <div
                className={`
                  border-2 border-dashed rounded-xl p-4 md:p-8 text-center transition-all duration-300
                  ${dragActive 
                    ? 'border-space-cyan bg-space-cyan/10' 
                    : 'border-space-cyan/30 hover:border-space-cyan/60'
                  }
                `}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="w-8 h-8 md:w-12 md:h-12 text-space-cyan mx-auto mb-4" />
                <p className="text-base md:text-lg mb-2">
                  {dragActive ? 'Drop your model file here' : 'Drag & drop your model file'}
                </p>
                <p className="text-xs md:text-sm text-gray-400 mb-4">
                  Supported formats: .onnx, .zip, .pt, .h5, .pb, .pkl
                </p>
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  accept=".onnx,.zip,.pt,.h5,.pb,.pkl"
                  onChange={(e) => e.target.files && handleFiles(e.target.files)}
                />
                <Button
                  onClick={() => document.getElementById('file-upload')?.click()}
                  variant="outline"
                >
                  Select File
                </Button>
              </div>

              {/* Upload Progress */}
              {uploadProgress !== null && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4"
                >
                  <div className="flex justify-between text-sm mb-2">
                    <span>Uploading...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-space-cyan h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </motion.div>
              )}
            </Card>
          </motion.div>

          {/* Models List */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="xl:col-span-2"
          >
            <Card className="p-4 md:p-6">
              <h2 className="text-xl md:text-2xl font-bold text-space-cyan mb-6 flex items-center">
                <FileText className="w-5 h-5 md:w-6 md:h-6 mr-2" />
                Your Models ({models.length})
              </h2>

              <div className="space-y-4">
                {models.map((model) => (
                  <motion.div
                    key={model.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-space-black/30 rounded-xl p-3 md:p-4 border border-space-cyan/20"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center mb-2">
                          {getStatusIcon(model.status)}
                          <h3 className="text-base md:text-lg font-semibold ml-2 truncate">{model.name}</h3>
                          <span className="ml-2 px-2 py-1 bg-space-purple/30 rounded text-xs">
                            {model.framework}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center text-xs md:text-sm text-gray-400 gap-2 md:gap-4">
                          <span className="flex items-center">
                            <Calendar className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                            {model.uploadedDate}
                          </span>
                          <span>{model.size}</span>
                          {model.accuracy && (
                            <span className="text-green-400">
                              Accuracy: {model.accuracy}%
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {model.status === 'active' && (
                        <div className="flex flex-wrap gap-2">
                          <Button
                            onClick={() => handleUseForPrediction(model)}
                            variant="primary"
                            size="sm"
                            className="text-xs md:text-sm"
                          >
                            <Play className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                            <span className="hidden sm:inline">Use for </span>Prediction
                          </Button>
                          <Button
                            onClick={() => {/* Handle compare performance */}}
                            variant="outline"
                            size="sm"
                            className="text-xs md:text-sm"
                          >
                            <BarChart3 className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                            <span className="hidden sm:inline">Compare</span>
                          </Button>
                          <Button
                            onClick={() => handleDeleteModel(model.id)}
                            variant="outline"
                            size="sm"
                            className="text-red-400 border-red-400 hover:bg-red-400 text-xs md:text-sm"
                          >
                            <Trash2 className="w-3 h-3 md:w-4 md:h-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Prediction Form Modal */}
        <AnimatePresence>
          {showPredictionForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowPredictionForm(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-space-black border border-space-cyan/30 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-space-cyan">Run Prediction</h2>
                  <Button
                    onClick={() => setShowPredictionForm(false)}
                    variant="outline"
                    size="sm"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                {/* Model Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-space-cyan mb-2">
                    Choose Model
                  </label>
                  <select
                    value={predictionData.selectedModel}
                    onChange={(e) => setPredictionData(prev => ({ ...prev, selectedModel: e.target.value }))}
                    className="w-full bg-space-black/50 border border-space-cyan/30 rounded-lg px-4 py-2 text-white"
                  >
                    <option value="">Select a model...</option>
                    {models.filter(m => m.status === 'active').map(model => (
                      <option key={model.id} value={model.id}>
                        {model.name} ({model.framework})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Prediction Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <Input
                    label="Stellar Mass (Solar masses)"
                    type="number"
                    step="0.01"
                    value={predictionData.stellarMass}
                    onChange={(e) => setPredictionData(prev => ({ ...prev, stellarMass: e.target.value }))}
                    placeholder="e.g., 1.0"
                  />
                  <Input
                    label="Stellar Radius (Solar radii)"
                    type="number"
                    step="0.01"
                    value={predictionData.stellarRadius}
                    onChange={(e) => setPredictionData(prev => ({ ...prev, stellarRadius: e.target.value }))}
                    placeholder="e.g., 1.0"
                  />
                  <Input
                    label="Orbital Period (days)"
                    type="number"
                    step="0.1"
                    value={predictionData.orbitalPeriod}
                    onChange={(e) => setPredictionData(prev => ({ ...prev, orbitalPeriod: e.target.value }))}
                    placeholder="e.g., 365.25"
                  />
                  <Input
                    label="Planet Radius (Earth radii)"
                    type="number"
                    step="0.01"
                    value={predictionData.planetRadius}
                    onChange={(e) => setPredictionData(prev => ({ ...prev, planetRadius: e.target.value }))}
                    placeholder="e.g., 1.0"
                  />
                  <Input
                    label="Equilibrium Temperature (K)"
                    type="number"
                    step="1"
                    value={predictionData.equilibriumTemp}
                    onChange={(e) => setPredictionData(prev => ({ ...prev, equilibriumTemp: e.target.value }))}
                    placeholder="e.g., 288"
                    className="md:col-span-2"
                  />
                </div>

                {/* Prediction Result */}
                {predictionResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-space-purple/20 rounded-xl p-4 mb-6"
                  >
                    <h3 className="text-lg font-semibold text-space-cyan mb-3">Prediction Result</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-400">Exoplanet Probability</p>
                        <p className="text-2xl font-bold text-space-cyan">
                          {(predictionResult.probability * 100).toFixed(1)}%
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Model Confidence</p>
                        <p className="text-2xl font-bold text-space-magenta">
                          {(predictionResult.confidence * 100).toFixed(1)}%
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Model Used</p>
                        <p className="text-sm font-medium">{predictionResult.modelUsed}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Processing Time</p>
                        <p className="text-sm font-medium">{predictionResult.processingTime.toFixed(2)}s</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4">
                  <Button
                    onClick={() => setShowPredictionForm(false)}
                    variant="outline"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handlePredictionSubmit}
                    disabled={!predictionData.selectedModel || !predictionData.stellarMass}
                  >
                    Run Prediction
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default UploadedModels
