// @ts-check
// Graceful Firebase Admin SDK initialization
// This allows the app to work with or without Firebase credentials

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
    privateKey?.includes('PRIVATE KEY-----')
  );
};

// Only initialize if we have real credentials
if (!isUsingMockCredentials()) {
  try {
    const { cert, initializeApp } = await import('firebase-admin/app');
    const { getFirestore } = await import('firebase-admin/firestore');

    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
    const privateKeyEnv = process.env.FIREBASE_ADMIN_PRIVATE_KEY || '';

    const privateKey = privateKeyEnv.replace(/\\n/g, '\n');

    const adminConfig = {
      credential: cert({
        projectId,
        clientEmail,
        privateKey,
      }),
    };

    const adminApp = initializeApp(adminConfig);
    adminDb = getFirestore(adminApp);
    console.log('✓ Firebase Admin SDK initialized');
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Failed to initialize Firebase:', errorMessage);
    adminDb = null;
  }
} else {
  console.log('⚠️  Using mock mode - Firebase not configured. App will work without database features.');
}

export { adminDb };