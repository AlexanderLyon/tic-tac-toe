import { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import useSound from 'use-sound';
import { GameContext } from '../context/GameContext';
import UiClickSfx from '../sounds/ui-click.mp3';
import { theme } from '../theme';

export const Button = ({ type = 'primary', color = 'silver', href, onClick, disabled, className, children }) => {
  const { state, dispatch } = useContext(GameContext);
  const ButtonComponent = type === 'primary' ? PrimaryButton : SecondaryButton;
  const [play] = useSound(UiClickSfx, { volume: 0.25, soundEnabled: state.soundEffectsEnabled });

  const themeVariables = {
    yellow: {
      backgroundColor: theme.colors.lightYellow,
      backgroundColorHover: theme.colors.lightYellow__hover,
      boxShadowColor: theme.colors.lightYellow__shadow,
    },
    blue: {
      backgroundColor: theme.colors.lightBlue,
      backgroundColorHover: theme.colors.lightBlue__hover,
      boxShadowColor: theme.colors.lightBlue__shadow,
    },
    silver: {
      backgroundColor: theme.colors.silver,
      backgroundColorHover: theme.colors.silver__hover,
      boxShadowColor: theme.colors.silver__shadow,
    },
  };

  const customProperties = {
    '--backgroundColor': themeVariables[color].backgroundColor,
    '--backgroundColorHover': themeVariables[color].backgroundColorHover,
    '--boxShadowColor': themeVariables[color].boxShadowColor,
  };

  const handleClick = (e) => {
    play();

    if (onClick) {
      onClick(e);
    }
  };

  if (href && !disabled) {
    return (
      <ButtonComponent as={Link} to={href} onClick={handleClick} style={customProperties} className={className}>
        {children}
      </ButtonComponent>
    );
  }

  return (
    <ButtonComponent disabled={disabled} onClick={handleClick} style={customProperties} className={className}>
      {children}
    </ButtonComponent>
  );
};

const BaseButton = styled.button`
  display: inline-block;
  margin: 10px 0;
  padding: 0 1rem;
  border: none;
  border-radius: ${theme.measurements.borderRadius};
  background-color: var(--backgroundColor);
  color: ${theme.colors.darkNavy};
  font-family: 'Outfit', sans-serif;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1.25px;
  line-height: 2.5;
  text-decoration: none;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};

  ${(props) => {
    if (props.disabled) {
      return `
        opacity: 0.5;
      `;
    } else {
      return `
        &:hover,
        &:focus {
          background-color: var(--backgroundColorHover);
        }
      `;
    }
  }}
`;

const PrimaryButton = styled(BaseButton)`
  padding-bottom: 8px;
  font-size: 20px;
  width: 100%;
  box-shadow: inset 0 -8px 0px var(--boxShadowColor);
  transition: 0.2s ease-in-out;
`;

const SecondaryButton = styled(BaseButton)`
  display: inline-block;
  padding-bottom: 4px;
  font-size: 16px;
  box-shadow: inset 0 -4px 0px var(--boxShadowColor);
`;
