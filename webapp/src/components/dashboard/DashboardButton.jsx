import React from "react";
import PropTypes from 'prop-types';
import { Button, Box } from "@chakra-ui/react";
import { FaKiwiBird, FaRandom, FaPalette } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import { IoIosFootball, IoLogoGameControllerB } from "react-icons/io";

const DashboardButton = ({ label, selectedButton, onClick, iconName }) => {
  const isSelected = label === selectedButton;
  let icon = null;

  switch (iconName) {
    case "FaKiwiBird":
      icon = <FaKiwiBird style={{ marginBottom: '0.5em', marginRight: '0.25em', fontSize: '1.8em' }} />;
      break;
    case "IoIosFootball":
      icon = <IoIosFootball style={{ marginBottom: '0.5em', marginRight: '0.25em', fontSize: '1.8em' }} />;
      break;
    case "FaGlobeAmericas":
      icon = <TbWorld style={{ marginBottom: '0.5em', marginRight: '0.25em', fontSize: '1.8em' }} />;
      break;
    case "IoLogoGameControllerB":
      icon = <IoLogoGameControllerB style={{ marginBottom: '0.5em', marginRight: '0.25em', fontSize: '1.8em' }} />;
      break;
    case "FaPalette":
      icon = <FaPalette style={{ marginBottom: '0.5em', marginRight: '0.25em', fontSize: '1.8em' }} />;
      break;
    case "FaRandom":
      icon = <FaRandom style={{ marginBottom: '0.5em', marginRight: '0.25em', fontSize: '1.8em' }} />;
      break;
    default:
      break;
  }

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
  iconName: PropTypes.string.isRequired
};

export default DashboardButton;