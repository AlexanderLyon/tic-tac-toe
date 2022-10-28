import { useContext } from 'react';
import styled from 'styled-components';
import { GameContext } from '../context/GameContext';
import { Heading, Card } from '../components';
import { theme } from '../theme';

export const Scoreboard = () => {
  const { state } = useContext(GameContext);
  const { score } = state;

  return (
    <ScoreboardWrapper>
      <Player1Status size="s">
        <ScoreTitle>X</ScoreTitle>
        <ScoreNumber size="m">{score.X}</ScoreNumber>
      </Player1Status>
      <StatusCard size="s">
        <ScoreTitle>Ties</ScoreTitle>
        <ScoreNumber size="m">{score.ties}</ScoreNumber>
      </StatusCard>
      <Player2Status size="s">
        <ScoreTitle>O</ScoreTitle>
        <ScoreNumber size="m">{score.O}</ScoreNumber>
      </Player2Status>
    </ScoreboardWrapper>
  );
};

const ScoreboardWrapper = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 20px;
  width: 100%;
`;

const StatusCard = styled(Card)`
  background-color: ${theme.colors.silver};
  color: ${theme.colors.darkNavy};
`;

const Player1Status = styled(StatusCard)`
  background-color: ${theme.colors.lightBlue};
`;

const Player2Status = styled(StatusCard)`
  background-color: ${theme.colors.lightYellow};
`;

const ScoreTitle = styled.p`
  margin: 0;
  font-weight: 400;
`;

const ScoreNumber = styled(Heading)`
  margin: 0;
`;
