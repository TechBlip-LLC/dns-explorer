import { analytics } from './localAnalytics';

interface GeoLocation {
  latitude: number;
  longitude: number;
  country: string;
}

// Simulated geolocation data for demo purposes
const DEMO_LOCATIONS: GeoLocation[] = [
  { latitude: 40.7128, longitude: -74.0060, country: 'US' },
  { latitude: 51.5074, longitude: -0.1278, country: 'GB' },
  { latitude: 35.6762, longitude: 139.6503, country: 'JP' },
  { latitude: 1.3521, longitude: 103.8198, country: 'SG' },
  { latitude: -33.8688, longitude: 151.2093, country: 'AU' }
];

export function getQueryLocations(): GeoLocation[] {
  const events = analytics.getRecentEvents(60);
  const queryEvents = events.filter(e => e.name === 'query_completed');
  
  // For demo, assign random locations to queries
  return queryEvents.map(() => 
    DEMO_LOCATIONS[Math.floor(Math.random() * DEMO_LOCATIONS.length)]
  );
}