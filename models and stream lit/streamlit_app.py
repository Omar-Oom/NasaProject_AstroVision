import streamlit as st
import pandas as pd
import numpy as np
import pickle
import joblib
import plotly.express as px
import plotly.graph_objects as go
from pathlib import Path
import warnings
warnings.filterwarnings('ignore')

# Page configuration
st.set_page_config(
    page_title="🌌 NASA Exoplanet AI Suite - Multi-Model Detection Platform",
    page_icon="🪐",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS for space theme
def add_space_theme():
    st.markdown("""
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');
    
    .main {
        background: linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%);
        color: #ffffff;
    }
    
    .stApp {
        background: linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%);
    }
    
    .space-background {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        background: linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%);
        overflow: hidden;
    }
    
    .stars {
        position: absolute;
        width: 2px;
        height: 2px;
        background: #ffffff;
        border-radius: 50%;
        animation: twinkle 3s infinite;
    }
    
    .stars:nth-child(odd) {
        animation-delay: 1s;
    }
    
    .stars:nth-child(even) {
        animation-delay: 2s;
    }
    
    @keyframes twinkle {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 1; }
    }
    
    .particle {
        position: absolute;
        width: 1px;
        height: 1px;
        background: #00ffff;
        border-radius: 50%;
        animation: float 6s infinite linear;
    }
    
    @keyframes float {
        0% {
            transform: translateY(100vh) translateX(0);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) translateX(100px);
            opacity: 0;
        }
    }
    
    .title-container {
        text-align: center;
        padding: 3rem 0;
        color: #ffffff;
        border-radius: 20px;
        margin: 2rem 0;
        position: relative;
        background: rgba(255, 255, 255, 0.1);
        border: 2px solid #ffffff;
    }
    
    @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
    
    @keyframes pulse {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 0.6; }
    }
    
    .stSelectbox > div > div {
        background-color: rgba(255, 255, 255, 0.1);
        border: 1px solid #ffffff;
        border-radius: 8px;
    }
    
    .stNumberInput > div > div > input {
        background-color: rgba(255, 255, 255, 0.1);
        border: 1px solid #ffffff;
        color: white;
    }
    
    .stButton > button {
        background: #ffffff;
        color: #000000;
        border: 2px solid #ffffff;
        border-radius: 25px;
        padding: 0.75rem 2.5rem;
        font-weight: bold;
        font-size: 1.1rem;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(255, 255, 255, 0.3);
    }
    
    .stButton > button:hover {
        transform: scale(1.08) translateY(-2px);
        box-shadow: 0 8px 25px rgba(255, 255, 255, 0.6);
        background: #f0f0f0;
    }
    
    @keyframes buttonGradient {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
    
    .metric-card {
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid #00ffff;
        border-radius: 10px;
        padding: 1rem;
        margin: 0.5rem 0;
        backdrop-filter: blur(10px);
    }
    
    .prediction-result {
        background: rgba(255, 255, 255, 0.15);
        border: 2px solid #ffffff;
        border-radius: 20px;
        padding: 2.5rem;
        margin: 1.5rem 0;
        text-align: center;
        backdrop-filter: blur(15px);
        box-shadow: 0 10px 40px rgba(255, 255, 255, 0.2);
    }
    
    @keyframes resultGlow {
        0% { box-shadow: 0 10px 40px rgba(0, 255, 255, 0.2); }
        100% { box-shadow: 0 15px 50px rgba(255, 0, 255, 0.3); }
    }
    
    .model-info {
        background: rgba(255, 255, 255, 0.1);
        border: 2px solid #ffffff;
        border-radius: 15px;
        padding: 1.5rem;
        margin: 1rem 0;
        backdrop-filter: blur(10px);
        box-shadow: 0 8px 32px rgba(255, 255, 255, 0.1);
        transition: all 0.3s ease;
    }
    
    .model-info:hover {
        transform: translateY(-2px);
        box-shadow: 0 12px 40px rgba(255, 255, 255, 0.2);
        border-color: #ffffff;
    }
    
    .sidebar-header {
        background: rgba(255, 255, 255, 0.1);
        border: 2px solid #ffffff;
        border-radius: 15px;
        padding: 1rem;
        margin-bottom: 1rem;
        text-align: center;
        box-shadow: 0 4px 20px rgba(255, 255, 255, 0.2);
    }
    
    .stTabs [data-baseweb="tab-list"] {
        gap: 2px;
    }
    
    .stTabs [data-baseweb="tab"] {
        height: 50px;
        white-space: pre-wrap;
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: 10px;
        color: white;
        font-weight: bold;
        border: 1px solid #ffffff;
    }
    
    .stTabs [aria-selected="true"] {
        background: #ffffff;
        color: #000000;
        box-shadow: 0 4px 15px rgba(255, 255, 255, 0.3);
    }
    </style>
    """, unsafe_allow_html=True)

# Add space background with particles
def add_space_background():
    st.markdown("""
    <div class="space-background">
        <div class="stars" style="top: 10%; left: 20%;"></div>
        <div class="stars" style="top: 20%; left: 80%;"></div>
        <div class="stars" style="top: 30%; left: 40%;"></div>
        <div class="stars" style="top: 40%; left: 70%;"></div>
        <div class="stars" style="top: 50%; left: 10%;"></div>
        <div class="stars" style="top: 60%; left: 90%;"></div>
        <div class="stars" style="top: 70%; left: 30%;"></div>
        <div class="stars" style="top: 80%; left: 60%;"></div>
        <div class="stars" style="top: 90%; left: 15%;"></div>
        <div class="stars" style="top: 15%; left: 50%;"></div>
        <div class="stars" style="top: 25%; left: 25%;"></div>
        <div class="stars" style="top: 35%; left: 75%;"></div>
        <div class="stars" style="top: 45%; left: 35%;"></div>
        <div class="stars" style="top: 55%; left: 85%;"></div>
        <div class="stars" style="top: 65%; left: 45%;"></div>
        <div class="stars" style="top: 75%; left: 95%;"></div>
        <div class="stars" style="top: 85%; left: 5%;"></div>
        <div class="stars" style="top: 95%; left: 55%;"></div>
        
        <div class="particle" style="left: 10%; animation-delay: 0s;"></div>
        <div class="particle" style="left: 30%; animation-delay: 2s;"></div>
        <div class="particle" style="left: 50%; animation-delay: 4s;"></div>
        <div class="particle" style="left: 70%; animation-delay: 1s;"></div>
        <div class="particle" style="left: 90%; animation-delay: 3s;"></div>
    </div>
    """, unsafe_allow_html=True)

# Load model function
@st.cache_data
def load_model(model_path):
    try:
        model = joblib.load(model_path)   
        return model
    except Exception as e:
        st.error(f"Error loading model from {model_path}: {str(e)}")
        return None

# Load 104-input dataset function
@st.cache_data
def load_104_input_data():
    try:
        data_path = Path(__file__).parent / "model kepler df new with 104 inputs/df_new.csv"
        if data_path.exists():
            df = pd.read_csv(data_path)
            # Remove the target column (last column) for prediction
            feature_columns = df.columns[:-1].tolist()  # All columns except the last one (koi_disposition_encoded)
            return df, feature_columns
        else:
            st.error(f"Dataset file not found: {data_path}")
            return None, None
    except Exception as e:
        st.error(f"Error loading 104-input dataset: {str(e)}")
        return None, None

# Feature mapping for each model based on actual dataset columns
def get_feature_mapping(model_name):
    """Return the required features for each model based on actual dataset columns"""
    feature_mappings = {
        "TESS Model": {
            'features': [
                'pl_tranmid', 'orbital_period', 'transit_duration', 'transit_depth',
                'planet_radius', 'insolation', 'equilibrium_temp', 'st_tmag',
                'st_dist', 'stellar_temp', 'stellar_logg', 'stellar_radius'
            ],
            'defaults': [2459000.0, 365.0, 10.0, 1000.0, 1.0, 1.0, 300.0, 12.0, 100.0, 5778.0, 4.4, 1.0]
        },
        "Kepler Model": {
            'features': [
                'orbital_period', 'transit_duration', 'transit_depth', 'koi_ror',
                'planet_radius', 'koi_sma', 'inclination', 'equilibrium_temp',
                'insolation', 'koi_srho', 'stellar_temp', 'stellar_logg',
                'stellar_radius', 'stellar_mass'
            ],
            'defaults': [365.0, 10.0, 1000.0, 0.01, 1.0, 1.0, 90.0, 300.0, 1.0, 1.0, 5778.0, 4.4, 1.0, 1.0]
        },
        "K2 Model": {
            'features': [
                'orbital_period', 'transit_duration', 'transit_depth', 'planet_radius',
                'planet_radiuJ', 'pl_masse', 'pl_massj', 'insolation', 'equilibrium_temp',
                'pl_orbeccen', 'inclination', 'stellar_temp', 'stellar_radius',
                'stellar_mass', 'st_met', 'stellar_logg', 'discoverymethod'
            ],
            'defaults': [365.0, 10.0, 1000.0, 1.0, 0.1, 1.0, 0.003, 1.0, 300.0, 0.0, 90.0, 5778.0, 1.0, 1.0, 0.0, 4.4, 0.0]
        },
        "104-Input Kepler": {
            'features': [
                'koi_score', 'koi_fpflag_nt', 'koi_fpflag_ss', 'koi_fpflag_co', 'koi_fpflag_ec',
                'koi_period', 'koi_period_err1', 'koi_period_err2', 'koi_time0bk', 'koi_time0bk_err1',
                'koi_time0bk_err2', 'koi_time0', 'koi_time0_err1', 'koi_time0_err2', 'koi_eccen',
                'koi_impact', 'koi_impact_err1', 'koi_impact_err2', 'koi_duration', 'koi_duration_err1',
                'koi_duration_err2', 'koi_depth', 'koi_depth_err1', 'koi_depth_err2', 'koi_ror',
                'koi_ror_err1', 'koi_ror_err2', 'koi_srho', 'koi_srho_err1', 'koi_srho_err2',
                'koi_prad', 'koi_prad_err1', 'koi_prad_err2', 'koi_sma', 'koi_incl', 'koi_teq',
                'koi_insol', 'koi_insol_err1', 'koi_insol_err2', 'koi_dor', 'koi_dor_err1', 'koi_dor_err2',
                'koi_ldm_coeff4', 'koi_ldm_coeff3', 'koi_ldm_coeff2', 'koi_ldm_coeff1', 'koi_max_sngle_ev',
                'koi_max_mult_ev', 'koi_model_snr', 'koi_count', 'koi_num_transits', 'koi_tce_plnt_num',
                'koi_bin_oedp_sig', 'koi_steff', 'koi_steff_err1', 'koi_steff_err2', 'koi_slogg',
                'koi_slogg_err1', 'koi_slogg_err2', 'koi_smet', 'koi_smet_err1', 'koi_smet_err2',
                'koi_srad', 'koi_srad_err1', 'koi_srad_err2', 'koi_smass', 'koi_smass_err1', 'koi_smass_err2',
                'ra', 'dec', 'koi_kepmag', 'koi_gmag', 'koi_rmag', 'koi_imag', 'koi_zmag', 'koi_jmag',
                'koi_hmag', 'koi_kmag', 'koi_fwm_stat_sig', 'koi_fwm_sra', 'koi_fwm_sra_err', 'koi_fwm_sdec',
                'koi_fwm_sdec_err', 'koi_fwm_srao', 'koi_fwm_srao_err', 'koi_fwm_sdeco', 'koi_fwm_sdeco_err',
                'koi_fwm_prao', 'koi_fwm_prao_err', 'koi_fwm_pdeco', 'koi_fwm_pdeco_err', 'koi_dicco_mra',
                'koi_dicco_mra_err', 'koi_dicco_mdec', 'koi_dicco_mdec_err', 'koi_dicco_msky', 'koi_dicco_msky_err',
                'koi_dikco_mra', 'koi_dikco_mra_err', 'koi_dikco_mdec', 'koi_dikco_mdec_err', 'koi_dikco_msky',
                'koi_dikco_msky_err', 'planet_star_ratio'
            ],
            'defaults': [0.5] * 104  # Default values for all 104 features
        }
    }
    return feature_mappings.get(model_name, {'features': [], 'defaults': []})

# Prediction function
def predict_with_model(model_name, inputs):
    """Make prediction using the selected model"""
    model_paths = {
        "Kepler Model": "3 models for every mission/best_model_kepler.pkl",
        "104-Input Kepler": "model kepler df new with 104 inputs/best_model.pkl",
        "TESS Model": "3 models for every mission/best_model_tess.pkl",
        "K2 Model": "3 models for every mission/best_model_k2.pkl"
    }
    
    model_path = model_paths.get(model_name)
    if not model_path:
        return None, None, f"Model {model_name} not found"
    
    # Construct full path
    full_path = Path(__file__).parent / model_path
    
    if not full_path.exists():
        return None, None, f"Model file not found: {full_path}"
    
    # Load model
    model = load_model(full_path)
    if model is None:
        return None, None, "Failed to load model"
    
    try:
        # Get feature mapping for the model
        feature_mapping = get_feature_mapping(model_name)
        required_features = feature_mapping['features']
        
        if not required_features:
            return None, None, f"No feature mapping found for {model_name}"
        
        # Create input vector with correct features
        input_vector = []
        for feature, default_value in zip(required_features, feature_mapping['defaults']):
            if feature in inputs:
                input_vector.append(inputs[feature])
            else:
                input_vector.append(default_value)
        
        # Convert to numpy array and ensure proper data types
        input_data = np.array(input_vector, dtype=np.float64).reshape(1, -1)
        
        # Make prediction
        prediction = model.predict(input_data)[0]
        
        # Get probabilities if available
        if hasattr(model, 'predict_proba'):
            probabilities = model.predict_proba(input_data)[0]
            confidence = float(max(probabilities) * 100)  # Convert to regular float
        else:
            confidence = 100.0 if prediction == 1 else 0.0
        
        return prediction, confidence, None
        
    except Exception as e:
        return None, None, f"Prediction error: {str(e)}"

# Model information based on actual performance results
def get_model_info(model_name):
    """Get information about each model based on actual performance results"""
    model_info = {
        "Kepler Model": {
            "description": "LightGBM model trained on Kepler mission dataset with 14 core features",
            "accuracy": "74.3%",
            "features": "14 features including orbital and stellar parameters",
            "mission": "Kepler",
            "algorithm": "LightGBM",
            "dataset": "kepler_clean.csv",
            "samples": "9,564 exoplanet candidates"
        },
        "104-Input Kepler": {
            "description": "Advanced HistGradientBoosting model with comprehensive 104 features",
            "accuracy": "94.5%",
            "features": "104 comprehensive features including all Kepler parameters",
            "mission": "Kepler Extended",
            "algorithm": "HistGradientBoosting",
            "dataset": "df_new.csv",
            "samples": "9,561 exoplanet candidates"
        },
        "TESS Model": {
            "description": "XGBoost model trained on TESS mission dataset",
            "accuracy": "69.2%",
            "features": "12 features including transit and stellar parameters",
            "mission": "TESS",
            "algorithm": "XGBoost",
            "dataset": "tess_clean.csv",
            "samples": "7,700 exoplanet candidates"
        },
        "K2 Model": {
            "description": "LightGBM model trained on K2 mission dataset",
            "accuracy": "78.8%",
            "features": "17 features including planetary and stellar characteristics",
            "mission": "K2",
            "algorithm": "LightGBM",
            "dataset": "k2_clean.csv",
            "samples": "4,005 exoplanet candidates"
        }
    }
    return model_info.get(model_name, {})

# Create input form based on selected model
def create_input_form(model_name):
    """Create dynamic input form based on model requirements"""
    feature_mapping = get_feature_mapping(model_name)
    inputs = {}
    
    st.markdown(f"### 🌌 {model_name} - Input Parameters")
    st.markdown(f"**Required features: {len(feature_mapping['features'])}**")
    
    if model_name == "104-Input Kepler":
        # Load real data for 104-input model
        df_data, feature_columns = load_104_input_data()
        
        if df_data is not None:
            st.markdown("""
            <div style="background: rgba(255, 255, 255, 0.1); border: 1px solid #ffffff; border-radius: 10px; padding: 1rem; margin: 1rem 0;">
                <h4>🚀 Advanced 104-Feature Kepler Model</h4>
                <p>This model uses 104 comprehensive features from the real Kepler dataset. Select a sample from the actual data:</p>
            </div>
            """, unsafe_allow_html=True)
            
            # Data selection interface
            col1, col2 = st.columns([2, 1])
            
            with col1:
                # Sample selection
                sample_index = st.selectbox(
                    "Select a data sample:",
                    range(len(df_data)),
                    format_func=lambda x: f"Sample {x+1}: {df_data.iloc[x]['koi_disposition']} - Period: {df_data.iloc[x]['koi_period']:.2f} days",
                    help="Choose from real Kepler data samples"
                )
            
            with col2:
                # Show sample info
                selected_sample = df_data.iloc[sample_index]
                st.metric("Sample Disposition", selected_sample['koi_disposition'])
                st.metric("Orbital Period", f"{selected_sample['koi_period']:.2f} days")
                st.metric("Planet Radius", f"{selected_sample['koi_prad']:.2f} R⊕")
            
            # Show key parameters of selected sample
            st.markdown("### 📊 Selected Sample Parameters")
            
            col1, col2, col3 = st.columns(3)
            
            with col1:
                st.metric("Transit Depth", f"{selected_sample['koi_depth']:.0f} ppm")
                st.metric("Impact Parameter", f"{selected_sample['koi_impact']:.3f}")
                st.metric("Transit Duration", f"{selected_sample['koi_duration']:.2f} hours")
                st.metric("Semi-Major Axis", f"{selected_sample['koi_sma']:.3f} AU")
            
            with col2:
                st.metric("Stellar Temperature", f"{selected_sample['koi_steff']:.0f} K")
                st.metric("Stellar Radius", f"{selected_sample['koi_srad']:.3f} R☉")
                st.metric("Stellar Mass", f"{selected_sample['koi_smass']:.3f} M☉")
                st.metric("Equilibrium Temp", f"{selected_sample['koi_teq']:.0f} K")
            
            with col3:
                st.metric("Insolation", f"{selected_sample['koi_insol']:.1f} S⊕")
                st.metric("KOI Score", f"{selected_sample['koi_score']:.3f}")
                st.metric("Eccentricity", f"{selected_sample['koi_eccen']:.3f}")
                st.metric("Stellar Density", f"{selected_sample['koi_srho']:.2f} g/cm³")
            
            # Use all features from the selected sample
            for feature in feature_columns:
                inputs[feature] = selected_sample[feature]
            
            st.success(f"✅ Using real data from sample {sample_index+1} - {selected_sample['koi_disposition']} exoplanet candidate")
            
            return inputs, selected_sample
            
        else:
            st.error("❌ Could not load the 104-input dataset. Please check the file path.")
            # Fallback to default values
            for feature, default_value in zip(feature_mapping['features'], feature_mapping['defaults']):
                inputs[feature] = default_value
            return inputs, None
        
    else:
        # Common features that we'll map from user inputs
        common_inputs = {}
        
        col1, col2 = st.columns(2)
        
        with col1:
            # Basic orbital parameters
            common_inputs['orbital_period'] = st.number_input(
                "Orbital Period (days)",
                min_value=0.1,
                max_value=1000.0,
                value=365.0,
                step=0.1,
                help="Time for planet to orbit its star"
            )
            
            common_inputs['transit_depth'] = st.number_input(
                "Transit Depth (ppm)",
                min_value=0.0,
                max_value=100000.0,
                value=1000.0,
                step=1.0,
                help="Fraction of starlight blocked during transit"
            )
            
            common_inputs['insolation'] = st.number_input(
                "Insolation (Earth units)",
                min_value=0.0,
                max_value=10000.0,
                value=1.0,
                step=0.1,
                help="Amount of stellar radiation received"
            )
            
            common_inputs['stellar_temp'] = st.number_input(
                "Stellar Temperature (K)",
                min_value=2000.0,
                max_value=10000.0,
                value=5778.0,
                step=1.0,
                help="Surface temperature of the host star"
            )
            
            common_inputs['stellar_radius'] = st.number_input(
                "Stellar Radius (Solar radii)",
                min_value=0.1,
                max_value=100.0,
                value=1.0,
                step=0.01,
                help="Radius of the host star"
            )
        
        with col2:
            # Additional parameters
            common_inputs['planet_radius'] = st.number_input(
                "Planet Radius (Earth radii)",
                min_value=0.1,
                max_value=50.0,
                value=1.0,
                step=0.1,
                help="Radius of the candidate planet"
            )
            
            common_inputs['transit_duration'] = st.number_input(
                "Transit Duration (hours)",
                min_value=0.1,
                max_value=100.0,
                value=10.0,
                step=0.1,
                help="Duration of the transit event"
            )
            
            common_inputs['equilibrium_temp'] = st.number_input(
                "Equilibrium Temperature (K)",
                min_value=100.0,
                max_value=3000.0,
                value=300.0,
                step=1.0,
                help="Planet's equilibrium temperature"
            )
            
            common_inputs['stellar_logg'] = st.number_input(
                "Stellar Surface Gravity (log g)",
                min_value=2.0,
                max_value=6.0,
                value=4.4,
                step=0.1,
                help="Surface gravity of the host star"
            )
            
            common_inputs['inclination'] = st.number_input(
                "Orbital Inclination (degrees)",
                min_value=0.0,
                max_value=90.0,
                value=90.0,
                step=1.0,
                help="Angle between orbital plane and line of sight"
            )
        
        # Map common inputs to model-specific features
        for feature, default_value in zip(feature_mapping['features'], feature_mapping['defaults']):
            if feature in common_inputs:
                inputs[feature] = common_inputs[feature]
            else:
                # Use default value for features not in common inputs
                inputs[feature] = default_value
        
        return inputs, None

# Main app
def main():
    # Add space theme and background
    add_space_theme()
    add_space_background()
    
    # Title
    st.markdown("""
    <div class="title-container">
        <h1 style="font-family: 'Orbitron', sans-serif; font-size: 3.5rem; font-weight: 900; margin: 0; text-align: center;">
            🌌 NASA Exoplanet AI Suite
        </h1>
        <h2 style="font-family: 'Orbitron', sans-serif; font-size: 1.8rem; font-weight: 400; margin: 0.5rem 0; text-align: center; color: #ffffff;">
            Multi-Model Detection Platform
        </h2>
        <p style="font-family: 'Orbitron', sans-serif; font-size: 1.1rem; text-align: center; margin: 1rem 0; color: #ffffff; opacity: 0.9;">
            Advanced Machine Learning Models for Exoplanet Discovery • Kepler • K2 • TESS Missions
        </p>
    </div>
    """, unsafe_allow_html=True)
    
    # Sidebar for model selection
    st.sidebar.markdown("""
    <div class="sidebar-header">
        <h3 style="color: #ffffff; font-family: 'Orbitron', sans-serif; margin: 0;">
            🛸 AI Model Selection
        </h3>
        <p style="color: #ffffff; opacity: 0.8; margin: 0.5rem 0 0 0; font-size: 0.9rem;">
            Choose Your Detection Model
        </p>
    </div>
    """, unsafe_allow_html=True)
    selected_model = st.sidebar.selectbox(
        "Choose AI Model:",
        ["104-Input Kepler", "Kepler Model", "K2 Model", "TESS Model"],
        help="Select the AI model for exoplanet detection"
    )
    
    # Display selected model info
    model_info = get_model_info(selected_model)
    feature_mapping = get_feature_mapping(selected_model)
    
    st.sidebar.markdown(f"""
    <div class="model-info">
        <h4>📊 {selected_model}</h4>
        <p><strong>Mission:</strong> {model_info.get('mission', 'N/A')}</p>
        <p><strong>Algorithm:</strong> {model_info.get('algorithm', 'N/A')}</p>
        <p><strong>Accuracy:</strong> {model_info.get('accuracy', 'N/A')}</p>
        <p><strong>Features:</strong> {len(feature_mapping['features'])} input features</p>
        <p><strong>Dataset:</strong> {model_info.get('dataset', 'N/A')}</p>
        <p><strong>Samples:</strong> {model_info.get('samples', 'N/A')}</p>
        <p><strong>Details:</strong> {model_info.get('features', 'N/A')}</p>
    </div>
    """, unsafe_allow_html=True)
    
    # Main content tabs
    tab1, tab2, tab3 = st.tabs(["🚀 AI Prediction", "📚 Model Information", "📊 Performance Analytics"])
    
    with tab1:
        # Create dynamic input form based on selected model
        inputs, selected_sample = create_input_form(selected_model)
        
        # Prediction button
        if st.button("🚀 LAUNCH AI PREDICTION", type="primary"):
            # Make prediction
            with st.spinner("🔍 AI Neural Networks Processing... Scanning Stellar Data... Analyzing Transit Patterns..."):
                prediction, confidence, error = predict_with_model(selected_model, inputs)
            
            if error:
                st.error(f"❌ {error}")
            else:
                # Display results
                st.markdown("""
                <div class="prediction-result">
                """, unsafe_allow_html=True)
                
                # Status indicator
                st.markdown("""
                <div style="text-align: center; margin-bottom: 1rem;">
                    <div style="display: inline-block; padding: 0.5rem 1rem; background: rgba(0, 255, 0, 0.2); border: 1px solid #00ff00; border-radius: 20px; color: #00ff00; font-weight: bold;">
                        ✅ ANALYSIS COMPLETE
                    </div>
                </div>
                """, unsafe_allow_html=True)
                
                # Show actual vs predicted comparison for 104-input model
                if selected_model == "104-Input Kepler" and selected_sample is not None:
                    st.markdown("### 🔍 Actual vs Predicted Comparison")
                    col1, col2 = st.columns(2)
                    
                    with col1:
                        actual_disposition = selected_sample['koi_disposition']
                        st.metric("Actual Disposition", actual_disposition, help="Real classification from Kepler data")
                    
                    with col2:
                        predicted_text = "EXOPLANET DETECTED" if prediction == 1 else "FALSE POSITIVE DETECTED"
                        st.metric("AI Prediction", predicted_text, help="Model's prediction")
                    
                    # Show if prediction matches actual
                    if (prediction == 1 and actual_disposition == "CONFIRMED") or (prediction == 0 and actual_disposition in ["FALSE POSITIVE", "CANDIDATE"]):
                        st.success("🎯 Prediction matches actual classification!")
                    else:
                        st.warning("⚠️ Prediction differs from actual classification")
                
                # Prediction result
                if prediction == 1:
                    st.success("🪐 **EXOPLANET DETECTED!**")
                    result_text = "🎉 This appears to be a genuine exoplanet candidate!"
                    result_color = "#00ff00"
                else:
                    st.warning("⚠️ **FALSE POSITIVE DETECTED**")
                    result_text = "🔍 This appears to be a false positive signal."
                    result_color = "#ff6b6b"
                
                st.markdown(f"<p style='font-size: 1.2rem; color: {result_color};'>{result_text}</p>", unsafe_allow_html=True)
                
                # Confidence score - convert to regular float for st.progress()
                confidence_float = float(confidence)  # Ensure it's regular float
                st.markdown(f"""
                <div style="text-align: center; margin: 1.5rem 0;">
                    <h3 style="color: #ffffff; font-family: 'Orbitron', sans-serif; margin-bottom: 0.5rem;">
                        🎯 AI Confidence Score
                    </h3>
                    <h2 style="color: #ffffff; font-size: 2.5rem; margin: 0; text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);">
                        {confidence_float:.1f}%
                    </h2>
                </div>
                """, unsafe_allow_html=True)
                
                # Enhanced progress bar
                progress_container = st.container()
                with progress_container:
                    st.markdown(f"""
                    <div style="background: rgba(255, 255, 255, 0.1); border-radius: 25px; padding: 0.3rem; margin: 1rem 0;">
                        <div style="background: #ffffff; border-radius: 20px; height: 20px; width: {confidence_float}%; transition: width 2s ease;"></div>
                    </div>
                    """, unsafe_allow_html=True)
                
                st.markdown("""
                </div>
                """, unsafe_allow_html=True)
                
                # Probability chart
                col1, col2 = st.columns(2)
                
                with col1:
                    # Bar chart
                    prob_data = pd.DataFrame({
                        'Category': ['False Positive', 'Exoplanet'],
                        'Probability': [100-confidence_float, confidence_float]
                    })
                    
                    fig_bar = px.bar(
                        prob_data, 
                        x='Category', 
                        y='Probability',
                        color='Category',
                        color_discrete_map={'False Positive': '#ff6b6b', 'Exoplanet': '#00ff00'},
                        title="Prediction Probabilities"
                    )
                    fig_bar.update_layout(
                        plot_bgcolor='rgba(0,0,0,0)',
                        paper_bgcolor='rgba(0,0,0,0)',
                        font_color='white',
                        title_font_color='white'
                    )
                    st.plotly_chart(fig_bar, use_container_width=True)
                
                with col2:
                    # Pie chart
                    fig_pie = px.pie(
                        prob_data,
                        values='Probability',
                        names='Category',
                        color_discrete_map={'False Positive': '#ff6b6b', 'Exoplanet': '#00ff00'},
                        title="Probability Distribution"
                    )
                    fig_pie.update_layout(
                        plot_bgcolor='rgba(0,0,0,0)',
                        paper_bgcolor='rgba(0,0,0,0)',
                        font_color='white',
                        title_font_color='white'
                    )
                    st.plotly_chart(fig_pie, use_container_width=True)
    
    with tab2:
        st.markdown("### 📚 About the AI Models")
        
        models = ["104-Input Kepler", "Kepler Model", "K2 Model", "TESS Model"]
        
        for model in models:
            info = get_model_info(model)
            feature_mapping = get_feature_mapping(model)
            st.markdown(f"""
            <div class="model-info">
                <h3>🛸 {model}</h3>
                <p><strong>Description:</strong> {info.get('description', 'N/A')}</p>
                <p><strong>Mission:</strong> {info.get('mission', 'N/A')}</p>
                <p><strong>Algorithm:</strong> {info.get('algorithm', 'N/A')}</p>
                <p><strong>Accuracy:</strong> {info.get('accuracy', 'N/A')}</p>
                <p><strong>Dataset:</strong> {info.get('dataset', 'N/A')}</p>
                <p><strong>Training Samples:</strong> {info.get('samples', 'N/A')}</p>
                <p><strong>Features:</strong> {len(feature_mapping['features'])} features - {info.get('features', 'N/A')}</p>
                <p><strong>Feature Names:</strong> {', '.join(feature_mapping['features'][:5])}...</p>
            </div>
            """, unsafe_allow_html=True)
        
        st.markdown("""
        ### 🌟 Mission Information
        
        **Kepler Mission**: Launched in 2009, Kepler was NASA's first mission capable of finding Earth-size planets around other stars.
        
        **TESS Mission**: The Transiting Exoplanet Survey Satellite, launched in 2018, is designed to find thousands of exoplanets around nearby bright stars.
        
        **K2 Mission**: The extended Kepler mission, which continued the search for exoplanets after the primary mission ended.
        
        ### 🔬 How It Works
        
        These AI models analyze transit photometry data to distinguish between genuine exoplanets and false positive signals. They use machine learning algorithms trained on thousands of confirmed exoplanets and false positives from NASA's missions.
        """)
    
    with tab3:
        st.markdown("### 📊 Model Performance Visualization")
        
        # Model performance data based on actual results
        performance_data = {
            'Model': ['104-Input Kepler', 'Kepler Model', 'K2 Model', 'TESS Model'],
            'Accuracy (%)': [94.5, 74.3, 78.8, 69.2],
            'Features Count': [104, 14, 17, 12],
            'Mission': ['Kepler Extended', 'Kepler', 'K2', 'TESS'],
            'Algorithm': ['HistGradientBoosting', 'LightGBM', 'LightGBM', 'XGBoost']
        }
        
        df_performance = pd.DataFrame(performance_data)
        
        col1, col2 = st.columns(2)
        
        with col1:
            # Accuracy comparison
            fig_accuracy = px.bar(
                df_performance,
                x='Model',
                y='Accuracy (%)',
                color='Mission',
                title="Model Accuracy Comparison",
                color_discrete_sequence=['#00ffff', '#ff00ff', '#ffff00', '#00ff00']
            )
            fig_accuracy.update_layout(
                plot_bgcolor='rgba(0,0,0,0)',
                paper_bgcolor='rgba(0,0,0,0)',
                font_color='white',
                title_font_color='white',
                xaxis_tickangle=-45
            )
            st.plotly_chart(fig_accuracy, use_container_width=True)
        
        with col2:
            # Features count comparison
            fig_features = px.bar(
                df_performance,
                x='Model',
                y='Features Count',
                color='Mission',
                title="Number of Features per Model",
                color_discrete_sequence=['#00ffff', '#ff00ff', '#ffff00', '#00ff00']
            )
            fig_features.update_layout(
                plot_bgcolor='rgba(0,0,0,0)',
                paper_bgcolor='rgba(0,0,0,0)',
                font_color='white',
                title_font_color='white',
                xaxis_tickangle=-45
            )
            st.plotly_chart(fig_features, use_container_width=True)
        
        # Feature importance explanation
        st.markdown("### 🔍 Feature Importance Analysis")
        
        feature_importance = {
            'Feature': ['Transit Depth', 'Orbital Period', 'Stellar Temperature', 'Insolation', 
                       'Planet Radius', 'Transit Duration', 'Equilibrium Temperature', 
                       'Stellar Gravity', 'Inclination'],
            'Importance': [0.25, 0.20, 0.18, 0.15, 0.08, 0.06, 0.04, 0.03, 0.01]
        }
        
        df_features = pd.DataFrame(feature_importance)
        
        fig_features_imp = px.bar(
            df_features,
            x='Importance',
            y='Feature',
            orientation='h',
            title="Typical Feature Importance in Exoplanet Detection",
            color='Importance',
            color_continuous_scale='viridis'
        )
        fig_features_imp.update_layout(
            plot_bgcolor='rgba(0,0,0,0)',
            paper_bgcolor='rgba(0,0,0,0)',
            font_color='white',
            title_font_color='white'
        )
        st.plotly_chart(fig_features_imp, use_container_width=True)

    # Footer
    st.markdown("---")
    st.markdown("""
    <div style="text-align: center; padding: 2rem 0; background: rgba(255, 255, 255, 0.1); border-radius: 15px; margin-top: 3rem;">
        <h3 style="color: #ffffff; font-family: 'Orbitron', sans-serif; margin-bottom: 1rem;">
            🌌 NASA Exoplanet Detection Mission
        </h3>
        <p style="color: #ffffff; opacity: 0.9; margin: 0.5rem 0;">
            <strong>Kepler Mission:</strong> Launched 2009 • Discovered thousands of exoplanets using transit photometry
        </p>
        <p style="color: #ffffff; opacity: 0.9; margin: 0.5rem 0;">
            <strong>TESS Mission:</strong> Launched 2018 • Surveying nearby bright stars for exoplanet discovery
        </p>
        <p style="color: #ffffff; opacity: 0.9; margin: 0.5rem 0;">
            <strong>K2 Mission:</strong> Extended Kepler mission • Continued exoplanet search after primary mission
        </p>
        <p style="color: #ffffff; opacity: 0.7; font-size: 0.9rem; margin-top: 1.5rem;">
            Powered by Advanced Machine Learning • Trained on NASA's Exoplanet Archive Data
        </p>
    </div>
    """, unsafe_allow_html=True)

if __name__ == "__main__":
    main()