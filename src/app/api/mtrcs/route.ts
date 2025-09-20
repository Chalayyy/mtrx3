import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { mtrcs, type NewMtrx } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

// GET /api/mtrcs - Get all mtrcs
export async function GET() {
  try {
    // this query is equivalent to SELECT * FROM mtrcs in SQL
    const allMtrcs = await db.select().from(mtrcs);
    return NextResponse.json(allMtrcs);
  } catch (error) {
    console.error('Error fetching mtrcs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch mtrcs' },
      { status: 500 }
    );
  }
}

// POST /api/mtrcs - Create a new mtrx
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { date, theme, rows } = body;
    if (!date || !theme || !rows) {
      return NextResponse.json(
        { error: 'Date, theme, and rows are required' },
        { status: 400 }
      );
    }
    const newMtrx: NewMtrx = { date, theme, rows };

    const [mtrx] = await db.insert(mtrcs).values(newMtrx).returning();
    return NextResponse.json(mtrx, { status: 201 });
  } catch (error) {
    console.error('Error creating mtrx:', error);
    return NextResponse.json(
      { error: 'Failed to create mtrx' },
      { status: 500 }
    );
  }
}

// DELETE /api/mtrcs - Delete a mtrx by date
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { date } = body;

    if (!date) {
      return NextResponse.json(
        { error: 'Date is required' },
        { status: 400 }
      );
    }

    const deletedMtrx = await db.delete(mtrcs).where(eq(mtrcs.date, date)).returning();

    if (deletedMtrx.length === 0) {
      return NextResponse.json(
        { error: 'Mtrx not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Mtrx deleted successfully', deletedMtrx: deletedMtrx[0] },
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


