
// src/app/api/contact/route.ts
import { NextResponse } from 'next/server';
// Firebase Firestore related imports like db, collection, addDoc, serverTimestamp are removed.

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

    // Simulate saving the message (since Firestore is removed)
    console.log("Simulating message save for:", { name, email, subject, message });

    // In a real scenario without a database, you might:
    // - Send an email notification
    // - Log to a file (if running in a Node.js server environment, not directly applicable here for client-side form)
    // For now, we just return success.

    return NextResponse.json({ message: 'Message sent successfully! (Simulated - not saved to DB)' }, { status: 201 });
  } catch (error) {
    console.error('Error processing contact form (simulation):', error);
    let errorMessage = 'Failed to send message.';
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
