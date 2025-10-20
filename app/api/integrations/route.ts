import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

// GET - list integrations for current user
export async function GET() {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const items = await prisma.integration.findMany({ where: { userId: session.user.id } });
    return NextResponse.json({ integrations: items });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to load integrations' }, { status: 500 });
  }
}

// POST - upsert one integration (platform unique per user)
export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { platform, credentials, isActive = true } = body;
    if (!platform || !credentials) return NextResponse.json({ error: 'platform and credentials required' }, { status: 400 });

    const item = await prisma.integration.upsert({
      where: { userId_platform: { userId: session.user.id, platform } },
      update: { credentials, isActive, lastVerified: null },
      create: { userId: session.user.id, platform, credentials, isActive },
    });

    return NextResponse.json({ integration: item });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to save integration' }, { status: 500 });
  }
}


