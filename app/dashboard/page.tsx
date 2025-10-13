'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

interface Project {
  id: string;
  name: string;
  scenery: string;
  sceneryName: string;
  generatedImage: string;
  originalImage: string;
  logoImage?: string;
  createdAt: string;
}

export default function Dashboard() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isPending && !session) {
      router.push('/login');
    }
  }, [session, isPending, router]);

  useEffect(() => {
    // Load projects from localStorage
    const savedProjects = JSON.parse(localStorage.getItem('carProjects') || '[]');
    setProjects(savedProjects);
  }, []);

  const deleteProject = (projectId: string) => {
    const updatedProjects = projects.filter(p => p.id !== projectId);
    setProjects(updatedProjects);
    localStorage.setItem('carProjects', JSON.stringify(updatedProjects));
    
    if (selectedProject?.id === projectId) {
      setSelectedProject(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
      {/* Premium Header */}
      <div className="bg-gradient-to-r from-[#0A0A0A] via-[#1F1F1F] to-[#0A0A0A] border-b border-[#DC2626]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-4">
              <Link 
                href="/"
                className="text-3xl font-bold deepwork-gradient hover:scale-105 transition-transform display-font"
              >
                DeepWork AI
              </Link>
              <span className="text-gray-600">|</span>
              <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
            </div>
            <Link
              href="/studio"
              className="btn-premium px-6 py-3 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
              </svg>
              New Project
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Premium Title */}
        <div className="text-center mb-12 reveal">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 display-font">
            Your <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-gray-400 text-lg">Track and manage your AI-generated car advertisements</p>
        </div>

        {/* Premium Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="glass-card premium-card rounded-2xl p-8 border border-[#DC2626]/20 float">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[#DC2626] to-[#B91C1C] rounded-xl flex items-center justify-center icon-glow">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white">
                  <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625Z" />
                  <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
                </svg>
              </div>
              <div>
                <p className="text-4xl font-black text-white mb-1">{projects.length}</p>
                <p className="text-sm text-gray-400 uppercase tracking-wider font-semibold">Total Projects</p>
              </div>
            </div>
          </div>

          <div className="glass-card premium-card rounded-2xl p-8 border border-[#DC2626]/20 float" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[#DC2626] to-[#B91C1C] rounded-xl flex items-center justify-center icon-glow">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white">
                  <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-4xl font-black text-white mb-1">
                  {projects.filter(p => {
                    const projectDate = new Date(p.createdAt);
                    const today = new Date();
                    return projectDate.toDateString() === today.toDateString();
                  }).length}
                </p>
                <p className="text-sm text-gray-400 uppercase tracking-wider font-semibold">Today</p>
              </div>
            </div>
          </div>

          <div className="glass-card premium-card rounded-2xl p-8 border border-[#DC2626]/20 float" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[#DC2626] to-[#B91C1C] rounded-xl flex items-center justify-center icon-glow">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white">
                  <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-4xl font-black text-white mb-1">
                  {new Set(projects.map(p => p.sceneryName)).size}
                </p>
                <p className="text-sm text-gray-400 uppercase tracking-wider font-semibold">Scenery Types</p>
              </div>
            </div>
          </div>
        </div>

        {projects.length === 0 ? (
          /* Premium Empty State */
          <div className="text-center py-20 reveal">
            <div className="glass-card premium-card rounded-3xl p-12 max-w-2xl mx-auto border border-[#DC2626]/20">
              <div className="w-32 h-32 bg-gradient-to-br from-[#DC2626] to-[#B91C1C] rounded-full flex items-center justify-center mx-auto mb-8 icon-glow">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16 text-white">
                  <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625Z" />
                  <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold mb-3 display-font">No Projects Yet</h3>
              <p className="text-gray-400 text-lg mb-8">Create your first car advertisement to get started</p>
              <Link
                href="/studio"
                className="btn-premium inline-flex items-center gap-3 px-8 py-4"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                </svg>
                Create First Project
              </Link>
            </div>
          </div>
        ) : (
          /* Premium Projects Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="glass-card premium-card rounded-2xl p-6 hover:scale-[1.02] transition-all cursor-pointer border border-[#DC2626]/20 reveal"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedProject(project)}
              >
                {/* Project Thumbnail */}
                <div className="relative w-full h-56 bg-[#0A0A0A] rounded-xl overflow-hidden mb-5 border border-gray-800">
                  <Image
                    src={project.generatedImage}
                    alt={project.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 right-3 badge-premium text-xs">
                    {project.sceneryName}
                  </div>
                </div>

                {/* Project Info */}
                <div className="space-y-3 relative z-10">
                  <h3 className="font-bold text-white text-lg truncate">{project.name}</h3>
                  <p className="text-sm text-gray-400">{formatDate(project.createdAt)}</p>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const link = document.createElement('a');
                        link.href = project.generatedImage;
                        link.download = `${project.name}-ad.png`;
                        link.click();
                      }}
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-[#DC2626] to-[#B91C1C] hover:shadow-lg hover:shadow-red-500/50 text-white 
                        text-sm font-bold rounded-lg transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75Zm-9 13.5a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                      </svg>
                      Download
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteProject(project.id);
                      }}
                      className="px-4 py-2.5 bg-[#1F1F1F] hover:bg-[#ef4444] text-white 
                        text-sm font-bold rounded-lg transition-all hover:-translate-y-0.5"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Project Detail Modal */}
        {selectedProject && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-[#334155] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                {/* Modal Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-[#f1f5f9]">{selectedProject.name}</h2>
                    <p className="text-[#94a3b8]">{formatDate(selectedProject.createdAt)}</p>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="w-8 h-8 bg-[#475569] hover:bg-[#64748b] rounded-lg flex items-center justify-center transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Before/After Comparison */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-[#94a3b8]">Before (Original)</h3>
                    <div className="relative w-full h-64 bg-[#1e293b] rounded-lg overflow-hidden">
                      <Image
                        src={selectedProject.originalImage}
                        alt="Original car"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-[#38bdf8]">After (AI Enhanced)</h3>
                    <div className="relative w-full h-64 bg-[#1e293b] rounded-lg overflow-hidden border-2 border-[#38bdf8]">
                      <Image
                        src={selectedProject.generatedImage}
                        alt="Generated car ad"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>

                {/* Project Details */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-[#1e293b] rounded-lg p-4">
                    <p className="text-sm text-[#94a3b8] mb-1">Scenery</p>
                    <p className="font-semibold text-[#f1f5f9]">{selectedProject.sceneryName}</p>
                  </div>
                  <div className="bg-[#1e293b] rounded-lg p-4">
                    <p className="text-sm text-[#94a3b8] mb-1">Created</p>
                    <p className="font-semibold text-[#f1f5f9]">{formatDate(selectedProject.createdAt)}</p>
                  </div>
                  <div className="bg-[#1e293b] rounded-lg p-4">
                    <p className="text-sm text-[#94a3b8] mb-1">Status</p>
                    <p className="font-semibold text-[#38bdf8]">Completed</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mt-6">
                  <a
                    href={selectedProject.generatedImage}
                    download={`${selectedProject.name}-ad.png`}
                    className="flex-1 px-6 py-3 bg-[#38bdf8] hover:bg-[#0ea5e9] text-[#1e293b] 
                      font-semibold rounded-lg transition-colors text-center"
                  >
                    📥 Download Image
                  </a>
                  <button
                    onClick={() => deleteProject(selectedProject.id)}
                    className="px-6 py-3 bg-[#ef4444] hover:bg-[#dc2626] text-white 
                      font-semibold rounded-lg transition-colors"
                  >
                    🗑️ Delete Project
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
