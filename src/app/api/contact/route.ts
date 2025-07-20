// دالة تعديل رسالة موجودة
export async function PUT(request: Request) {
  try {
    const session = await getServerSession();
    if (session?.user?.email !== process.env.ADMIN_EMAIL) {
      return NextResponse.json({ error: 'غير مصرح لك بهذا الإجراء' }, { status: 403 });
    }
    const body = await request.json();
    const { id, name, email, message, subject } = body;
    if (!id || !name || !email || !message) {
      return NextResponse.json({ error: 'جميع الحقول مطلوبة' }, { status: 400 });
    }
    await adminDb.collection('messages').doc(id).update({
      name,
      email,
      message,
      subject: subject || '',
      updatedAt: new Date().toISOString(),
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating message:', error);
    return NextResponse.json({ error: 'حدث خطأ أثناء تعديل الرسالة' }, { status: 500 });
  }
}

// دالة حذف رسالة
export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;
    console.log('DELETE request received. id:', id);
    if (!id) {
      return NextResponse.json({ error: 'معرّف الرسالة مطلوب' }, { status: 400 });
    }
    // حذف الرسالة مباشرة بدون تحقق من وجودها (Firestore يتجاهل الحذف إذا لم تكن موجودة)
    await adminDb.collection('messages').doc(id).delete();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting message:', error);
    return NextResponse.json({ error: 'حدث خطأ أثناء حذف الرسالة', details: String(error) });
  }
}

import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { getServerSession } from 'next-auth';


export async function GET() {
  try {
    // جلب جميع الرسائل
    const snapshot = await adminDb.collection('messages')
      .orderBy('createdAt', 'desc')
      .get();

    console.log('Firestore connection successful. Documents found:', snapshot.size);

    const messages = snapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data()
    }));

    if (messages.length === 0) {
      return NextResponse.json({ success: true, message: 'تم الاتصال بقاعدة البيانات بنجاح، لكن لا توجد رسائل.' });
    }

    return NextResponse.json(messages);

  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء جلب الرسائل' },
      { status: 500 }
    );
  }
}

// دالة استقبال الرسائل من النموذج وتخزينها في قاعدة البيانات
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, subject } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'جميع الحقول مطلوبة' }, { status: 400 });
    }

    console.log('Trying to save message:', { name, email, message, subject });
    const now = new Date();
    const docRef = await adminDb.collection('messages').add({
      name,
      email,
      message,
      subject: subject || '',
      createdAt: now.toISOString()
    });
    console.log('Message saved with id:', docRef.id);
    return NextResponse.json({ success: true, id: docRef.id });
  } catch (error) {
    console.error('Error saving message:', error);
    return NextResponse.json({ error: 'حدث خطأ أثناء حفظ الرسالة' }, { status: 500 });
  }
}