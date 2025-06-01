import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Get admin credentials from server-side environment variables
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    // Check if admin credentials are configured
    if (!adminEmail || !adminPassword) {
      return NextResponse.json({ message: 'Admin credentials are not configured.' }, { status: 500 });
    }

    // Verify credentials
    if (email === adminEmail && password === adminPassword) {
      // In a real application, you would set a secure cookie or generate a token here
      return NextResponse.json({ success: true, message: 'Login successful!' }, { status: 200 });
    } else {
      return NextResponse.json({ success: false, message: 'Invalid email or password.' }, { status: 401 });
    }

  } catch (error) {
    console.error('Error during login API:', error);
    return NextResponse.json({ message: 'An error occurred during login.' }, { status: 500 });
  }
}