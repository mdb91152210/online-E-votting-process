import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [showCandidateForm, setShowCandidateForm] = useState(false);
  const [showUserForm, setShowUserForm] = useState(false);
  const [candidateForm, setCandidateForm] = useState({
    name: '',
    party: '',
    description: '',
    image: '',
    isActive: true
  });
  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [resultsPublished, setResultsPublished] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      if (activeTab === 'overview') {
        const statsRes = await axios.get(`${API_URL}/admin/stats`);
        setStats(statsRes.data.stats);
        // Fetch results published status
        const resultsStatusRes = await axios.get(`${API_URL}/admin/results-status`);
        setResultsPublished(resultsStatusRes.data.resultsPublished);
      } else if (activeTab === 'candidates') {
        const candidatesRes = await axios.get(`${API_URL}/admin/candidates`);
        setCandidates(candidatesRes.data.candidates);
      } else if (activeTab === 'users') {
        const usersRes = await axios.get(`${API_URL}/admin/users`);
        setUsers(usersRes.data.users);
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Failed to fetch data'
      });
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleToggleResultsPublish = async () => {
    try {
      const response = await axios.put(`${API_URL}/admin/results-publish`, {
        published: !resultsPublished
      });
      
      if (response.data.success) {
        setResultsPublished(response.data.resultsPublished);
        setMessage({
          type: 'success',
          text: response.data.message || (response.data.resultsPublished ? 'Results published successfully' : 'Results unpublished successfully')
        });
        // Refresh stats to get updated data
        if (activeTab === 'overview') {
          const statsRes = await axios.get(`${API_URL}/admin/stats`);
          setStats(statsRes.data.stats);
        }
      } else {
        setMessage({
          type: 'error',
          text: response.data.message || 'Failed to update results status'
        });
      }
    } catch (error) {
      console.error('Publish results error:', error);
      setMessage({
        type: 'error',
        text: error.response?.data?.message || error.message || 'Failed to update results status. Please check console for details.'
      });
    }
  };

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    
    if (userForm.password !== userForm.confirmPassword) {
      setMessage({
        type: 'error',
        text: 'Passwords do not match'
      });
      return;
    }

    if (userForm.password.length < 8) {
      setMessage({
        type: 'error',
        text: 'Password must be at least 8 characters'
      });
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/admin/users/register`, {
        name: userForm.name,
        email: userForm.email,
        password: userForm.password
      });

      if (response.data.success) {
        setMessage({
          type: 'success',
          text: `User "${response.data.user.name}" registered successfully!`
        });
        setUserForm({
          name: '',
          email: '',
          password: '',
          confirmPassword: ''
        });
        setShowUserForm(false);
        fetchData(); // Refresh users list
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Failed to register user'
      });
    }
  };

  const handleCandidateSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/admin/candidates`, candidateForm);
      setMessage({
        type: 'success',
        text: 'Candidate created successfully'
      });
      setCandidateForm({
        name: '',
        party: '',
        description: '',
        image: '',
        isActive: true
      });
      setShowCandidateForm(false);
      fetchData();
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Failed to create candidate'
      });
    }
  };

  const handleDeleteCandidate = async (id) => {
    if (window.confirm('Are you sure you want to delete this candidate?')) {
      try {
        await axios.delete(`${API_URL}/admin/candidates/${id}`);
        setMessage({
          type: 'success',
          text: 'Candidate deleted successfully'
        });
        fetchData();
      } catch (error) {
        setMessage({
          type: 'error',
          text: 'Failed to delete candidate'
        });
      }
    }
  };

  const toggleCandidateStatus = async (id, currentStatus) => {
    try {
      await axios.put(`${API_URL}/admin/candidates/${id}`, {
        isActive: !currentStatus
      });
      fetchData();
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Failed to update candidate'
      });
    }
  };

  if (loading && activeTab === 'overview') {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="admin-dashboard">
      <div className="container">
        <div className="dashboard-card">
          <h2>Admin Dashboard</h2>

          <div className="dashboard-tabs">
            <button
              className={activeTab === 'overview' ? 'active' : ''}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={activeTab === 'candidates' ? 'active' : ''}
              onClick={() => setActiveTab('candidates')}
            >
              Candidates
            </button>
            <button
              className={activeTab === 'users' ? 'active' : ''}
              onClick={() => setActiveTab('users')}
            >
              Users
            </button>
          </div>

          {message.text && (
            <div className={`message ${message.type}`}>
              {message.text}
            </div>
          )}

          {activeTab === 'overview' && stats && (
            <div className="overview">
              {/* Results Publish Control */}
              <div style={{ 
                marginBottom: '2rem', 
                padding: '1.5rem', 
                backgroundColor: '#f5f5f5', 
                borderRadius: '8px',
                border: '2px solid #e0e0e0'
              }}>
                <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>Results Publishing Control</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ 
                    padding: '0.5rem 1rem', 
                    backgroundColor: resultsPublished ? '#4caf50' : '#f44336',
                    color: 'white',
                    borderRadius: '4px',
                    fontWeight: 'bold'
                  }}>
                    {resultsPublished ? '✓ Published' : '✗ Not Published'}
                  </span>
                  <button
                    onClick={handleToggleResultsPublish}
                    className="btn btn-primary"
                    style={{ 
                      backgroundColor: resultsPublished ? '#f44336' : '#4caf50'
                    }}
                  >
                    {resultsPublished ? 'Unpublish Results' : 'Publish Results'}
                  </button>
                </div>
                <p style={{ marginTop: '0.5rem', color: '#666', fontSize: '0.9rem' }}>
                  {resultsPublished 
                    ? 'Results are currently visible to all users.' 
                    : 'Results are hidden. Users cannot see results until you publish them.'}
                </p>
              </div>

              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">👥</div>
                  <div className="stat-info">
                    <div className="stat-value">{stats.totalUsers}</div>
                    <div className="stat-label">Total Users</div>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">🗳️</div>
                  <div className="stat-info">
                    <div className="stat-value">{stats.totalVotes}</div>
                    <div className="stat-label">Total Votes</div>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">📊</div>
                  <div className="stat-info">
                    <div className="stat-value">{stats.votingPercentage}%</div>
                    <div className="stat-label">Voting Percentage</div>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">🎯</div>
                  <div className="stat-info">
                    <div className="stat-value">{stats.activeCandidates}</div>
                    <div className="stat-label">Active Candidates</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'candidates' && (
            <div className="candidates-section">
              <div className="section-header">
                <h3>Candidates Management</h3>
                <button
                  onClick={() => setShowCandidateForm(!showCandidateForm)}
                  className="btn btn-primary"
                >
                  {showCandidateForm ? 'Cancel' : 'Add Candidate'}
                </button>
              </div>

              {showCandidateForm && (
                <form onSubmit={handleCandidateSubmit} className="candidate-form">
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      value={candidateForm.name}
                      onChange={(e) =>
                        setCandidateForm({ ...candidateForm, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Party</label>
                    <input
                      type="text"
                      value={candidateForm.party}
                      onChange={(e) =>
                        setCandidateForm({ ...candidateForm, party: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      value={candidateForm.description}
                      onChange={(e) =>
                        setCandidateForm({ ...candidateForm, description: e.target.value })
                      }
                      rows="3"
                    />
                  </div>
                  <div className="form-group">
                    <label>Image URL</label>
                    <input
                      type="url"
                      value={candidateForm.image}
                      onChange={(e) =>
                        setCandidateForm({ ...candidateForm, image: e.target.value })
                      }
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Create Candidate
                  </button>
                </form>
              )}

              <div className="candidates-table">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Party</th>
                      <th>Votes</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {candidates.map((candidate) => (
                      <tr key={candidate._id}>
                        <td>{candidate.name}</td>
                        <td>{candidate.party}</td>
                        <td>{candidate.voteCount}</td>
                        <td>
                          <span
                            className={`status-badge ${
                              candidate.isActive ? 'active' : 'inactive'
                            }`}
                          >
                            {candidate.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td>
                          <button
                            onClick={() =>
                              toggleCandidateStatus(candidate._id, candidate.isActive)
                            }
                            className="btn btn-secondary btn-sm"
                          >
                            {candidate.isActive ? 'Deactivate' : 'Activate'}
                          </button>
                          <button
                            onClick={() => handleDeleteCandidate(candidate._id)}
                            className="btn btn-danger btn-sm"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="users-section">
              <div className="section-header">
                <h3>Users Management</h3>
                <button
                  onClick={() => {
                    setShowUserForm(!showUserForm);
                    setMessage({ type: '', text: '' });
                  }}
                  className="btn btn-primary"
                >
                  {showUserForm ? 'Cancel' : 'Register New User'}
                </button>
              </div>

              {showUserForm && (
                <form onSubmit={handleUserSubmit} className="candidate-form" style={{ marginBottom: '2rem' }}>
                  <h4 style={{ marginBottom: '1rem' }}>Register New User</h4>
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      value={userForm.name}
                      onChange={(e) =>
                        setUserForm({ ...userForm, name: e.target.value })
                      }
                      required
                      placeholder="Enter user's full name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      value={userForm.email}
                      onChange={(e) =>
                        setUserForm({ ...userForm, email: e.target.value })
                      }
                      required
                      placeholder="Enter user's email"
                    />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      value={userForm.password}
                      onChange={(e) =>
                        setUserForm({ ...userForm, password: e.target.value })
                      }
                      required
                      placeholder="Enter password (min 8 characters)"
                      minLength={8}
                    />
                  </div>
                  <div className="form-group">
                    <label>Confirm Password</label>
                    <input
                      type="password"
                      value={userForm.confirmPassword}
                      onChange={(e) =>
                        setUserForm({ ...userForm, confirmPassword: e.target.value })
                      }
                      required
                      placeholder="Confirm password"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Register User
                  </button>
                </form>
              )}

              <h3 style={{ marginTop: '2rem' }}>Users List</h3>
              <div className="users-table">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Has Voted</th>
                      <th>Registered</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user._id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                          <span
                            className={`status-badge ${
                              user.hasVoted ? 'voted' : 'not-voted'
                            }`}
                          >
                            {user.hasVoted ? 'Yes' : 'No'}
                          </span>
                        </td>
                        <td>
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;


