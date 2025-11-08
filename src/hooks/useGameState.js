import { useState, useCallback } from 'react';
import { capitalizePlayerName, getRandomPlayer, assignRoles, validateGameSetup } from '../utils/gameUtils';
import { GAME_STATES, ROLES } from '../constants/gameConstants';

/**
 * Custom hook to manage all game state and logic
 */
export const useGameState = () => {
  // Core game state
  const [gameState, setGameState] = useState(GAME_STATES.SETUP);
  const [playerNames, setPlayerNames] = useState([]);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [imposterCount, setImposterCount] = useState(1);
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [playerAssignments, setPlayerAssignments] = useState([]);
  const [revealedPlayers, setRevealedPlayers] = useState(new Set());
  const [currentlyViewing, setCurrentlyViewing] = useState(null);

  // Player management
  const addPlayer = useCallback(() => {
    if (newPlayerName.trim() !== '') {
      const capitalizedName = capitalizePlayerName(newPlayerName.trim());
      setPlayerNames(prev => [...prev, capitalizedName]);
      setNewPlayerName('');
    }
  }, [newPlayerName]);

  const removePlayer = useCallback((index) => {
    setPlayerNames(prev => prev.filter((_, i) => i !== index));
  }, []);

  const clearAllPlayers = useCallback(() => {
    setPlayerNames([]);
    setNewPlayerName('');
  }, []);

  // Game flow
  const startGame = useCallback(() => {
    const errors = validateGameSetup(playerNames, imposterCount);
    if (errors.length > 0) {
      alert(errors[0]);
      return;
    }

    const randomPlayer = getRandomPlayer();
    setSelectedPlayer(randomPlayer);

    const assignments = assignRoles(playerNames, imposterCount);
    setPlayerAssignments(assignments);
    setRevealedPlayers(new Set());
    setGameState(GAME_STATES.REVEAL);
  }, [playerNames, imposterCount]);

  const selectPlayer = useCallback((playerIndex) => {
    setCurrentlyViewing(playerIndex);
  }, []);

  const hideRole = useCallback(() => {
    if (currentlyViewing !== null) {
      const newRevealed = new Set(revealedPlayers);
      newRevealed.add(currentlyViewing);
      setRevealedPlayers(newRevealed);
      setCurrentlyViewing(null);
    }
  }, [currentlyViewing, revealedPlayers]);

  const goToDiscussion = useCallback(() => {
    setGameState(GAME_STATES.DISCUSSION);
  }, []);

  const newGame = useCallback(() => {
    setGameState(GAME_STATES.SETUP);
    setSelectedPlayer('');
    setPlayerAssignments([]);
    setRevealedPlayers(new Set());
    setCurrentlyViewing(null);
    setNewPlayerName('');
    // Keep playerNames - don't reset them
  }, []);

  const getPlayerRole = useCallback((playerIndex) => {
    const assignment = playerAssignments[playerIndex];
    return assignment?.isImposter ? ROLES.IMPOSTER : selectedPlayer;
  }, [playerAssignments, selectedPlayer]);

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addPlayer();
    }
  }, [addPlayer]);

  return {
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
  };
};