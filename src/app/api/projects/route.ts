import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

// جلب جميع المشاريع
export async function GET() {
  try {
    const snapshot = await adminDb.collection('projects')
      .orderBy('createdAt', 'desc')
      .get();

    const projects = snapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'حدث خطأ أثناء جلب المشاريع' }, { status: 500 });
  }
}

// إضافة مشروع جديد
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, category, technologies, tags, imageUrl, imageHint, githubLink, liveLink } = body;

    if (!title || !category) {
      return NextResponse.json({ error: 'العنوان والتصنيف مطلوبان' }, { status: 400 });
    }

    const docRef = await adminDb.collection('projects').add({
      title,
      description: description || '',
      category,
      technologies: technologies || [],
      tags: tags || [],
      imageUrl: imageUrl || '',
      imageHint: imageHint || '',
      githubLink: githubLink || '',
      liveLink: liveLink || '',
      createdAt: new Date().toISOString()
    });

    return NextResponse.json({ success: true, id: docRef.id });
  } catch (error) {
    console.error('Error saving project:', error);
    return NextResponse.json({ error: 'حدث خطأ أثناء حفظ المشروع' }, { status: 500 });
  }
}
