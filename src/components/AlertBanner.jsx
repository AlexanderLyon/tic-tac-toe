import styled from 'styled-components';
import { Heading } from '../components';
import { theme } from '../theme';

export const AlertBanner = ({ message, icon, messageColor, primaryButton, secondaryButton }) => {
  return (
    <AlertOverlay>
      <Banner>
        <MessageRow>
          {icon}
          <Message size="l" messageColor={messageColor}>
            {message}
          </Message>
        </MessageRow>
        <ButtonRow>
          {secondaryButton}
          {primaryButton}
        </ButtonRow>
      </Banner>
    </AlertOverlay>
  );
};

const AlertOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 100;
`;

const Banner = styled.div`
  padding: 35px;
  width: 100%;
  background-color: ${theme.colors.semiDarkNavy};
`;

const MessageRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;

  svg {
    margin-right: 25px;
    height: 64px;
    width: 64px;

    @media (max-width: 650px) {
      margin-right: 10px;
      width: 24px;
      height: 24px;
    }
  }
`;

const Message = styled(Heading)`
  text-transform: uppercase;
  color: ${(props) => props.messageColor};

  @media (max-width: 650px) {
    font-size: 20px;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
`;
