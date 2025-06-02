// src/app/api/messages/route.ts
import { NextResponse } from 'next/server';
import { messagesData as mockMessages } from '@/data/mockData'; // Using mock data for now

export async function GET(request: Request) {
  try {
    // TODO: Implement CockroachDB database interaction here to fetch messages.
    // 1. Retrieve database credentials from environment variables.
    // 2. Connect to CockroachDB (e.g., using 'pg' driver).
    // 3. Execute a SELECT query to fetch all messages.
    //    Example: const result = await client.query('SELECT id, name, email, subject, message, date, read FROM messages ORDER BY date DESC');
    // 4. Format the result.rows if necessary.
    // 5. Close the database connection.

    console.log("Fetching messages (CockroachDB integration pending - returning mock data)...");
    
    // For now, return mock data. Replace this with actual data from CockroachDB.
    // Ensure the date format is compatible with what the frontend expects (ISO string or serializable Date).
    const formattedMockMessages = mockMessages.map(msg => ({
      ...msg,
      // Ensure date is a string for API response if it's a Date object
      date: msg.date instanceof Date ? msg.date.toISOString() : msg.date, 
    }));
    return NextResponse.json(formattedMockMessages, { status: 200 });

  } catch (error) {
    console.error('Error fetching messages:', error);
    let errorMessage = 'Failed to fetch messages.';
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
