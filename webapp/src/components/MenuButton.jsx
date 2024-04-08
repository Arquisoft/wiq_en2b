import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { FaBars } from "react-icons/fa";
import { chakra, Box, IconButton } from "@chakra-ui/react";

const MenuButton = ({ onClick }) => {
    const [isFixed, setIsFixed] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsFixed(true);
            } else {
                setIsFixed(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <Box position={isFixed ? "fixed" : "absolute"} top="1rem" left="1rem">
            <IconButton 
                bg="pigment_green.600"
                color="whiteAlpha.900"
                size="lg"
                borderRadius="md"
                aria-label="Open Menu"
                _hover={{ bg: 'pigment_green.400' }}
                icon={<chakra.span as={FaBars} fontSize="1.5em" />}
                onClick={onClick}
            />
        </Box>
    );
}

MenuButton.propTypes = {
    onClick: PropTypes.func.isRequired
};

export default MenuButton;