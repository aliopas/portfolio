// src/app/api/messages/[id]/route.ts
import { NextResponse } from 'next/server';

// Placeholder for database connection and queries
// import { getDbClient } from '@/lib/db'; // You would create this utility

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const messageId = params.id;
  try {
    const { read } = await request.json();

    if (typeof read !== 'boolean') {
      return NextResponse.json({ error: 'Invalid "read" status provided.' }, { status: 400 });
    }

    // TODO: Implement CockroachDB database interaction here to update message read status.
    // 1. Connect to CockroachDB.
    // 2. Execute an UPDATE query for the message with messageId.
    //    Example: await client.query('UPDATE messages SET read = $1 WHERE id = $2', [read, messageId]);
    // 3. Handle "not found" cases if the messageId doesn't exist.
    // 4. Close the database connection.
    
    console.log(`Updating message ${messageId} read status to ${read} (CockroachDB integration pending)...`);
    // Simulate successful update
    return NextResponse.json({ message: `Message ${messageId} updated successfully.` }, { status: 200 });

  } catch (error) {
    console.error(`Error updating message ${messageId}:`, error);
    let errorMessage = 'Failed to update message.';
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const messageId = params.id;
  try {
    // حذف الرسالة فعليًا من Firestore
    const { id } = params;
    if (!id) {
      return NextResponse.json({ error: 'يجب تحديد معرف الرسالة' }, { status: 400 });
    }
    await (await import('@/lib/firebase-admin')).adminDb.collection('messages').doc(id).delete();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting message:', error);
    return NextResponse.json({ error: 'حدث خطأ أثناء حذف الرسالة' }, { status: 500 });
  }
}
