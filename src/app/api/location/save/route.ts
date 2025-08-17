import { NextRequest, NextResponse } from 'next/server';
import { saveLocation, LocationRecord } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { latitude, longitude, accuracy, timestamp, address, device_id } = body;

    if (!latitude || !longitude || !accuracy || !timestamp) {
      return NextResponse.json(
        { error: 'Missing required fields: latitude, longitude, accuracy, timestamp' },
        { status: 400 }
      );
    }

    const locationData: Omit<LocationRecord, 'id' | 'created_at'> = {
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      accuracy: parseFloat(accuracy),
      timestamp: parseInt(timestamp),
      address: address || undefined,
      device_id: device_id || 'web'
    };

    const id = await saveLocation(locationData);

    return NextResponse.json({
      success: true,
      id: id,
      message: 'Location saved successfully'
    });

  } catch (error) {
    console.error('Error saving location:', error);
    return NextResponse.json(
      { error: 'Failed to save location' },
      { status: 500 }
    );
  }
}
