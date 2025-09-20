import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { mtrcs, type NewMtrx } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

// GET /api/mtrcs/[date] - Get a single mtrx by date
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ date: string }> }
) {
  try {
    const { date } = await params;

    if (!date) {
      return NextResponse.json(
        { error: 'Date parameter is required' },
        { status: 400 }
      );
    }

    const mtrx = await db.select().from(mtrcs).where(eq(mtrcs.date, date));

    if (mtrx.length === 0) {
      return NextResponse.json(
        { error: 'Mtrx not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(mtrx[0]);
  } catch (error) {
    console.error('Error fetching mtrx:', error);
    return NextResponse.json(
      { error: 'Failed to fetch mtrx' },
      { status: 500 }
    );
  }
}

// PUT /api/mtrcs/[date] - Update a mtrx by date
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ date: string }> }
) {
  try {
    const { date } = await params;
    const body = await request.json();
    const { theme, rows } = body;

    if (!date) {
      return NextResponse.json(
        { error: 'Date parameter is required' },
        { status: 400 }
      );
    }

    if (!theme && !rows) {
      return NextResponse.json(
        { error: 'At least one field (theme or rows) is required to update' },
        { status: 400 }
      );
    }

    // Check if the mtrx exists
    const existingMtrx = await db.select().from(mtrcs).where(eq(mtrcs.date, date));
    if (existingMtrx.length === 0) {
      return NextResponse.json(
        { error: 'Mtrx not found' },
        { status: 404 }
      );
    }

    // Prepare update data (only include fields that are provided)
    const updateData: Partial<NewMtrx> = {};
    if (theme !== undefined) updateData.theme = theme;
    if (rows !== undefined) updateData.rows = rows;

    // Perform the update
    const [updatedMtrx] = await db
      .update(mtrcs)
      .set(updateData)
      .where(eq(mtrcs.date, date))
      .returning();

    return NextResponse.json(updatedMtrx);
  } catch (error) {
    console.error('Error updating mtrx:', error);
    return NextResponse.json(
      { error: 'Failed to update mtrx' },
      { status: 500 }
    );
  }
}

// DELETE /api/mtrcs/[date] - Delete a mtrx by date
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ date: string }> }
) {
  try {
    const { date } = await params;

    if (!date) {
      return NextResponse.json(
        { error: 'Date parameter is required' },
        { status: 400 }
      );
    }

    // Check if the mtrx exists before deleting
    const existingMtrx = await db.select().from(mtrcs).where(eq(mtrcs.date, date));
    if (existingMtrx.length === 0) {
      return NextResponse.json(
        { error: 'Mtrx not found' },
        { status: 404 }
      );
    }

    // Perform the deletion
    const [deletedMtrx] = await db
      .delete(mtrcs)
      .where(eq(mtrcs.date, date))
      .returning();

    return NextResponse.json(
      { message: 'Mtrx deleted successfully', deletedMtrx },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting mtrx:', error);
    return NextResponse.json(
      { error: 'Failed to delete mtrx' },
      { status: 500 }
    );
  }
}
