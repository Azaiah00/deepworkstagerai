import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Signed JSON inventory feed
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    const token = searchParams.get('token');
    if (!userId || !token) return NextResponse.json({ error: 'Missing params' }, { status: 400 });

    // Simple token check: token should equal hash(userId + secret). For now, use env var directly.
    const expected = process.env.FEED_TOKEN_SECRET ? Buffer.from(`${userId}:${process.env.FEED_TOKEN_SECRET}`).toString('base64url') : null;
    if (!expected || token !== expected) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const items = await prisma.stagingProject.findMany({
      where: { userId, status: 'completed' },
      orderBy: { updatedAt: 'desc' },
      select: {
        id: true,
        title: true,
        generatedImageUrl: true,
        carImageUrl: true,
        scenery: true,
        createdAt: true,
        updatedAt: true,
        tags: true,
      },
    });
    return NextResponse.json({ inventory: items });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to build feed' }, { status: 500 });
  }
}


