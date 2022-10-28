import { useState, useContext } from 'react';
import styled from 'styled-components';
import { GameContext } from '../context/GameContext';
import useSound from 'use-sound';
import UiSwitchSfx from '../sounds/ui-switch.mp3';
import { theme } from '../theme';

export const Switch = ({ options, onChange }) => {
  const { state, dispatch } = useContext(GameContext);
  const [currentSelection, setCurrentSelection] = useState(options.find((o) => o.default).value);
  const [play] = useSound(UiSwitchSfx, { volume: 0.25, soundEnabled: state.soundEffectsEnabled });

  const handleOptionClick = (e) => {
    play();
    setCurrentSelection(e.target.value);
    onChange(e);
  };

  return (
    <SwitchOptions>
      {options.map((option, i) => {
        const OptionComponent = option.value === currentSelection ? SelectedOption : Option;

        return (
          <OptionComponent key={i} onClick={handleOptionClick} value={option.value}>
            {option.label}
          </OptionComponent>
        );
      })}
    </SwitchOptions>
  );
};

const SwitchOptions = styled.div`
  display: flex;
  padding: ${theme.measurements.borderRadius};
  border-radius: ${theme.measurements.borderRadius};
  background: ${theme.colors.darkNavy};
`;

const Option = styled.button`
  flex-basis: 50%;
  padding: ${theme.measurements.borderRadius};
  height: 54px;
  color: ${theme.colors.silver};
  background: inherit;
  border: none;
  border-radius: ${theme.measurements.borderRadius};
  cursor: pointer;

  &:hover,
  &:focus {
    background: ${theme.colors.darkNavy__hover};
  }

  img,
  svg {
    margin: 0;
    pointer-events: none;
  }

  path {
    fill: ${theme.colors.silver};
  }
`;

const SelectedOption = styled(Option)`
  color: ${theme.colors.darkNavy};
  background: ${theme.colors.silver};

  &:hover,
  &:focus {
    background: ${theme.colors.silver};
  }

  path {
    fill: ${theme.colors.darkNavy};
  }
`;
