/**
 * Game constants and configuration
 */

// Game states
export const GAME_STATES = {
  SETUP: 'setup',
  REVEAL: 'reveal',
  DISCUSSION: 'discussion'
};

// Game rules
export const GAME_RULES = {
  MIN_PLAYERS: 3,
  MAX_IMPOSTERS: 5,
  MIN_IMPOSTERS: 1
};

// Player roles
export const ROLES = {
  IMPOSTER: 'IMPOSTER',
  PLAYER: 'PLAYER'
};

// UI messages
export const MESSAGES = {
  NEED_MORE_PLAYERS: 'You need at least 3 players to start the game!',
  TOO_MANY_IMPOSTERS: 'Number of imposters must be less than total players!',
  IMPOSTER_INSTRUCTION: 'You are an imposter! Blend in without revealing you don\'t know the player.',
  PLAYER_INSTRUCTION: 'You know this player. Give clues about them without being too obvious.'
};