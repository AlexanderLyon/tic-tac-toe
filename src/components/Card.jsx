import styled from 'styled-components';
import { theme } from '../theme';

export const Card = ({ size = 'l', onClick, className, children }) => {
  const customProperties = {
    '--padding': size === 's' ? '13px 30px 21px' : '24px 24px 32px',
    '--shadowDistance': size === 's' ? '-4px' : '-8px',
  };

  return (
    <StyledCard className={className} onClick={onClick} style={customProperties}>
      {children}
    </StyledCard>
  );
};

const StyledCard = styled.div`
  padding: var(--padding);
  background-color: ${theme.colors.semiDarkNavy};
  color: ${theme.colors.silver};
  border-radius: ${theme.measurements.borderRadius};
  box-shadow: inset 0 var(--shadowDistance) 0px ${theme.colors.semiDarkNavy__shadow};
  font-weight: bold;
  font-size: ${theme.text.body.fontSize};
  letter-spacing: ${theme.text.body.letterSpacing};
  text-transform: uppercase;
`;
