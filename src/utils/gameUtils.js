import players from '../players.json';
import { GAME_RULES, MESSAGES } from '../constants/gameConstants';

/**
 * Utility functions for game logic
 */

/**
 * Capitalizes player names properly (first letter of each word)
 */
export const capitalizePlayerName = (name) => {
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

/**
 * Gets a random football player from the database
 */
export const getRandomPlayer = () => {
  return players[Math.floor(Math.random() * players.length)];
};

/**
 * Assigns roles to players (imposters vs regular players)
 */
export const assignRoles = (playerNames, imposterCount) => {
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

  return assignments;
};

/**
 * Validates game setup before starting
 */
export const validateGameSetup = (playerNames, imposterCount) => {
  const errors = [];
  
  if (playerNames.length < GAME_RULES.MIN_PLAYERS) {
    errors.push(MESSAGES.NEED_MORE_PLAYERS);
  }
  
  if (imposterCount >= playerNames.length) {
    errors.push(MESSAGES.TOO_MANY_IMPOSTERS);
  }
  
  if (imposterCount < GAME_RULES.MIN_IMPOSTERS) {
    errors.push('You need at least 1 imposter!');
  }
  
  return errors;
};