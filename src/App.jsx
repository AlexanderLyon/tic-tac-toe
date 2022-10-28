import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { GameProvider } from './context/GameContext';
import { Home } from './pages/home';
import { NewGame } from './pages/new';
import { PlayGame } from './pages/play';
import { theme } from './theme';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vmin;
    background-color: ${theme.colors.darkNavy};
    color: ${theme.colors.silver};
    text-align: center;
  }

  #root {
    max-width: 100%;
  }
`;

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <GameProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/new" element={<NewGame />} />
            <Route path="/play" element={<PlayGame />} />
          </Routes>
        </BrowserRouter>
      </GameProvider>
    </div>
  );
}

export default App;
