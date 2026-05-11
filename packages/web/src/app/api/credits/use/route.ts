/**
 * POST /api/credits/use
 * Server-side proxy to deduct credits via Caparison Lab.
 * Keeps CAPARISON_API_KEY secure on the server.
 */
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { userToken, creditCost } = await req.json();

    if (!userToken) {
      return NextResponse.json({ error: 'Missing userToken' }, { status: 400 });
    }

    const res = await fetch(`${process.env.CAPARISON_BASE_URL}/api/v1/use`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        apiKey: process.env.CAPARISON_API_KEY,
        userToken,
        creditCost: creditCost || 2,
      }),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error('[credits/use] Error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
