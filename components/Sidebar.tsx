'use client';

// Sidebar Navigation Component
// Provides navigation for all platform features with collapsible sections

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<string[]>(['crm', 'projects']);

  // Navigation structure
  const navigation = {
    crm: {
      title: 'CRM & Sales',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z" />
        </svg>
      ),
      items: [
        { name: 'Leads', href: '/leads', badge: null },
        { name: 'AI Sales Rep', href: '/ai-sales', badge: 'Soon', disabled: true },
        { name: 'Conversations', href: '/conversations', badge: 'Soon', disabled: true },
      ]
    },
    projects: {
      title: 'Content & Media',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625Z" />
        </svg>
      ),
      items: [
        { name: 'Staging Projects', href: '/projects', badge: null },
        { name: 'AI Studio', href: '/studio', badge: null },
        { name: 'Social Media', href: '/social', badge: 'Soon', disabled: true },
        { name: 'Auto-Posting', href: '/auto-posting', badge: 'Soon', disabled: true },
      ]
    },
    analytics: {
      title: 'Analytics & Insights',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path fillRule="evenodd" d="M3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm4.5 7.5a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0v-2.25a.75.75 0 0 1 .75-.75Zm3.75-1.5a.75.75 0 0 0-1.5 0v4.5a.75.75 0 0 0 1.5 0V12Zm2.25-3a.75.75 0 0 1 .75.75v6.75a.75.75 0 0 1-1.5 0V9.75A.75.75 0 0 1 13.5 9Zm3.75-1.5a.75.75 0 0 0-1.5 0v9a.75.75 0 0 0 1.5 0v-9Z" clipRule="evenodd" />
        </svg>
      ),
      items: [
        { name: 'Dashboard', href: '/analytics', badge: 'Soon', disabled: true },
        { name: 'Reports', href: '/reports', badge: 'Soon', disabled: true },
        { name: 'ROI Tracking', href: '/roi', badge: 'Soon', disabled: true },
      ]
    },
    settings: {
      title: 'Settings',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 0 0-2.282.819l-.922 1.597a1.875 1.875 0 0 0 .432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 0 0 0 1.139c.015.2-.059.352-.153.43l-.841.692c-.708.582-.891 1.59-.432 2.385l.922 1.597a1.875 1.875 0 0 0 2.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.570.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 0 0 2.28-.819l.923-1.597a1.875 1.875 0 0 0-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 0 0 0-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.892-1.59.432-2.385l-.922-1.597a1.875 1.875 0 0 0-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 0 0-.985-.57c-.183-.087-.277-.227-.297-.348L13.928 3.817c-.151-.904-.933-1.567-1.85-1.567h-1.844ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z" clipRule="evenodd" />
        </svg>
      ),
      items: [
        { name: 'Integrations', href: '/integrations', badge: 'Soon', disabled: true },
        { name: 'Account', href: '/account', badge: 'Soon', disabled: true },
        { name: 'Billing', href: '/billing', badge: 'Soon', disabled: true },
      ]
    }
  };

  const toggleSection = (sectionKey: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionKey) 
        ? prev.filter(key => key !== sectionKey)
        : [...prev, sectionKey]
    );
  };

  const isActive = (href: string) => pathname === href;

  return (
    <div className={`bg-[#0A0A0A] border-r border-[#DC2626]/20 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Logo */}
      <div className="p-4 border-b border-[#DC2626]/20">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-[#DC2626] to-[#B91C1C] rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm">D</span>
          </div>
          {!isCollapsed && (
            <span className="text-xl font-bold deepwork-gradient display-font">DeepWork AI</span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {Object.entries(navigation).map(([key, section]) => (
          <div key={key}>
            {/* Section Header */}
            <button
              onClick={() => toggleSection(key)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isCollapsed ? 'justify-center' : 'justify-between'
              } ${
                expandedSections.includes(key)
                  ? 'bg-[#DC2626]/10 text-[#DC2626]'
                  : 'text-gray-400 hover:text-white hover:bg-[#1F1F1F]'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="flex-shrink-0">{section.icon}</span>
                {!isCollapsed && (
                  <span className="text-sm font-semibold">{section.title}</span>
                )}
              </div>
              {!isCollapsed && (
                <svg 
                  className={`w-4 h-4 transition-transform ${
                    expandedSections.includes(key) ? 'rotate-180' : ''
                  }`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </button>

            {/* Section Items */}
            {expandedSections.includes(key) && (
              <div className={`ml-4 space-y-1 ${isCollapsed ? 'hidden' : ''}`}>
                {section.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.disabled ? '#' : item.href}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                      isActive(item.href)
                        ? 'bg-[#DC2626]/20 text-[#DC2626] font-semibold'
                        : item.disabled
                        ? 'text-gray-600 cursor-not-allowed'
                        : 'text-gray-400 hover:text-white hover:bg-[#1F1F1F]'
                    }`}
                    onClick={item.disabled ? (e) => e.preventDefault() : undefined}
                  >
                    <span>{item.name}</span>
                    {item.badge && (
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        item.badge === 'Soon' 
                          ? 'bg-blue-500/20 text-blue-400' 
                          : 'bg-green-500/20 text-green-400'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Quick Actions */}
      {!isCollapsed && (
        <div className="p-4 border-t border-[#DC2626]/20">
          <div className="space-y-2">
            <Link
              href="/studio"
              className="w-full flex items-center gap-3 px-3 py-2 bg-gradient-to-r from-[#DC2626] to-[#B91C1C] 
                text-white rounded-lg text-sm font-semibold transition-all hover:shadow-lg hover:shadow-red-500/20"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
              </svg>
              New Project
            </Link>
            <Link
              href="/leads"
              className="w-full flex items-center gap-3 px-3 py-2 bg-[#1F1F1F] hover:bg-[#2F2F2F] 
                text-white rounded-lg text-sm font-semibold transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
              </svg>
              Add Lead
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
