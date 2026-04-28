import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Search, Clock, ExternalLink } from 'lucide-react';

const PollingPage = () => {
  const [zipcode, setZipcode] = useState('');
  const [searched, setSearched] = useState(false);

  const mockLocations = [
    { id: 1, name: "Washington Elementary School", address: "123 Main St, Anytown", hours: "7:00 AM - 8:00 PM", distance: "0.8 miles" },
    { id: 2, name: "Community Civic Center", address: "456 Oak Avenue, Anytown", hours: "7:00 AM - 8:00 PM", distance: "1.2 miles" },
  ];

  const [mapUrl, setMapUrl] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!zipcode.trim()) return;
    
    setSearched(true);
    
    // Check if we have a live Google Maps API Key
    if (import.meta.env.VITE_GOOGLE_MAPS_API_KEY) {
      setMapUrl(`https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&q=polling+station+near+${zipcode}`);
    } else {
      // Fallback: Use free OpenStreetMap Geocoding to locate the zip code
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(zipcode)}&format=json&limit=1`);
        const data = await res.json();
        
        if (data && data.length > 0) {
          const loc = data[0];
          // Nominatim BoundingBox: [lat_min, lat_max, lon_min, lon_max]
          // OSM Embed BoundingBox format expects: lon_min,lat_min,lon_max,lat_max
          const bbox = `${loc.boundingbox[2]},${loc.boundingbox[0]},${loc.boundingbox[3]},${loc.boundingbox[1]}`;
          setMapUrl(`https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${loc.lat}%2C${loc.lon}`);
        } else {
          // If zip code fails to match entirely, fallback to a world view
          setMapUrl(`https://www.openstreetmap.org/export/embed.html?bbox=-180%2C-90%2C180%2C90&layer=mapnik`);
        }
      } catch (err) {
        setMapUrl(`https://www.openstreetmap.org/export/embed.html?bbox=-180%2C-90%2C180%2C90&layer=mapnik`);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-ivory min-h-screen pt-8 pb-20"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        <header className="mb-12 border-b-2 border-navy-900 pb-8 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-serif font-black text-navy-900 mb-4 tracking-tight flex items-center justify-center md:justify-start gap-4">
            <MapPin className="text-red" size={40} />
            Find Your <span className="italic">Polling Place</span>
          </h1>
          <p className="text-xl font-sans text-navy-700 max-w-2xl mx-auto md:mx-0">
            Enter your zip code or postal code to locate where you are assigned to vote on Election Day.
          </p>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          
          <div className="space-y-6 lg:col-span-1">
            <div className="bg-white p-6 shadow-editorial border-t-4 border-navy-900">
              <form onSubmit={handleSearch}>
                <label className="block text-sm font-bold font-sans text-navy-800 uppercase tracking-widest mb-2">
                  Zip/Postal Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={zipcode}
                    onChange={(e) => setZipcode(e.target.value)}
                    placeholder="e.g. 90210"
                    className="flex-1 border-2 border-navy-200 px-4 py-2 font-sans focus:outline-none focus:border-red"
                  />
                  <button type="submit" className="bg-navy-900 text-ivory px-4 py-2 hover:bg-navy-700 transition-colors">
                    <Search size={20} />
                  </button>
                </div>
              </form>
            </div>

            {searched && (
              <div className="space-y-4">
                <h3 className="font-serif font-bold text-xl text-navy-900 border-b border-navy-200 pb-2">
                  Assigned Locations
                </h3>
                {mockLocations.map((loc, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={loc.id} 
                    className="bg-white p-4 border border-navy-100 hover:border-red transition-colors group cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-sans font-bold text-navy-800 group-hover:text-red transition-colors">{loc.name}</h4>
                      <span className="text-xs bg-navy-100 text-navy-600 px-2 py-1 font-bold">{loc.distance}</span>
                    </div>
                    <p className="text-sm text-navy-600 flex items-center gap-2 mb-2"><MapPin size={14} /> {loc.address}</p>
                    <p className="text-sm text-navy-600 flex items-center gap-2"><Clock size={14} /> {loc.hours}</p>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-2 h-[500px] bg-navy-100 relative shadow-inner border-2 border-navy-200 flex items-center justify-center overflow-hidden">
            {searched ? (
              <iframe
                title="Polling Location Map"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                src={mapUrl}
                allowFullScreen
              ></iframe>
            ) : (
              <div className="text-center p-8">
                <MapPin size={64} className="text-navy-200 mx-auto mb-4" />
                <p className="text-navy-500 font-sans text-lg">Enter a location to load the map.</p>
              </div>
            )}
            
            <div className="absolute bottom-0 w-full bg-ivory/90 border-t border-navy-200 p-3 text-xs text-navy-600 flex items-center justify-between">
              <span>This is a simulated map using placeholder data.</span>
              <a href="#" className="flex items-center gap-1 text-red font-bold hover:underline">Official Directory <ExternalLink size={12} /></a>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default PollingPage;
