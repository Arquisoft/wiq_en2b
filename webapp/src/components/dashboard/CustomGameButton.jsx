import React from "react";
import PropTypes from 'prop-types';
import { Button, Box } from "@chakra-ui/react";
import { SettingsIcon } from '@chakra-ui/icons';

const SettingsButton = ({ onClick }) => {
    return (
        <Button
        colorScheme="green"
        variant="outline"
        textAlign="center"
        m="1em"
        display="flex"
        flexDirection="column"
        alignItems="center"
        size="lg"
        height="4rem"
        maxW={{ base: "100%", md: "calc(100% / 3 - 2em)" }}
        onClick={onClick}
        >
            <SettingsIcon style={{ marginBottom: '0.5em', marginRight: '0.25em', fontSize: '1.5em' }} />
            <Box>Custom</Box>
        </Button>
    );
}

SettingsButton.propTypes = {
    onClick: PropTypes.func.isRequired
};

export default SettingsButton;