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

const CustomGameMenu = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [rounds, setRounds] = useState(9);
    const [time, setTime] = useState(20);
    const [categories, setCategories] = useState([]);
    const { t, i18n } = useTranslation();

    useEffect(() => {
        async function fetchCategories() {
            try {
                let lang = i18n.language;
                if (lang.includes("en")) {
                    lang = "en";
                } else if (lang.includes("es")) {
                    lang = "es"
                } else {
                    lang = "en";
                }
                
                const categoriesData = (await gameCategories(lang)).data;
                const formattedCategories = categoriesData.map(category => category.name);
                setCategories(formattedCategories);
            } catch (error) {
                console.error("Error fetching game categories:", error);
            }
        }
        fetchCategories();
    }, [i18n.language]); 

    const manageCategory = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter(item => item !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    const initializeCustomGameMode = async () => {
        try {
            let lang = i18n.language;
            if (lang.includes("en")) {
                lang = "en";
            } else if (lang.includes("es")) {
                lang = "es"
            } else {
                lang = "en";
            }

            const gamemode = 'CUSTOM';
            let uppercaseCategories = selectedCategories.map(category => category.toUpperCase());
            if (uppercaseCategories.length === 0) {
                uppercaseCategories = ["GEOGRAPHY", "SPORTS", "MUSIC", "ART", "VIDEOGAMES"];
            }

            const customGameDto = {
                rounds: rounds,
                categories: uppercaseCategories,
                round_duration: time
                
            }
            const newGameResponse = await newGame(lang, gamemode, customGameDto);
            if (newGameResponse) {
              navigate("/dashboard/game");
            }
          } catch (error) {
            console.error("Error initializing game:", error);
          }
      };

    return (
        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
            <DrawerOverlay>
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader color={"forest_green.500"}>{t("game.customgame")}</DrawerHeader>
                    <DrawerBody>
                        <Box flexDirection="column">
                            <Box>
                                <Text fontWeight='extrabold' color={"forest_green.400"}>{t("game.settings")}</Text>
                                <Flex direction="column">
                                    <Text color={"forest_green.400"}>{t("game.rounds")}</Text>
                                    <NumberInput defaultValue={rounds} min={1} max={100} onChange={valueString => setRounds(parseInt(valueString))}>
                                        <NumberInputField />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                    <Text color={"forest_green.400"}>{t("game.time")}</Text>
                                    <NumberInput defaultValue={time} min={5} max={100} onChange={valueString => setTime(parseInt(valueString))}>
                                        <NumberInputField />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                </Flex>
                            </Box>
                            <Box marginTop="2em">
                                <Text color={"forest_green.500"}>{t("game.categories")}</Text>
                                <Flex direction="column">
                                    {categories.map(category => (
                                        <Button
                                            key={category}
                                            className={"custom-button effect2"}
                                            variant={selectedCategories.includes(category) ? "solid" : "outline"}
                                            colorScheme="green"
                                            margin={"10px"}
                                            onClick={() => manageCategory(category)}
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
                                {t("common.play")}
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
};

export default CustomGameMenu;
