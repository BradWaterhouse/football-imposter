import React, { useEffect } from 'react';
import './App.css';

// Components
import GameSetup from './components/GameSetup';
import RevealScreen from './components/RevealScreen';
import RoleReveal from './components/RoleReveal';
import DiscussionScreen from './components/DiscussionScreen';

// Hooks
import { useGameState } from './hooks/useGameState';

// Constants
import { GAME_STATES } from './constants/gameConstants';

/**
 * Main App component - Football Imposter Game
 * A social deduction game where players try to identify imposters
 */
function App() {
  const {
    // State
    gameState,
    playerNames,
    newPlayerName,
    imposterCount,
    selectedPlayer,
    playerAssignments,
    revealedPlayers,
    currentlyViewing,
    
    // Setters
    setNewPlayerName,
    setImposterCount,
    
    // Actions
    addPlayer,
    removePlayer,
    clearAllPlayers,
    startGame,
    selectPlayer,
    hideRole,
    goToDiscussion,
    newGame,
    getPlayerRole,
    handleKeyPress
  } = useGameState();

  // Register service worker for PWA functionality
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .catch(error => console.error('SW registration failed:', error));
    }
  }, []);

  // Render setup screen
  if (gameState === GAME_STATES.SETUP) {
    return (
      <GameSetup
        playerNames={playerNames}
        newPlayerName={newPlayerName}
        setNewPlayerName={setNewPlayerName}
        imposterCount={imposterCount}
        setImposterCount={setImposterCount}
        addPlayer={addPlayer}
        removePlayer={removePlayer}
        clearAllPlayers={clearAllPlayers}
        startGame={startGame}
        handleKeyPress={handleKeyPress}
      />
    );
  }

  // Render reveal phase
  if (gameState === GAME_STATES.REVEAL) {
    // Show individual role reveal
    if (currentlyViewing !== null) {
      const playerRole = getPlayerRole(currentlyViewing);
      const playerName = playerAssignments[currentlyViewing].name;
      
      return (
        <RoleReveal
          playerName={playerName}
          playerRole={playerRole}
          selectedPlayer={selectedPlayer}
          onHide={hideRole}
        />
      );
    }

    // Show player selection screen
    return (
      <RevealScreen
        playerAssignments={playerAssignments}
        revealedPlayers={revealedPlayers}
        selectPlayer={selectPlayer}
        newGame={newGame}
        goToDiscussion={goToDiscussion}
      />
    );
  }

  // Render discussion screen
  if (gameState === GAME_STATES.DISCUSSION) {
    return (
      <DiscussionScreen
        playerAssignments={playerAssignments}
        imposterCount={imposterCount}
        newGame={newGame}
      />
    );
  }

  // Fallback
  return null;
}

export default App;