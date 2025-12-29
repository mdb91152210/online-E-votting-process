import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import './Voting.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const Voting = () => {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user?.hasVoted) {
      setMessage({
        type: 'info',
        text: 'You have already cast your vote. Results will be available once the admin publishes them.'
      });
      setLoading(false);
      return;
    }
    fetchCandidates();
  }, [user]);

  const fetchCandidates = async () => {
    try {
      const response = await axios.get(`${API_URL}/votes/candidates`);
      setCandidates(response.data.candidates);
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Failed to load candidates'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async () => {
    if (!selectedCandidate) {
      setMessage({
        type: 'error',
        text: 'Please select a candidate'
      });
      return;
    }

    setSubmitting(true);
    setMessage({ type: '', text: '' });

    try {
      await axios.post(`${API_URL}/votes`, {
        candidateId: selectedCandidate
      });
      setMessage({
        type: 'success',
        text: 'Your vote has been cast successfully! Results will be available once the admin publishes them.'
      });
      // Don't redirect - let user stay on voting page
      setSelectedCandidate(null);
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Failed to cast vote'
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading candidates...</div>;
  }

  // Show message if user has already voted
  if (user?.hasVoted) {
    return (
      <div className="voting-page">
        <div className="container">
          <div className="voting-card">
            <h2>You Have Already Voted</h2>
            {message.text && (
              <div className={`message ${message.type}`} style={{ 
                padding: '2rem', 
                textAlign: 'center',
                backgroundColor: '#e3f2fd',
                borderRadius: '8px',
                marginTop: '2rem'
              }}>
                <p style={{ fontSize: '1.1rem', color: '#555', marginBottom: '1rem' }}>
                  {message.text}
                </p>
                <Link to="/results" className="btn btn-primary">
                  Check Results Page
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="voting-page">
      <div className="container">
        <div className="voting-card">
          <h2>Cast Your Vote</h2>
          <p className="voting-instructions">
            Please select a candidate from the list below and click "Submit Vote"
          </p>

          {message.text && (
            <div className={`message ${message.type}`}>
              {message.text}
            </div>
          )}

          <div className="candidates-grid">
            {candidates.map((candidate) => (
              <div
                key={candidate._id}
                className={`candidate-card ${
                  selectedCandidate === candidate._id ? 'selected' : ''
                }`}
                onClick={() => setSelectedCandidate(candidate._id)}
              >
                <div className="candidate-image">
                  {candidate.image ? (
                    <img src={candidate.image} alt={candidate.name} />
                  ) : (
                    <div className="candidate-placeholder">
                      {candidate.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <h3>{candidate.name}</h3>
                <p className="candidate-party">{candidate.party}</p>
                {candidate.description && (
                  <p className="candidate-description">{candidate.description}</p>
                )}
                {selectedCandidate === candidate._id && (
                  <div className="selected-indicator">✓ Selected</div>
                )}
              </div>
            ))}
          </div>

          <div className="voting-actions">
            <button
              onClick={handleVote}
              className="btn btn-primary btn-large"
              disabled={!selectedCandidate || submitting}
            >
              {submitting ? 'Submitting...' : 'Submit Vote'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Voting;


