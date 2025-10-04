import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { UserModeProvider } from './contexts/UserModeContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ModeSelector from './components/ModeSelector'

// Scroll to top component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Normal User Pages
import ExplorerHome from './pages/ExplorerHome'
import ExplorePlanets from './pages/ExplorePlanets'
import TryPrediction from './pages/TryPrediction'
import LearnMore from './pages/LearnMore'
import AboutOurModel from './pages/AboutOurModel'

// Researcher Pages
import ResearcherDashboard from './pages/ResearcherDashboard'
import DatasetExplorer from './pages/DatasetExplorer'
import Predictions from './pages/Predictions'
import ModelTraining from './pages/ModelTraining'
import ModelPerformance from './pages/ModelPerformance'
import DataManagement from './pages/DataManagement'
import UploadedModels from './pages/UploadedModels'

// Legacy Pages (for backward compatibility)
import Home from './pages/Home'
import Upload from './pages/Upload'
import Dashboard from './pages/Dashboard'
import Explorer from './pages/Explorer'
import About from './pages/About'

// Test Pages
import ApiTestPage from './pages/ApiTestPage'

function App() {
  return (
    <UserModeProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-space-gradient">
          <Navbar />
          <main>
            <Routes>
              {/* Mode Selection */}
              <Route path="/" element={<ModeSelector />} />
              
              {/* Normal User Routes */}
              <Route path="/explore" element={<ExplorerHome />} />
              <Route path="/explore-planets" element={<ExplorePlanets />} />
              <Route path="/try-prediction" element={<TryPrediction />} />
              <Route path="/learn-more" element={<LearnMore />} />
              <Route path="/about-our-model" element={<AboutOurModel />} />
              
              {/* Researcher Routes */}
              <Route path="/researcher-dashboard" element={<ResearcherDashboard />} />
              <Route path="/dataset-explorer" element={<DatasetExplorer />} />
              <Route path="/predictions" element={<Predictions />} />
              <Route path="/model-training" element={<ModelTraining />} />
              <Route path="/model-performance" element={<ModelPerformance />} />
              <Route path="/data-management" element={<DataManagement />} />
              <Route path="/uploaded-models" element={<UploadedModels />} />
              
              {/* Legacy Routes (backward compatibility) */}
              <Route path="/home" element={<Home />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/explorer" element={<Explorer />} />
              <Route path="/about" element={<About />} />
              
              {/* Test Routes */}
              <Route path="/api-test" element={<ApiTestPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </UserModeProvider>
  )
}

export default App
