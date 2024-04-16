import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import { 
    Box, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, 
    DrawerHeader, DrawerBody, DrawerFooter, Button, Text, Flex, 
    NumberInput, NumberInputField, NumberInputStepper, 
    NumberIncrementStepper, NumberDecrementStepper 
} from '@chakra-ui/react';

const CustomGameMenu = ({ isOpen, onClose, changeLanguage, initializeCustomGameMode }) => {
    const navigate = useNavigate();
    const [selectedLanguage, setSelectedLanguage] = useState([]);
    const [selectedGameType, setSelectedGameType] = useState([]);
    const [rounds, setRounds] = useState(9);
    const [time, setTime] = useState(20);

    const handleChangeLanguage = (language) => {
        if (selectedLanguage.includes(language)) {
            setSelectedLanguage(selectedLanguage.filter(item => item !== language));
        } else {
            setSelectedLanguage([...selectedLanguage, language]);
        }
        changeLanguage(language);
    };

    const handleGameTypeChange = (gameType) => {
        if (selectedGameType.includes(gameType)) {
            setSelectedGameType(selectedGameType.filter(item => item !== gameType));
        } else {
            setSelectedGameType([...selectedGameType, gameType]);
        }
    };

    return (
        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
            <DrawerOverlay>
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader color={"forest_green.500"}>Custom game</DrawerHeader>
                    <DrawerBody>
                        <Box flexDirection="column">
                            <Box>
                                <Text fontWeight='extrabold' color={"forest_green.400"}>Game settings</Text>
                                <Flex direction="column">
                                    <Text color={"forest_green.400"}>Rounds</Text>
                                    <NumberInput defaultValue={rounds} min={0} max={100} onChange={valueString => setRounds(parseInt(valueString))}>
                                        <NumberInputField />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                    <Text color={"forest_green.400"}>Time</Text>
                                    <NumberInput defaultValue={time} min={0} max={100} onChange={valueString => setTime(parseInt(valueString))}>
                                        <NumberInputField />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                </Flex>
                            </Box>
                            <Box marginTop="2em">
                                <Text fontWeight='extrabold' color={"forest_green.400"}>Game type</Text>
                                <Flex direction="column">
                                    <Button className={"custom-button effect2"} variant={selectedGameType.includes('image') ? "solid" : "outline"} colorScheme="green" margin={"10px"} onClick={() => handleGameTypeChange('image')}>Image</Button>
                                    <Button className={"custom-button effect2"} variant={selectedGameType.includes('text') ? "solid" : "outline"} colorScheme="green" margin={"10px"} onClick={() => handleGameTypeChange('text')}>Text</Button>
                                </Flex>
                            </Box>
                            {(selectedGameType.includes('image') || selectedGameType.includes('both')) && (
                                <Box>
                                    <Text color={"forest_green.500"}>Image categories</Text>
                                    <Flex direction="column">
                                        <Button className={"custom-button effect2"} variant={selectedLanguage.includes('football_stadium') ? "solid" : "outline"} colorScheme="green" margin={"10px"} onClick={() => handleChangeLanguage('football_stadium')}>Football Stadium</Button>
                                        <Button className={"custom-button effect2"} variant={selectedLanguage.includes('drawings') ? "solid" : "outline"} colorScheme="green" margin={"10px"} onClick={() => handleChangeLanguage('drawings')}>Drawings</Button>
                                    </Flex>
                                </Box>
                            )}
                            {(selectedGameType.includes('text') || selectedGameType.includes('both')) && (
                                <Box>
                                    <Text color={"forest_green.500"}>Text categories</Text>
                                    <Flex direction="column">
                                        <Button className={"custom-button effect2"} variant={selectedLanguage.includes('ballon_dor') ? "solid" : "outline"} colorScheme="green" margin={"10px"} onClick={() => handleChangeLanguage('ballon_dor')}>Ballon D'or</Button>
                                        <Button className={"custom-button effect2"} variant={selectedLanguage.includes('capitals') ? "solid" : "outline"} colorScheme="green" margin={"10px"} onClick={() => handleChangeLanguage('capitals')}>Capitals</Button>
                                        <Button className={"custom-button effect2"} variant={selectedLanguage.includes('videogame_publishers') ? "solid" : "outline"} colorScheme="green" margin={"10px"} onClick={() => handleChangeLanguage('videogame_publishers')}>Videogame publishers</Button>
                                    </Flex>
                                </Box>
                            )}
                        </Box>
                    </DrawerBody>
                    <DrawerFooter>
                        <Flex justify="flex-end" align="center" w="100%">
                            <Button
                                className={"custom-button effect1"}
                                data-testid={"Play"}
                                type="submit"
                                colorScheme="forest_green"
                                margin={"10px"}
                                width="100%"
                                onClick={() => {
                                    initializeCustomGameMode();
                                    navigate("/dashboard/game");
                                }}
                            >
                                Play
                            </Button>
                        </Flex>
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
