'use client';

import { useState } from 'react';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    company: ''
  });

  // Handle Google OAuth login
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError('');
      await authClient.signIn.social({
        provider: 'google',
        callbackURL: '/leads',
      });
    } catch (err: any) {
      console.error('Google login error:', err);
      setError(err.message || 'Failed to login with Google');
      setLoading(false);
    }
  };

  // Handle email/password submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        // Login
        await authClient.signIn.email({
          email: formData.email,
          password: formData.password,
        });
        router.push('/leads');
      } else {
        // Sign up
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }
        
        await authClient.signUp.email({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          // @ts-ignore - company is a custom field
          company: formData.company,
        });
        router.push('/leads');
      }
    } catch (err: any) {
      console.error('Auth error:', err);
      setError(err.message || `Failed to ${isLogin ? 'login' : 'sign up'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#1F1F1F] to-[#0A0A0A] w-full overflow-x-hidden">
      {/* Navigation Header */}
      <nav className="bg-gradient-to-r from-[#0A0A0A] via-[#1F1F1F] to-[#0A0A0A] border-b border-[#DC2626]/20 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Link 
              href="/"
              className="text-2xl sm:text-3xl font-bold deepwork-gradient hover:scale-105 transition-transform display-font"
            >
              DeepWork AI
            </Link>
            <Link
              href="/"
              className="px-4 py-2 sm:px-6 sm:py-3 bg-[#1F1F1F] hover:bg-[#2a2a2a] text-white 
                font-semibold rounded-full transition-all hover:shadow-lg 
                hover:-translate-y-0.5 flex items-center gap-2 text-sm sm:text-base"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Home</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Login Form Section */}
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <div className="text-center px-2">
            <h2 className="text-3xl sm:text-4xl font-black deepwork-gradient display-font mb-3 sm:mb-4">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-gray-300 text-base sm:text-lg">
              {isLogin 
                ? 'Sign in to access your automotive sales platform' 
                : 'Join DeepWork AI and start creating professional car advertisements'
              }
            </p>
          </div>

          {/* Form */}
          <div className="glass-card premium-card rounded-3xl p-8 border border-[#DC2626]/20">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Name field for registration */}
              {!isLogin && (
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold mb-2 text-gray-300 uppercase tracking-wider">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required={!isLogin}
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#0A0A0A]/50 border-2 border-gray-700 
                      text-white placeholder-gray-500 focus:border-[#DC2626] 
                      focus:outline-none transition-all focus:shadow-lg focus:shadow-red-500/20"
                    placeholder="Enter your full name"
                  />
                </div>
              )}

              {/* Email field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-2 text-gray-300 uppercase tracking-wider">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl bg-[#0A0A0A]/50 border-2 border-gray-700 
                    text-white placeholder-gray-500 focus:border-[#DC2626] 
                    focus:outline-none transition-all focus:shadow-lg focus:shadow-red-500/20"
                  placeholder="Enter your email"
                />
              </div>

              {/* Password field */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold mb-2 text-gray-300 uppercase tracking-wider">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl bg-[#0A0A0A]/50 border-2 border-gray-700 
                    text-white placeholder-gray-500 focus:border-[#DC2626] 
                    focus:outline-none transition-all focus:shadow-lg focus:shadow-red-500/20"
                  placeholder="Enter your password"
                />
              </div>

              {/* Confirm Password field for registration */}
              {!isLogin && (
                <>
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-semibold mb-2 text-gray-300 uppercase tracking-wider">
                      Confirm Password
                    </label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required={!isLogin}
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-[#0A0A0A]/50 border-2 border-gray-700 
                        text-white placeholder-gray-500 focus:border-[#DC2626] 
                        focus:outline-none transition-all focus:shadow-lg focus:shadow-red-500/20"
                      placeholder="Confirm your password"
                    />
                  </div>
                  
                  {/* Company field */}
                  <div>
                    <label htmlFor="company" className="block text-sm font-semibold mb-2 text-gray-300 uppercase tracking-wider">
                      Company (Optional)
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-[#0A0A0A]/50 border-2 border-gray-700 
                        text-white placeholder-gray-500 focus:border-[#DC2626] 
                        focus:outline-none transition-all focus:shadow-lg focus:shadow-red-500/20"
                      placeholder="Your company name"
                    />
                  </div>
                </>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-premium py-4 text-lg font-bold rounded-full transition-all duration-300 
                  hover:scale-105 active:scale-95 flex items-center justify-center gap-3
                  disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isLogin ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                )}
                <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
              </button>

              {/* Toggle between login and register */}
              <div className="text-center">
                <p className="text-gray-400">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}
                </p>
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-[#DC2626] hover:text-[#B91C1C] font-semibold transition-colors mt-2"
                >
                  {isLogin ? 'Create Account' : 'Sign In'}
                </button>
              </div>
            </form>

            {/* Social Login Options */}
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-[#1F1F1F] text-gray-400">Or continue with</span>
                </div>
              </div>

              <div className="mt-6">
                <button 
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  type="button"
                  className="w-full inline-flex justify-center py-3 px-4 border border-gray-700 rounded-xl 
                    bg-[#0A0A0A]/50 text-white font-medium hover:bg-[#1F1F1F]/50 transition-all
                    disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="ml-2">{loading ? 'Loading...' : 'Continue with Google'}</span>
                </button>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mt-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
                  {error}
                </div>
              )}
            </div>
          </div>

          {/* Additional Links */}
          <div className="text-center">
            <Link
              href="/"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
