'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  // State to store uploaded images and selections
  const [carImage, setCarImage] = useState<string | null>(null);
  const [logoImage, setLogoImage] = useState<string | null>(null);
  const [selectedScenery, setSelectedScenery] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  // Available scenery options
  const sceneryOptions = [
    { id: 'luxury-showroom', name: 'Luxury Showroom', description: 'Modern dealership with elegant lighting' },
    { id: 'clean-studio', name: 'Clean Studio', description: 'Minimalist high-end studio setting' },
    { id: 'sunset-beach', name: 'Sunset Beach', description: 'Golden hour by the ocean' },
    { id: 'mountain-road', name: 'Mountain Road', description: 'Scenic winding mountain pass' },
    { id: 'urban-skyline', name: 'Urban Skyline', description: 'Downtown city at night' },
    { id: 'desert-highway', name: 'Desert Highway', description: 'Open road through desert landscape' },
  ];

  // Handle car image upload
  const handleCarImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCarImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle logo image upload
  const handleLogoImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle submit to AI processing
  const handleSubmit = async () => {
    // Validate required fields
    if (!carImage) {
      alert('Please upload a car image first!');
      return;
    }
    
    if (!selectedScenery) {
      alert('Please select a scenery option!');
      return;
    }

    // Set processing state
    setIsProcessing(true);

    try {
      // Prepare form data to send to server
      const formData = {
        carImage: carImage,
        logoImage: logoImage,
        scenery: selectedScenery,
      };

      // Send to API route
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to process request');
      }

      const result = await response.json();
      console.log('Server response:', result);
      
      if (result.success && result.data.generatedImage) {
        setGeneratedImage(result.data.generatedImage);
        // Scroll to results section
        setTimeout(() => {
          document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        alert('Image generated but no data received. Please try again.');
      }
      
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1e293b] text-[#f1f5f9] flex flex-col items-center justify-center p-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">
          DeepWork <span className="text-[#38bdf8]">AI</span> Car Ad Studio
        </h1>
        <p className="text-[#94a3b8] text-lg">
          Upload your car image and logo to get started
        </p>
      </div>

      {/* Upload Form Section */}
      <div className="bg-[#334155] rounded-2xl p-8 shadow-2xl max-w-2xl w-full">
        <div className="space-y-6">
          
          {/* Car Image Upload Button */}
          <div>
            <label 
              htmlFor="car-upload" 
              className="block text-sm font-medium mb-2"
            >
              Car Image <span className="text-[#ef4444]">*</span>
            </label>
            <input
              id="car-upload"
              type="file"
              accept="image/*"
              onChange={handleCarImageUpload}
              className="block w-full text-sm text-[#f1f5f9]
                file:mr-4 file:py-3 file:px-6
                file:rounded-lg file:border-0
                file:text-sm file:font-semibold
                file:bg-[#38bdf8] file:text-[#1e293b]
                hover:file:bg-[#0ea5e9]
                file:cursor-pointer cursor-pointer
                file:transition-colors"
            />
          </div>

          {/* Logo Image Upload Button (Optional) */}
          <div>
            <label 
              htmlFor="logo-upload" 
              className="block text-sm font-medium mb-2"
            >
              Logo Image <span className="text-[#94a3b8] text-xs">(Optional)</span>
            </label>
            <input
              id="logo-upload"
              type="file"
              accept="image/*"
              onChange={handleLogoImageUpload}
              className="block w-full text-sm text-[#f1f5f9]
                file:mr-4 file:py-3 file:px-6
                file:rounded-lg file:border-0
                file:text-sm file:font-semibold
                file:bg-[#334155] file:text-[#f1f5f9]
                hover:file:bg-[#475569]
                file:cursor-pointer cursor-pointer
                file:transition-colors
                border-2 border-dashed border-[#475569] rounded-lg"
            />
          </div>

          {/* Scenery Selection */}
          <div>
            <label className="block text-sm font-medium mb-3">
              Select Scenery <span className="text-[#ef4444]">*</span>
            </label>
            <div className="grid grid-cols-1 gap-3">
              {sceneryOptions.map((scenery) => (
                <div
                  key={scenery.id}
                  onClick={() => setSelectedScenery(scenery.id)}
                  className={`p-4 rounded-lg cursor-pointer transition-all duration-200 border-2
                    ${selectedScenery === scenery.id
                      ? 'border-[#38bdf8] bg-[#38bdf8]/10'
                      : 'border-[#475569] hover:border-[#64748b] bg-[#1e293b]/50'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-[#f1f5f9]">{scenery.name}</p>
                      <p className="text-sm text-[#94a3b8] mt-1">{scenery.description}</p>
                    </div>
                    {selectedScenery === scenery.id && (
                      <div className="w-6 h-6 rounded-full bg-[#38bdf8] flex items-center justify-center">
                        <svg className="w-4 h-4 text-[#1e293b]" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                          <path d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Preview Box - Shows selected inputs before submission */}
        {carImage && (
          <div className="mt-6 pt-6 border-t border-[#475569]">
            <h3 className="text-lg font-semibold mb-4 text-[#f1f5f9]">
              📋 Review Your Selections
            </h3>
            
            <div className="bg-[#1e293b] rounded-lg p-4 space-y-4">
              {/* Car Image Preview */}
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 bg-[#334155] rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={carImage}
                    alt="Car preview"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#f1f5f9]">Car Image</p>
                  <p className="text-xs text-[#38bdf8]">✓ Uploaded</p>
                </div>
              </div>

              {/* Logo Image Preview */}
              {logoImage ? (
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-20 bg-[#334155] rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={logoImage}
                      alt="Logo preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#f1f5f9]">Logo Image</p>
                    <p className="text-xs text-[#38bdf8]">✓ Uploaded</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-[#334155] rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-8 h-8 text-[#64748b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#94a3b8]">Logo Image</p>
                    <p className="text-xs text-[#64748b]">Not provided</p>
                  </div>
                </div>
              )}

              {/* Selected Scenery */}
              {selectedScenery ? (
                <div className="flex items-center gap-4 pt-2 border-t border-[#334155]">
                  <div className="w-20 h-20 bg-[#38bdf8]/10 rounded-lg flex items-center justify-center flex-shrink-0 border-2 border-[#38bdf8]">
                    <svg className="w-8 h-8 text-[#38bdf8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#f1f5f9]">Selected Scenery</p>
                    <p className="text-xs text-[#38bdf8] font-medium">
                      {sceneryOptions.find(s => s.id === selectedScenery)?.name}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4 pt-2 border-t border-[#334155]">
                  <div className="w-20 h-20 bg-[#334155] rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-8 h-8 text-[#64748b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#94a3b8]">Selected Scenery</p>
                    <p className="text-xs text-[#ef4444]">⚠ Please select a scenery</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Submit Button - Only shows when car image is uploaded */}
        {carImage && (
          <div className="mt-6">
            <button
              onClick={handleSubmit}
              disabled={isProcessing}
              className={`w-full py-4 px-6 rounded-lg font-semibold text-lg
                transition-all duration-300 transform
                ${isProcessing 
                  ? 'bg-[#64748b] cursor-not-allowed opacity-50' 
                  : 'bg-[#38bdf8] hover:bg-[#0ea5e9] hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl'
                }
                text-[#1e293b]`}
            >
              {isProcessing ? (
                <span className="flex items-center justify-center gap-3">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                <span>🚀 Generate AI Car Ad</span>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Display Uploaded Images */}
      {(carImage || logoImage) && (
        <div className="mt-12 max-w-4xl w-full">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Your Uploads
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Car Image Display */}
            {carImage && (
              <div className="bg-[#334155] rounded-xl p-4 shadow-xl">
                <p className="text-sm font-medium mb-3 text-[#94a3b8]">
                  Car Image
                </p>
                <div className="relative w-full h-64 bg-[#1e293b] rounded-lg overflow-hidden">
                  <Image
                    src={carImage}
                    alt="Uploaded car"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            )}

            {/* Logo Image Display */}
            {logoImage && (
              <div className="bg-[#334155] rounded-xl p-4 shadow-xl">
                <p className="text-sm font-medium mb-3 text-[#94a3b8]">
                  Logo Image
                </p>
                <div className="relative w-full h-64 bg-[#1e293b] rounded-lg overflow-hidden">
                  <Image
                    src={logoImage}
                    alt="Uploaded logo"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Generated Image Results Section */}
      {generatedImage && (
        <div id="results-section" className="mt-16 max-w-6xl w-full">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">
              ✨ Your Professional Car Ad
            </h2>
            <p className="text-[#94a3b8] text-lg">
              AI-transformed with {sceneryOptions.find(s => s.id === selectedScenery)?.name} scenery
            </p>
          </div>

          {/* Generated Image Display */}
          <div className="bg-[#334155] rounded-2xl p-6 shadow-2xl">
            <div className="relative w-full aspect-video bg-[#1e293b] rounded-xl overflow-hidden">
          <Image
                src={generatedImage}
                alt="AI Generated Car Advertisement"
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex gap-4 justify-center flex-wrap">
              <a
                href={generatedImage}
                download="car-ad-professional.png"
                className="px-6 py-3 bg-[#38bdf8] hover:bg-[#0ea5e9] text-[#1e293b] 
                  font-semibold rounded-lg transition-all duration-300 
                  hover:scale-105 active:scale-95 shadow-lg"
              >
                📥 Download Image
              </a>
              
              <button
              onClick={() => {
                setGeneratedImage(null);
                setCarImage(null);
                setLogoImage(null);
                setSelectedScenery('');
              }}
                className="px-6 py-3 bg-[#334155] hover:bg-[#475569] text-[#f1f5f9] 
                  font-semibold rounded-lg transition-all duration-300 
                  hover:scale-105 active:scale-95 border-2 border-[#475569]"
              >
                🔄 Create Another
              </button>
            </div>
          </div>

          {/* Before/After Comparison */}
          {carImage && (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Before */}
              <div className="bg-[#334155] rounded-xl p-4">
                <p className="text-sm font-medium mb-3 text-[#94a3b8] text-center">
                  Before (Original)
                </p>
                <div className="relative w-full h-48 bg-[#1e293b] rounded-lg overflow-hidden">
          <Image
                    src={carImage}
                    alt="Original car"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* After */}
              <div className="bg-[#334155] rounded-xl p-4 border-2 border-[#38bdf8]">
                <p className="text-sm font-medium mb-3 text-[#38bdf8] text-center">
                  After (AI Enhanced)
                </p>
                <div className="relative w-full h-48 bg-[#1e293b] rounded-lg overflow-hidden">
          <Image
                    src={generatedImage}
                    alt="AI enhanced car"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
