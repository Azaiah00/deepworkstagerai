import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

// Scenery-specific prompts for professional car advertisements
// CRITICAL: Keep the car image completely unchanged, only modify the background/context
const SCENERY_PROMPTS = {
  'luxury-showroom': 
    'Keep this car image EXACTLY as it is - do not change the car, interior, exterior, or any details. ' +
    'ONLY change what is visible through windows or in the background to show a luxury dealership showroom setting. ' +
    'The car itself must remain completely unchanged. ' +
    'Background should show: pristine showroom floor, elegant spot lighting, polished reflective surfaces, ' +
    'modern minimalist architecture, floor-to-ceiling windows showing city views. ' +
    'NO OTHER CARS - this car should be the ONLY vehicle visible. ' +
    'Professional photography quality, but the car image stays authentic and unchanged.',
  
  'clean-studio': 
    'Keep this car image EXACTLY as it is - do not change the car, interior, exterior, or any details. ' +
    'ONLY change what is visible through windows or in the background to show a pristine, minimalist studio setting. ' +
    'The car itself must remain completely unchanged. ' +
    'Background should show: seamless, highly polished reflective floor, subtle gradient background, ' +
    'clean controlled lighting, seamless white-to-light-gray gradient backdrop. ' +
    'NO OTHER CARS, NO DISTRACTIONS - this car should be the ONLY vehicle visible. ' +
    'Professional automotive studio photography, but the car image stays authentic and unchanged.',
  
  'sunset-beach': 
    'Keep this car image EXACTLY as it is - do not change the car, interior, exterior, or any details. ' +
    'ONLY change what is visible through windows or in the background to show a beach sunset scene. ' +
    'The car itself must remain completely unchanged. ' +
    'Background should show: smooth wet sand near the ocean during golden hour, beautiful orange and pink sunset sky, ' +
    'gentle waves, palm trees in background. ' +
    'Professional automotive photography, but the car image stays authentic and unchanged.',
  
  'mountain-road': 
    'Keep this car image EXACTLY as it is - do not change the car, interior, exterior, or any details. ' +
    'ONLY change what is visible through windows or in the background to show a mountain road scene. ' +
    'The car itself must remain completely unchanged. ' +
    'Background should show: winding mountain highway with dramatic peaks, clear blue sky, lush evergreen forests, ' +
    'scenic overlook view. ' +
    'Professional automotive photography, but the car image stays authentic and unchanged.',
  
  'urban-skyline': 
    'Keep this car image EXACTLY as it is - do not change the car, interior, exterior, or any details. ' +
    'ONLY change what is visible through windows or in the background to show an urban cityscape scene. ' +
    'The car itself must remain completely unchanged. ' +
    'Background should show: modern city rooftop or street at twilight, illuminated skyscrapers and city lights, ' +
    'sleek metropolitan vibe, beautiful blue hour lighting. ' +
    'Professional automotive photography, but the car image stays authentic and unchanged.',
  
  'desert-highway': 
    'Keep this car image EXACTLY as it is - do not change the car, interior, exterior, or any details. ' +
    'ONLY change what is visible through windows or in the background to show a desert highway scene. ' +
    'The car itself must remain completely unchanged. ' +
    'Background should show: endless open highway cutting through desert landscape, dramatic rock formations, ' +
    'vast open sky, sense of freedom and adventure. ' +
    'Professional automotive photography, but the car image stays authentic and unchanged.'
};

// API route to handle car ad generation requests
export async function POST(request: NextRequest) {
  try {
    // Parse the incoming JSON data
    const body = await request.json();
    const { projectName, carImage, logoImage, scenery } = body;

    // Log request details
    console.log('='.repeat(50));
    console.log('🚀 NEW CAR AD GENERATION REQUEST');
    console.log('='.repeat(50));
    console.log('Project Name:', projectName);
    console.log('Selected Scenery:', scenery);

    // Validate required fields
    if (!carImage) {
      return NextResponse.json(
        { success: false, error: 'Car image is required' },
        { status: 400 }
      );
    }

    if (!scenery || !SCENERY_PROMPTS[scenery as keyof typeof SCENERY_PROMPTS]) {
      return NextResponse.json(
        { success: false, error: 'Valid scenery selection is required' },
        { status: 400 }
      );
    }

    // Check for API key
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('❌ GEMINI_API_KEY not found in environment variables');
      return NextResponse.json(
        { success: false, error: 'API key not configured' },
        { status: 500 }
      );
    }

    // Initialize Google Gemini AI
    const ai = new GoogleGenAI({ apiKey });

    // Get the scenery-specific prompt
    let prompt = SCENERY_PROMPTS[scenery as keyof typeof SCENERY_PROMPTS];
    
    // Add logo integration if provided
    if (logoImage) {
      prompt += ' SUBTLY integrate the provided logo into the background environment - place it on billboards, building signs, dealership signage, or as part of the setting where it looks natural and professional. The logo should enhance the branding without interfering with the car\'s authenticity or looking forced. Keep the logo integration subtle and environmental.';
    }
    
    console.log('🎨 Generating image with Gemini...');
    console.log('Prompt:', prompt.substring(0, 150) + '...');

    // Extract base64 data and mime type from data URL
    const base64Match = carImage.match(/^data:(.+);base64,(.+)$/);
    if (!base64Match) {
      return NextResponse.json(
        { success: false, error: 'Invalid image format' },
        { status: 400 }
      );
    }

    const mimeType = base64Match[1];
    const base64Data = base64Match[2];

    // Prepare content for Gemini (car image + text prompt + optional logo)
    const contents = [
      { text: prompt },
      {
        inlineData: {
          mimeType: mimeType,
          data: base64Data,
        },
      },
    ];

    // Add logo image if provided
    if (logoImage) {
      const logoBase64Match = logoImage.match(/^data:(.+);base64,(.+)$/);
      if (logoBase64Match) {
        const logoMimeType = logoBase64Match[1];
        const logoBase64Data = logoBase64Match[2];
        
        contents.push({
          inlineData: {
            mimeType: logoMimeType,
            data: logoBase64Data,
          },
        });
        
        console.log('Logo image included for natural integration');
      }
    }

    console.log('Processing car exterior image');

    // Generate the transformed image with Gemini
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: contents,
      config: {
        imageConfig: {
          aspectRatio: '16:9', // Always output 16:9 (1344x768)
        },
      },
    });

    // Extract generated image from response
    let generatedImageData = null;
    
    // Check if response has valid candidates
    if (!response.candidates || response.candidates.length === 0) {
      console.error('❌ No candidates in Gemini response');
      return NextResponse.json(
        { success: false, error: 'Failed to generate image - no candidates' },
        { status: 500 }
      );
    }

    // Extract image data from first candidate
    const firstCandidate = response.candidates[0];
    if (!firstCandidate.content || !firstCandidate.content.parts) {
      console.error('❌ Invalid content structure in Gemini response');
      return NextResponse.json(
        { success: false, error: 'Failed to generate image - invalid response structure' },
        { status: 500 }
      );
    }

    for (const part of firstCandidate.content.parts) {
      if (part.inlineData) {
        generatedImageData = part.inlineData.data;
        break;
      }
    }

    if (!generatedImageData) {
      console.error('❌ No image data in Gemini response');
      return NextResponse.json(
        { success: false, error: 'Failed to generate image' },
        { status: 500 }
      );
    }

    console.log('✅ Image generated successfully!');
    console.log('='.repeat(50));

    // Return the generated image as base64
    return NextResponse.json({
      success: true,
      message: 'Car ad generated successfully',
      data: {
        generatedImage: `data:image/png;base64,${generatedImageData}`,
        scenery: scenery,
        aspectRatio: '16:9',
      }
    });

  } catch (error) {
    console.error('❌ Error processing request:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process request', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

