import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Results.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const Results = () => {
  const [results, setResults] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResults();
    const interval = setInterval(fetchResults, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchResults = async () => {
    try {
      const response = await axios.get(`${API_URL}/results`);
      setResults(response.data.results);
      setStatistics(response.data.statistics);
    } catch (error) {
      console.error('Failed to fetch results:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading results...</div>;
  }

  const maxVotes = Math.max(...results.map(r => r.voteCount), 1);

  return (
    <div className="results-page">
      <div className="container">
        <div className="results-card">
          <h2>Election Results</h2>
          
          {statistics && (
            <div className="statistics">
              <div className="stat-item">
                <div className="stat-value">{statistics.totalVotes}</div>
                <div className="stat-label">Total Votes</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{statistics.totalUsers}</div>
                <div className="stat-label">Total Users</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{statistics.votingPercentage}%</div>
                <div className="stat-label">Voting Percentage</div>
              </div>
            </div>
          )}

          <div className="results-list">
            {results.map((candidate, index) => (
              <div key={candidate.id} className="result-item">
                <div className="result-rank">#{index + 1}</div>
                <div className="result-content">
                  <div className="result-header">
                    <h3>{candidate.name}</h3>
                    <span className="result-party">{candidate.party}</span>
                  </div>
                  <div className="result-stats">
                    <div className="result-votes">
                      <span className="vote-count">{candidate.voteCount}</span>
                      <span className="vote-label">votes</span>
                    </div>
                    <div className="result-percentage">
                      {candidate.percentage}%
                    </div>
                  </div>
                  <div className="result-bar-container">
                    <div
                      className="result-bar"
                      style={{
                        width: `${(candidate.voteCount / maxVotes) * 100}%`
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {results.length === 0 && (
            <div className="no-results">
              <p>No results available yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Results;


