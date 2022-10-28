import { useContext } from 'react';
import styled from 'styled-components';
import { GameContext } from '../context/GameContext';
import { Button, Card, GameBoard, Scoreboard, LayoutWrapper } from '../components';
import { IconX, IconO, IconRestart } from '../components/game-symbols';
import { theme } from '../theme';

export const PlayGame = () => {
  const { state, dispatch } = useContext(GameContext);
  const { playerTurn, player1Marker, player2Marker } = state;

  const player1Icon = player1Marker === 'X' ? <IconX /> : <IconO />;
  const player2Icon = player2Marker === 'X' ? <IconX /> : <IconO />;

  const resetBoard = () => {
    dispatch({ type: 'CONFIRMRESTART', payload: true });
  };

  return (
    <LayoutWrapper>
      <BoardContainer>
        <InfoRow>
          <Logo src="assets/logo.svg" alt="Tic Tac Toe" />
          <TurnIndicator size="s">
            {playerTurn === 1 ? player1Icon : player2Icon}
            Turn
          </TurnIndicator>
          <RestartButton type="secondary" onClick={resetBoard}>
            <IconRestart />
          </RestartButton>
        </InfoRow>
        <GameBoard />
        <Scoreboard />
        <SoundEffectsButton
          type="secondary"
          onClick={() => dispatch({ type: 'SETSOUNDEFFECTS', payload: !state.soundEffectsEnabled })}
        >
          {state.soundEffectsEnabled ? 'Disable' : 'Enable'} sound effects
        </SoundEffectsButton>
      </BoardContainer>
    </LayoutWrapper>
  );
};

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Logo = styled.img`
  width: 72px;
  height: auto;
`;

const TurnIndicator = styled(Card)`
  display: flex;
  align-items: center;

  svg {
    margin-right: 10px;
    height: 20px;
    width: 20px;

    path {
      fill: ${theme.colors.silver};
    }
  }
`;

const RestartButton = styled(Button)`
  margin: 0;
  width: 52px;
  height: 52px;

  svg {
    height: 100%;
    width: 20px;
  }
`;

const SoundEffectsButton = styled(Button)`
  margin-top: 20px;
`;
