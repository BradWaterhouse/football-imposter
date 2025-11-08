import React from 'react';
import PlayerTile from './PlayerTile';

/**
 * RevealScreen component - handles the player selection and role reveal phase
 */
const RevealScreen = ({
  playerAssignments,
  revealedPlayers,
  selectPlayer,
  newGame,
  goToDiscussion
}) => {
  const allRevealed = revealedPlayers.size === playerAssignments.length;

  return (
    <div className="App">
      <div className="reveal-screen">
        <div className="reveal-header">
          <h1>Select Your Name</h1>
          <p>Each player taps their name to see their role privately</p>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${(revealedPlayers.size / playerAssignments.length) * 100}%` }}
            />
          </div>
          <p className="progress-text">
            {revealedPlayers.size} of {playerAssignments.length} players ready
          </p>
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
};

export default RevealScreen;