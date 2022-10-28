import { useReducer, createContext, useEffect } from 'react';

export const GameContext = createContext({});

const createEmptyBoard = () => [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

function gameReducer(state, action) {
  switch (action.type) {
    case 'SETGAMEINPROGRESS': {
      return {
        ...state,
        gameInProgress: action.payload,
      };
    }
    case 'SETPLAYER1MARKER': {
      const player1Marker = action.payload.toUpperCase();

      return {
        ...state,
        player1Marker: player1Marker,
        player2Marker: player1Marker === 'X' ? 'O' : 'X',
        playerTurn: player1Marker === 'X' ? 1 : 2,
      };
    }
    case 'SETPLAYERTURN': {
      return {
        ...state,
        playerTurn: action.payload,
      };
    }
    case 'SETGAMEBOARD': {
      return {
        ...state,
        board: action.payload,
        gameInProgress: true,
      };
    }
    case 'WINNER': {
      return {
        ...state,
        winner: action.payload,
        score: {
          ...state.score,
          [action.payload]: state.score[action.payload] + 1,
        },
      };
    }
    case 'TIE': {
      return {
        ...state,
        winner: 'ties',
        score: {
          ...state.score,
          ties: state.score.ties + 1,
        },
      };
    }
    case 'NEXTROUND': {
      return {
        ...state,
        winner: null,
        playerTurn: state.player1Marker === 'X' ? 1 : 2,
        board: createEmptyBoard(),
      };
    }
    case 'CONFIRMRESTART': {
      return {
        ...state,
        restartPending: action.payload,
      };
    }
    case 'RESETGAME': {
      return {
        ...state,
        restartPending: false,
        gameInProgress: false,
        winner: null,
        player1Marker: 'X',
        player2Marker: 'O',
        playerTurn: 1,
        score: {
          X: 0,
          ties: 0,
          O: 0,
        },
        board: createEmptyBoard(),
      };
    }
    case 'SETSOUNDEFFECTS': {
      return {
        ...state,
        soundEffectsEnabled: action.payload,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

export const GameProvider = ({ children }) => {
  const savedState = localStorage.getItem('gameState') ? JSON.parse(localStorage.getItem('gameState')) : null;

  const defaultState = {
    gameInProgress: false,
    restartPending: false,
    player1Marker: 'X',
    player2Marker: 'O',
    playerTurn: 1,
    board: createEmptyBoard(),
    score: {
      X: 0,
      ties: 0,
      O: 0,
    },
    soundEffectsEnabled: true,
  };

  const [state, dispatch] = useReducer(gameReducer, savedState || defaultState);

  useEffect(() => {
    localStorage.setItem('gameState', JSON.stringify(state));
  }, [state]);

  return <GameContext.Provider value={{ state, dispatch }}>{children}</GameContext.Provider>;
};
