'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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

  return (
    <div className="min-h-screen bg-[#1e293b] text-[#f1f5f9]">
      {/* Header */}
      <div className="bg-[#334155] border-b border-[#475569]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link 
                href="/"
                className="text-2xl font-bold text-[#38bdf8] hover:text-[#0ea5e9] transition-colors"
              >
                DeepWork AI
              </Link>
              <span className="text-[#94a3b8]">|</span>
              <h1 className="text-xl font-semibold">Dashboard</h1>
            </div>
            <Link
              href="/"
              className="px-4 py-2 bg-[#38bdf8] hover:bg-[#0ea5e9] text-[#1e293b] 
                font-semibold rounded-lg transition-colors"
            >
              + New Project
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#334155] rounded-xl p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#38bdf8]/10 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-[#38bdf8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#f1f5f9]">{projects.length}</p>
                <p className="text-sm text-[#94a3b8]">Total Projects</p>
              </div>
            </div>
          </div>

          <div className="bg-[#334155] rounded-xl p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#38bdf8]/10 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-[#38bdf8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#f1f5f9]">
                  {projects.filter(p => {
                    const projectDate = new Date(p.createdAt);
                    const today = new Date();
                    return projectDate.toDateString() === today.toDateString();
                  }).length}
                </p>
                <p className="text-sm text-[#94a3b8]">Today</p>
              </div>
            </div>
          </div>

          <div className="bg-[#334155] rounded-xl p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#38bdf8]/10 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-[#38bdf8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#f1f5f9]">
                  {new Set(projects.map(p => p.sceneryName)).size}
                </p>
                <p className="text-sm text-[#94a3b8]">Scenery Types</p>
              </div>
            </div>
          </div>
        </div>

        {projects.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-[#334155] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-[#64748b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-2">No Projects Yet</h3>
            <p className="text-[#94a3b8] mb-6">Create your first car advertisement to get started</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#38bdf8] hover:bg-[#0ea5e9] 
                text-[#1e293b] font-semibold rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Create First Project
            </Link>
          </div>
        ) : (
          /* Projects Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-[#334155] rounded-xl p-6 hover:bg-[#475569] transition-colors cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                {/* Project Thumbnail */}
                <div className="relative w-full h-48 bg-[#1e293b] rounded-lg overflow-hidden mb-4">
                  <Image
                    src={project.generatedImage}
                    alt={project.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-[#38bdf8] text-[#1e293b] text-xs px-2 py-1 rounded">
                    {project.sceneryName}
                  </div>
                </div>

                {/* Project Info */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-[#f1f5f9] truncate">{project.name}</h3>
                  <p className="text-sm text-[#94a3b8]">{formatDate(project.createdAt)}</p>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const link = document.createElement('a');
                        link.href = project.generatedImage;
                        link.download = `${project.name}-ad.png`;
                        link.click();
                      }}
                      className="flex-1 px-3 py-2 bg-[#38bdf8] hover:bg-[#0ea5e9] text-[#1e293b] 
                        text-sm font-medium rounded-lg transition-colors"
                    >
                      Download
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteProject(project.id);
                      }}
                      className="px-3 py-2 bg-[#ef4444] hover:bg-[#dc2626] text-white 
                        text-sm font-medium rounded-lg transition-colors"
                    >
                      Delete
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
