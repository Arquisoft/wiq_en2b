import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import { Box, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, DrawerFooter, Select, Button, Text } from '@chakra-ui/react';

const LateralMenu = ({ isOpen, onClose, isRoot, changeLanguage }) => {
    const navigate = useNavigate();

    return (
        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay>
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Menu</DrawerHeader>
                <DrawerBody>
                    {isRoot && (
                        <Box>
                            <Text>Change the language</Text>
                            <Select placeholder="Select Language" onChange={changeLanguage}>
                                <option value="es">Spanish</option>
                                <option value="en">English</option>
                            </Select> 
                        </Box>
                    )}  
                </DrawerBody>
                <DrawerFooter>
                    <Button type="submit" variant="ghost" margin={"10px"} className={"custom-button effect1"} onClick={() => {navigate("/about");}}>About</Button>
                </DrawerFooter>
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
