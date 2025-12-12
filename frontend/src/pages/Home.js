import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
      
      {/* HERO SECTION */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-20 animate-fadeIn">
        <h1 className="text-5xl md:text-6xl font-extrabold drop-shadow-lg">
          Online E-Voting System
        </h1>

        <p className="mt-4 text-lg md:text-xl max-w-2xl opacity-90">
          A secure, reliable and user-friendly platform to conduct digital elections
          with transparency and trust.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex gap-4 flex-wrap justify-center">
          <Link
            to="/login"
            className="px-8 py-3 bg-white text-indigo-700 font-semibold rounded-full shadow-lg hover:scale-105 transition transform"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-8 py-3 bg-transparent border border-white hover:bg-white hover:text-indigo-700 rounded-full font-semibold transition"
          >
            Register
          </Link>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-20 px-6 animate-fadeInSlow">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Why Choose Our Platform?
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Card 1 */}
          <div className="bg-white text-gray-800 p-8 rounded-2xl shadow-xl hover:-translate-y-2 transition">
            <div className="text-4xl mb-4">🔐</div>
            <h3 className="text-2xl font-semibold mb-2">Secure Voting</h3>
            <p className="opacity-80">
              End-to-end encryption ensures your vote remains private and protected.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white text-gray-800 p-8 rounded-2xl shadow-xl hover:-translate-y-2 transition">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-2xl font-semibold mb-2">Fast & Reliable</h3>
            <p className="opacity-80">
              Highly optimized to deliver extremely fast and accurate results.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white text-gray-800 p-8 rounded-2xl shadow-xl hover:-translate-y-2 transition">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-2xl font-semibold mb-2">Live Results</h3>
            <p className="opacity-80">
              Real-time vote counting and transparent result updates.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

