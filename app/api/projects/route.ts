// API route for managing staging projects
// Handles creating, retrieving, and updating car staging projects

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

// GET - Retrieve all projects for the authenticated user
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

    // Fetch all projects for this user, sorted by newest first
    const projects = await prisma.stagingProject.findMany({
      where: {
        userId: session.user.id
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({ projects });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

// POST - Create a new staging project
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
      title,
      carImageUrl,
      logoImageUrl,
      scenery,
      customPrompt,
      generatedImageUrl,
      status
    } = body;

    // Validate required fields
    if (!carImageUrl || !scenery) {
      return NextResponse.json(
        { error: 'Car image and scenery are required' },
        { status: 400 }
      );
    }

    // Create the project in the database
    const project = await prisma.stagingProject.create({
      data: {
        userId: session.user.id,
        title: title || 'Untitled Project',
        carImageUrl,
        logoImageUrl: logoImageUrl || null,
        scenery,
        customPrompt: customPrompt || null,
        generatedImageUrl: generatedImageUrl || null,
        status: status || 'completed'
      }
    });

    // Log analytics event for project creation
    await prisma.analyticsLog.create({
      data: {
        userId: session.user.id,
        eventType: 'staging_created',
        eventData: {
          projectId: project.id,
          scenery: scenery
        }
      }
    });

    return NextResponse.json({ project }, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}

