import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

// Create or update a vehicle for the current user
export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const body = await req.json();

    // Allow upsert by vin (if present) or create new
    const {
      id,
      vin,
      stockNumber,
      year,
      make,
      model,
      trim,
      bodyStyle,
      drivetrain,
      transmission,
      engine,
      fuelType,
      exteriorColor,
      interiorColor,
      price,
      msrp,
      mileage,
      photos,
      features,
      vdpUrl,
    } = body;

    const data: any = {
      userId: session.user.id,
      vin: vin || null,
      stockNumber: stockNumber || null,
      year: year ?? null,
      make: make || null,
      model: model || null,
      trim: trim || null,
      bodyStyle: bodyStyle || null,
      drivetrain: drivetrain || null,
      transmission: transmission || null,
      engine: engine || null,
      fuelType: fuelType || null,
      exteriorColor: exteriorColor || null,
      interiorColor: interiorColor || null,
      price: price != null ? Number(price) : null,
      msrp: msrp != null ? Number(msrp) : null,
      mileage: mileage != null ? Number(mileage) : null,
      photos: Array.isArray(photos) ? photos : [],
      features: Array.isArray(features) ? features : [],
      vdpUrl: vdpUrl || null,
    };

    let vehicle;
    if (id) {
      vehicle = await prisma.vehicle.update({ where: { id }, data });
    } else if (vin) {
      vehicle = await prisma.vehicle.upsert({
        where: { vin },
        update: data,
        create: data,
      });
    } else {
      vehicle = await prisma.vehicle.create({ data });
    }

    return NextResponse.json({ vehicle });
  } catch (e) {
    console.error('vehicle save error', e);
    return NextResponse.json({ error: 'Failed to save vehicle' }, { status: 500 });
  }
}


