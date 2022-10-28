import styled from 'styled-components';
import { theme } from '../theme';

export const Heading = ({ size, className, children }) => {
  let HeadingComponent;

  switch (size) {
    case 'l':
      HeadingComponent = HeadingLarge;
      break;
    case 'm':
      HeadingComponent = HeadingMedium;
      break;
    case 's':
      HeadingComponent = HeadingSmall;
      break;
    case 'xs':
    default:
      HeadingComponent = HeadingExtraSmall;
      break;
  }

  return <HeadingComponent className={className}>{children}</HeadingComponent>;
};

const BaseHeading = styled.h1`
  font-family: 'Outfit', sans-serif;
  font-weight: bold;
`;

const HeadingLarge = styled(BaseHeading)`
  font-size: ${theme.text.heading.large.fontSize};
  letter-spacing: ${theme.text.heading.large.letterSpacing};
`;

const HeadingMedium = styled(BaseHeading)`
  font-size: ${theme.text.heading.medium.fontSize};
  letter-spacing: ${theme.text.heading.medium.letterSpacing};
`;

const HeadingSmall = styled(BaseHeading)`
  font-size: ${theme.text.heading.small.fontSize};
  letter-spacing: ${theme.text.heading.small.letterSpacing};
`;

const HeadingExtraSmall = styled(BaseHeading)`
  font-size: ${theme.text.heading.extraSmall.fontSize};
  letter-spacing: ${theme.text.heading.extraSmall.letterSpacing};
`;
