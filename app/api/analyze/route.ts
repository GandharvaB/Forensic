import { NextResponse } from 'next/server';

import { SYSTEM_PROMPT } from '../../../lib/knowledge_base';

export async function POST(req: Request) {
  try {
    const { image } = await req.json();

    if (!image) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    const [header, base64] = image.split(',');
    const mimeMatch = header.match(/:(.*?);/);
    const mediaType = mimeMatch ? (mimeMatch[1] as any) : 'image/jpeg';

    if (!process.env.SARVAM_API_KEY) {
      return NextResponse.json({ 
        report: "## ERROR\nSarvam AI API Key is missing. Please add `SARVAM_API_KEY` to your environment variables on the server." 
      });
    }

    const payload = {
      model: "sarvam-105b",
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT
        },
        {
          role: "user",
          content: "Analyze the provided forensic evidence (simulated as blunt force trauma). Output strictly in the required format. Do not add conversational filler."
        }
      ]
    };

    const response = await fetch('https://api.sarvam.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-subscription-key': process.env.SARVAM_API_KEY,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || errorData.message || `Sarvam AI API error: ${response.statusText}`);
    }

    const result = await response.json();
    const report = result.choices?.[0]?.message?.content || '';

    if (!report) {
      return NextResponse.json({
        report: `## SYSTEM ERROR\nSarvam AI returned an empty response or unexpected format. Raw output:\n\`\`\`json\n${JSON.stringify(result, null, 2)}\n\`\`\``
      });
    }

    return NextResponse.json({ report });
  } catch (error: any) {
    console.error('API Route Error:', error);
    
    // Fallback if 404 occurs on model string
    if (error?.status === 404 || error.message?.includes('not_found')) {
        return NextResponse.json({ 
            report: "## SYSTEM ERROR\nError 404: The requested model was not found." 
          });
    }

    return NextResponse.json({ 
        report: `## SYSTEM ERROR\nInternal API Route Exception (${error?.name || 'Error'}): ${error?.status || ''} ${error?.message || String(error)}` 
    });
  }
}
