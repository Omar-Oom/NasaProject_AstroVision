// TypeScript interfaces for NASA Exoplanet Archive API data

export interface NASAExoplanetData {
  pl_name: string;
  pl_orbper: number | null;
  pl_rade: number | null;
  sy_vmag: number | null;
  discoverymethod: string;
  disc_year: number | null;
  pl_pubdate?: string | null;
  pl_letter?: string | null;
}

export interface ProcessedExoplanet {
  id: string;
  name: string;
  orbitalPeriod: number | null;
  planetRadius: number | null;
  stellarMagnitude: number | null;
  mission: string;
  discoveryYear: number | null;
  status: 'confirmed' | 'candidate' | 'false_positive';
}

export interface ExoplanetFilters {
  searchTerm: string;
  statusFilter: 'all' | 'confirmed' | 'candidate' | 'false_positive';
  missionFilter: 'all' | 'Kepler' | 'TESS' | 'Spitzer' | 'Ground-based' | 'Hubble' | 'James Webb';
  sortBy: 'name' | 'orbitalPeriod' | 'planetRadius' | 'discoveryYear';
  viewMode: 'grid' | 'chart';
}

export interface ChartDataPoint {
  name: string;
  orbitalPeriod: number | null;
  planetRadius: number | null;
  status: string;
}
