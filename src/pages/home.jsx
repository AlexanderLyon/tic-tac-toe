import { useContext } from 'react';
import { GameContext } from '../context/GameContext';
import { Navigate } from 'react-router-dom';

export const Home = () => {
  const gameContext = useContext(GameContext);
  return gameContext.state.gameInProgress ? <Navigate to="/play" /> : <Navigate to="/new" />;
};
