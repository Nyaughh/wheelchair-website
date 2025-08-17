import fs from 'fs';
import path from 'path';

export interface LocationRecord {
  id?: number;
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
  address?: string;
  device_id?: string;
  created_at?: string;
}

const DB_FILE = path.join(process.cwd(), 'data', 'locations.json');

function ensureDataDirectory() {
  const dataDir = path.dirname(DB_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

function readDatabase(): LocationRecord[] {
  ensureDataDirectory();
  
  if (!fs.existsSync(DB_FILE)) {
    return [];
  }
  
  try {
    const data = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading database:', error);
    return [];
  }
}

function writeDatabase(locations: LocationRecord[]) {
  ensureDataDirectory();
  
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(locations, null, 2));
  } catch (error) {
    console.error('Error writing database:', error);
    throw error;
  }
}

export async function saveLocation(location: Omit<LocationRecord, 'id' | 'created_at'>): Promise<number> {
  const locations = readDatabase();
  
  const newLocation: LocationRecord = {
    ...location,
    id: Date.now(),
    created_at: new Date().toISOString()
  };
  
  locations.push(newLocation);
  writeDatabase(locations);
  
  return newLocation.id!;
}

export async function getLatestLocation(deviceId?: string): Promise<LocationRecord | null> {
  const locations = readDatabase();
  
  if (locations.length === 0) {
    return null;
  }
  
  if (deviceId) {
    const deviceLocations = locations.filter(loc => loc.device_id === deviceId);
    return deviceLocations.length > 0 ? deviceLocations[deviceLocations.length - 1] : null;
  }
  
  return locations[locations.length - 1];
}

export async function getLocationHistory(limit: number = 10, deviceId?: string): Promise<LocationRecord[]> {
  const locations = readDatabase();
  
  let filteredLocations = locations;
  
  if (deviceId) {
    filteredLocations = locations.filter(loc => loc.device_id === deviceId);
  }
  
  return filteredLocations
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, limit);
}

export async function deleteOldLocations(daysToKeep: number = 30): Promise<number> {
  const locations = readDatabase();
  const cutoffTime = Date.now() - (daysToKeep * 24 * 60 * 60 * 1000);
  
  const originalCount = locations.length;
  const filteredLocations = locations.filter(loc => loc.timestamp >= cutoffTime);
  
  writeDatabase(filteredLocations);
  
  return originalCount - filteredLocations.length;
}

export async function getLocationStats(): Promise<{
  totalRecords: number;
  latestLocation: LocationRecord | null;
  oldestLocation: LocationRecord | null;
}> {
  const locations = readDatabase();
  
  if (locations.length === 0) {
    return {
      totalRecords: 0,
      latestLocation: null,
      oldestLocation: null
    };
  }
  
  const sortedLocations = locations.sort((a, b) => b.timestamp - a.timestamp);
  
  return {
    totalRecords: locations.length,
    latestLocation: sortedLocations[0],
    oldestLocation: sortedLocations[sortedLocations.length - 1]
  };
}
