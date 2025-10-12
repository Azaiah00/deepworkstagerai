import { NextRequest, NextResponse } from 'next/server';

// API route to handle car ad generation requests
export async function POST(request: NextRequest) {
  try {
    // Parse the incoming JSON data
    const body = await request.json();
    const { carImage, logoImage, scenery } = body;

    // Log the scenery/prompt to console
    console.log('='.repeat(50));
    console.log('🚀 NEW CAR AD GENERATION REQUEST');
    console.log('='.repeat(50));
    console.log('Selected Scenery:', scenery);
    
    // Calculate and log the size of the car image
    if (carImage) {
      // Data URL format: data:image/jpeg;base64,<base64-string>
      // Calculate size by getting the base64 string length
      const base64Data = carImage.split(',')[1];
      const sizeInBytes = (base64Data.length * 3) / 4;
      const sizeInKB = (sizeInBytes / 1024).toFixed(2);
      const sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2);
      
      console.log('Car Image Size:', `${sizeInKB} KB (${sizeInMB} MB)`);
      console.log('Car Image Type:', carImage.substring(5, carImage.indexOf(';')));
    } else {
      console.log('Car Image: Not provided');
    }

    // Calculate and log the size of the logo image (if provided)
    if (logoImage) {
      const base64Data = logoImage.split(',')[1];
      const sizeInBytes = (base64Data.length * 3) / 4;
      const sizeInKB = (sizeInBytes / 1024).toFixed(2);
      const sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2);
      
      console.log('Logo Image Size:', `${sizeInKB} KB (${sizeInMB} MB)`);
      console.log('Logo Image Type:', logoImage.substring(5, logoImage.indexOf(';')));
    } else {
      console.log('Logo Image: Not provided (optional)');
    }

    console.log('='.repeat(50));
    console.log('✅ Data received successfully!');
    console.log('='.repeat(50));

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Data received successfully',
      data: {
        scenery: scenery,
        hasCarImage: !!carImage,
        hasLogoImage: !!logoImage,
      }
    });

  } catch (error) {
    console.error('❌ Error processing request:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process request' },
      { status: 500 }
    );
  }
}

