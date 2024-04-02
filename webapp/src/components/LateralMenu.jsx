import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import { Box, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, DrawerFooter, Select, Button, Text, IconButton } from '@chakra-ui/react';
import { FaChartBar, FaBook, FaTachometerAlt } from 'react-icons/fa';
import { InfoIcon } from '@chakra-ui/icons';

const LateralMenu = ({ isOpen, onClose, changeLanguage, currentLanguage, isLoggedIn, isDashboard }) => {
    const navigate = useNavigate();
    const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage);

    useEffect(() => {
        setSelectedLanguage(currentLanguage);
    }, [currentLanguage]);

    const handleChangeLanguage = (e) => {
        const selectedLanguage = e.target.value;
        changeLanguage(selectedLanguage);
    };

    return (
        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
            <DrawerOverlay>
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader color={"forest_green.500"}>Menu</DrawerHeader>
                    <DrawerBody>
                        <Box flexDirection="column">
                            <Box margin={"10px"}>
                                <Text color={"forest_green.500"}>Change the language</Text>
                                <Select onChange={handleChangeLanguage} value={selectedLanguage}>
                                    <option value="es">Spanish</option>
                                    <option value="en">English</option>
                                </Select>
                            </Box>
                            <Box margin={"10px"} flexDirection="row">
                                {isLoggedIn && (
                                    <>
                                        {!isDashboard && (
                                            <Box marginTop={"40px"}>
                                                <Button type="submit" variant="link" colorScheme={"forest_green"} onClick={() => {navigate("/dashboard")}}>
                                                    <FaTachometerAlt /> 
                                                    <span style={{ marginLeft: '6px' }}>Dashboard</span>
                                                </Button>
                                            </Box>
                                        )}
                                        <Box marginTop={"40px"}>
                                            <Button type="submit" variant="link" colorScheme={"forest_green"} onClick={() => {navigate("/dashboard/statistics")}}>
                                                <FaChartBar /> 
                                                <span style={{ marginLeft: '6px' }}>Statistics</span>
                                            </Button>
                                        </Box>
                                        <Box marginTop={"40px"}>
                                            <Button type="submit" variant="link" colorScheme={"forest_green"} onClick={() => {navigate("/dashboard/rules")}}>
                                                <FaBook /> 
                                                <span style={{ marginLeft: '6px' }}>Rules</span>
                                            </Button>
                                        </Box>
                                    </>
                                )}
                            </Box>
                        </Box>
                    </DrawerBody>
                    <DrawerFooter>
                        <IconButton type="submit" aria-label='About' colorScheme={"forest_green"} icon={<InfoIcon />} className={"custom-button effect1"} onClick={() => {navigate("/about");}}></IconButton>
                    </DrawerFooter>
                </DrawerContent>
            </DrawerOverlay>
        </Drawer>
    );
};

LateralMenu.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    changeLanguage: PropTypes.func.isRequired,
    currentLanguage: PropTypes.string.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    isDashboard: PropTypes.bool.isRequired
};

export default LateralMenu;
