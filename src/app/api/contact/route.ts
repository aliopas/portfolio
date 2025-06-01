
// src/app/api/contact/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return NextResponse.json({ error: 'Invalid email format.' }, { status: 400 });
    }

    console.log("Received contact form submission:");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Subject:", subject || "No Subject"); // Handle optional subject
    console.log("Message:", message);

    // TODO: Implement CockroachDB database interaction here to save the message.
    // CockroachDB is PostgreSQL wire-compatible, so you can use a Node.js PostgreSQL driver like 'pg'.
    // 1. Install the driver: npm install pg
    // 2. Retrieve database credentials from environment variables (process.env.DB_HOST, process.env.DB_SSL_ROOT_CERT_PATH, etc.).
    // 3. Construct the connection configuration, including SSL settings using the downloaded certificate.
    //    Example for 'pg' client:
    //    const { Client } = require('pg');
    //    const client = new Client({
    //      host: process.env.DB_HOST,
    //      port: parseInt(process.env.DB_PORT || "26257"),
    //      user: process.env.DB_USER,
    //      password: process.env.DB_PASSWORD,
    //      database: process.env.DB_DATABASE,
    //      ssl: {
    //        rejectUnauthorized: true, // Important for security
    //        ca: require('fs').readFileSync(process.env.DB_SSL_ROOT_CERT_PATH).toString(),
    //      },
    //    });
    //    await client.connect();
    // 4. Prepare and execute an SQL INSERT statement to save the message data.
    //    Make sure to handle SQL injection vulnerabilities (e.g., by using parameterized queries).
    //    Example: await client.query('INSERT INTO messages (name, email, subject, message, date, read) VALUES ($1, $2, $3, $4, NOW(), false)', [name, email, subject, message]);
    // 5. Handle any potential errors during the database operation.
    // 6. Close the database connection: await client.end();
    
    console.log("Simulating message save (CockroachDB integration pending)...");
    // For now, return a success response without actual database interaction.
    // Replace this with actual database success/error handling.
    return NextResponse.json({ message: 'Message sent successfully! (CockroachDB integration pending)' }, { status: 201 });
  } catch (error) {
    console.error('Error processing contact form:', error);
    let errorMessage = 'Failed to send message.';
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    // Ensure a JSON response for errors as well
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
