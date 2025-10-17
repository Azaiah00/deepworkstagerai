// API route for managing CRM leads
// Handles creating, retrieving, and managing customer leads

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

// GET - Retrieve all leads for the authenticated user
export async function GET(request: NextRequest) {
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

    // Get query parameters for filtering
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const priority = searchParams.get('priority');

    // Build the where clause
    const where: any = {
      userId: session.user.id
    };

    if (status) where.status = status;
    if (priority) where.priority = priority;

    // Fetch leads with optional filters, sorted by newest first
    const leads = await prisma.lead.findMany({
      where,
      orderBy: [
        { priority: 'desc' }, // High priority first
        { createdAt: 'desc' }  // Then by newest
      ]
    });

    return NextResponse.json({ leads });
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leads' },
      { status: 500 }
    );
  }
}

// POST - Create a new lead
export async function POST(request: NextRequest) {
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

    // Parse the request body
    const body = await request.json();
    const {
      name,
      email,
      phone,
      company,
      source,
      priority,
      notes,
      estimatedValue
    } = body;

    // Validate required fields
    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    // Create the lead in the database
    const lead = await prisma.lead.create({
      data: {
        userId: session.user.id,
        name: name.trim(),
        email: email?.trim() || null,
        phone: phone?.trim() || null,
        company: company?.trim() || null,
        source: source || 'manual',
        priority: priority || 'medium',
        notes: notes?.trim() || null,
        estimatedValue: estimatedValue ? parseFloat(estimatedValue) : null
      }
    });

    // Log analytics event for lead creation
    await prisma.analyticsLog.create({
      data: {
        userId: session.user.id,
        eventType: 'lead_added',
        eventData: {
          leadId: lead.id,
          source: lead.source
        }
      }
    });

    return NextResponse.json({ lead }, { status: 201 });
  } catch (error) {
    console.error('Error creating lead:', error);
    return NextResponse.json(
      { error: 'Failed to create lead' },
      { status: 500 }
    );
  }
}

