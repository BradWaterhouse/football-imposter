import React from 'react';

/**
 * GameSetup component - handles player setup and game configuration
 */
const GameSetup = ({
  playerNames,
  newPlayerName,
  setNewPlayerName,
  imposterCount,
  setImposterCount,
  addPlayer,
  removePlayer,
  clearAllPlayers,
  startGame,
  handleKeyPress
}) => {
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
                aria-label="Add player"
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
                      aria-label={`Remove ${name}`}
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
};

export default GameSetup;