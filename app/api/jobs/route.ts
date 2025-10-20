import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

// Create a job (internal/admin)
export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const body = await req.json();
    const { type, payload, runAt } = body;
    const job = await prisma.job.create({
      data: {
        userId: session.user.id,
        type,
        payload,
        runAt: runAt ? new Date(runAt) : new Date(),
      },
    });
    return NextResponse.json({ job });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to create job' }, { status: 500 });
  }
}

// List jobs for current user
export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const url = new URL(req.url);
    const projectId = url.searchParams.get('projectId');
    const where: any = { userId: session.user.id };
    if (projectId) {
      // filter JSON payload containing projectId
      where.payload = { path: ['projectId'], equals: projectId } as any;
    }
    const jobs = await prisma.job.findMany({ where, orderBy: { createdAt: 'desc' } });
    return NextResponse.json({ jobs });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to load jobs' }, { status: 500 });
  }
}


