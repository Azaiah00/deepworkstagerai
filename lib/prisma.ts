// Prisma Client singleton for database access
// This ensures we only have one Prisma instance throughout the app

import { PrismaClient } from '@prisma/client';

// Create a global variable to store the Prisma instance
// This prevents creating multiple instances in development (hot reload)
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Create or reuse existing Prisma client
export const prisma = globalForPrisma.prisma ?? new PrismaClient();

// In development, store the client on the global object
// This prevents creating new instances on every hot reload
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

