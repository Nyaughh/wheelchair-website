import { NextRequest, NextResponse } from 'next/server';
import { saveLocation, getLatestLocation, getLocationStats } from '@/lib/database';

export async function GET() {
  try {
    const stats = await getLocationStats();
    
    return NextResponse.json({
      success: true,
      stats: stats
    });
  } catch (error) {
    console.error('Error getting stats:', error);
    return NextResponse.json(
      { error: 'Failed to get stats' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Create a test location
    const testLocation = {
      latitude: 40.7128,
      longitude: -74.0060,
      accuracy: 10,
      timestamp: Date.now(),
      address: 'Test Address, New York, NY',
      device_id: 'test'
    };
    
    const id = await saveLocation(testLocation);
    const latest = await getLatestLocation();
    
    return NextResponse.json({
      success: true,
      message: 'Test location saved',
      id: id,
      latest: latest
    });
  } catch (error) {
    console.error('Error in test:', error);
    return NextResponse.json(
      { error: 'Test failed' },
      { status: 500 }
    );
  }
}
