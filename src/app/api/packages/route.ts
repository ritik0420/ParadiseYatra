import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const limit = searchParams.get('limit') || '10';
    const page = searchParams.get('page') || '1';

    let url = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/packages?limit=${limit}&page=${page}`;
    
    if (category) {
      url += `&category=${category}`;
    }
    
    if (featured) {
      url += `&featured=${featured}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching packages:', error);
    return NextResponse.json(
      { message: 'Failed to fetch packages' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const token = request.headers.get('authorization');

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/packages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: token }),
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error creating package:', error);
    return NextResponse.json(
      { message: 'Failed to create package' },
      { status: 500 }
    );
  }
} 