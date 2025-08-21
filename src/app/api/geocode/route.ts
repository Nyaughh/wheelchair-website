import { NextRequest, NextResponse } from 'next/server';

async function fetchWithRetry(url: string, options: RequestInit, retries: number = 2, backoffMs: number = 300): Promise<Response> {
  let lastError: unknown = null;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, options);
      if (response.ok) return response;
      lastError = new Error(`HTTP ${response.status}`);
    } catch (err) {
      lastError = err;
    }
    if (attempt < retries) {
      await new Promise(r => setTimeout(r, backoffMs * Math.pow(2, attempt)));
    }
  }
  throw lastError instanceof Error ? lastError : new Error('Unknown fetch error');
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');

  const latitude = lat !== null ? Number(lat) : NaN;
  const longitude = lon !== null ? Number(lon) : NaN;

  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    return NextResponse.json(
      { error: 'Latitude and longitude parameters are required and must be numbers' },
      { status: 400 }
    );
  }

  if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
    return NextResponse.json(
      { error: 'Latitude must be between -90 and 90, longitude between -180 and 180' },
      { status: 400 }
    );
  }

  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`;
    const headers = {
      'Accept': 'application/json',
      'User-Agent': 'WheelchairControlApp/1.0 (+contact: support@wheelchair.local)'
    } as Record<string, string>;

    const response = await fetchWithRetry(url, { headers }, 2, 300);

    const data = await response.json();
    if (!data || (!data.display_name && !data.address)) {
      return NextResponse.json({ error: 'No address found' }, { status: 404 });
    }
    return NextResponse.json(data);
  } catch (error) {
    console.error('Geocoding error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch address from coordinates' },
      { status: 502 }
    );
  }
}
