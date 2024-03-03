import React from 'react';
import { Button } from "@chakra-ui/react";
import '../styles/AppView.css';

const ButtonEf = ({ variant, colorScheme, text, onClick }) => {
    return (
      <Button type="submit" variant={variant} colorScheme={colorScheme} margin={"10px"} className={"custom-button effect1"} onClick={onClick}>{text}</Button>
    );
};
export default ButtonEf;