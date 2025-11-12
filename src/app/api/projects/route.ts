import { NextResponse } from 'next/server';

// جلب جميع المشاريع
export async function GET() {
  try {
    // Check if Firebase is properly configured
    const adminModule = await import('@/lib/firebase-admin');
    const adminDb = adminModule.adminDb as any;
    
    if (!adminDb) {
      console.warn('Firebase not configured. Returning empty projects list.');
      return NextResponse.json([]);
    }

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
    // Return empty array on error instead of error response
    // This allows the frontend to show empty state gracefully
    return NextResponse.json([]);
  }
}

// إضافة مشروع جديد
export async function POST(request: Request) {
  try {
    const adminModule = await import('@/lib/firebase-admin');
    const adminDb = adminModule.adminDb as any;
    
    if (!adminDb) {
      return NextResponse.json({ error: 'Firebase not configured' }, { status: 503 });
    }

    const body = await request.json();
    const { title, description, category, technologies, tags, imageUrl, imageHint, githubLink, liveLink } = body;

    if (!title || !category) {
      return NextResponse.json({ error: 'Title and category are required' }, { status: 400 });
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
    return NextResponse.json({ error: 'Failed to save project' }, { status: 500 });
  }
}
