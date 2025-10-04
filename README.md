# 🌌 NASA Exoplanet AI Suite

A comprehensive multi-model machine learning platform for exoplanet detection and analysis, combining React frontend with Streamlit AI prediction models.

## 🚀 Features

### 🤖 AI Models
- **104-Input Kepler Model** (94.5% accuracy) - Advanced exoplanet detection
- **K2 Mission Model** (78.8% accuracy) - K2 mission data analysis  
- **Kepler Mission Model** (74.3% accuracy) - Original Kepler mission analysis
- **TESS Mission Model** (69.2% accuracy) - TESS mission exoplanet detection

### 🌟 Key Capabilities
- Real-time exoplanet prediction using actual NASA data
- Interactive data visualization and exploration
- Multi-model ensemble predictions
- Comprehensive exoplanet database integration
- Professional space-themed UI/UX

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Recharts** for data visualization

### Backend/AI
- **Streamlit** for AI model interface
- **Python** with scikit-learn
- **Joblib** for model serialization
- **Pandas** for data manipulation
- **NumPy** for numerical computing

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- Python 3.8+
- pip

### Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd nasa-exoplanet-ai-suite
```

2. **Install frontend dependencies**
```bash
npm install
```

3. **Install Python dependencies**
```bash
pip install streamlit pandas numpy scikit-learn joblib plotly
```

## 🚀 Running the Application

### Start the React Frontend
```bash
npm run dev
```
Frontend will be available at `http://localhost:5173`

### Start the Streamlit AI Suite
```bash
npm run streamlit
```
AI models will be available at `http://localhost:8501`

## 📁 Project Structure

```
nasa-exoplanet-ai-suite/
├── src/                          # React frontend source
│   ├── components/              # Reusable UI components
│   ├── pages/                   # Application pages
│   ├── contexts/                # React contexts
│   └── types/                   # TypeScript type definitions
├── models-and-streamlit/        # AI models and Streamlit app
│   ├── streamlit_app.py        # Main Streamlit application
│   ├── 3 models for every mission/  # Individual mission models
│   └── model kepler df new with 104 inputs/  # Advanced 104-input model
├── public/                      # Static assets
└── package.json                # Node.js dependencies
```

## 🤖 AI Models Details

### 104-Input Kepler Model
- **Accuracy**: 94.5%
- **Features**: 104 comprehensive exoplanet parameters
- **Dataset**: Real Kepler mission data (9,561 samples)
- **Algorithm**: Advanced ensemble method

### Mission-Specific Models
- **K2 Model**: 18 features, 78.8% accuracy
- **Kepler Model**: 15 features, 74.3% accuracy  
- **TESS Model**: 14 features, 69.2% accuracy

## 🎯 Usage

1. **Launch the application** using the commands above
2. **Navigate to "Try Prediction"** in the frontend
3. **Click "Launch AI Prediction Suite"** to open the Streamlit interface
4. **Select a model** from the sidebar
5. **Choose data samples** (for 104-input model) or enter parameters
6. **Click "Launch AI Prediction"** to get results

## 📊 Data Sources

- **Kepler Mission Data**: NASA's Kepler space telescope observations
- **K2 Mission Data**: Extended Kepler mission data
- **TESS Mission Data**: Transiting Exoplanet Survey Satellite data
- **Real-time Predictions**: Using actual NASA exoplanet datasets

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🏆 Acknowledgments

- NASA for providing exoplanet data
- The Kepler, K2, and TESS mission teams
- Open source machine learning community

---

**🌌 Exploring the universe, one exoplanet at a time** 🪐
