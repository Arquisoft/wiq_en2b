import React from 'react';
import { Button } from "@chakra-ui/react";
import '../styles/AppView.css';

const ButtonEf = ({ dataTestId, variant, colorScheme, text, onClick }) => {
    return (
      <Button type="submit" data-testid={dataTestId} variant={variant} colorScheme={colorScheme} margin={"10px"} className={"custom-button effect1"} onClick={onClick}>{text}</Button>
    );
};
export default ButtonEf;