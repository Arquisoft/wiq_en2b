import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Box, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, DrawerFooter, Select, Button, Text, IconButton, Flex, Image } from '@chakra-ui/react';
import { FaChartBar, FaBook, FaTachometerAlt } from 'react-icons/fa';
import { InfoIcon, SettingsIcon } from '@chakra-ui/icons';

import AuthManager from "components/auth/AuthManager";

const LateralMenu = ({ isOpen, onClose, changeLanguage, isDashboard }) => {
    const navigate = useNavigate();
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { t, i18n } = useTranslation();

    useEffect(() => {
        checkIsLoggedIn();
        setSelectedLanguage(i18n.language);
    }, [i18n.language]);

    const handleChangeLanguage = (e) => {
        const selectedValue = e.target.value;
        setSelectedLanguage(selectedValue);
        changeLanguage(selectedValue);
    };

    const handleApiClick = () => {
        window.open(`${process.env.REACT_APP_API_ENDPOINT}/swagger/swagger-ui/index.html#/auth-controller/registerUser`, "_blank", "noopener");
    };    

    const handleLogout = async () => {
        try {
            await new AuthManager().logout();
            navigate("/");
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    const checkIsLoggedIn = async () => {
        try {
            const loggedIn = await new AuthManager().isLoggedIn();
            setIsLoggedIn(loggedIn);
        } catch (error) {
            console.error("Error al verificar el estado de inicio de sesión:", error);
        }
    };

    return (
        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
            <DrawerOverlay>
                <DrawerContent>
                    <DrawerCloseButton />
                    <Flex align="center">
                        <Image src="/kiwiq-icon.ico" alt="App icon" width="80px" height="80px"/>
                        <DrawerHeader color={"forest_green.500"}>KIWIQ</DrawerHeader>
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
                                {isLoggedIn && (
                                    <>
                                        {!isDashboard && (
                                            <Box marginTop={"40px"}>
                                                <Button data-testid="dashboard" type="submit" variant="link" colorScheme={"forest_green"} onClick={() => {navigate("/dashboard")}}>
                                                    <FaTachometerAlt /> 
                                                    <span style={{ marginLeft: '6px' }}>{t("common.dashboard")}</span>
                                                </Button>
                                            </Box>
                                        )}
                                        <Box marginTop={"40px"}>
                                            <Button data-testid="statistics" type="submit" variant="link" colorScheme={"forest_green"} onClick={() => {navigate("/dashboard/statistics")}}>
                                                <FaChartBar /> 
                                                <span style={{ marginLeft: '6px' }}>{t("common.statistics.title")}</span>
                                            </Button>
                                        </Box>
                                        <Box marginTop={"40px"}>
                                            <Button data-testid="rules" type="submit" variant="link" colorScheme={"forest_green"} onClick={() => {navigate("/dashboard/rules")}}>
                                                <FaBook /> 
                                                <span style={{ marginLeft: '6px' }}>{t("common.rules")}</span>
                                            </Button>
                                        </Box>
                                        <Box marginTop={"40px"}>
                                            <Button data-testid="API" type="submit" variant="link" colorScheme={"forest_green"} onClick={handleApiClick}>
                                                <SettingsIcon /> 
                                                <span style={{ marginLeft: '6px' }}>API</span>
                                            </Button>
                                        </Box>
                                    </>
                                )}
                            </Box>
                        </Box>
                    </DrawerBody>
                    <DrawerFooter>
                        <Image src='/img/kiwi-3.gif' alt='404Kiwi' boxSize='60px' />
                        <Flex justify="flex-end" align="center" w="100%">
                            {isLoggedIn && (
                                <Button data-testid={"LogOut"} type="submit" colorScheme="raw_umber" margin={"10px"} className={"custom-button effect1"} onClick={handleLogout} width="70%">{t("common.logout")}</Button>
                            )}
                            <IconButton type="submit" aria-label='About' colorScheme={"forest_green"} icon={<InfoIcon />} className={"custom-button effect1"} onClick={() => {navigate("/about");}} margin={"10px"} id={"aboutButton"}></IconButton>
                        </Flex>
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
    isDashboard: PropTypes.bool.isRequired
};

export default LateralMenu;
