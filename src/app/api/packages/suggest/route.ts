import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query || query.trim().length === 0) {
      return NextResponse.json({ suggestions: [] });
    }

    // Get the backend URL from environment variable or use default
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';
    
    // Make request to backend API
    const response = await fetch(`${backendUrl}/api/packages/suggest?q=${encodeURIComponent(query)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`);
    }

    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in package suggestions API:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch package suggestions',
        suggestions: [] 
      },
      { status: 500 }
    );
  }
} 