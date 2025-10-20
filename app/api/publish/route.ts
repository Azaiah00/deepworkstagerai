import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

// Minimal publisher stub: enqueue website and/or social jobs for a project
export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { projectId, website = true, social = false, socialPlatforms = [] } = body;
    const project = await prisma.stagingProject.findFirst({ where: { id: projectId, userId: session.user.id } });
    if (!project) return NextResponse.json({ error: 'Project not found' }, { status: 404 });

    const jobs = [] as any[];
    if (website) {
      jobs.push(prisma.job.create({ data: { userId: session.user.id, type: 'website_publish', payload: { projectId } } }));
    }
    if (social) {
      jobs.push(prisma.job.create({ data: { userId: session.user.id, type: 'social_publish', payload: { projectId, platforms: socialPlatforms } } }));
    }
    await prisma.$transaction(jobs);
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to enqueue publish jobs' }, { status: 500 });
  }
}


