import React from 'react';
import { motion } from 'framer-motion';
import {
  Clock,
  Ruler,
  Star,
  Calendar,
  Eye,
  TrendingUp,
  Satellite,
} from 'lucide-react';
import { ProcessedExoplanet } from '../types/exoplanet';
import Card from './ui/Card';

interface ExoplanetCardProps {
  planet: ProcessedExoplanet;
  index: number;
  onVisualize: (planetName: string) => void;
  onLightCurve: (planetName: string) => void;
}

const ExoplanetCard: React.FC<ExoplanetCardProps> = ({
  planet,
  index,
  onVisualize,
  onLightCurve,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'text-cyan-400';
      case 'candidate':
        return 'text-yellow-400';
      case 'false_positive':
        return 'text-pink-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = 'px-3 py-1 rounded-full text-xs font-medium';
    switch (status) {
      case 'confirmed':
        return `${baseClasses} bg-cyan-500/20 text-cyan-400 border border-cyan-500/30`;
      case 'candidate':
        return `${baseClasses} bg-yellow-500/20 text-yellow-400 border border-yellow-500/30`;
      case 'false_positive':
        return `${baseClasses} bg-pink-500/20 text-pink-400 border border-pink-500/30`;
      default:
        return baseClasses;
    }
  };

  const getMissionIcon = (mission: string) => {
    if (mission.includes('Kepler') || mission.includes('TESS')) {
      return <Satellite className="w-4 h-4" />;
    }
    return <Eye className="w-4 h-4" />;
  };

  const formatValue = (value: number | null, unit: string, decimals: number = 1) => {
    if (value === null || value === undefined) {
      return 'N/A';
    }
    return `${value.toFixed(decimals)} ${unit}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="h-full"
    >
      <Card className="p-6 h-full hover:border-cyan-400/50 transition-all duration-300 group">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
            {planet.name}
          </h3>
          <span className={getStatusBadge(planet.status)}>
            {planet.status.replace('_', ' ')}
          </span>
        </div>

        {/* Planet Details */}
        <div className="space-y-3 mb-6">
          {/* Orbital Period */}
          <div className="flex items-center justify-between">
            <span className="text-gray-300 flex items-center text-sm">
              <Clock className="w-4 h-4 mr-2 text-blue-400" />
              Orbital Period
            </span>
            <span className="text-cyan-400 font-medium">
              {formatValue(planet.orbitalPeriod, 'days')}
            </span>
          </div>

          {/* Planet Radius */}
          <div className="flex items-center justify-between">
            <span className="text-gray-300 flex items-center text-sm">
              <Ruler className="w-4 h-4 mr-2 text-yellow-400" />
              Planet Radius
            </span>
            <span className="text-yellow-400 font-medium">
              {formatValue(planet.planetRadius, 'R⊕', 2)}
            </span>
          </div>

          {/* Stellar Magnitude */}
          <div className="flex items-center justify-between">
            <span className="text-gray-300 flex items-center text-sm">
              <Star className="w-4 h-4 mr-2 text-purple-400" />
              Stellar Magnitude
            </span>
            <span className="text-purple-400 font-medium">
              {formatValue(planet.stellarMagnitude, 'mag', 1)}
            </span>
          </div>

          {/* Mission */}
          <div className="flex items-center justify-between">
            <span className="text-gray-300 flex items-center text-sm">
              {getMissionIcon(planet.mission)}
              <span className="ml-2">Mission</span>
            </span>
            <span className="text-white font-medium">
              {planet.mission}
            </span>
          </div>

          {/* Discovery Year */}
          <div className="flex items-center justify-between">
            <span className="text-gray-300 flex items-center text-sm">
              <Calendar className="w-4 h-4 mr-2 text-green-400" />
              Discovery Year
            </span>
            <span className="text-green-400 font-medium">
              {planet.discoveryYear || 'N/A'}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onVisualize(planet.name)}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-2.5 rounded-lg shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 border-0 inline-flex items-center justify-center text-sm"
          >
            <Eye className="w-4 h-4 mr-1.5" />
            Visualize
          </button>

          <button
            onClick={() => onLightCurve(planet.name)}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-2.5 rounded-lg shadow-lg hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-105 border-0 inline-flex items-center justify-center text-sm"
          >
            <TrendingUp className="w-4 h-4 mr-1.5" />
            Light Curve
          </button>
        </div>

        {/* Hover Effect Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </Card>
    </motion.div>
  );
};

export default ExoplanetCard;
