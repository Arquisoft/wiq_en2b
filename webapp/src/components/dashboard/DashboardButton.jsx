import React from "react";
import PropTypes from 'prop-types';
import { Button, Box } from "@chakra-ui/react";

const DashboardButton = ({ label, selectedButton, onClick, icon }) => {
  const isSelected = label === selectedButton;

  return (
    <Button
      colorScheme={"green"}
      variant={isSelected ? "solid" : "ghost"}
      textAlign="center"
      m="1em"
      display="flex"
      flexDirection="column"
      alignItems="center"
      size="lg"
      height="4rem"
      maxW={{ base: "100%", md: "calc(100% / 3 - 2em)" }}
      onClick={() => onClick(label)}
    >
      {icon}
      <Box>{label}</Box>
    </Button>
  );
};

DashboardButton.propTypes = {
  label: PropTypes.string.isRequired,
  selectedButton: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.element.isRequired
};

export default DashboardButton;
