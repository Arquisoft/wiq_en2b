import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { 
    Box, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, 
    DrawerHeader, DrawerBody, DrawerFooter, Button, Text, Flex, 
    NumberInput, NumberInputField, NumberInputStepper, 
    NumberIncrementStepper, NumberDecrementStepper 
} from '@chakra-ui/react';
import { newGame, gameCategories } from 'components/game/Game';

const CustomGameMenu = ({ isOpen, onClose, changeLanguage }) => {
    const navigate = useNavigate();
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [rounds, setRounds] = useState(9);
    const [time, setTime] = useState(20);
    const [categories, setCategories] = useState([]);
    const { i18n } = useTranslation();

    useEffect(() => {
        async function fetchCategories() {
            try {
                const categoriesData = await gameCategories();
                const formattedCategories = categoriesData.map(category => category.charAt(0).toUpperCase() + category.slice(1).toLowerCase());
                setCategories(formattedCategories);
            } catch (error) {
                console.error("Error fetching game categories:", error);
            }
        }
        fetchCategories();
    }, []); 

    const handleChangeLanguage = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter(item => item !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    const initializeCustomGameMode = async () => {
        try {
            const lang = i18n.language;
            const gamemode = 'CUSTOM';
            const uppercaseCategories = selectedCategories.map(category => category.toUpperCase());
            const customGameDto = {
                rounds: rounds,
                roundDuration: time,
                categories: uppercaseCategories
            }
            const newGameResponse = await newGame(lang, gamemode, customGameDto);
            if (newGameResponse)
              navigate("/dashboard/game");
          } catch (error) {
            console.error("Error initializing game:", error);
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
                                <Text color={"forest_green.500"}>Game categories</Text>
                                <Flex direction="column">
                                    {categories.map(category => (
                                        <Button
                                            key={category}
                                            className={"custom-button effect2"}
                                            variant={selectedCategories.includes(category) ? "solid" : "outline"}
                                            colorScheme="green"
                                            margin={"10px"}
                                            onClick={() => handleChangeLanguage(category)}
                                        >
                                            {category}
                                        </Button>
                                    ))}
                                </Flex>
                            </Box>
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
                                onClick={initializeCustomGameMode}
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
