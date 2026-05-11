import { NextRequest, NextResponse } from 'next/server';
import potrace from 'potrace';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise<NextResponse>((resolve) => {
      potrace.trace(buffer, (err: any, svg: string) => {
        if (err) {
          console.error(err);
          resolve(NextResponse.json({ error: 'Failed to trace image' }, { status: 500 }));
        } else {
          resolve(NextResponse.json({ svg }));
        }
      });
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
