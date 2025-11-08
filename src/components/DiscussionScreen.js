import React from 'react';

/**
 * DiscussionScreen component - final discussion phase
 */
const DiscussionScreen = ({ playerAssignments, imposterCount, newGame }) => {
  return (
    <div className="App">
      <div className="container fade-in">
        <h1>Discussion Phase</h1>
        
        <div className="game-info">
          <h3>Game Information</h3>
          <p style={{ fontSize: '1.1rem', color: '#fffffe' }}>
            <strong>Secret Player:</strong> Hidden
          </p>
          <p><strong>Total Players:</strong> {playerAssignments.length}</p>
          <p><strong>Imposters:</strong> {imposterCount}</p>
          <div style={{ 
            marginTop: '20px', 
            padding: '16px', 
            background: 'rgba(255, 137, 6, 0.1)', 
            borderRadius: '10px' 
          }}>
            <p style={{ margin: 0, color: '#ff8906', fontWeight: '600' }}>
              Goal: Find the imposter(s)!
            </p>
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
          <p style={{ marginBottom: '12px' }}>
            Each player says a word or phrase about the secret player
          </p>
          <p style={{ marginBottom: '12px' }}>
            Imposters must blend in without knowing who this player is
          </p>
          <p style={{ marginBottom: '0' }}>
            Vote out who you think the imposters are!
          </p>
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
};

export default DiscussionScreen;