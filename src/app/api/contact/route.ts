
// src/app/api/contact/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 });
    }

    // Validate email format (basic)
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return NextResponse.json({ error: 'Invalid email format.' }, { status: 400 });
    }

    console.log("Received contact form submission:");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Subject:", subject);
    console.log("Message:", message);

    // TODO: Implement MySQL database interaction here to save the message.
    // Example steps:
    // 1. Establish a connection to your MySQL database using credentials from .env.
    // 2. Prepare and execute an SQL INSERT statement to save the message data.
    // 3. Handle any potential errors during the database operation.
    // 4. Close the database connection.
    
    console.log("Simulating message save (MySQL integration pending)...");

    return NextResponse.json({ message: 'Message sent successfully! (MySQL integration pending)' }, { status: 201 });
  } catch (error) {
    console.error('Error processing contact form (simulation):', error);
    let errorMessage = 'Failed to send message.';
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
