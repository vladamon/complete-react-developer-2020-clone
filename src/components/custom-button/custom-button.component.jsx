import React from 'react';

// we don't need this since we introduced styled components
//import './custom-buttom.styles.scss';

import { CustomButtonContainer } from './custom-button.styles'

const CustomButton = ({ children, ...props }) => (
  <CustomButtonContainer {...props}>{children}</CustomButtonContainer>
);

export default CustomButton;

// this is also not need with the introduction of styled components.
{/* <button className={`${inverted ? 'inverted' : ''} ${isGoogleSignIn ? 'google-sign-in' : ''} custom-button`} {...otherProps}>
    {children}
  </button> */}
