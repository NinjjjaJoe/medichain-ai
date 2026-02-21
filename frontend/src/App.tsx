import { useState } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import './styles/App.css';

// Contract addresses - update after deployment
// const MODEL_NFT_ADDRESS = '0x0000000000000000000000000000000000000000';
// const INFER_TOKEN_ADDRESS = '0x0000000000000000000000000000000000000000';
// const MARKETPLACE_ADDRESS = '0x0000000000000000000000000000000000000000';

function App() {
  const { address, isConnected } = useAccount();
  const [activeSection, setActiveSection] = useState<'explore' | 'create' | 'dashboard'>('explore');
  
  // Model creation form
  const [modelName, setModelName] = useState('');
  const [modelHash, setModelHash] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [fdaCleared, setFdaCleared] = useState(false);
  const [clearanceUrl, setClearanceUrl] = useState('');

  const { isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({});

  if (!isConnected) {
    return (
      <div className="app">
        {/* Tesla-Style Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">MediChain AI</h1>
            <p className="hero-subtitle">
              AI-Powered Diagnostic Models on the Edge
            </p>
            <p className="hero-description">
              Token-gated access to FDA-cleared AI models.
              Run diagnostics locally. Pay per inference. Trust the blockchain.
            </p>
            <div className="hero-cta">
              <button className="cta-button primary">Connect Wallet to Start</button>
            </div>
          </div>
          
          <div className="hero-stats">
            <div className="stat-card">
              <div className="stat-value">1000+</div>
              <div className="stat-label">AI Models</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">50K+</div>
              <div className="stat-label">Inferences</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">$2.5M</div>
              <div className="stat-label">Volume</div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <h2 className="section-title">How It Works</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🤖</div>
              <h3>AI Model NFTs</h3>
              <p>Each model is an ERC-1155 token with FDA clearance tracking and IPFS-hosted binaries</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💎</div>
              <h3>Pay-Per-Inference</h3>
              <p>Micro-payments via InferToken (INFER) with automatic creator rewards on Arbitrum L2</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Edge Deployment</h3>
              <p>Run models locally on medical devices. No PHI leaves your premises</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Instant Verification</h3>
              <p>On-chain reputation and third-party audit badges ensure model quality</p>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="use-cases-section">
          <h2 className="section-title">Use Cases</h2>
          <div className="use-case-grid">
            <div className="use-case-card">
              <h3>🏥 Private Imaging Centers</h3>
              <p>Run lung-nodule detection without uploading patient data to the cloud</p>
            </div>
            <div className="use-case-card">
              <h3>🔬 AI Labs</h3>
              <p>Monetize diagnostic models with compliant pay-per-use licensing</p>
            </div>
            <div className="use-case-card">
              <h3>🏢 Hospitals</h3>
              <p>Access verified AI models for X-ray, ultrasound, and ECG analysis</p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="app">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-brand">
          <h1>MediChain AI</h1>
        </div>
        <div className="nav-links">
          <button 
            className={`nav-link ${activeSection === 'explore' ? 'active' : ''}`}
            onClick={() => setActiveSection('explore')}
          >
            Explore Models
          </button>
          <button 
            className={`nav-link ${activeSection === 'create' ? 'active' : ''}`}
            onClick={() => setActiveSection('create')}
          >
            Create Model
          </button>
          <button 
            className={`nav-link ${activeSection === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveSection('dashboard')}
          >
            Dashboard
          </button>
        </div>
        <div className="nav-wallet">
          <span className="wallet-address">{address?.slice(0, 6)}...{address?.slice(-4)}</span>
        </div>
      </nav>

      {/* Status Messages */}
      {isPending && <div className="alert alert-info">⏳ Transaction pending...</div>}
      {isConfirming && <div className="alert alert-info">⏳ Confirming...</div>}
      {isSuccess && <div className="alert alert-success">✅ Success!</div>}

      {/* Explore Models Section */}
      {activeSection === 'explore' && (
        <section className="content-section">
          <div className="section-header">
            <h2>Explore AI Models</h2>
            <div className="filter-buttons">
              <button className="filter-btn active">All Models</button>
              <button className="filter-btn">FDA Cleared</button>
              <button className="filter-btn">Verified</button>
              <button className="filter-btn">Top Rated</button>
            </div>
          </div>

          <div className="models-grid">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="model-card">
                <div className="model-image">
                  <div className="model-placeholder">🤖</div>
                  <div className="model-badges">
                    <span className="badge fda">FDA ✓</span>
                    <span className="badge verified">Verified</span>
                  </div>
                </div>
                <div className="model-content">
                  <h3>Lung Nodule Detection v2.1</h3>
                  <p className="model-creator">by AI Lab #{i}</p>
                  <p className="model-description">
                    Deep learning model for detecting pulmonary nodules in chest X-rays
                  </p>
                  <div className="model-stats">
                    <span className="stat">
                      <span className="stat-icon">📊</span>
                      2.5K inferences
                    </span>
                    <span className="stat">
                      <span className="stat-icon">⭐</span>
                      4.8/5.0
                    </span>
                  </div>
                  <div className="model-footer">
                    <div className="model-price">
                      <span className="price-value">10</span>
                      <span className="price-token">INFER</span>
                      <span className="price-label">per inference</span>
                    </div>
                    <button className="btn-primary">Purchase Access</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Create Model Section */}
      {activeSection === 'create' && (
        <section className="content-section">
          <div className="section-header">
            <h2>Mint AI Model NFT</h2>
            <p className="section-subtitle">Upload your diagnostic model to the marketplace</p>
          </div>

          <div className="form-container">
            <form className="create-form" onSubmit={(e) => {
              e.preventDefault();
              // Handle model creation
            }}>
              <div className="form-group">
                <label>Model Name</label>
                <input
                  type="text"
                  value={modelName}
                  onChange={(e) => setModelName(e.target.value)}
                  placeholder="e.g., Lung Nodule Detection v2.1"
                  required
                />
              </div>

              <div className="form-group">
                <label>IPFS Model Hash</label>
                <input
                  type="text"
                  value={modelHash}
                  onChange={(e) => setModelHash(e.target.value)}
                  placeholder="QmX... (IPFS hash of ONNX/TFLite model)"
                  required
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your model's capabilities and use cases"
                  rows={4}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Price per Inference (INFER)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="10"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={fdaCleared}
                      onChange={(e) => setFdaCleared(e.target.checked)}
                    />
                    <span>FDA/CE Cleared</span>
                  </label>
                </div>
              </div>

              {fdaCleared && (
                <div className="form-group">
                  <label>Clearance Document URL</label>
                  <input
                    type="url"
                    value={clearanceUrl}
                    onChange={(e) => setClearanceUrl(e.target.value)}
                    placeholder="https://..."
                  />
                </div>
              )}

              <div className="form-actions">
                <button type="submit" className="btn-primary" disabled={isPending}>
                  {isPending ? 'Minting...' : 'Mint Model NFT'}
                </button>
                <button type="button" className="btn-secondary">
                  Cancel
                </button>
              </div>

              <div className="info-box">
                <p>ℹ️ Your model will be minted as an ERC-1155 NFT. You'll earn 95% of all inference fees (5% marketplace fee).</p>
              </div>
            </form>
          </div>
        </section>
      )}

      {/* Dashboard Section */}
      {activeSection === 'dashboard' && (
        <section className="content-section">
          <div className="section-header">
            <h2>Your Dashboard</h2>
          </div>

          <div className="dashboard-stats">
            <div className="dashboard-card">
              <div className="card-icon">💰</div>
              <div className="card-content">
                <div className="card-value">1,250</div>
                <div className="card-label">INFER Balance</div>
              </div>
              <button className="card-action">Buy More</button>
            </div>

            <div className="dashboard-card">
              <div className="card-icon">📊</div>
              <div className="card-content">
                <div className="card-value">125</div>
                <div className="card-label">Total Inferences</div>
              </div>
            </div>

            <div className="dashboard-card">
              <div className="card-icon">💎</div>
              <div className="card-content">
                <div className="card-value">3</div>
                <div className="card-label">Models Owned</div>
              </div>
            </div>

            <div className="dashboard-card">
              <div className="card-icon">⭐</div>
              <div className="card-content">
                <div className="card-value">850</div>
                <div className="card-label">Reputation Score</div>
              </div>
            </div>
          </div>

          <div className="dashboard-sections">
            <div className="dashboard-section">
              <h3>Your Models</h3>
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Model</th>
                      <th>Inferences</th>
                      <th>Earnings</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="table-model">
                          <span className="model-icon">🤖</span>
                          <span>Lung Nodule Detection</span>
                        </div>
                      </td>
                      <td>2,543</td>
                      <td>24,158 INFER</td>
                      <td><span className="status-badge verified">Verified</span></td>
                      <td>
                        <button className="btn-small">Withdraw</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="dashboard-section">
              <h3>Recent Activity</h3>
              <div className="activity-list">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="activity-item">
                    <div className="activity-icon">📊</div>
                    <div className="activity-content">
                      <div className="activity-title">Inference Completed</div>
                      <div className="activity-meta">Model #1 • 2 hours ago</div>
                    </div>
                    <div className="activity-amount">+10 INFER</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default App;
