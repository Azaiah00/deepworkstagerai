// API route for managing individual leads
// Handles updating, deleting, and retrieving specific leads

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

// GET - Retrieve a specific lead
export async function GET(
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

    const { id: leadId } = await params;

    // Fetch the lead
    const lead = await prisma.lead.findFirst({
      where: {
        id: leadId,
        userId: session.user.id
      }
    });

    if (!lead) {
      return NextResponse.json(
        { error: 'Lead not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ lead });
  } catch (error) {
    console.error('Error fetching lead:', error);
    return NextResponse.json(
      { error: 'Failed to fetch lead' },
      { status: 500 }
    );
  }
}

// PATCH - Update a specific lead
export async function PATCH(
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

    const { id: leadId } = await params;

    // Verify the lead belongs to the user
    const existingLead = await prisma.lead.findFirst({
      where: {
        id: leadId,
        userId: session.user.id
      }
    });

    if (!existingLead) {
      return NextResponse.json(
        { error: 'Lead not found or unauthorized' },
        { status: 404 }
      );
    }

    // Parse the request body
    const body = await request.json();
    const updateData: any = {};

    // Only update fields that are provided
    if (body.name !== undefined) updateData.name = body.name.trim();
    if (body.email !== undefined) updateData.email = body.email?.trim() || null;
    if (body.phone !== undefined) updateData.phone = body.phone?.trim() || null;
    if (body.company !== undefined) updateData.company = body.company?.trim() || null;
    if (body.status !== undefined) updateData.status = body.status;
    if (body.priority !== undefined) updateData.priority = body.priority;
    if (body.notes !== undefined) updateData.notes = body.notes?.trim() || null;
    if (body.estimatedValue !== undefined) {
      updateData.estimatedValue = body.estimatedValue ? parseFloat(body.estimatedValue) : null;
    }
    if (body.nextFollowUpAt !== undefined) {
      updateData.nextFollowUpAt = body.nextFollowUpAt ? new Date(body.nextFollowUpAt) : null;
    }
    if (body.conversationHistory !== undefined) {
      updateData.conversationHistory = body.conversationHistory;
    }
    if (body.tags !== undefined) {
      updateData.tags = body.tags;
    }

    // Update last contacted time if status changed to 'contacted'
    if (body.status === 'contacted' && existingLead.status !== 'contacted') {
      updateData.lastContactedAt = new Date();
    }

    // Update the lead
    const lead = await prisma.lead.update({
      where: {
        id: leadId
      },
      data: updateData
    });

    return NextResponse.json({ lead });
  } catch (error) {
    console.error('Error updating lead:', error);
    return NextResponse.json(
      { error: 'Failed to update lead' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a specific lead
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

    const { id: leadId } = await params;

    // Verify the lead belongs to the user before deleting
    const lead = await prisma.lead.findFirst({
      where: {
        id: leadId,
        userId: session.user.id
      }
    });

    if (!lead) {
      return NextResponse.json(
        { error: 'Lead not found or unauthorized' },
        { status: 404 }
      );
    }

    // Delete the lead
    await prisma.lead.delete({
      where: {
        id: leadId
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting lead:', error);
    return NextResponse.json(
      { error: 'Failed to delete lead' },
      { status: 500 }
    );
  }
}

