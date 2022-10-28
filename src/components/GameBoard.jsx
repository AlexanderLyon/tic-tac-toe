import { useContext } from 'react';
import styled from 'styled-components';
import useSound from 'use-sound';
import { GameContext } from '../context/GameContext';
import UiSwitchSfx from '../sounds/ui-switch.mp3';
import { Card } from '../components';
import { IconX, IconO, IconXOutline, IconOOutline } from '../components/game-symbols';

export const GameBoard = () => {
  const { state, dispatch } = useContext(GameContext);
  const { board, playerTurn, player1Marker, player2Marker } = state;
  const [play] = useSound(UiSwitchSfx, { volume: 0.25, soundEnabled: state.soundEffectsEnabled });

  const handleTileClick = (rowIndex, columnIndex) => {
    if (!board[rowIndex][columnIndex]) {
      play();
      const updatedBoard = [...board];
      updatedBoard[rowIndex][columnIndex] = playerTurn === 1 ? player1Marker : player2Marker;
      dispatch({ type: 'SETGAMEBOARD', payload: updatedBoard });
      dispatch({ type: 'SETPLAYERTURN', payload: playerTurn === 1 ? 2 : 1 });
      checkForWinner();
    }
  };

  const checkForWinner = () => {
    const winningCombinations = [
      [board[0][0], board[0][1], board[0][2]],
      [board[1][0], board[1][1], board[1][2]],
      [board[2][0], board[2][1], board[2][2]],
      [board[0][0], board[1][0], board[2][0]],
      [board[0][1], board[1][1], board[2][1]],
      [board[0][2], board[1][2], board[2][2]],
      [board[0][0], board[1][1], board[2][2]],
      [board[0][2], board[1][1], board[2][0]],
    ];

    const spacesLeft = board.flat().filter((space) => space === '').length;

    const player1Wins = winningCombinations.some((combination) => {
      return combination.every((tile) => tile === player1Marker);
    });

    const player2Wins = winningCombinations.some((combination) => {
      return combination.every((tile) => tile === player2Marker);
    });

    const winner = player1Wins ? player1Marker : player2Wins ? player2Marker : null;

    if (winner) {
      dispatch({ type: 'WINNER', payload: winner });
    } else if (!spacesLeft) {
      dispatch({ type: 'TIE' });
    }
  };

  return (
    <Board>
      {board.map((row, rowIndex) =>
        row.map((column, columnIndex) => {
          const identifier = `${rowIndex},${columnIndex}`;
          const marker = board[rowIndex][columnIndex].toUpperCase();
          const icon = marker === 'X' ? <IconX /> : marker === 'O' ? <IconO /> : null;
          const currentPlayerMarker = playerTurn === 1 ? player1Marker : player2Marker;
          const previewIcon =
            currentPlayerMarker === 'X' ? <IconXOutline /> : currentPlayerMarker === 'O' ? <IconOOutline /> : null;

          if (!icon) {
            return (
              <AvailableTile size="l" key={identifier} onClick={() => handleTileClick(rowIndex, columnIndex)}>
                <div className="previewIcon">{previewIcon}</div>
              </AvailableTile>
            );
          }

          return (
            <Tile size="l" key={identifier}>
              {icon}
            </Tile>
          );
        })
      )}
    </Board>
  );
};

const Board = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  margin-top: 20px;
  width: 100%;
`;

const Tile = styled(Card)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1;

  svg {
    position: absolute;
    width: 50%;
    left: 50%;
    top: 50%;
    padding-bottom: 8px;
    overflow: visible;
    transform: translateX(-50%) translateY(-50%);
  }
`;

const AvailableTile = styled(Tile)`
  cursor: pointer;

  .previewIcon {
    opacity: 0;
    transition: opacity 200ms ease-in-out;
  }

  &:hover .previewIcon {
    opacity: 1;
  }
`;
