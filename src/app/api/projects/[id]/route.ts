import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

// حذف مشروع عبر id من params
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    if (!id) {
      return NextResponse.json({ error: 'معرّف المشروع مطلوب' }, { status: 400 });
    }
    await adminDb.collection('projects').doc(id).delete();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json({ error: 'حدث خطأ أثناء حذف المشروع', details: String(error) });
  }
}
