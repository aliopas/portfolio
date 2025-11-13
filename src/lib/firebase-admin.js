// @ts-check
import { cert, initializeApp, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

/** @type {any} */
let adminDb = null;

// Check if we're using placeholder/mock credentials
const isUsingMockCredentials = () => {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY;

  return (
    !projectId ||
    !clientEmail ||
    !privateKey ||
    projectId === 'your-project-id' ||
    clientEmail === 'firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com' ||
    !privateKey.includes('-----BEGIN PRIVATE KEY-----') // Fixed: Check if key exists properly
  );
};

// Only initialize if we have real credentials
if (!isUsingMockCredentials()) {
  try {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
    const privateKeyEnv = process.env.FIREBASE_ADMIN_PRIVATE_KEY || '';

    // Handle both escaped and unescaped newlines
    const privateKey = privateKeyEnv.replace(/\\n/g, '\n');

    const adminConfig = {
      credential: cert({
        projectId,
        clientEmail,
        privateKey,
      }),
    };

    // Prevent duplicate initialization
    const adminApp = getApps().length === 0 ? initializeApp(adminConfig, 'admin') : getApps()[0];
    adminDb = getFirestore(adminApp);

    console.log('✓ Firebase Admin SDK initialized successfully');
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('❌ Failed to initialize Firebase Admin:', errorMessage);
    console.error('Error details:', error);
    adminDb = null;
  }
} else {
  console.warn('⚠️ Firebase Admin not configured - using mock mode');
}

export { adminDb };