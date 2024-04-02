import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Box, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Select, Button } from '@chakra-ui/react';

const LateralMenu = ({ isOpen, onClose, isRoot, changeLanguage }) => {
    return (
        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay>
            <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Menu</DrawerHeader>
            <DrawerBody>
                {isRoot && (
                    <Box>
                        <Select placeholder="Select Language" onChange={changeLanguage}>
                            <option value="es">Spanish</option>
                            <option value="en">English</option>
                        </Select>
                    </Box>
                )}  
            </DrawerBody>
            </DrawerContent>
        </DrawerOverlay>
        </Drawer>
    );
};

LateralMenu.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    isRoot: PropTypes.bool.isRequired,
    changeLanguage: PropTypes.func.isRequired,
};

export default LateralMenu;
