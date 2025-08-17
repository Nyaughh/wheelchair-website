import { NextRequest, NextResponse } from 'next/server';
import { getLocationHistory } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const deviceId = searchParams.get('device_id');
    const limit = parseInt(searchParams.get('limit') || '10');

    const locations = await getLocationHistory(limit, deviceId || undefined);

    return NextResponse.json({
      success: true,
      locations: locations,
      count: locations.length
    });

  } catch (error) {
    console.error('Error retrieving location history:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve location history' },
      { status: 500 }
    );
  }
}
