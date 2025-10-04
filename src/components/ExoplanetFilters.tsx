import React from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  ChevronDown,
  Globe,
  BarChart3,
  Rocket,
} from 'lucide-react';
import { ExoplanetFilters as FilterState } from '../types/exoplanet';
import Card from './ui/Card';
import Button from './ui/Button';
import Input from './ui/Input';

interface ExoplanetFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: Partial<FilterState>) => void;
  totalCount: number;
  filteredCount: number;
}

const ExoplanetFilters: React.FC<ExoplanetFiltersProps> = ({
  filters,
  onFiltersChange,
  totalCount,
  filteredCount,
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({ searchTerm: e.target.value });
  };

  const handleStatusFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({ statusFilter: e.target.value as FilterState['statusFilter'] });
  };

  const handleMissionFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({ missionFilter: e.target.value as FilterState['missionFilter'] });
  };

  const handleSortByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({ sortBy: e.target.value as FilterState['sortBy'] });
  };

  const handleViewModeChange = (mode: 'grid' | 'chart') => {
    onFiltersChange({ viewMode: mode });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mb-8"
    >
      <Card className="p-6">
        <div className="flex flex-col gap-4">
          {/* Top Row: Search and View Mode */}
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search planets..."
                value={filters.searchTerm}
                onChange={handleSearchChange}
                className="pl-10 bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-cyan-400/20"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex gap-2">
              <Button
                variant={filters.viewMode === 'grid' ? 'default' : 'outline'}
                size="lg"
                onClick={() => handleViewModeChange('grid')}
                className={`px-6 py-3 ${
                  filters.viewMode === 'grid'
                    ? 'bg-cyan-600 hover:bg-cyan-700 text-white'
                    : 'border-white text-white hover:bg-white hover:text-black'
                }`}
              >
                <Globe className="w-4 h-4 mr-2" />
                Grid View
              </Button>
              <Button
                variant={filters.viewMode === 'chart' ? 'default' : 'outline'}
                size="lg"
                onClick={() => handleViewModeChange('chart')}
                className={`px-6 py-3 ${
                  filters.viewMode === 'chart'
                    ? 'bg-cyan-600 hover:bg-cyan-700 text-white'
                    : 'border-white text-white hover:bg-white hover:text-black'
                }`}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Chart View
              </Button>
            </div>
          </div>

          {/* Bottom Row: Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Status Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={filters.statusFilter}
                onChange={handleStatusFilterChange}
                className="pl-10 pr-8 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none appearance-none min-w-[140px]"
              >
                <option value="all">All Status</option>
                <option value="confirmed">Confirmed</option>
                <option value="candidate">Candidates</option>
                <option value="false_positive">False Positives</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>

            {/* Mission Filter */}
            <div className="relative">
              <Rocket className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={filters.missionFilter}
                onChange={handleMissionFilterChange}
                className="pl-10 pr-8 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none appearance-none min-w-[160px]"
              >
                <option value="all">All Missions</option>
                <option value="Kepler">Kepler</option>
                <option value="TESS">TESS</option>
                <option value="Spitzer">Spitzer</option>
                <option value="Ground-based">Ground-based</option>
                <option value="Hubble">Hubble</option>
                <option value="James Webb">James Webb</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>

            {/* Sort By */}
            <div className="relative">
              <select
                value={filters.sortBy}
                onChange={handleSortByChange}
                className="px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none appearance-none pr-8 min-w-[160px]"
              >
                <option value="name">Sort by Name</option>
                <option value="orbitalPeriod">Sort by Orbital Period</option>
                <option value="planetRadius">Sort by Radius</option>
                <option value="discoveryYear">Sort by Discovery Year</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-4 pt-4 border-t border-gray-600">
          <p className="text-gray-300 text-sm">
            Showing <span className="text-cyan-400 font-medium">{filteredCount}</span> of{' '}
            <span className="text-white font-medium">{totalCount}</span> planets
          </p>
        </div>
      </Card>
    </motion.div>
  );
};

export default ExoplanetFilters;
