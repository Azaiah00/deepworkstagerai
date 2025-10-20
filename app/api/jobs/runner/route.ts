import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Simple job runner (to be invoked via Netlify Scheduled Functions or manual ping)
// Security: requires header x-runner-key === process.env.JOB_RUNNER_KEY

async function handleWebsitePublish(job: any) {
  // Stub: mark completed immediately. Replace with real WordPress/Webflow adapters.
  return { ok: true };
}

async function handleSocialPublish(job: any) {
  // Stub: mark completed immediately.
  return { ok: true };
}

export async function POST(req: NextRequest) {
  try {
    const key = req.headers.get('x-runner-key');
    if (!process.env.JOB_RUNNER_KEY || key !== process.env.JOB_RUNNER_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Pick a job that is queued and due
    const job = await prisma.job.findFirst({
      where: { status: 'queued', runAt: { lte: new Date() } },
      orderBy: { createdAt: 'asc' },
    });

    if (!job) return NextResponse.json({ done: true, message: 'No jobs' });

    // Mark running
    await prisma.job.update({ where: { id: job.id }, data: { status: 'running' } });

    let result: { ok: boolean; error?: string } = { ok: false };
    try {
      if (job.type === 'website_publish') result = await handleWebsitePublish(job);
      else if (job.type === 'social_publish') result = await handleSocialPublish(job);
      else result = { ok: true };
    } catch (e: any) {
      result = { ok: false, error: e?.message || 'Error' };
    }

    if (result.ok) {
      await prisma.job.update({ where: { id: job.id }, data: { status: 'completed', lastError: null } });
    } else {
      const attempts = job.attempts + 1;
      const backoffMs = Math.min(60000 * attempts, 10 * 60 * 1000); // up to 10 min
      await prisma.job.update({
        where: { id: job.id },
        data: {
          status: attempts >= 5 ? 'failed' : 'queued',
          attempts,
          lastError: result.error || 'Unknown',
          runAt: attempts >= 5 ? job.runAt : new Date(Date.now() + backoffMs),
        },
      });
    }

    return NextResponse.json({ processed: job.id, ok: result.ok });
  } catch (e) {
    return NextResponse.json({ error: 'Runner failure' }, { status: 500 });
  }
}


