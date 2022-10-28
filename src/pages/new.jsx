import { useContext } from 'react';
import styled from 'styled-components';
import { GameContext } from '../context/GameContext';
import { Button, Heading, Card, Switch, LayoutWrapper } from '../components';
import { IconX, IconO } from '../components/game-symbols';

export const NewGame = () => {
  const { state, dispatch } = useContext(GameContext);

  const onPlayerMarkChange = (e) => {
    dispatch({ type: 'SETPLAYER1MARKER', payload: e.target.value });
  };

  const switchOptions = [
    { label: <IconX />, value: 'X', default: state.player1Marker === 'X' },
    { label: <IconO />, value: 'O', default: state.player1Marker === 'O' },
  ];

  return (
    <LayoutWrapper>
      <Logo src="assets/logo.svg" alt="Tic Tac Toe" />
      <MarkSelector>
        <MainHeading size="xs">Pick Player 1's mark</MainHeading>
        <Switch options={switchOptions} onChange={onPlayerMarkChange} />
        <SubHeading>Remember: X goes first</SubHeading>
      </MarkSelector>
      <Button color="yellow" href="/play" disabled>
        New Game (vs CPU)
      </Button>
      <Button color="blue" href="/play">
        New Game (vs player)
      </Button>
      <Button
        type="secondary"
        onClick={() => dispatch({ type: 'SETSOUNDEFFECTS', payload: !state.soundEffectsEnabled })}
      >
        {state.soundEffectsEnabled ? 'Disable' : 'Enable'} sound effects
      </Button>
    </LayoutWrapper>
  );
};

const Logo = styled.img`
  margin-bottom: 10px;
`;

const MarkSelector = styled(Card)`
  margin: 30px 0;
`;

const MainHeading = styled(Heading)`
  margin: 0 0 24px;
`;

const SubHeading = styled.p`
  margin: 24px 0 0;
  font-weight: 400;
`;
