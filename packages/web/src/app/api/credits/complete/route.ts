/**
 * POST /api/credits/complete
 * Server-side proxy to mark a generation as COMPLETED via Caparison Lab.
 * Keeps CAPARISON_API_KEY secure on the server.
 */
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { generationId, status } = await req.json();

    if (!generationId) {
      return NextResponse.json({ error: 'Missing generationId' }, { status: 400 });
    }

    const res = await fetch(`${process.env.CAPARISON_BASE_URL}/api/v1/complete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        apiKey: process.env.CAPARISON_API_KEY,
        generationId,
        status: status || 'COMPLETED',
      }),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error('[credits/complete] Error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
