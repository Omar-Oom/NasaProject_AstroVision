import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  Cell,
} from 'recharts';
import { ProcessedExoplanet, ChartDataPoint } from '../types/exoplanet';
import Card from './ui/Card';

interface ExoplanetChartsProps {
  exoplanets: ProcessedExoplanet[];
  filteredExoplanets: ProcessedExoplanet[];
}

const ExoplanetCharts: React.FC<ExoplanetChartsProps> = ({
  exoplanets,
  filteredExoplanets,
}) => {
  // Status distribution data
  const statusDistribution = useMemo(() => {
    const confirmed = exoplanets.filter((p) => p.status === 'confirmed').length;
    const candidate = exoplanets.filter((p) => p.status === 'candidate').length;
    const falsePositive = exoplanets.filter((p) => p.status === 'false_positive').length;

    return [
      { name: 'Confirmed', value: confirmed, color: '#00d4ff' },
      { name: 'Candidates', value: candidate, color: '#ffd700' },
      { name: 'False Positives', value: falsePositive, color: '#ff0080' },
    ];
  }, [exoplanets]);

  // Scatter plot data for Orbital Period vs Planet Radius
  const scatterData = useMemo(() => {
    return filteredExoplanets
      .filter(planet => planet.orbitalPeriod !== null && planet.planetRadius !== null)
      .map((planet) => ({
        name: planet.name,
        orbitalPeriod: planet.orbitalPeriod,
        planetRadius: planet.planetRadius,
        status: planet.status,
        mission: planet.mission,
        discoveryYear: planet.discoveryYear,
      }));
  }, [filteredExoplanets]);

  // Mission distribution data
  const missionDistribution = useMemo(() => {
    const missionCounts: { [key: string]: number } = {};
    
    exoplanets.forEach(planet => {
      missionCounts[planet.mission] = (missionCounts[planet.mission] || 0) + 1;
    });

    return Object.entries(missionCounts)
      .map(([mission, count]) => ({
        name: mission,
        value: count,
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8); // Top 8 missions
  }, [exoplanets]);

  // Discovery year distribution
  const yearDistribution = useMemo(() => {
    const yearCounts: { [key: number]: number } = {};
    
    exoplanets.forEach(planet => {
      if (planet.discoveryYear) {
        yearCounts[planet.discoveryYear] = (yearCounts[planet.discoveryYear] || 0) + 1;
      }
    });

    return Object.entries(yearCounts)
      .map(([year, count]) => ({
        year: parseInt(year),
        count,
      }))
      .sort((a, b) => a.year - b.year)
      .slice(-10); // Last 10 years
  }, [exoplanets]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return '#00d4ff';
      case 'candidate':
        return '#ffd700';
      case 'false_positive':
        return '#ff0080';
      default:
        return '#9ca3af';
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 border border-cyan-400 rounded-lg p-3 shadow-lg">
          <p className="text-white font-medium">{`${label}: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  const ScatterTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-gray-800 border border-cyan-400 rounded-lg p-3 shadow-lg">
          <p className="text-white font-medium">{data.name}</p>
          <p className="text-cyan-400 text-sm">
            Orbital Period: {data.orbitalPeriod?.toFixed(1)} days
          </p>
          <p className="text-yellow-400 text-sm">
            Planet Radius: {data.planetRadius?.toFixed(2)} R⊕
          </p>
          <p className="text-purple-400 text-sm">
            Mission: {data.mission}
          </p>
          <p className="text-green-400 text-sm">
            Year: {data.discoveryYear || 'N/A'}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="space-y-8"
    >
      {/* Status Distribution */}
      <Card className="p-6">
        <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-6 tracking-wide">
          Status Distribution
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={statusDistribution}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="value" fill="#00d4ff" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Orbital Period vs Planet Radius Scatter Plot */}
      <Card className="p-6">
        <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-6 tracking-wide">
          Orbital Period vs Planet Radius
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart data={scatterData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              dataKey="orbitalPeriod"
              stroke="#9ca3af"
              label={{
                value: 'Orbital Period (days)',
                position: 'insideBottom',
                offset: -10,
                style: { textAnchor: 'middle', fill: '#9ca3af' },
              }}
            />
            <YAxis
              dataKey="planetRadius"
              stroke="#9ca3af"
              label={{
                value: 'Planet Radius (Earth radii)',
                angle: -90,
                position: 'insideLeft',
                style: { textAnchor: 'middle', fill: '#9ca3af' },
              }}
            />
            <Tooltip content={<ScatterTooltip />} />
            <Scatter dataKey="planetRadius" fill="#00d4ff">
              {scatterData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getStatusColor(entry.status)} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </Card>

      {/* Mission Distribution */}
      <Card className="p-6">
        <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-6 tracking-wide">
          Discovery Mission Distribution
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={missionDistribution} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis type="number" stroke="#9ca3af" />
            <YAxis dataKey="name" type="category" stroke="#9ca3af" width={120} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="value" fill="#00d4ff" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Discovery Year Trend */}
      <Card className="p-6">
        <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-6 tracking-wide">
          Discovery Year Trend
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={yearDistribution}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="year" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="count" fill="#00d4ff" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </motion.div>
  );
};

export default ExoplanetCharts;
