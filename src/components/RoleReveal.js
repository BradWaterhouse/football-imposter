import React from 'react';
import { ROLES, MESSAGES } from '../constants/gameConstants';

/**
 * RoleReveal component - shows individual player their role privately
 */
const RoleReveal = ({ playerName, playerRole, selectedPlayer, onHide }) => {
  const isImposter = playerRole === ROLES.IMPOSTER;

  return (
    <div className="App">
      <div className="role-reveal-screen">
        <div className="role-reveal-content">
          <h2>{playerName}</h2>
          <div className={`role-display ${isImposter ? 'imposter' : 'player'}`}>
            {playerRole}
          </div>
          <p className="role-instruction">
            {isImposter ? MESSAGES.IMPOSTER_INSTRUCTION : MESSAGES.PLAYER_INSTRUCTION}
          </p>
          <button 
            className="hide-role-btn"
            onClick={onHide}
          >
            Hide & Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleReveal;