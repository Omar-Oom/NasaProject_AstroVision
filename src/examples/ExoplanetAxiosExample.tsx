import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ProcessedExoplanet } from '../types/exoplanet';

// Standalone function to fetch top 100 exoplanets using Axios with TAP service
const fetchTop100ExoplanetsAxios = async (): Promise<ProcessedExoplanet[]> => {
  try {
    const query = `SELECT TOP 100 pl_name, pl_orbper, pl_rade, sy_vmag, disc_year, discoverymethod
FROM ps
ORDER BY disc_year DESC`;

    // Use URLSearchParams for proper form data encoding
    const formData = new URLSearchParams();
    formData.append('query', query);
    formData.append('format', 'json');

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

    console.log(`Fetched ${response.data.length} exoplanets using Axios`);
    
    // Process the raw NASA data into our application format
    const rawData = response.data;
    return rawData
      .filter((planet: any) => planet.pl_name && planet.pl_name.trim() !== '')
      .map((planet: any) => ({
        id: `${planet.pl_name}_${planet.disc_year || 'unknown'}_${Math.random().toString(36).substr(2, 9)}`,
        name: planet.pl_name.trim(),
        orbitalPeriod: planet.pl_orbper,
        planetRadius: planet.pl_rade,
        stellarMagnitude: planet.sy_vmag,
        mission: planet.discoverymethod || 'Unknown',
        discoveryYear: planet.disc_year,
        status: 'confirmed' as const, // Assuming all are confirmed from the query
      }))
      .filter((planet: ProcessedExoplanet) => planet.name);
  } catch (error) {
    console.error('Error fetching exoplanet data with Axios:', error);
    throw error;
  }
};

// Example React component using the Axios function
const ExoplanetAxiosExample: React.FC = () => {
  const [exoplanets, setExoplanets] = useState<ProcessedExoplanet[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetchExoplanets = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchTop100ExoplanetsAxios();
      setExoplanets(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchExoplanets();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Top 100 Exoplanets - Axios Example</h1>
      
      <div className="mb-4">
        <button
          onClick={handleFetchExoplanets}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Fetching...' : 'Fetch Exoplanets'}
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          Error: {error}
        </div>
      )}

      <div className="grid gap-4">
        {exoplanets.map((planet) => (
          <div key={planet.id} className="bg-white border rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold text-lg">{planet.name}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2 text-sm">
              <div>
                <span className="font-medium">Discovery Year:</span> {planet.discoveryYear || 'Unknown'}
              </div>
              <div>
                <span className="font-medium">Orbital Period:</span> {planet.orbitalPeriod ? `${planet.orbitalPeriod} days` : 'Unknown'}
              </div>
              <div>
                <span className="font-medium">Planet Radius:</span> {planet.planetRadius ? `${planet.planetRadius} Earth radii` : 'Unknown'}
              </div>
              <div>
                <span className="font-medium">Stellar Magnitude:</span> {planet.stellarMagnitude || 'Unknown'}
              </div>
              <div>
                <span className="font-medium">Mission:</span> {planet.mission}
              </div>
              <div>
                <span className="font-medium">Status:</span> {planet.status}
              </div>
            </div>
          </div>
        ))}
      </div>

      {exoplanets.length === 0 && !loading && !error && (
        <p className="text-gray-500 text-center py-8">No exoplanets data available.</p>
      )}
    </div>
  );
};

export default ExoplanetAxiosExample;
