'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import PlatformLayout from '@/components/PlatformLayout';

export default function Studio() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  // Authentication is now handled by PlatformLayout
  // State to store uploaded images and selections
  const [projectName, setProjectName] = useState<string>('');
  const [carImage, setCarImage] = useState<string | null>(null);
  const [logoImage, setLogoImage] = useState<string | null>(null);
  const [selectedScenery, setSelectedScenery] = useState<string>('');
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  // Available scenery options
  const sceneryOptions = [
    { id: 'clean-studio', name: 'Clean Studio', description: 'Minimalist high-end studio setting - Best for Website Listings', isPopular: true },
    { id: 'luxury-showroom', name: 'Luxury Showroom', description: 'Modern dealership with elegant lighting' },
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
      reader.onload = (event) => {
        setCarImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle logo image upload
  const handleLogoImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setLogoImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!projectName.trim()) {
      alert('Please enter a project name!');
      return;
    }
    if (!carImage) {
      alert('Please upload a car image!');
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
        projectName: projectName.trim(),
        carImage: carImage,
        logoImage: logoImage,
        scenery: selectedScenery,
        customPrompt: customPrompt.trim(),
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
        
        // Save project to database for dashboard and future features
        try {
          const saveResponse = await fetch('/api/projects', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include', // Ensure cookies are sent with the request
            body: JSON.stringify({
              title: projectName.trim(),
              carImageUrl: carImage,
              logoImageUrl: logoImage,
              scenery: selectedScenery,
              customPrompt: customPrompt.trim() || null,
              generatedImageUrl: result.data.generatedImage,
              status: 'completed'
            }),
          });

          if (!saveResponse.ok) {
            const errorData = await saveResponse.json().catch(() => ({}));
            console.error('Failed to save project to database:', saveResponse.status, errorData);
            alert('Warning: Project generated but not saved to your account. Please ensure you are logged in.');
          } else {
            console.log('Project saved to database successfully');
          }
        } catch (saveError) {
          console.error('Error saving project to database:', saveError);
          // Don't block the UI if database save fails
        }

        // Scroll to results section
        setTimeout(() => {
          const resultsSection = document.getElementById('results');
          if (resultsSection) {
            resultsSection.scrollIntoView({ behavior: 'smooth' });
          }
        }, 500);
      } else {
        throw new Error(result.error || 'Failed to generate image');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to generate image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Show loading state while checking authentication
  if (isPending) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#1F1F1F] to-[#0A0A0A] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#DC2626] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated (will redirect)
  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen">
      {/* Navigation Header with Premium Styling */}
      <div className="bg-gradient-to-r from-[#0A0A0A] via-[#1F1F1F] to-[#0A0A0A] border-b border-[#DC2626]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link 
              href="/"
              className="text-3xl font-bold deepwork-gradient hover:scale-105 transition-transform display-font"
            >
              DeepWork AI
            </Link>
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="px-6 py-3 bg-gradient-to-r from-[#DC2626] to-[#B91C1C] text-white 
                  font-semibold rounded-full transition-all hover:shadow-lg hover:shadow-red-500/50 
                  hover:-translate-y-0.5 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span>Dashboard</span>
              </Link>
              <Link
                href="/"
                className="px-6 py-3 bg-[#1F1F1F] hover:bg-[#2a2a2a] text-white 
                  font-semibold rounded-full transition-all hover:shadow-lg 
                  hover:-translate-y-0.5 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>Home</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Studio Form */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="glass-card premium-card rounded-3xl p-6 md:p-8 border border-[#DC2626]/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Project Name Input */}
            <div>
              <label 
                htmlFor="project-name" 
                className="block text-sm font-semibold mb-3 text-gray-300 uppercase tracking-wider"
              >
                Project Name <span className="text-[#DC2626]">*</span>
              </label>
              <input
                type="text"
                id="project-name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="e.g., BMW E30 Showcase, Tesla Model 3 Ad..."
                className="w-full px-5 py-4 rounded-xl bg-[#0A0A0A]/50 border-2 border-gray-700 
                  text-white placeholder-gray-500 focus:border-[#DC2626] 
                  focus:outline-none transition-all focus:shadow-lg focus:shadow-red-500/20"
                required
              />
            </div>

            {/* Image Upload Section - Compact with Previews */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Car Image Upload */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300 uppercase tracking-wider">
                  Car Image <span className="text-[#DC2626]">*</span>
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCarImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    required
                  />
                  {carImage ? (
                    <div className="relative border-2 border-[#DC2626] rounded-xl overflow-hidden group">
                      <img 
                        src={carImage} 
                        alt="Car preview" 
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <p className="text-white font-semibold">Click to change</p>
                      </div>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-700 rounded-xl p-6 text-center 
                      hover:border-[#DC2626] transition-all cursor-pointer bg-[#0A0A0A]/30 hover:bg-[#1F1F1F]/50 h-48 flex flex-col items-center justify-center">
                      <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-[#DC2626] to-[#B91C1C] 
                        rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-white font-semibold text-sm mb-1">Upload Car Image</p>
                      <p className="text-xs text-gray-400">Click or drag & drop</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Logo Image Upload */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300 uppercase tracking-wider">
                  Logo <span className="text-gray-500 text-xs normal-case">(Optional)</span>
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  {logoImage ? (
                    <div className="relative border-2 border-[#38bdf8] rounded-xl overflow-hidden group">
                      <img 
                        src={logoImage} 
                        alt="Logo preview" 
                        className="w-full h-48 object-contain bg-[#1F1F1F] p-4"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <p className="text-white font-semibold">Click to change</p>
                      </div>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-700 rounded-xl p-6 text-center 
                      hover:border-[#38bdf8] transition-all cursor-pointer bg-[#0A0A0A]/30 hover:bg-[#1F1F1F]/50 h-48 flex flex-col items-center justify-center">
                      <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-[#38bdf8] to-[#0ea5e9] 
                      rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                        </svg>
                      </div>
                      <p className="text-white font-semibold text-sm mb-1">Upload Logo</p>
                      <p className="text-xs text-gray-400">Click or drag & drop</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Scenery Selection - Compact Grid */}
            <div>
              <label className="block text-sm font-semibold mb-3 text-gray-300 uppercase tracking-wider">
                Select Scenery <span className="text-[#DC2626]">*</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {sceneryOptions.map((scenery, index) => (
                  <div
                    key={scenery.id}
                    onClick={() => setSelectedScenery(scenery.id)}
                    className={`p-4 rounded-lg cursor-pointer transition-all duration-300 border-2 relative
                      ${selectedScenery === scenery.id
                        ? 'border-[#DC2626] bg-gradient-to-r from-[#DC2626]/10 to-[#B91C1C]/10 shadow-lg shadow-red-500/20'
                        : scenery.isPopular
                          ? 'border-[#38bdf8] bg-gradient-to-r from-[#38bdf8]/10 to-[#38bdf8]/5 hover:border-[#38bdf8] animate-pulse'
                          : 'border-gray-700 hover:border-gray-600 bg-[#0A0A0A]/30 hover:bg-[#1F1F1F]/50'
                      }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Popular Badge */}
                    {scenery.isPopular && (
                      <div className="absolute top-3 right-3 z-20">
                        <div className="bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg shadow-blue-500/50">
                          Most Popular
                        </div>
                      </div>
                    )}
                    
                    <div className="relative z-10">
                      <p className={`font-bold text-sm mb-1 ${scenery.isPopular ? 'text-[#38bdf8]' : 'text-white'}`}>
                        {scenery.name}
                      </p>
                      <p className={`text-xs ${scenery.isPopular ? 'text-[#38bdf8]/80' : 'text-gray-400'}`}>
                        {scenery.description}
                      </p>
                      {selectedScenery === scenery.id && (
                        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-gradient-to-r from-[#DC2626] to-[#B91C1C] flex items-center justify-center shadow-lg">
                          <svg className="w-4 h-4 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Prompt Field */}
            <div>
              <label 
                htmlFor="custom-prompt" 
                className="block text-sm font-semibold mb-2 text-gray-300 uppercase tracking-wider"
              >
                Custom Instructions <span className="text-gray-500 text-xs normal-case">(Optional)</span>
              </label>
              <textarea
                id="custom-prompt"
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="e.g., Make sure the logo says 'DeepWork', add specific lighting effects..."
                className="w-full px-4 py-3 rounded-lg bg-[#0A0A0A]/50 border-2 border-gray-700 
                  text-white text-sm placeholder-gray-500 focus:border-[#DC2626] 
                  focus:outline-none transition-all focus:shadow-lg focus:shadow-red-500/20
                  resize-none h-20"
                maxLength={500}
              />
            </div>
          </form>

          {/* Preview Box - Shows selected inputs before submission */}
          {projectName.trim() && carImage && (
            <div className="mt-6 pt-6 border-t border-[#475569]">
            <h3 className="text-lg font-semibold mb-4 text-[#f1f5f9]">
              Review Your Selections
            </h3>
              <div className="space-y-4">
                {/* Project Name Preview */}
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-[#38bdf8]/10 rounded-lg flex items-center justify-center flex-shrink-0 border-2 border-[#38bdf8]">
                    <svg className="w-8 h-8 text-[#38bdf8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#f1f5f9]">Project Name</p>
                    <p className="text-xs text-[#38bdf8]">{projectName.trim()}</p>
                  </div>
                </div>

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
                    <div className="w-20 h-20 bg-[#64748b]/20 rounded-lg flex items-center justify-center flex-shrink-0 border-2 border-[#64748b]">
                      <svg className="w-8 h-8 text-[#64748b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#94a3b8]">Logo Image</p>
                      <p className="text-xs text-[#ef4444]">⚠ No logo uploaded</p>
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
                    <div className="w-20 h-20 bg-[#64748b]/20 rounded-lg flex items-center justify-center flex-shrink-0 border-2 border-[#64748b]">
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

                {/* Custom Prompt Preview */}
                {customPrompt.trim() && (
                  <div className="flex items-start gap-4 pt-2 border-t border-[#334155]">
                    <div className="w-20 h-20 bg-[#F59E0B]/10 rounded-lg flex items-center justify-center flex-shrink-0 border-2 border-[#F59E0B]">
                      <svg className="w-8 h-8 text-[#F59E0B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[#f1f5f9]">Custom Instructions</p>
                      <p className="text-xs text-[#F59E0B] font-medium leading-relaxed">
                        {customPrompt.trim()}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Smart Submit Button - Always visible with helpful states */}
          <div className="mt-8 relative z-10">
            <button
              onClick={handleSubmit}
              disabled={isProcessing || !projectName.trim() || !carImage || !selectedScenery}
              className={`w-full py-5 text-lg font-bold rounded-full transition-all duration-300 flex items-center justify-center gap-3
                ${isProcessing 
                  ? 'bg-gray-600 cursor-not-allowed opacity-60' 
                  : projectName.trim() && carImage && selectedScenery
                    ? 'btn-premium hover:scale-105' 
                    : 'bg-gray-700 hover:bg-gray-600 cursor-not-allowed border-2 border-gray-600'
                }`}
            >
              {isProcessing ? (
                <>
                  <div className="spinner"></div>
                  <span>Generating Your Masterpiece...</span>
                </>
              ) : projectName.trim() && carImage && selectedScenery ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 0 1 .75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 0 1 9.75 22.5a.75.75 0 0 1-.75-.75v-4.131A15.838 15.838 0 0 1 6.382 15H2.25a.75.75 0 0 1-.75-.75 6.75 6.75 0 0 1 7.815-6.666ZM15 6.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" clipRule="evenodd" />
                    <path d="M5.26 17.242a.75.75 0 1 0-.897-1.203 5.243 5.243 0 0 0-2.05 5.022.75.75 0 0 0 .625.627 5.243 5.243 0 0 0 5.022-2.051.75.75 0 1 0-1.202-.897 3.744 3.744 0 0 1-3.008 1.51c0-1.23.592-2.323 1.51-3.008Z" />
                  </svg>
                  <span>Generate AI Car Ad</span>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
                  </svg>
                  <span>
                    {!projectName.trim() 
                      ? 'Enter Project Name to Continue' 
                      : !carImage 
                        ? 'Upload Car Image to Continue'
                        : !selectedScenery
                          ? 'Select Scenery to Continue'
                          : 'Complete All Fields to Generate'
                    }
                  </span>
                </>
              )}
            </button>
            
            {/* Helpful hint text */}
            {!projectName.trim() || !carImage || !selectedScenery ? (
              <p className="text-center text-sm text-gray-400 mt-3">
                {!projectName.trim() 
                  ? 'Give your project a memorable name'
                  : !carImage 
                    ? 'Upload a car image to get started'
                    : !selectedScenery
                      ? 'Choose a scenery to set the mood'
                      : 'Almost ready! Complete the remaining fields above'
                }
              </p>
            ) : null}
          </div>
        </div>
      </div>

      {/* Display Uploaded Images with Premium Styling */}
      {(carImage || logoImage) && (
        <div className="mt-16 max-w-5xl mx-auto w-full reveal">
          <div className="glass-card premium-card rounded-3xl p-8 border border-[#DC2626]/20">
            <h2 className="text-3xl font-bold text-center mb-8 deepwork-gradient display-font">
              Your Uploads
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {carImage && (
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-4 text-white">Car Image</h3>
                  <div className="relative w-full h-64 bg-[#1F1F1F] rounded-2xl overflow-hidden border-2 border-[#DC2626]/30">
                    <Image
                      src={carImage}
                      alt="Uploaded car"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              )}
              {logoImage && (
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-4 text-white">Logo Image</h3>
                  <div className="relative w-full h-64 bg-[#1F1F1F] rounded-2xl overflow-hidden border-2 border-[#38bdf8]/30">
                    <Image
                      src={logoImage}
                      alt="Uploaded logo"
                      fill
                      className="object-contain p-4"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Generated Results Section */}
      {generatedImage && (
        <div id="results" className="mt-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 reveal">
          <div className="glass-card premium-card rounded-3xl p-8 border border-[#DC2626]/20">
            <h2 className="text-3xl font-bold text-center mb-8 deepwork-gradient display-font">
              Your AI-Generated Car Ad
            </h2>
            
            <div className="text-center mb-8">
              <p className="text-lg text-gray-300">
                AI-transformed with <span className="text-[#DC2626] font-semibold">{sceneryOptions.find(s => s.id === selectedScenery)?.name}</span> scenery
              </p>
            </div>

            {/* Generated Image Display */}
            <div className="relative w-full max-w-4xl mx-auto mb-8">
              <div className="relative w-full h-96 bg-[#1F1F1F] rounded-2xl overflow-hidden border-2 border-[#DC2626]/30 shadow-2xl">
                <Image
                  src={generatedImage}
                  alt="Generated car advertisement"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Before/After Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-4 text-white">Before (Original)</h3>
                <div className="relative w-full h-64 bg-[#1F1F1F] rounded-2xl overflow-hidden border-2 border-gray-600">
                  <Image
                    src={carImage!}
                    alt="Original car"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-4 text-white">After (AI Enhanced)</h3>
                <div className="relative w-full h-64 bg-[#1F1F1F] rounded-2xl overflow-hidden border-2 border-[#DC2626]/30">
                  <Image
                    src={generatedImage}
                    alt="AI enhanced car"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href={generatedImage}
                download={`${projectName.trim()}-ai-car-ad.jpg`}
                className="px-8 py-4 bg-gradient-to-r from-[#DC2626] to-[#B91C1C] text-white 
                  font-bold rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-red-500/50 
                  hover:scale-105 active:scale-95 flex items-center gap-3"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Image
              </a>
              
              <button
                onClick={() => {
                  setGeneratedImage(null);
                  setProjectName('');
                  setCarImage(null);
                  setLogoImage(null);
                  setSelectedScenery('');
                  setCustomPrompt('');
                }}
                className="px-8 py-4 bg-[#1F1F1F] hover:bg-[#2a2a2a] text-white 
                  font-bold rounded-full transition-all duration-300 
                  hover:scale-105 active:scale-95 border-2 border-gray-700 hover:border-gray-600
                  flex items-center gap-3 uppercase tracking-wider text-sm"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Create Another
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
