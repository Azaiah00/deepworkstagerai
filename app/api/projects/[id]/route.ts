// API route for managing individual staging projects
// Handles updating and deleting specific projects

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

// DELETE - Delete a specific project
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Get the current session from Better Auth
    const session = await auth.api.getSession({
      headers: await headers()
    });

    // Check if user is authenticated
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id: projectId } = await params;

    // Verify the project belongs to the user before deleting
    const project = await prisma.stagingProject.findFirst({
      where: {
        id: projectId,
        userId: session.user.id
      }
    });

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found or unauthorized' },
        { status: 404 }
      );
    }

    // Delete the project
    await prisma.stagingProject.delete({
      where: {
        id: projectId
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}

// PATCH - Update a specific project (e.g., link vehicleId)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id: projectId } = await params;
    const body = await request.json();

    const existing = await prisma.stagingProject.findFirst({ where: { id: projectId, userId: session.user.id } });
    if (!existing) return NextResponse.json({ error: 'Project not found or unauthorized' }, { status: 404 });

    const data: any = {};
    if (body.vehicleId !== undefined) data.vehicleId = body.vehicleId;
    if (body.status !== undefined) data.status = body.status;

    const updated = await prisma.stagingProject.update({ where: { id: projectId }, data });
    return NextResponse.json({ project: updated });
  } catch (e) {
    console.error('Error updating project:', e);
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

