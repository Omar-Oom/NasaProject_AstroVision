import axios from 'axios';

// Types for the NASA Exoplanet Archive API response
interface NASAExoplanetData {
  pl_name: string;
  pl_orbper: number | null;
  pl_rade: number | null;
  sy_vmag: number | null;
  disc_year: number | null;
  discoverymethod: string | null;
}

interface ProcessedExoplanet {
  id: string;
  name: string;
  orbitalPeriod: number | null;
  planetRadius: number | null;
  stellarMagnitude: number | null;
  discoveryYear: number | null;
  discoveryMethod: string | null;
}

/**
 * Fetches the top 100 confirmed exoplanets from NASA Exoplanet Archive TAP API using Axios
 * 
 * Requirements met:
 * - Endpoint: https://exoplanetarchive.ipac.caltech.edu/TAP/sync
 * - Request: POST with Content-Type: application/x-www-form-urlencoded
 * - ADQL Query: SELECT TOP 100 pl_name, pl_orbper, pl_rade, sy_vmag, disc_year, discoverymethod FROM ps ORDER BY disc_year DESC
 * 
 * Note: NASA has migrated to TAP service as of 2024. The legacy API endpoints are deprecated.
 * The correct column name for stellar magnitude is 'sy_vmag', not 'st_vmag'.
 * 
 * @returns Promise<ProcessedExoplanet[]> Array of processed exoplanet data
 * @throws Error if the API request fails
 */
export const fetchTop100ExoplanetsAxios = async (): Promise<ProcessedExoplanet[]> => {
  try {
    // ADQL query as specified in requirements
    const query = `SELECT TOP 100 pl_name, pl_orbper, pl_rade, sy_vmag, disc_year, discoverymethod
FROM ps
ORDER BY disc_year DESC`;

    // Use URLSearchParams for proper form data encoding
    const formData = new URLSearchParams();
    formData.append('query', query);
    formData.append('format', 'json');

    // Make POST request with form data
    const response = await axios.post(
      'https://exoplanetarchive.ipac.caltech.edu/TAP/sync',
      formData,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        timeout: 30000, // 30 second timeout
      }
    );

    console.log(`Successfully fetched ${response.data.length} exoplanets from NASA API`);

    // Process the raw data
    const rawData: NASAExoplanetData[] = response.data;
    
    return rawData
      .filter(planet => planet.pl_name && planet.pl_name.trim() !== '')
      .map(planet => ({
        id: `${planet.pl_name}_${planet.disc_year || 'unknown'}_${Math.random().toString(36).substr(2, 9)}`,
        name: planet.pl_name.trim(),
        orbitalPeriod: planet.pl_orbper,
        planetRadius: planet.pl_rade,
        stellarMagnitude: planet.sy_vmag,
        discoveryYear: planet.disc_year,
        discoveryMethod: planet.discoverymethod,
      }))
      .filter(planet => planet.name); // Remove any entries without names

  } catch (error) {
    console.error('Error fetching exoplanet data from NASA API:', error);
    
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Server responded with error status
        throw new Error(`NASA API Error: ${error.response.status} - ${error.response.statusText}`);
      } else if (error.request) {
        // Request was made but no response received
        throw new Error('NASA API Error: No response received from server');
      } else {
        // Something else happened
        throw new Error(`NASA API Error: ${error.message}`);
      }
    }
    
    throw error;
  }
};

// Example usage in a React component:
/*
import React, { useState, useEffect } from 'react';
import { fetchTop100ExoplanetsAxios } from './utils/nasaExoplanetAxios';

const ExoplanetComponent: React.FC = () => {
  const [exoplanets, setExoplanets] = useState<ProcessedExoplanet[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadExoplanets = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await fetchTop100ExoplanetsAxios();
        setExoplanets(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch exoplanets');
      } finally {
        setLoading(false);
      }
    };

    loadExoplanets();
  }, []);

  if (loading) return <div>Loading exoplanets...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Top 100 Exoplanets</h2>
      {exoplanets.map(planet => (
        <div key={planet.id}>
          <h3>{planet.name}</h3>
          <p>Discovery Year: {planet.discoveryYear}</p>
          <p>Orbital Period: {planet.orbitalPeriod} days</p>
          <p>Planet Radius: {planet.planetRadius} Earth radii</p>
        </div>
      ))}
    </div>
  );
};
*/
