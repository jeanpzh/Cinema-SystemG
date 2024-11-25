import React from "react";
import { Rocket, Asterisk, ArrowLeft } from "lucide-react";

function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="relative">
        {/* Floating stars background */}
        {[...Array(20)].map((_, i) => (
          <Asterisk
            key={i}
            className={`absolute text-white/30 animate-pulse`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `pulse ${2 + Math.random() * 3}s infinite`,
              transform: `scale(${0.5 + Math.random() * 0.5})`,
            }}
            size={16}
          />
        ))}

        <div className="text-center relative z-10">
          {/* Animated rocket */}
          <div className="relative w-32 h-32 mx-auto mb-8">
            <Rocket
              className="text-white absolute inset-0 w-full h-full animate-bounce"
              style={{ animationDuration: "3s" }}
            />
          </div>

          {/* 404 Text */}
          <h1 className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4 animate-pulse">
            404
          </h1>

          {/* Message */}
          <h2 className="text-2xl font-semibold text-white mb-6">
            Houston, we have a problem!
          </h2>
          <p className="text-gray-300 mb-8 max-w-md mx-auto">
            The page you're looking for has drifted into deep space. Let's get
            you back to familiar territory.
          </p>

          {/* Back button */}
          <a
            href="/"
            className="inline-flex items-center px-6 py-3 text-white bg-purple-600 rounded-full hover:bg-purple-700 transition-colors duration-300 group"
          >
            <ArrowLeft
              className="mr-2 group-hover:-translate-x-1 transition-transform duration-300"
              size={20}
            />
            Back to Home
          </a>
        </div>

        {/* Decorative gradient orb */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-600/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-pink-600/30 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}

export default NotFound;
