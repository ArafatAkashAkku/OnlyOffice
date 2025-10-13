import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();

    console.log('=== OnlyOffice Callback Received ===');
    console.log('Full callback body:', JSON.stringify(body, null, 2));
    console.log('Timestamp:', new Date().toISOString());

    const { status, url, key, users } = body;

    console.log('Parsed data:');
    console.log('- Status:', status);
    console.log('- Key:', key);
    console.log('- URL:', url);
    console.log('- Users:', users);

    switch (status) {
      case 1:
        console.log('Status 1: Document is being edited');
        break;
      case 2:
        console.log('Status 2: Document is ready for saving');
        if (url) {
          console.log('Document URL for download:', url);
        }
        break;
      case 3:
        console.log('Status 3: Document saving error');
        break;
      case 4:
        console.log('Status 4: Document closed with no changes');
        break;
      case 6:
        console.log('Status 6: Document is being edited, force saving');
        break;
      case 7:
        console.log('Status 7: Document saving error, force saving');
        break;
      default:
        console.log('Unknown status:', status);
    }

    console.log('=== End Callback ===\n');

    return NextResponse.json({ error: 0 });

  } catch (error) {
    console.error('Callback error:', error);
    return NextResponse.json({ error: 1 }, { status: 500 });
  }
}