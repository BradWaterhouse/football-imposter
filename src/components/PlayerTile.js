import React from 'react';

/**
 * PlayerTile component for the reveal screen
 * Shows a player's name and their reveal status
 */
const PlayerTile = ({ name, isRevealed, onClick }) => {
  return (
    <div 
      className={`player-tile ${isRevealed ? 'completed' : 'available'}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && onClick()}
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

export default PlayerTile;