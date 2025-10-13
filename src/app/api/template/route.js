import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // In production, this would be a cloud URL
    // For demo, we're reading from public/assets
    // const filePath = path.join(process.cwd(), 'public', 'assets', 'template3.docx');
    
    // const fileBuffer = fs.readFileSync(filePath);
    const response = await fetch('http://192.168.1.157:3000/assets/template3.docx');
    // const response = await fetch('https://pub-2836371ba342490ca9651d5df3445000.r2.dev/documents/NoToken_1760351258725_6kqxakevn_1760351653574.docx');
const fileBuffer = await response.arrayBuffer();
    
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch template document' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

