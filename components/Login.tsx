"use client";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

export default function Login() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const saveUser = async () => {
      if (session?.user && !isLoading) {
        setIsLoading(true);
        try {
          const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: session.user.name,
              email: session.user.email,
              image: session.user.image,
              // Add any additional fields you want to save
              createdAt: new Date(),
              lastLogin: new Date(),
            }),
          });

          if (response.ok) {
            console.log('User saved successfully');
            router.push('/interests');
          } else {
            const error = await response.json();
            console.error('Failed to save user:', error);
          }
        } catch (error) {
          console.error('Error saving user:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    if (status === 'authenticated' && session?.user) {
      saveUser();
    }
  }, [session, status, router, isLoading]);

  const handleSignIn = async () => {
    try {
      await signIn("google", { callbackUrl: window.location.origin });
    } catch (error) {
      console.error("Sign in error:", error);
    }
  };

  if (status === 'authenticated') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-3">Setting up your account...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex">
      {/* Left side - Artwork */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 items-center justify-center relative overflow-hidden">
        {/* Abstract Artwork */}
        <div className="absolute inset-0">
          <svg viewBox="0 0 800 800" className="w-full h-full opacity-30">
            {/* Background Circles */}
            <circle
              cx="400"
              cy="400"
              r="200"
              fill="none"
              stroke="#4F46E5"
              strokeWidth="2"
              className="animate-pulse"
            />
            <circle
              cx="400"
              cy="400"
              r="300"
              fill="none"
              stroke="#6366F1"
              strokeWidth="2"
              className="animate-pulse"
              style={{ animationDelay: "1s" }}
            />
            <circle
              cx="400"
              cy="400"
              r="400"
              fill="none"
              stroke="#818CF8"
              strokeWidth="2"
              className="animate-pulse"
              style={{ animationDelay: "2s" }}
            />

            {/* Decorative Lines */}
            <path
              d="M200,200 Q400,100 600,200"
              stroke="#A5B4FC"
              fill="none"
              strokeWidth="2"
              className="animate-[spin_10s_linear_infinite]"
            />
            <path
              d="M200,600 Q400,700 600,600"
              stroke="#A5B4FC"
              fill="none"
              strokeWidth="2"
              className="animate-[spin_15s_linear_infinite]"
            />
          </svg>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/20 animate-float"
              style={{
                width: Math.random() * 20 + 10 + "px",
                height: Math.random() * 20 + 10 + "px",
                left: Math.random() * 100 + "%",
                top: Math.random() * 100 + "%",
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 10 + 10}s`,
              }}
            />
          ))}
        </div>

        {/* Text Overlay */}
        <div className="relative z-10 text-white text-center space-y-6">
          <h2 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
            WestX
          </h2>
          <p className="text-xl text-blue-100">Where AI Powers Your Social Experience</p>
          <div className="flex gap-4 justify-center mt-8">
            <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm">
              <p className="text-3xl font-bold">AI</p>
              <p className="text-sm">Powered</p>
            </div>
            <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm">
              <p className="text-3xl font-bold">24/7</p>
              <p className="text-sm">Active</p>
            </div>
            <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm">
              <p className="text-3xl font-bold">∞</p>
              <p className="text-sm">Content</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          {/* Logo and Title */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">WestX</h1>
            <p className="text-gray-600">Experience social media, reimagined</p>
          </div>

          {/* Sign in section */}
          <div className="mt-8 space-y-6">
            <button
              onClick={handleSignIn}
              className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 hover:bg-gray-50 
                   px-4 py-3 rounded-lg border border-gray-300 shadow-sm transition-all duration-200
                   hover:shadow-md"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
              </svg>
              Sign in with Google
            </button>

            {/* Terms text */}
            <p className="text-center text-sm text-gray-600">
              By signing in, you agree to our{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
