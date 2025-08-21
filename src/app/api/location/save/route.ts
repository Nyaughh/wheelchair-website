import { NextRequest, NextResponse } from 'next/server';
import { saveLocation, LocationRecord } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { latitude, longitude, accuracy, timestamp, address, device_id } = body;

    const parsedLatitude = typeof latitude === 'string' ? parseFloat(latitude) : Number(latitude);
    const parsedLongitude = typeof longitude === 'string' ? parseFloat(longitude) : Number(longitude);
    const parsedAccuracy = typeof accuracy === 'string' ? parseFloat(accuracy) : Number(accuracy);
    const parsedTimestamp = typeof timestamp === 'string' ? parseInt(timestamp, 10) : Number(timestamp);

    if (!Number.isFinite(parsedLatitude) || !Number.isFinite(parsedLongitude) || !Number.isFinite(parsedAccuracy) || !Number.isFinite(parsedTimestamp)) {
      return NextResponse.json(
        { error: 'Invalid numeric fields: latitude, longitude, accuracy, timestamp' },
        { status: 400 }
      );
    }

    if (parsedLatitude < -90 || parsedLatitude > 90 || parsedLongitude < -180 || parsedLongitude > 180) {
      return NextResponse.json(
        { error: 'Latitude must be between -90 and 90, longitude between -180 and 180' },
        { status: 400 }
      );
    }

    if (parsedAccuracy < 0) {
      return NextResponse.json(
        { error: 'Accuracy must be >= 0' },
        { status: 400 }
      );
    }

    const locationData: Omit<LocationRecord, 'id' | 'created_at'> = {
      latitude: parsedLatitude,
      longitude: parsedLongitude,
      accuracy: parsedAccuracy,
      timestamp: parsedTimestamp,
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
