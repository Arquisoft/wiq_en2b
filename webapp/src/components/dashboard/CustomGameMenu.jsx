import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Box, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, DrawerFooter, Select, Button, Text, Flex } from '@chakra-ui/react';

import AuthManager from "components/auth/AuthManager";

const CustomGameMenu = ({ isOpen, onClose, changeLanguage }) => {
    const navigate = useNavigate();
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const { t } = useTranslation();

    const handleChangeLanguage = (e) => {
        const selectedValue = e.target.value;
        setSelectedLanguage(selectedValue);
        changeLanguage(selectedValue);
    };   

    const handleLogout = async () => {
        try {
            await new AuthManager().logout();
            navigate("/");
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    return (
        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
            <DrawerOverlay>
                <DrawerContent>
                    <DrawerCloseButton />
                    <Flex align="center">
                        <DrawerHeader color={"forest_green.500"}>Custom game</DrawerHeader>
                    </Flex>
                    <DrawerBody>
                        <Box flexDirection="column">
                            <Box margin={"10px"}>
                                <Text color={"forest_green.500"}>{t("common.language")}</Text>
                                <Select data-testid="language-select" onChange={handleChangeLanguage} value={selectedLanguage}>
                                    <option value="es">{t("common.spanish")}</option>
                                    <option value="en">{t("common.english")}</option>
                                </Select>
                            </Box>
                            <Box margin={"10px"} flexDirection="row">
                                <Box marginTop={"40px"}>
                                    <Button data-testid="dashboard" type="submit" variant="link" colorScheme={"forest_green"} onClick={() => {navigate("/dashboard")}}>
                                        <span style={{ marginLeft: '6px' }}>{t("common.dashboard")}</span>
                                    </Button>
                                </Box> 
                            </Box>
                        </Box>
                    </DrawerBody>
                    <DrawerFooter>
                    <Button data-testid={"Save"} type="submit" colorScheme="pigment_green" margin={"10px"} className={"custom-button effect1"} onClick={handleLogout} width="100%">Save</Button>
                    </DrawerFooter>
                </DrawerContent>
            </DrawerOverlay>
        </Drawer>
    );
};

CustomGameMenu.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    changeLanguage: PropTypes.func.isRequired
};

export default CustomGameMenu;
