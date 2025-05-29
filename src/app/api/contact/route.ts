
// src/app/api/contact/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

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

    const newMessage = {
      name,
      email,
      subject: subject || '', // Optional subject
      message,
      date: serverTimestamp(), // Firestore server timestamp
      read: false,
    };

    const docRef = await addDoc(collection(db, 'messages'), newMessage);

    return NextResponse.json({ message: 'Message sent successfully!', id: docRef.id }, { status: 201 });
  } catch (error) {
    console.error('Error sending message:', error);
    let errorMessage = 'Failed to send message.';
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
