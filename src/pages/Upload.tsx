import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload as UploadIcon, FileText, CheckCircle, AlertCircle, BarChart3 } from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'

interface PredictionResult {
  classification: 'Confirmed' | 'Candidate' | 'False Positive'
  confidence: number
  features: { name: string; importance: number }[]
}

const Upload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null)
  const [manualData, setManualData] = useState({
    orbitalPeriod: '',
    transitDuration: '',
    planetRadius: '',
    stellarRadius: '',
    stellarMass: '',
    stellarTemperature: ''
  })
  const [prediction, setPrediction] = useState<PredictionResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFile(file)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
    const file = e.dataTransfer.files[0]
    if (file) {
      setFile(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
  }

  const handleManualInputChange = (field: string, value: string) => {
    setManualData(prev => ({ ...prev, [field]: value }))
  }

  const simulatePrediction = async () => {
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const mockPrediction: PredictionResult = {
      classification: Math.random() > 0.5 ? 'Confirmed' : Math.random() > 0.3 ? 'Candidate' : 'False Positive',
      confidence: Math.random() * 30 + 70, // 70-100%
      features: [
        { name: 'Orbital Period', importance: Math.random() * 100 },
        { name: 'Transit Duration', importance: Math.random() * 100 },
        { name: 'Planet Radius', importance: Math.random() * 100 },
        { name: 'Stellar Radius', importance: Math.random() * 100 },
        { name: 'Stellar Mass', importance: Math.random() * 100 },
        { name: 'Stellar Temperature', importance: Math.random() * 100 }
      ].sort((a, b) => b.importance - a.importance)
    }
    
    setPrediction(mockPrediction)
    setIsLoading(false)
  }

  const getClassificationColor = (classification: string) => {
    switch (classification) {
      case 'Confirmed':
        return 'text-space-cyan'
      case 'Candidate':
        return 'text-space-yellow'
      case 'False Positive':
        return 'text-space-magenta'
      default:
        return 'text-space-white'
    }
  }

  const getClassificationIcon = (classification: string) => {
    switch (classification) {
      case 'Confirmed':
        return <CheckCircle className="w-6 h-6" />
      case 'Candidate':
        return <AlertCircle className="w-6 h-6" />
      case 'False Positive':
        return <AlertCircle className="w-6 h-6" />
      default:
        return null
    }
  }

  return (
    <div className="pt-20 min-h-screen px-4 py-12 bg-upload">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-glow mb-4">Upload & Prediction</h1>
          <p className="text-xl text-space-white/80">
            Upload your exoplanet data or enter parameters manually for AI analysis
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-glow mb-6">File Upload</h2>
              
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
                  dragActive 
                    ? 'border-space-cyan bg-space-cyan/10' 
                    : 'border-space-cyan/30 hover:border-space-cyan/50'
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                <UploadIcon className="w-12 h-12 text-space-cyan mx-auto mb-4" />
                <p className="text-space-white/80 mb-4">
                  Drag and drop your CSV or FITS file here, or click to browse
                </p>
                <input
                  type="file"
                  accept=".csv,.fits"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload">
                  <Button variant="outline" className="cursor-pointer">
                    Choose File
                  </Button>
                </label>
                {file && (
                  <div className="mt-4 p-3 bg-space-dark/50 rounded-lg">
                    <FileText className="w-5 h-5 text-space-cyan inline mr-2" />
                    <span className="text-space-white">{file.name}</span>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>

          {/* Manual Input Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-glow mb-6">Manual Input</h2>
              
              <div className="space-y-4">
                <Input
                  label="Orbital Period (days)"
                  type="number"
                  placeholder="Enter orbital period"
                  value={manualData.orbitalPeriod}
                  onChange={(e) => handleManualInputChange('orbitalPeriod', e.target.value)}
                />
                <Input
                  label="Transit Duration (hours)"
                  type="number"
                  placeholder="Enter transit duration"
                  value={manualData.transitDuration}
                  onChange={(e) => handleManualInputChange('transitDuration', e.target.value)}
                />
                <Input
                  label="Planet Radius (Earth radii)"
                  type="number"
                  placeholder="Enter planet radius"
                  value={manualData.planetRadius}
                  onChange={(e) => handleManualInputChange('planetRadius', e.target.value)}
                />
                <Input
                  label="Stellar Radius (Solar radii)"
                  type="number"
                  placeholder="Enter stellar radius"
                  value={manualData.stellarRadius}
                  onChange={(e) => handleManualInputChange('stellarRadius', e.target.value)}
                />
                <Input
                  label="Stellar Mass (Solar masses)"
                  type="number"
                  placeholder="Enter stellar mass"
                  value={manualData.stellarMass}
                  onChange={(e) => handleManualInputChange('stellarMass', e.target.value)}
                />
                <Input
                  label="Stellar Temperature (K)"
                  type="number"
                  placeholder="Enter stellar temperature"
                  value={manualData.stellarTemperature}
                  onChange={(e) => handleManualInputChange('stellarTemperature', e.target.value)}
                />
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-8"
        >
          <Button
            size="lg"
            onClick={simulatePrediction}
            disabled={isLoading || (!file && Object.values(manualData).every(v => !v))}
            className="px-12"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-space-black mr-2" />
                Analyzing...
              </>
            ) : (
              <>
                <BarChart3 className="w-5 h-5 mr-2" />
                Analyze Data
              </>
            )}
          </Button>
        </motion.div>

        {/* Prediction Results */}
        {prediction && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12"
          >
            <Card glow className="p-8">
              <h2 className="text-2xl font-bold text-glow mb-6">Prediction Results</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* Classification */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-space-white">Classification</h3>
                  <div className={`flex items-center space-x-3 p-4 rounded-lg bg-space-dark/50 ${getClassificationColor(prediction.classification)}`}>
                    {getClassificationIcon(prediction.classification)}
                    <span className="text-2xl font-bold">{prediction.classification}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Confidence</span>
                      <span>{prediction.confidence.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-space-dark rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-space-cyan to-space-magenta h-3 rounded-full transition-all duration-1000"
                        style={{ width: `${prediction.confidence}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Feature Importance */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-space-white">Feature Importance</h3>
                  <div className="space-y-3">
                    {prediction.features.map((feature, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{feature.name}</span>
                          <span>{feature.importance.toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-space-dark rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-space-cyan to-space-yellow h-2 rounded-full transition-all duration-1000"
                            style={{ 
                              width: `${feature.importance}%`,
                              transitionDelay: `${index * 100}ms`
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Upload
