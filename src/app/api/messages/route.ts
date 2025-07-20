// src/app/api/messages/route.ts
import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

export async function GET(request: Request) {
  try {
    // جلب جميع الرسائل من Firestore
    const snapshot = await adminDb.collection('messages')
      .orderBy('createdAt', 'desc')
      .get();

    const messages = snapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    console.error('Error fetching messages:', error);
    let errorMessage = 'Failed to fetch messages.';
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
