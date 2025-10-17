'use client';

// CRM Leads Management Page
// Allows car dealers to manage customer leads, track status, and set follow-ups

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import PlatformLayout from '@/components/PlatformLayout';

// Lead interface matching our Prisma schema
interface Lead {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  source: string;
  status: string;
  priority: string;
  notes: string | null;
  estimatedValue: number | null;
  tags: string[];
  createdAt: string;
  lastContactedAt: string | null;
  nextFollowUpAt: string | null;
}

export default function LeadsPage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  // State management
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isAddingLead, setIsAddingLead] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Form state for adding/editing leads
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    source: 'manual',
    priority: 'medium',
    notes: '',
    estimatedValue: ''
  });

  // Load leads from database
  useEffect(() => {
    if (session?.user) {
      loadLeads();
    }
  }, [session]);

  // Filter leads when filters or search query changes
  useEffect(() => {
    let filtered = [...leads];

    // Apply status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(lead => lead.status === filterStatus);
    }

    // Apply priority filter
    if (filterPriority !== 'all') {
      filtered = filtered.filter(lead => lead.priority === filterPriority);
    }

    // Apply search query (name, email, phone, company)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(lead =>
        lead.name.toLowerCase().includes(query) ||
        lead.email?.toLowerCase().includes(query) ||
        lead.phone?.includes(query) ||
        lead.company?.toLowerCase().includes(query)
      );
    }

    setFilteredLeads(filtered);
  }, [leads, filterStatus, filterPriority, searchQuery]);

  // Load all leads from the database
  const loadLeads = async () => {
    try {
      const response = await fetch('/api/leads');
      if (response.ok) {
        const data = await response.json();
        setLeads(data.leads || []);
      } else {
        console.error('Failed to load leads from database');
      }
    } catch (error) {
      console.error('Error loading leads:', error);
    }
  };

  // Handle form submission for adding a new lead
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.name.trim()) {
      alert('Please enter a name!');
      return;
    }

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Reset form and reload leads
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          source: 'manual',
          priority: 'medium',
          notes: '',
          estimatedValue: ''
        });
        setIsAddingLead(false);
        loadLeads();
      } else {
        alert('Failed to create lead');
      }
    } catch (error) {
      console.error('Error creating lead:', error);
      alert('Error creating lead');
    }
  };

  // Update lead status
  const updateLeadStatus = async (leadId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/leads/${leadId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        loadLeads();
      }
    } catch (error) {
      console.error('Error updating lead status:', error);
    }
  };

  // Delete a lead
  const deleteLead = async (leadId: string) => {
    if (!confirm('Are you sure you want to delete this lead?')) return;

    try {
      const response = await fetch(`/api/leads/${leadId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSelectedLead(null);
        loadLeads();
      }
    } catch (error) {
      console.error('Error deleting lead:', error);
    }
  };

  // Format date for display
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Format currency
  const formatCurrency = (value: number | null) => {
    if (!value) return '-';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(value);
  };

  // Get status badge color
  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      new: 'bg-blue-500/20 text-blue-400',
      contacted: 'bg-yellow-500/20 text-yellow-400',
      qualified: 'bg-purple-500/20 text-purple-400',
      negotiating: 'bg-orange-500/20 text-orange-400',
      won: 'bg-green-500/20 text-green-400',
      lost: 'bg-red-500/20 text-red-400'
    };
    return colors[status] || 'bg-gray-500/20 text-gray-400';
  };

  // Get priority badge color
  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      low: 'bg-gray-500/20 text-gray-400',
      medium: 'bg-blue-500/20 text-blue-400',
      high: 'bg-red-500/20 text-red-400'
    };
    return colors[priority] || 'bg-gray-500/20 text-gray-400';
  };

  return (
    <PlatformLayout 
      title="CRM Leads" 
      subtitle="Manage your customer relationships and sales pipeline"
    >
      <div className="max-w-7xl mx-auto">
        {/* Title and Quick Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-4">
          <div className="text-center sm:text-left flex-1">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4 display-font">
              Lead <span className="gradient-text">Management</span>
            </h2>
            <p className="text-gray-400 text-base sm:text-lg">Track and nurture your customer relationships</p>
          </div>
          <button
            onClick={() => setIsAddingLead(true)}
            className="btn-premium px-4 sm:px-6 py-3 flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
            </svg>
            Add Lead
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <div className="glass-card premium-card rounded-2xl p-6 border border-[#DC2626]/20">
            <p className="text-3xl font-black text-white mb-1">{leads.length}</p>
            <p className="text-sm text-gray-400">Total Leads</p>
          </div>
          <div className="glass-card premium-card rounded-2xl p-6 border border-blue-500/20">
            <p className="text-3xl font-black text-blue-400 mb-1">
              {leads.filter(l => l.status === 'new').length}
            </p>
            <p className="text-sm text-gray-400">New</p>
          </div>
          <div className="glass-card premium-card rounded-2xl p-6 border border-purple-500/20">
            <p className="text-3xl font-black text-purple-400 mb-1">
              {leads.filter(l => l.status === 'qualified').length}
            </p>
            <p className="text-sm text-gray-400">Qualified</p>
          </div>
          <div className="glass-card premium-card rounded-2xl p-6 border border-green-500/20">
            <p className="text-3xl font-black text-green-400 mb-1">
              {leads.filter(l => l.status === 'won').length}
            </p>
            <p className="text-sm text-gray-400">Won</p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="glass-card premium-card rounded-2xl p-6 border border-[#DC2626]/20 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <input
                type="text"
                placeholder="Search leads..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 bg-[#0A0A0A] border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#DC2626] transition-colors"
              />
            </div>
            
            {/* Status Filter */}
            <div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-3 bg-[#0A0A0A] border border-gray-800 rounded-lg text-white focus:outline-none focus:border-[#DC2626] transition-colors"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="qualified">Qualified</option>
                <option value="negotiating">Negotiating</option>
                <option value="won">Won</option>
                <option value="lost">Lost</option>
              </select>
            </div>
            
            {/* Priority Filter */}
            <div>
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="w-full px-4 py-3 bg-[#0A0A0A] border border-gray-800 rounded-lg text-white focus:outline-none focus:border-[#DC2626] transition-colors"
              >
                <option value="all">All Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
        </div>

        {/* Leads List */}
        {filteredLeads.length === 0 ? (
          <div className="text-center py-20">
            <div className="glass-card premium-card rounded-3xl p-12 max-w-2xl mx-auto border border-[#DC2626]/20">
              <div className="w-32 h-32 bg-gradient-to-br from-[#DC2626] to-[#B91C1C] rounded-full flex items-center justify-center mx-auto mb-8">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16 text-white">
                  <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold mb-3 display-font">
                {searchQuery || filterStatus !== 'all' || filterPriority !== 'all' 
                  ? 'No Leads Found' 
                  : 'No Leads Yet'}
              </h3>
              <p className="text-gray-400 text-lg mb-8">
                {searchQuery || filterStatus !== 'all' || filterPriority !== 'all'
                  ? 'Try adjusting your filters or search query'
                  : 'Start building your customer database'}
              </p>
              <button
                onClick={() => setIsAddingLead(true)}
                className="btn-premium inline-flex items-center gap-3 px-8 py-4"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                </svg>
                Add Your First Lead
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredLeads.map((lead, index) => (
              <div
                key={lead.id}
                className="glass-card premium-card rounded-2xl p-6 border border-[#DC2626]/20 hover:scale-[1.01] 
                  transition-all cursor-pointer reveal"
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => setSelectedLead(lead)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-white">{lead.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(lead.status)}`}>
                        {lead.status}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${getPriorityColor(lead.priority)}`}>
                        {lead.priority}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-400 mb-3">
                      {lead.email && (
                        <div className="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                            <path d="M3 4a2 2 0 0 0-2 2v1.161l8.441 4.221a1.25 1.25 0 0 0 1.118 0L19 7.162V6a2 2 0 0 0-2-2H3Z" />
                            <path d="m19 8.839-7.77 3.885a2.75 2.75 0 0 1-2.46 0L1 8.839V14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.839Z" />
                          </svg>
                          {lead.email}
                        </div>
                      )}
                      {lead.phone && (
                        <div className="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                            <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 0 1 3.5 2h1.148a1.5 1.5 0 0 1 1.465 1.175l.716 3.223a1.5 1.5 0 0 1-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 0 0 6.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 0 1 1.767-1.052l3.223.716A1.5 1.5 0 0 1 18 15.352V16.5a1.5 1.5 0 0 1-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 0 1 2.43 8.326 13.019 13.019 0 0 1 2 5V3.5Z" clipRule="evenodd" />
                          </svg>
                          {lead.phone}
                        </div>
                      )}
                      {lead.company && (
                        <div className="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                            <path fillRule="evenodd" d="M4 16.5v-13h-.25a.75.75 0 0 1 0-1.5h12.5a.75.75 0 0 1 0 1.5H16v13h.25a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1-.75-.75v-2.5a.75.75 0 0 0-.75-.75h-2.5a.75.75 0 0 0-.75.75v2.5a.75.75 0 0 1-.75.75h-3.5a.75.75 0 0 1 0-1.5H4Zm3-11a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM7.5 9a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1ZM11 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm.5 3.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Z" clipRule="evenodd" />
                          </svg>
                          {lead.company}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-6 text-xs text-gray-500">
                      <span>Created: {formatDate(lead.createdAt)}</span>
                      {lead.estimatedValue && (
                        <span>Value: {formatCurrency(lead.estimatedValue)}</span>
                      )}
                      <span>Source: {lead.source}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {lead.status !== 'won' && lead.status !== 'lost' && (
                      <select
                        value={lead.status}
                        onChange={(e) => {
                          e.stopPropagation();
                          updateLeadStatus(lead.id, e.target.value);
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="px-3 py-2 bg-[#0A0A0A] border border-gray-800 rounded-lg text-white text-sm focus:outline-none focus:border-[#DC2626] transition-colors"
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="qualified">Qualified</option>
                        <option value="negotiating">Negotiating</option>
                        <option value="won">Won</option>
                        <option value="lost">Lost</option>
                      </select>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Lead Modal */}
      {isAddingLead && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="glass-card premium-card rounded-2xl max-w-2xl w-full my-8 border border-[#DC2626]/20">
            <div className="p-8 max-h-[85vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-white display-font">Add New Lead</h2>
                <button
                  onClick={() => setIsAddingLead(false)}
                  className="w-10 h-10 bg-[#1F1F1F] hover:bg-[#2F2F2F] rounded-lg flex items-center justify-center transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name (Required) */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-[#0A0A0A] border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#DC2626] transition-colors"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email and Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-[#0A0A0A] border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#DC2626] transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 bg-[#0A0A0A] border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#DC2626] transition-colors"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                {/* Company */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Company</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-4 py-3 bg-[#0A0A0A] border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#DC2626] transition-colors"
                    placeholder="ABC Motors"
                  />
                </div>

                {/* Source, Priority, and Estimated Value */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Source</label>
                    <select
                      value={formData.source}
                      onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                      className="w-full px-4 py-3 bg-[#0A0A0A] border border-gray-800 rounded-lg text-white 
                        focus:outline-none focus:border-[#DC2626] transition-colors"
                    >
                      <option value="manual">Manual</option>
                      <option value="website">Website</option>
                      <option value="social">Social Media</option>
                      <option value="referral">Referral</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Priority</label>
                    <select
                      value={formData.priority}
                      onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                      className="w-full px-4 py-3 bg-[#0A0A0A] border border-gray-800 rounded-lg text-white 
                        focus:outline-none focus:border-[#DC2626] transition-colors"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Est. Value</label>
                    <input
                      type="number"
                      min="0"
                      step="100"
                      value={formData.estimatedValue}
                      onChange={(e) => setFormData({ ...formData, estimatedValue: e.target.value })}
                className="w-full px-4 py-3 bg-[#0A0A0A] border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#DC2626] transition-colors"
                      placeholder="50000"
                    />
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Notes</label>
                  <textarea
                    rows={4}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-4 py-3 bg-[#0A0A0A] border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#DC2626] transition-colors resize-none"
                    placeholder="Add any relevant notes about this lead..."
                  />
                </div>

                {/* Submit Button */}
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setIsAddingLead(false)}
                    className="flex-1 px-6 py-3 bg-[#1F1F1F] hover:bg-[#2F2F2F] text-white font-bold rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 btn-premium px-6 py-3"
                  >
                    Add Lead
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Lead Detail Modal */}
      {selectedLead && !isAddingLead && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="glass-card premium-card rounded-2xl max-w-3xl w-full my-8 border border-[#DC2626]/20">
            <div className="p-8 max-h-[85vh] overflow-y-auto">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-white display-font mb-2">{selectedLead.name}</h2>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(selectedLead.status)}`}>
                      {selectedLead.status}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getPriorityColor(selectedLead.priority)}`}>
                      {selectedLead.priority}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="w-10 h-10 bg-[#1F1F1F] hover:bg-[#2F2F2F] rounded-lg flex items-center justify-center transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedLead.email && (
                    <div className="glass-card p-4 rounded-lg border border-gray-800">
                      <p className="text-sm text-gray-400 mb-1">Email</p>
                      <p className="text-white">{selectedLead.email}</p>
                    </div>
                  )}
                  {selectedLead.phone && (
                    <div className="glass-card p-4 rounded-lg border border-gray-800">
                      <p className="text-sm text-gray-400 mb-1">Phone</p>
                      <p className="text-white">{selectedLead.phone}</p>
                    </div>
                  )}
                  {selectedLead.company && (
                    <div className="glass-card p-4 rounded-lg border border-gray-800">
                      <p className="text-sm text-gray-400 mb-1">Company</p>
                      <p className="text-white">{selectedLead.company}</p>
                    </div>
                  )}
                  <div className="glass-card p-4 rounded-lg border border-gray-800">
                    <p className="text-sm text-gray-400 mb-1">Source</p>
                    <p className="text-white capitalize">{selectedLead.source}</p>
                  </div>
                </div>

                {/* Timeline */}
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-white">Timeline</h3>
                  <div className="glass-card p-4 rounded-lg border border-gray-800 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Created</span>
                      <span className="text-white">{formatDate(selectedLead.createdAt)}</span>
                    </div>
                    {selectedLead.lastContactedAt && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Last Contacted</span>
                        <span className="text-white">{formatDate(selectedLead.lastContactedAt)}</span>
                      </div>
                    )}
                    {selectedLead.nextFollowUpAt && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Next Follow-up</span>
                        <span className="text-white">{formatDate(selectedLead.nextFollowUpAt)}</span>
                      </div>
                    )}
                    {selectedLead.estimatedValue && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Estimated Value</span>
                        <span className="text-white">{formatCurrency(selectedLead.estimatedValue)}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Notes */}
                {selectedLead.notes && (
                  <div>
                    <h3 className="text-lg font-bold text-white mb-3">Notes</h3>
                    <div className="glass-card p-4 rounded-lg border border-gray-800">
                      <p className="text-gray-300 whitespace-pre-wrap">{selectedLead.notes}</p>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => deleteLead(selectedLead.id)}
                    className="flex-1 px-6 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 font-bold rounded-lg transition-colors"
                  >
                    Delete Lead
                  </button>
                  <button
                    onClick={() => setSelectedLead(null)}
                    className="flex-1 btn-premium px-6 py-3"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </PlatformLayout>
  );
}

