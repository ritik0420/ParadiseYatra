import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const response = await fetch(`${BACKEND_URL}/api/packages/${id}`);
    const data = await response.json();
    
    if (!response.ok) {
      return NextResponse.json({ message: data.message || 'Failed to fetch adventure package' }, { status: response.status });
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Adventure Package API error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const response = await fetch(`${BACKEND_URL}/api/packages/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': request.headers.get('Authorization') || '',
      },
      body: JSON.stringify({ ...body, category: 'adventure' }),
    });
    const data = await response.json();
    
    if (!response.ok) {
      return NextResponse.json({ message: data.message || 'Failed to update adventure package' }, { status: response.status });
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Adventure Package API error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const response = await fetch(`${BACKEND_URL}/api/packages/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': request.headers.get('Authorization') || '',
      },
    });
    const data = await response.json();
    
    if (!response.ok) {
      return NextResponse.json({ message: data.message || 'Failed to delete adventure package' }, { status: response.status });
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Adventure Package API error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
} 