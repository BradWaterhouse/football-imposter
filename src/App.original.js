import React, { useState, useEffect } from 'react';
import './App.css';
import players from './players.json';

function App() {
  const [gameState, setGameState] = useState('setup');
  const [playerNames, setPlayerNames] = useState([]);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [imposterCount, setImposterCount] = useState(1);
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [playerAssignments, setPlayerAssignments] = useState([]);
  const [revealedPlayers, setRevealedPlayers] = useState(new Set());
  const [currentlyViewing, setCurrentlyViewing] = useState(null);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js');
    }
  }, []);

  const addPlayer = () => {
    if (newPlayerName.trim() !== '') {
      // Capitalize first letter of each word
      const capitalizedName = newPlayerName.trim()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
      setPlayerNames([...playerNames, capitalizedName]);
      setNewPlayerName('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addPlayer();
    }
  };

  const removePlayer = (index) => {
    const newNames = playerNames.filter((_, i) => i !== index);
    setPlayerNames(newNames);
  };

  const clearAllPlayers = () => {
    setPlayerNames([]);
    setNewPlayerName('');
  };

  const startGame = () => {
    if (playerNames.length < 3) {
      alert('You need at least 3 players to start the game!');
      return;
    }

    if (imposterCount >= playerNames.length) {
      alert('Number of imposters must be less than total players!');
      return;
    }

    const randomPlayer = players[Math.floor(Math.random() * players.length)];
    setSelectedPlayer(randomPlayer);

    const assignments = playerNames.map(name => ({ name, isImposter: false }));
    
    const imposterIndices = [];
    while (imposterIndices.length < imposterCount) {
      const randomIndex = Math.floor(Math.random() * playerNames.length);
      if (!imposterIndices.includes(randomIndex)) {
        imposterIndices.push(randomIndex);
      }
    }
    
    imposterIndices.forEach(index => {
      assignments[index].isImposter = true;
    });

    setPlayerAssignments(assignments);
    setRevealedPlayers(new Set());
    setGameState('reveal');
  };

  const selectPlayer = (playerIndex) => {
    setCurrentlyViewing(playerIndex);
  };

  const revealRole = () => {
    // This will be called when they press "Reveal" 
    // Role will be shown temporarily
  };

  const hideRole = () => {
    if (currentlyViewing !== null) {
      const newRevealed = new Set(revealedPlayers);
      newRevealed.add(currentlyViewing);
      setRevealedPlayers(newRevealed);
      setCurrentlyViewing(null);
    }
  };

  const goToDiscussion = () => {
    setGameState('discussion');
  };

  const newGame = () => {
    setGameState('setup');
    setSelectedPlayer('');
    setPlayerAssignments([]);
    setRevealedPlayers(new Set());
    setCurrentlyViewing(null);
    setNewPlayerName('');
    // Keep playerNames - don't reset them
  };

  const getPlayerRole = (playerIndex) => {
    const assignment = playerAssignments[playerIndex];
    return assignment?.isImposter ? 'IMPOSTER' : selectedPlayer;
  };

  const PlayerTile = ({ name, isRevealed, onClick }) => {
    return (
      <div 
        className={`player-tile ${isRevealed ? 'completed' : 'available'}`}
        onClick={onClick}
      >
        <div className="player-tile-name">{name}</div>
        {isRevealed ? (
          <div className="player-tile-status">✓ Viewed</div>
        ) : (
          <div className="player-tile-prompt">Tap to select</div>
        )}
      </div>
    );
  };

  if (gameState === 'setup') {
    return (
      <div className="App">
        <div className="mobile-setup">
          <div className="setup-header">
            <h1>Football Imposter</h1>
            <div className="game-stats">
              <div className="stat-card">
                <span className="stat-number">{playerNames.length}</span>
                <span className="stat-label">Players</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">{imposterCount}</span>
                <span className="stat-label">Imposters</span>
              </div>
            </div>
          </div>

          <div className="setup-content">
            <div className="section">
              <label className="section-title">Add Players</label>
              <div className="input-row">
                <input
                  type="text"
                  placeholder="Player name"
                  value={newPlayerName}
                  onChange={(e) => setNewPlayerName(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="player-input"
                  autoComplete="off"
                  autoCapitalize="words"
                />
                <button 
                  className="add-btn" 
                  onClick={addPlayer}
                  disabled={newPlayerName.trim() === ''}
                >
                  +
                </button>
              </div>
            </div>

            {playerNames.length > 0 && (
              <div className="section">
                <div className="players-header">
                  <label className="section-title">Players ({playerNames.length})</label>
                  <button 
                    className="clear-all-btn"
                    onClick={clearAllPlayers}
                  >
                    Clear All
                  </button>
                </div>
                <div className="players-grid">
                  {playerNames.map((name, index) => (
                    <div key={index} className="player-chip">
                      <span className="player-name">{name}</span>
                      <button 
                        className="remove-btn"
                        onClick={() => removePlayer(index)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="section">
              <label className="section-title">Imposters</label>
              <div className="imposter-selector">
                {[1, 2, 3].map(num => (
                  <button
                    key={num}
                    className={`imposter-btn ${imposterCount === num ? 'active' : ''}`}
                    onClick={() => setImposterCount(num)}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="start-section">
            <button 
              className="start-btn" 
              onClick={startGame}
              disabled={playerNames.length < 3}
            >
              {playerNames.length < 3 
                ? `Need ${3 - playerNames.length} more players` 
                : `Start Game`
              }
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'reveal') {
    const allRevealed = revealedPlayers.size === playerAssignments.length;

    // If someone is viewing their role
    if (currentlyViewing !== null) {
      const playerRole = getPlayerRole(currentlyViewing);
      const playerName = playerAssignments[currentlyViewing].name;
      
      return (
        <div className="App">
          <div className="role-reveal-screen">
            <div className="role-reveal-content">
              <h2>{playerName}</h2>
              <div className={`role-display ${playerRole === 'IMPOSTER' ? 'imposter' : 'player'}`}>
                {playerRole}
              </div>
              <p className="role-instruction">
                {playerRole === 'IMPOSTER' 
                  ? 'You are an imposter! Blend in without revealing you don\'t know the player.' 
                  : 'You know this player. Give clues about them without being too obvious.'
                }
              </p>
              <button 
                className="hide-role-btn"
                onClick={hideRole}
              >
                Hide & Continue
              </button>
            </div>
          </div>
        </div>
      );
    }

    // Main tile selection screen
    return (
      <div className="App">
        <div className="reveal-screen">
          <div className="reveal-header">
            <h1>Select Your Name</h1>
            <p>Each player taps their name to see their role privately</p>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${(revealedPlayers.size / playerAssignments.length) * 100}%` }}></div>
            </div>
            <p className="progress-text">{revealedPlayers.size} of {playerAssignments.length} players ready</p>
          </div>

          <div className="players-tiles">
            {playerAssignments.map((assignment, index) => {
              const isRevealed = revealedPlayers.has(index);
              return (
                <PlayerTile
                  key={index}
                  name={assignment.name}
                  isRevealed={isRevealed}
                  onClick={() => !isRevealed && selectPlayer(index)}
                />
              );
            })}
          </div>

          <div className="reveal-footer">
            <button 
              className="new-game-btn"
              onClick={newGame}
            >
              New Game
            </button>
            <button 
              className={`start-discussion-btn ${allRevealed ? 'ready' : 'waiting'}`}
              onClick={goToDiscussion}
              disabled={!allRevealed}
            >
              {allRevealed ? 'Start Discussion' : 'Waiting for all players...'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'discussion') {
    return (
      <div className="App">
        <div className="container fade-in">
          <h1>Discussion Phase</h1>
          
          <div className="game-info">
            <h3>Game Information</h3>
            <p style={{ fontSize: '1.1rem', color: '#fffffe' }}><strong>Secret Player:</strong> Hidden</p>
            <p><strong>Total Players:</strong> {playerAssignments.length}</p>
            <p><strong>Imposters:</strong> {imposterCount}</p>
            <div style={{ marginTop: '20px', padding: '16px', background: 'rgba(255, 137, 6, 0.1)', borderRadius: '10px' }}>
              <p style={{ margin: 0, color: '#ff8906', fontWeight: '600' }}>Goal: Find the imposter(s)!</p>
            </div>
          </div>

          <div style={{ 
            background: 'rgba(255, 255, 254, 0.05)', 
            padding: '24px', 
            borderRadius: '16px', 
            margin: '24px 0',
            border: '2px solid rgba(167, 169, 190, 0.2)'
          }}>
            <h3 style={{ color: '#ff8906', marginBottom: '16px' }}>How to Play:</h3>
            <p style={{ marginBottom: '12px' }}>Each player says a word or phrase about the secret player</p>
            <p style={{ marginBottom: '12px' }}>Imposters must blend in without knowing who this player is</p>
            <p style={{ marginBottom: '0' }}>Vote out who you think the imposters are!</p>
          </div>

          <div className="navigation-buttons">
            <button 
              className="button"
              onClick={newGame}
              style={{ fontSize: '1.1rem', padding: '18px 36px' }}
            >
New Game (Same Players)
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default App;