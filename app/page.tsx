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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl font-black mb-8 deepwork-gradient display-font">
              AI Car Ad Studio
            </h1>
            <p className="text-2xl md:text-3xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Transform your car photos into professional advertisements with AI-powered scenery integration
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                href="/login"
                className="px-12 py-6 bg-gradient-to-r from-[#DC2626] to-[#B91C1C] text-white 
                  text-xl font-bold rounded-full transition-all hover:shadow-2xl hover:shadow-red-500/50 
                  hover:scale-105 active:scale-95 flex items-center gap-3"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Start Creating Now</span>
              </Link>
              <Link
                href="#features"
                className="px-12 py-6 bg-[#1F1F1F] hover:bg-[#2a2a2a] text-white 
                  text-xl font-bold rounded-full transition-all hover:shadow-2xl 
                  hover:scale-105 active:scale-95 border-2 border-gray-700 hover:border-gray-600
                  flex items-center gap-3"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Learn More</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gradient-to-b from-[#1F1F1F] to-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black mb-6 deepwork-gradient display-font">
              Why Choose DeepWork AI?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Professional-grade AI technology that transforms ordinary car photos into stunning advertisements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Feature 1 */}
            <div className="glass-card premium-card rounded-3xl p-8 text-center border border-[#DC2626]/20 float">
              <div className="w-20 h-20 bg-gradient-to-br from-[#DC2626] to-[#B91C1C] rounded-full flex items-center justify-center mx-auto mb-6 icon-glow">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Lightning Fast</h3>
              <p className="text-gray-300 leading-relaxed">
                Generate professional car advertisements in seconds using advanced AI technology. No more waiting for expensive photo shoots.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="glass-card premium-card rounded-3xl p-8 text-center border border-[#38bdf8]/20 float" style={{ animationDelay: '0.2s' }}>
              <div className="w-20 h-20 bg-gradient-to-br from-[#38bdf8] to-[#0ea5e9] rounded-full flex items-center justify-center mx-auto mb-6 icon-glow">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Authentic Results</h3>
              <p className="text-gray-300 leading-relaxed">
                Preserve your car's authentic details while seamlessly integrating professional backgrounds and branding elements.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="glass-card premium-card rounded-3xl p-8 text-center border border-[#F59E0B]/20 float" style={{ animationDelay: '0.4s' }}>
              <div className="w-20 h-20 bg-gradient-to-br from-[#F59E0B] to-[#D97706] rounded-full flex items-center justify-center mx-auto mb-6 icon-glow">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Cost Effective</h3>
              <p className="text-gray-300 leading-relaxed">
                Save thousands on professional photography and studio rentals. Create unlimited high-quality car ads at a fraction of the cost.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-gradient-to-b from-[#0A0A0A] to-[#1F1F1F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black mb-6 deepwork-gradient display-font">
              How It Works
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Create professional car advertisements in just 3 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <div className="text-center reveal">
              <div className="w-24 h-24 bg-gradient-to-br from-[#DC2626] to-[#B91C1C] rounded-full flex items-center justify-center mx-auto mb-6 icon-glow">
                <span className="text-3xl font-bold text-white">1</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Upload Your Car</h3>
              <p className="text-gray-300 leading-relaxed">
                Upload a photo of your car and optionally add your logo. Our AI will preserve all authentic details.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center reveal" style={{ animationDelay: '0.2s' }}>
              <div className="w-24 h-24 bg-gradient-to-br from-[#38bdf8] to-[#0ea5e9] rounded-full flex items-center justify-center mx-auto mb-6 icon-glow">
                <span className="text-3xl font-bold text-white">2</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Choose Scenery</h3>
              <p className="text-gray-300 leading-relaxed">
                Select from professional scenery options like luxury showrooms, clean studios, or scenic locations.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center reveal" style={{ animationDelay: '0.4s' }}>
              <div className="w-24 h-24 bg-gradient-to-br from-[#F59E0B] to-[#D97706] rounded-full flex items-center justify-center mx-auto mb-6 icon-glow">
                <span className="text-3xl font-bold text-white">3</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Get Your Ad</h3>
              <p className="text-gray-300 leading-relaxed">
                Download your professional car advertisement ready for websites, social media, or print materials.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-[#DC2626]/10 via-[#1F1F1F] to-[#38bdf8]/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl md:text-6xl font-black mb-8 deepwork-gradient display-font">
            Ready to Transform Your Car Photos?
          </h2>
          <p className="text-xl text-gray-300 mb-12 leading-relaxed">
            Transform your car photos into professional advertisements in seconds. Perfect for car dealers, automotive photographers, and marketing professionals who demand high-quality results.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="/studio"
              className="px-12 py-6 bg-gradient-to-r from-[#DC2626] to-[#B91C1C] text-white 
                text-xl font-bold rounded-full transition-all hover:shadow-2xl hover:shadow-red-500/50 
                hover:scale-105 active:scale-95 flex items-center gap-3"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Start Creating Free</span>
            </Link>
            <Link
              href="/login"
              className="px-12 py-6 bg-[#1F1F1F] hover:bg-[#2a2a2a] text-white 
                text-xl font-bold rounded-full transition-all hover:shadow-2xl 
                hover:scale-105 active:scale-95 border-2 border-gray-700 hover:border-gray-600
                flex items-center gap-3"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Create Account</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A0A0A] border-t border-[#DC2626]/20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Link 
              href="/"
              className="text-2xl font-bold deepwork-gradient display-font mb-4 inline-block"
            >
              DeepWork AI
            </Link>
            <p className="text-gray-400 mb-6">
              Professional AI-powered car advertisement generation
            </p>
            <div className="flex justify-center gap-8">
              <Link href="/studio" className="text-gray-400 hover:text-white transition-colors">
                Studio
              </Link>
              <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors">
                Dashboard
              </Link>
              <Link href="/login" className="text-gray-400 hover:text-white transition-colors">
                Login
              </Link>
            </div>
            <p className="text-gray-500 text-sm mt-8">
              © 2025 DeepWork AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}