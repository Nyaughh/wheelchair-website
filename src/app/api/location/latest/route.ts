import { NextRequest, NextResponse } from 'next/server';
import { getLatestLocation } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const deviceId = searchParams.get('device_id');

    const location = await getLatestLocation(deviceId || undefined);

    if (!location) {
      return NextResponse.json({
        success: false,
        message: 'No location data found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      location: location
    });

  } catch (error) {
    console.error('Error retrieving latest location:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve location' },
      { status: 500 }
    );
  }
}
