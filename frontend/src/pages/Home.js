import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export default function Home() {
  const [results, setResults] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [published, setPublished] = useState(false);

  useEffect(() => {
    fetchResults();
    const interval = setInterval(fetchResults, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchResults = async () => {
    try {
      // Use public endpoint so results show for everyone when published
      const response = await axios.get(`${API_URL}/results/public`);
      setResults(response.data.results || []);
      setStatistics(response.data.statistics);
      setPublished(response.data.published || false);
    } catch (error) {
      console.error('Failed to fetch results:', error);
      setPublished(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
      
      {/* RESULTS SECTION - At the top */}
      {published && results.length > 0 && (
        <section className="bg-white text-gray-800 py-8 px-6 shadow-lg">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-indigo-700">📊 Live Election Results</h2>
              <Link 
                to="/results" 
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                View Full Results →
              </Link>
            </div>
            
            {statistics && (
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-indigo-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-indigo-700">{statistics.totalVotes}</div>
                  <div className="text-sm text-gray-600">Total Votes</div>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-indigo-700">{statistics.totalUsers}</div>
                  <div className="text-sm text-gray-600">Total Users</div>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-indigo-700">{statistics.votingPercentage}%</div>
                  <div className="text-sm text-gray-600">Voting %</div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {results.slice(0, 3).map((candidate, index) => (
                <div key={candidate.id} className="bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-lg border-2 border-indigo-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-bold text-indigo-700">#{index + 1}</span>
                    <span className="text-lg font-bold text-indigo-600">{candidate.voteCount} votes</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">{candidate.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{candidate.party}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-indigo-600 h-2 rounded-full transition-all"
                      style={{ width: `${candidate.percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{candidate.percentage}%</p>
                </div>
              ))}
            </div>
            {results.length > 3 && (
              <div className="text-center mt-4">
                <Link 
                  to="/results" 
                  className="text-indigo-600 hover:text-indigo-800 font-semibold"
                >
                  View all {results.length} candidates →
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

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
        </div>
        <p className="mt-4 text-sm opacity-75">
          User registration is available only through administrators. Please contact your admin for account access.
        </p>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-20 px-6 animate-fadeInSlow">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Why Choose Our Platform?
        </h2>
        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
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

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">About Our E-Voting System</h2>
          <p className="text-gray-600 leading-relaxed">
            Our platform is built using modern MERN technologies to ensure transparency,
            security, and a seamless voting experience. We aim to revolutionize traditional
            voting by bringing it online with complete integrity.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-10">Contact Us</h2>

          <form className="bg-white shadow-md p-8 rounded-xl space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 border rounded-lg"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 border rounded-lg"
            />
            <textarea
              placeholder="Message"
              className="w-full p-3 border rounded-lg h-32"
            ></textarea>

            <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-indigo-700 text-white py-10 mt-20">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
          
          <div>
            <h2 className="text-xl font-bold mb-2">E-Voting System</h2>
            <p className="text-gray-200 text-sm">
              Secure • Fast • Transparent
            </p>
          </div>

          <div>
            <h2 className="font-semibold mb-2">Quick Links</h2>
            <ul className="space-y-1 text-gray-200 text-sm">
              <li>About</li>
              <li>Contact</li>
              <li>How It Works</li>
              <li>Admin Login</li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold mb-2">Follow Us</h2>
            <div className="flex space-x-4 text-lg">
              <span>🔗</span>
              <span>🐦</span>
              <span>📘</span>
            </div>
          </div>

        </div>

        <p className="text-center text-gray-300 text-sm mt-10">
          © {new Date().getFullYear()} E-Voting System. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}

