import React from 'react';
import { Button, useTheme } from "@chakra-ui/react";
import PropTypes from 'prop-types';
import '../styles/AppView.css';

const ButtonEf = ({ dataTestId, variant, colorScheme, text, onClick }) => {
  const theme = useTheme();

  const buttonStyle = {
      fontFamily: theme.fonts.heading,
      margin: "10px",
  };
  return (
    <Button 
      type="submit" 
      data-testid={dataTestId} 
      variant={variant} 
      colorScheme={colorScheme} 
      margin={"10px"}
      style={buttonStyle}
      className={"custom-button effect1"} 
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

ButtonEf.propTypes = {
  dataTestId: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
  colorScheme: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ButtonEf;