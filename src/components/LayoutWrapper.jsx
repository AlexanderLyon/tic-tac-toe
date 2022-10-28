import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { GameContext } from '../context/GameContext';
import { AlertBanner, Button } from '../components';
import { IconX, IconO } from './game-symbols';
import { theme } from '../theme';

export const LayoutWrapper = ({ children }) => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(GameContext);
  const { winner, restartPending } = state;

  const showBanner = () => {
    if (winner) {
      const messageText = winner === 'ties' ? 'Round tied' : 'takes the round';
      const icon = winner === 'X' ? <IconX /> : winner === 'O' ? <IconO /> : null;

      return (
        <AlertBanner
          message={messageText}
          icon={icon}
          messageColor={
            winner === 'X' ? theme.colors.lightBlue : winner === 'O' ? theme.colors.lightYellow : theme.colors.silver
          }
          secondaryButton={
            <Button
              type="secondary"
              color="silver"
              onClick={() => {
                dispatch({ type: 'RESETGAME' });
                navigate('/new');
              }}
            >
              Quit
            </Button>
          }
          primaryButton={
            <Button type="secondary" color="yellow" onClick={() => dispatch({ type: 'NEXTROUND' })}>
              Next Round
            </Button>
          }
        />
      );
    } else if (restartPending) {
      return (
        <AlertBanner
          message={`Restart game?`}
          messageColor={theme.colors.silver}
          secondaryButton={
            <Button
              type="secondary"
              color="silver"
              onClick={() => {
                dispatch({ type: 'CONFIRMRESTART', payload: false });
              }}
            >
              No, Cancel
            </Button>
          }
          primaryButton={
            <Button
              type="secondary"
              color="yellow"
              onClick={() => {
                dispatch({ type: 'RESETGAME' });
              }}
            >
              Yes, Restart
            </Button>
          }
        />
      );
    }
  };

  return (
    <Wrapper>
      {showBanner()}
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 24px;
  width: 460px;
  max-width: 100%;
`;
