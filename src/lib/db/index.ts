import { drizzle } from 'drizzle-orm/neon-serverless';
import { Pool } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set');
}

// Create connection pool. A connection pool is a cache of database connections
// that are maintained and reused across multiple requests, rather than creating
// and destroying connections for each database operation.
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Create drizzle instance
export const db = drizzle(pool);

// Export the pool for direct access if needed
export { pool };
