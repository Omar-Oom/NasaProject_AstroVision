import React, { useState } from 'react';
import { fetchTop100ExoplanetsAxios } from '../services/exoplanetService';

const ApiTestPage: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testApi = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('🧪 Testing NASA API from test page...');
      const result = await fetchTop100ExoplanetsAxios();
      console.log('✅ API Test Result:', result);
      setData({
        count: result.length,
        sample: result.slice(0, 5),
        allData: result
      });
    } catch (err) {
      console.error('❌ API Test Error:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-space-gradient p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">NASA API Test Page</h1>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-6">
          <button 
            onClick={testApi} 
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Testing NASA API...' : 'Test NASA API'}
          </button>
        </div>
        
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-200 p-4 rounded-lg mb-6">
            <h3 className="font-bold">Error:</h3>
            <p>{error}</p>
          </div>
        )}
        
        {data && (
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">✅ API Test Results</h2>
            <div className="text-white mb-4">
              <p className="text-lg"><strong>Success!</strong> Fetched {data.count} exoplanets from NASA API</p>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-3">Sample Data (First 5 planets):</h3>
            <div className="bg-black/20 rounded-lg p-4 mb-4">
              <pre className="text-green-300 text-sm overflow-x-auto">
                {JSON.stringify(data.sample, null, 2)}
              </pre>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-3">All Planet Names:</h3>
            <div className="bg-black/20 rounded-lg p-4 max-h-96 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {data.allData.map((planet: any, index: number) => (
                  <div key={planet.id} className="text-green-300 text-sm p-2 bg-black/10 rounded">
                    {index + 1}. {planet.name} ({planet.discoveryYear})
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApiTestPage;
