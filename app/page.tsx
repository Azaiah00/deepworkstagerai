import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navigation Header */}
      <nav className="bg-gradient-to-r from-[#0A0A0A] via-[#1F1F1F] to-[#0A0A0A] border-b border-[#DC2626]/20">
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
                href="/login"
                className="px-6 py-3 bg-[#1F1F1F] hover:bg-[#2a2a2a] text-white 
                  font-semibold rounded-full transition-all hover:shadow-lg 
                  hover:-translate-y-0.5 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
                <span>Login</span>
              </Link>
              <Link
                href="/studio"
                className="px-6 py-3 bg-gradient-to-r from-[#DC2626] to-[#B91C1C] text-white 
                  font-semibold rounded-full transition-all hover:shadow-lg hover:shadow-red-500/50 
                  hover:-translate-y-0.5 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Start Creating</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0A0A0A] via-[#1F1F1F] to-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-24">
          <div className="text-center">
            <div className="inline-block mb-4 sm:mb-6">
              <span className="px-4 py-2 sm:px-6 bg-gradient-to-r from-[#DC2626]/20 to-[#38bdf8]/20 border border-[#DC2626]/50 rounded-full text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                All-in-One Automotive Sales Platform
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-6 sm:mb-8 deepwork-gradient display-font leading-tight px-2">
              Sell More Cars with<br />AI-Powered Automation
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-4 sm:mb-6 max-w-4xl mx-auto leading-relaxed px-4">
              The complete platform for modern auto dealers: Professional AI staging, intelligent CRM, automated social media, and AI sales assistant—all working together to close more deals faster.
            </p>
            <p className="text-base sm:text-lg text-[#38bdf8] mb-8 sm:mb-12 max-w-3xl mx-auto font-semibold px-4">
              Transform your dealership operations and increase sales by up to 300% with automated marketing and AI-driven lead management
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4">
              <Link
                href="/login"
                className="w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-6 bg-gradient-to-r from-[#DC2626] to-[#B91C1C] text-white 
                  text-lg sm:text-xl font-bold rounded-full transition-all hover:shadow-2xl hover:shadow-red-500/50 
                  hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Start Free Trial</span>
              </Link>
              <Link
                href="#features"
                className="w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-6 bg-[#1F1F1F] hover:bg-[#2a2a2a] text-white 
                  text-lg sm:text-xl font-bold rounded-full transition-all hover:shadow-2xl 
                  hover:scale-105 active:scale-95 border-2 border-gray-700 hover:border-gray-600
                  flex items-center justify-center gap-3"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span>See How It Works</span>
              </Link>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 mt-4 sm:mt-6 px-4">
              No credit card required • Set up in 5 minutes • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 sm:py-24 bg-gradient-to-b from-[#1F1F1F] to-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 deepwork-gradient display-font px-2">
              Everything You Need to Dominate Auto Sales
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
              A complete suite of AI-powered tools designed specifically for high-performing auto dealerships
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1: AI Staging */}
            <div className="glass-card premium-card rounded-3xl p-8 border border-[#DC2626]/20 float">
              <div className="w-16 h-16 bg-gradient-to-br from-[#DC2626] to-[#B91C1C] rounded-full flex items-center justify-center mb-6 icon-glow">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">AI Photo Staging</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Transform any car photo into showroom-quality images with professional backgrounds. Create ads that sell in seconds—no expensive photoshoots needed.
              </p>
              <span className="text-[#DC2626] font-semibold text-sm">Save $2,000+ per vehicle</span>
            </div>

            {/* Feature 2: CRM */}
            <div className="glass-card premium-card rounded-3xl p-8 border border-[#38bdf8]/20 float" style={{ animationDelay: '0.1s' }}>
              <div className="w-16 h-16 bg-gradient-to-br from-[#38bdf8] to-[#0ea5e9] rounded-full flex items-center justify-center mb-6 icon-glow">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Smart CRM System</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Track every lead from first contact to sale. Automated follow-ups, deal pipeline management, and customer insights that help you close 3x faster.
              </p>
              <span className="text-[#38bdf8] font-semibold text-sm">Never lose a lead again</span>
            </div>

            {/* Feature 3: AI Sales Rep */}
            <div className="glass-card premium-card rounded-3xl p-8 border border-[#8B5CF6]/20 float" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] rounded-full flex items-center justify-center mb-6 icon-glow">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">AI Sales Assistant</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Your 24/7 AI sales rep responds to leads instantly, qualifies prospects, and schedules appointments automatically while you sleep.
              </p>
              <span className="text-[#8B5CF6] font-semibold text-sm">Works 24/7, never takes breaks</span>
            </div>

            {/* Feature 4: Social Media */}
            <div className="glass-card premium-card rounded-3xl p-8 border border-[#10B981]/20 float" style={{ animationDelay: '0.3s' }}>
              <div className="w-16 h-16 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-full flex items-center justify-center mb-6 icon-glow">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Auto Social Posting</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Automatically post new inventory across Facebook, Instagram, LinkedIn, and Twitter. AI-generated captions optimized for maximum engagement.
              </p>
              <span className="text-[#10B981] font-semibold text-sm">Reach 10,000+ potential buyers</span>
            </div>

            {/* Feature 5: Analytics */}
            <div className="glass-card premium-card rounded-3xl p-8 border border-[#F59E0B]/20 float" style={{ animationDelay: '0.4s' }}>
              <div className="w-16 h-16 bg-gradient-to-br from-[#F59E0B] to-[#D97706] rounded-full flex items-center justify-center mb-6 icon-glow">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Sales Analytics</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Real-time dashboards show which listings perform best, lead sources with highest ROI, and conversion rates at every sales funnel stage.
              </p>
              <span className="text-[#F59E0B] font-semibold text-sm">Make data-driven decisions</span>
            </div>

            {/* Feature 6: Integration */}
            <div className="glass-card premium-card rounded-3xl p-8 border border-[#EC4899]/20 float" style={{ animationDelay: '0.5s' }}>
              <div className="w-16 h-16 bg-gradient-to-br from-[#EC4899] to-[#DB2777] rounded-full flex items-center justify-center mb-6 icon-glow">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Seamless Integration</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Connect your existing DMS, website, and advertising platforms. One-click publishing to all major automotive listing sites and marketplaces.
              </p>
              <span className="text-[#EC4899] font-semibold text-sm">Works with your tools</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 sm:py-24 bg-gradient-to-b from-[#0A0A0A] to-[#1F1F1F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 deepwork-gradient display-font px-2">
              From Inventory to Sale in 3 Simple Steps
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
              Set up your entire sales operation in minutes and start closing more deals today
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <div className="text-center reveal">
              <div className="w-24 h-24 bg-gradient-to-br from-[#DC2626] to-[#B91C1C] rounded-full flex items-center justify-center mx-auto mb-6 icon-glow">
                <span className="text-3xl font-bold text-white">1</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Upload & Stage</h3>
              <p className="text-gray-300 leading-relaxed">
                Upload vehicle photos and let AI instantly create professional showroom-quality images with your branding. Takes just 30 seconds per car.
              </p>
              <div className="mt-4 inline-block px-4 py-2 bg-[#DC2626]/20 rounded-full text-sm text-[#DC2626] font-semibold">
                30 sec per vehicle
              </div>
            </div>

            {/* Step 2 */}
            <div className="text-center reveal" style={{ animationDelay: '0.2s' }}>
              <div className="w-24 h-24 bg-gradient-to-br from-[#38bdf8] to-[#0ea5e9] rounded-full flex items-center justify-center mx-auto mb-6 icon-glow">
                <span className="text-3xl font-bold text-white">2</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Auto-Publish & Promote</h3>
              <p className="text-gray-300 leading-relaxed">
                Our AI automatically posts to your website, social media, and major listing platforms. Creates engaging captions and targets the right buyers.
              </p>
              <div className="mt-4 inline-block px-4 py-2 bg-[#38bdf8]/20 rounded-full text-sm text-[#38bdf8] font-semibold">
                10+ platforms instantly
              </div>
            </div>

            {/* Step 3 */}
            <div className="text-center reveal" style={{ animationDelay: '0.4s' }}>
              <div className="w-24 h-24 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-full flex items-center justify-center mx-auto mb-6 icon-glow">
                <span className="text-3xl font-bold text-white">3</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Close More Deals</h3>
              <p className="text-gray-300 leading-relaxed">
                AI responds to leads 24/7, CRM tracks every interaction, and analytics show what's working. You just focus on closing deals.
              </p>
              <div className="mt-4 inline-block px-4 py-2 bg-[#10B981]/20 rounded-full text-sm text-[#10B981] font-semibold">
                3x faster sales cycle
              </div>
            </div>
          </div>

          {/* Results Banner */}
          <div className="mt-20 glass-card premium-card rounded-3xl p-12 text-center border border-[#DC2626]/20">
            <h3 className="text-3xl font-bold text-white mb-6">Average Dealer Results After 30 Days</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <p className="text-5xl font-black deepwork-gradient mb-2">+287%</p>
                <p className="text-gray-400">Lead Volume</p>
              </div>
              <div>
                <p className="text-5xl font-black text-[#38bdf8] mb-2">65%</p>
                <p className="text-gray-400">Time Saved</p>
              </div>
              <div>
                <p className="text-5xl font-black text-[#10B981] mb-2">+156%</p>
                <p className="text-gray-400">Sales Closed</p>
              </div>
              <div>
                <p className="text-5xl font-black text-[#F59E0B] mb-2">$4,200</p>
                <p className="text-gray-400">Saved Monthly</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-24 bg-gradient-to-br from-[#DC2626]/10 via-[#1F1F1F] to-[#38bdf8]/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card premium-card rounded-3xl p-6 sm:p-12 text-center border border-[#DC2626]/30">
            <div className="inline-block mb-6">
              <span className="px-6 py-2 bg-gradient-to-r from-[#10B981]/20 to-[#059669]/20 border border-[#10B981]/50 rounded-full text-sm font-bold text-[#10B981] uppercase tracking-wider">
                Limited Time Offer
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 deepwork-gradient display-font px-2">
              Join Elite Dealers Selling 3x More Cars
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 mb-3 sm:mb-4 leading-relaxed max-w-3xl mx-auto px-2">
              Stop losing leads to competitors with better marketing. Start leveraging AI-powered automation to dominate your market and maximize every opportunity.
            </p>
            <p className="text-base sm:text-lg text-[#38bdf8] mb-8 sm:mb-10 font-semibold px-2">
              Over 500 dealerships have increased their monthly sales by an average of 156% using DeepWork AI
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-6 sm:mb-8 px-4">
              <Link
                href="/login"
                className="w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-6 bg-gradient-to-r from-[#DC2626] to-[#B91C1C] text-white 
                  text-lg sm:text-xl font-bold rounded-full transition-all hover:shadow-2xl hover:shadow-red-500/50 
                  hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Start Your Free Trial</span>
              </Link>
              <Link
                href="#features"
                className="w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-6 bg-[#1F1F1F] hover:bg-[#2a2a2a] text-white 
                  text-lg sm:text-xl font-bold rounded-full transition-all hover:shadow-2xl 
                  hover:scale-105 active:scale-95 border-2 border-gray-700 hover:border-gray-600
                  flex items-center justify-center gap-3"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span>Watch Demo</span>
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-400 mb-6">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#10B981]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>14-Day Free Trial</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#10B981]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#10B981]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Cancel Anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#10B981]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Setup in 5 Minutes</span>
              </div>
            </div>

            <p className="text-xs text-gray-500">
              Join dealerships averaging <span className="text-[#10B981] font-bold">$47,000+ in additional monthly revenue</span> from improved lead conversion and faster sales cycles
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A0A0A] border-t border-[#DC2626]/20 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Brand Column */}
            <div className="md:col-span-2">
              <Link 
                href="/"
                className="text-3xl font-bold deepwork-gradient display-font mb-4 inline-block"
              >
                DeepWork AI
              </Link>
              <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
                The all-in-one automotive sales platform that helps dealerships sell more cars through AI-powered marketing automation, intelligent CRM, and automated lead management.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-[#1F1F1F] hover:bg-[#DC2626] rounded-full flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-[#1F1F1F] hover:bg-[#DC2626] rounded-full flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-[#1F1F1F] hover:bg-[#DC2626] rounded-full flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Platform Column */}
            <div>
              <h3 className="text-white font-bold mb-4">Platform</h3>
              <ul className="space-y-3">
                <li><Link href="/studio" className="text-gray-400 hover:text-white transition-colors">AI Studio</Link></li>
                <li><Link href="/leads" className="text-gray-400 hover:text-white transition-colors">CRM</Link></li>
                <li><Link href="/projects" className="text-gray-400 hover:text-white transition-colors">Projects</Link></li>
                <li><Link href="/login" className="text-gray-400 hover:text-white transition-colors">Analytics</Link></li>
                <li><Link href="/login" className="text-gray-400 hover:text-white transition-colors">Integrations</Link></li>
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h3 className="text-white font-bold mb-4">Company</h3>
              <ul className="space-y-3">
                <li><Link href="#features" className="text-gray-400 hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/login" className="text-gray-400 hover:text-white transition-colors">Pricing</Link></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Support</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
                <li><Link href="/login" className="text-gray-400 hover:text-white transition-colors">Login</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © 2025 DeepWork AI. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}