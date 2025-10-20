'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import PlatformLayout from '@/components/PlatformLayout';
import VehicleForm from '@/components/VehicleForm';

interface Project {
  id: string;
  title: string;
  scenery: string;
  generatedImageUrl: string | null;
  carImageUrl: string;
  logoImageUrl?: string | null;
  createdAt: string;
}

export default function ProjectsPage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [jobStatuses, setJobStatuses] = useState<Record<string, string>>({});
  
  // Vehicle form state
  const [showVehicleForm, setShowVehicleForm] = useState<boolean>(false);
  const [vehicleData, setVehicleData] = useState<any>(null);
  const [isSavingVehicle, setIsSavingVehicle] = useState<boolean>(false);

  // Load projects from database
  useEffect(() => {
    if (session?.user) {
      loadProjects();
    }
  }, [session]);

  const loadProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      if (response.ok) {
        const data = await response.json();
        setProjects(data.projects || []);
        // fetch job status per project (best-effort)
        (data.projects || []).forEach(async (p: Project) => {
          try {
            const jr = await fetch(`/api/jobs?projectId=${p.id}`);
            if (jr.ok) {
              const j = await jr.json();
              const latest = (j.jobs || [])[0];
              setJobStatuses(prev => ({ ...prev, [p.id]: latest?.status || 'idle' }));
            }
          } catch {}
        });
      } else {
        console.error('Failed to load projects from database');
      }
    } catch (error) {
      console.error('Error loading projects:', error);
    }
  };

  const deleteProject = async (projectId: string) => {
    // Remove from local state immediately for better UX
    const updatedProjects = projects.filter(p => p.id !== projectId);
    setProjects(updatedProjects);
    
    if (selectedProject?.id === projectId) {
      setSelectedProject(null);
    }

    // Delete from database
    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        console.error('Failed to delete project from database');
        // Reload projects to sync state
        loadProjects();
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      // Reload projects to sync state
      loadProjects();
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

  // Handle vehicle data save
  const handleVehicleSave = async (vehicleFormData: any) => {
    setIsSavingVehicle(true);
    try {
      const response = await fetch('/api/vehicles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(vehicleFormData),
      });

      if (!response.ok) {
        throw new Error('Failed to save vehicle data');
      }

      const result = await response.json();
      setVehicleData(result.vehicle);
      setShowVehicleForm(false);
      console.log('Vehicle data saved:', result.vehicle);
    } catch (error) {
      console.error('Error saving vehicle data:', error);
      alert('Failed to save vehicle data. Please try again.');
    } finally {
      setIsSavingVehicle(false);
    }
  };

  return (
    <PlatformLayout 
      title="Staging Projects" 
      subtitle="Your AI-generated car advertisements"
    >
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-8 reveal">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 display-font">
            Your <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-gray-400 text-lg">Track and manage your AI-generated car advertisements</p>
        </div>

        {/* Stats Cards */}
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
                  {new Set(projects.map(p => p.scenery)).size}
                </p>
                <p className="text-sm text-gray-400 uppercase tracking-wider font-semibold">Scenery Types</p>
              </div>
            </div>
          </div>
        </div>

        {projects.length === 0 ? (
          /* Empty State */
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
              <a
                href="/studio"
                className="btn-premium inline-flex items-center gap-3 px-8 py-4"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                </svg>
                Create First Project
              </a>
            </div>
          </div>
        ) : (
          /* Projects Grid */
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
                  {project.generatedImageUrl && (
                    <Image
                      src={project.generatedImageUrl}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  )}
                  <div className="absolute top-3 right-3 badge-premium text-xs capitalize">
                    {project.scenery.replace('-', ' ')}
                  </div>
                </div>

                {/* Project Info */}
                <div className="space-y-3 relative z-10">
                  <h3 className="font-bold text-white text-lg truncate">{project.title}</h3>
                  <p className="text-sm text-gray-400">{formatDate(project.createdAt)}</p>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-3">
                    <button
                      onClick={async (e) => {
                        e.stopPropagation();
                        try {
                          const r = await fetch('/api/publish', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ projectId: project.id, website: true, social: false })
                          });
                          if (r.ok) {
                            setJobStatuses(prev => ({ ...prev, [project.id]: 'queued' }));
                          } else {
                            console.error('Publish enqueue failed');
                          }
                        } catch (err) { console.error(err); }
                      }}
                      className="px-4 py-2.5 bg-[#1F1F1F] hover:bg-[#2F2F2F] text-white text-sm font-bold rounded-lg transition-all hover:-translate-y-0.5"
                    >
                      Publish now
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (project.generatedImageUrl) {
                          const link = document.createElement('a');
                          link.href = project.generatedImageUrl;
                          link.download = `${project.title}-ad.png`;
                          link.click();
                        }
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
                  <div className="pt-2 text-xs text-gray-400">Status: {jobStatuses[project.id] || 'idle'}</div>
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
                    <h2 className="text-2xl font-bold text-[#f1f5f9]">{selectedProject.title}</h2>
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
                        src={selectedProject.carImageUrl}
                        alt="Original car"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-[#38bdf8]">After (AI Enhanced)</h3>
                    <div className="relative w-full h-64 bg-[#1e293b] rounded-lg overflow-hidden border-2 border-[#38bdf8]">
                      {selectedProject.generatedImageUrl && (
                        <Image
                          src={selectedProject.generatedImageUrl}
                          alt="Generated car ad"
                          fill
                          className="object-contain"
                        />
                      )}
                    </div>
                  </div>
                </div>

                {/* Vehicle Details Section */}
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-[#f1f5f9]">Vehicle Details</h3>
                    <button
                      onClick={() => setShowVehicleForm(true)}
                      className="px-4 py-2 bg-[#38bdf8] text-[#1e293b] rounded-lg hover:bg-[#0ea5e9] transition-colors text-sm font-semibold"
                    >
                      {vehicleData ? 'Edit Details' : 'Add Details'}
                    </button>
                  </div>
                  
                  {vehicleData ? (
                    <div className="bg-[#1e293b] rounded-lg p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-[#94a3b8] mb-1">Vehicle</p>
                          <p className="font-semibold text-[#f1f5f9]">
                            {vehicleData.year} {vehicleData.make} {vehicleData.model}
                            {vehicleData.trim && ` ${vehicleData.trim}`}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-[#94a3b8] mb-1">Price</p>
                          <p className="font-semibold text-[#38bdf8]">
                            {vehicleData.price ? `$${vehicleData.price.toLocaleString()}` : 'Not set'}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-[#94a3b8] mb-1">Stock Number</p>
                          <p className="font-semibold text-[#f1f5f9]">
                            {vehicleData.stockNumber || 'Not set'}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-[#94a3b8] mb-1">Mileage</p>
                          <p className="font-semibold text-[#f1f5f9]">
                            {vehicleData.mileage ? `${vehicleData.mileage.toLocaleString()} mi` : 'Not set'}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-[#1e293b] rounded-lg p-4 text-center">
                      <p className="text-[#94a3b8] text-sm mb-2">No vehicle details added</p>
                      <p className="text-[#64748b] text-xs">Add details for better publishing results</p>
                    </div>
                  )}
                </div>

                {/* Project Details */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-[#1e293b] rounded-lg p-4">
                    <p className="text-sm text-[#94a3b8] mb-1">Scenery</p>
                    <p className="font-semibold text-[#f1f5f9] capitalize">{selectedProject.scenery.replace('-', ' ')}</p>
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
                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                  {selectedProject.generatedImageUrl && (
                    <a
                      href={selectedProject.generatedImageUrl}
                      download={`${selectedProject.title}-ad.png`}
                      className="flex-1 px-6 py-3 bg-[#38bdf8] hover:bg-[#0ea5e9] text-[#1e293b] 
                        font-semibold rounded-lg transition-colors text-center"
                    >
                      📥 Download Image
                    </a>
                  )}
                  <button
                    onClick={async () => {
                      try {
                        const response = await fetch('/api/publish', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            projectId: selectedProject.id,
                            website: true,
                            social: false,
                            socialPlatforms: [],
                          })
                        });
                        if (response.ok) {
                          alert('Publishing job queued! Check status in a few moments.');
                          // Refresh job status
                          const jr = await fetch(`/api/jobs?projectId=${selectedProject.id}`);
                          if (jr.ok) {
                            const j = await jr.json();
                            const latest = (j.jobs || [])[0];
                            setJobStatuses(prev => ({ ...prev, [selectedProject.id]: latest?.status || 'queued' }));
                          }
                        } else {
                          alert('Failed to queue publishing job. Please try again.');
                        }
                      } catch (error) {
                        console.error('Publish error:', error);
                        alert('Failed to queue publishing job. Please try again.');
                      }
                    }}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-[#10b981] to-[#059669] hover:from-[#059669] hover:to-[#047857] text-white 
                      font-semibold rounded-lg transition-colors text-center"
                  >
                    🚀 Publish Now
                  </button>
                  <button
                    onClick={() => deleteProject(selectedProject.id)}
                    className="px-6 py-3 bg-[#ef4444] hover:bg-[#dc2626] text-white 
                      font-semibold rounded-lg transition-colors"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Vehicle Form Modal */}
        {showVehicleForm && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-[#0A0A0A] border border-[#DC2626]/20 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Vehicle Details</h2>
                  <button
                    onClick={() => setShowVehicleForm(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <VehicleForm
                  initialData={vehicleData}
                  onSave={handleVehicleSave}
                  onCancel={() => setShowVehicleForm(false)}
                  isLoading={isSavingVehicle}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </PlatformLayout>
  );
}
