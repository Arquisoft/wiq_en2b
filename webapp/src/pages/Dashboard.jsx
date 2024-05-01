import React, { useState, useEffect } from "react";
import { Heading, Button, Box, Stack, Tabs, TabList, Tab, TabPanels, TabPanel, Flex, Text, Spinner } from "@chakra-ui/react";
import { Center } from "@chakra-ui/layout";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Avatar, { genConfig } from 'react-nice-avatar';
import { FaUser, FaGamepad, FaKiwiBird, FaRandom, FaPalette } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import { IoIosFootball, IoLogoGameControllerB } from "react-icons/io";

import CustomGameMenu from '../components/dashboard/CustomGameMenu';
import LateralMenu from '../components/menu/LateralMenu';
import MenuButton from '../components/menu/MenuButton';
import UserStatistics from "../components/statistics/UserStatistics";
import SettingsButton from "../components/dashboard/CustomGameButton";
import { newGame, gameModes, isActive } from '../components/game/Game';
import { userInfo } from '../components/user/UserInfo';

export default function Dashboard() {
    const navigate = useNavigate();

    const [gameMode, setGameMode] = useState("KIWI_QUEST");

    const { t, i18n } = useTranslation();
    const [isDashboardLoading, setIsDashboardLoading] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedButton, setSelectedButton] = useState("Kiwi Quest");
    const [modes, setModes] = useState([]);
    const [user, setUser] = useState(null);
    const [config, setConfig] = useState(null);
    const [active, setActive] = useState(false);
    
    useEffect(() => {
      async function fetchGameModes() {
        try {
          const modes = (await gameModes()).data;
          setModes(modes);
          setSelectedButton(modes[0]?.name);
        } catch (error) {
          console.error("Error fetching game modes:", error);
        }
      }
      fetchGameModes();
    }, []);

    useEffect(() => {
      async function fetchData() {
        const userData = await userInfo();
        setUser(userData);
      }
      fetchData();
    }, []);

    useEffect(() => {
      if (user) {
        const userConfig = genConfig(user.email);
        setConfig(userConfig);
      }
    }, [user]);

    useEffect(() => {
      async function checkActiveStatus() {
          const i = await isActive();
          setActive(i.data.is_active);
          setIsDashboardLoading(false);
      }
      checkActiveStatus();
  }, []);

    const changeLanguage = (selectedLanguage) => {
      i18n.changeLanguage(selectedLanguage);
    };

    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const selectIcon = (iconName) => {
      switch (iconName) {
        case "FaKiwiBird":
          return <FaKiwiBird style={{ marginBottom: '0.5em', marginRight: '0.25em', fontSize: '1.8em' }} />;
        case "IoIosFootball":
          return <IoIosFootball style={{ marginBottom: '0.5em', marginRight: '0.25em', fontSize: '1.8em' }} />;
        case "FaGlobeAmericas":
          return <TbWorld style={{ marginBottom: '0.5em', marginRight: '0.25em', fontSize: '1.8em' }} />;
        case "IoLogoGameControllerB":
          return <IoLogoGameControllerB style={{ marginBottom: '0.5em', marginRight: '0.25em', fontSize: '1.8em' }} />;
        case "FaPalette":
          return <FaPalette style={{ marginBottom: '0.5em', marginRight: '0.25em', fontSize: '1.8em' }} />;
        case "FaRandom":
          return <FaRandom style={{ marginBottom: '0.5em', marginRight: '0.25em', fontSize: '1.8em' }} />;
        default:
          return null;
      }
    };

    const initializeGameMode = async () => {
      try {
        let lang = i18n.language;
        if (lang.includes("en"))
          lang = "en";
        else if (lang.includes("es"))
          lang = "es"
        else
          lang = "en";
        const newGameResponse = await newGame(lang, gameMode, null);
        if (newGameResponse)
          navigate("/dashboard/game");
      } catch (error) {
        console.error("Error initializing game:", error);
      }
    };

    return (
      <Center display={"flex"} flexDirection={"column"} w={"100wh"} h={"100vh"} justifyContent={"center"} alignItems={"center"} bgImage={'/background.svg'}>
        <MenuButton onClick={() => setIsMenuOpen(true)} />
        <LateralMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} changeLanguage={changeLanguage} isDashboard={true}/>
        {user && (
          <>
            <Avatar style={{ width: '8rem', height: '8rem' }} {...config} data-testid={"avatar"}/> 
            <Heading as="h2" data-testid={"Welcome"}>{t("common.welcome") + " " + user.username}</Heading>
      
            <Box minW={{ md: "400px" }} shadow="2xl">
                {(isDashboardLoading) ? (
                        <Flex flexWrap={"wrap"} gap={4} mb={4} justify={"center"}>
                            <Spinner
                                thickness='9px'
                                speed='0.65s'
                                emptyColor='gray.200'
                                color='green.500'
                                size='xl'
                                data-testid={"spinner"}
                            />
                        </Flex>
                    ) : <>
                    <Stack spacing={4} p="1rem" backgroundColor="whiteAlpha.900" boxShadow="md" rounded="1rem">
                        <Tabs isFitted variant='enclosed'>
                          <TabList mb='1em'>
                            <Tab color="green.500"><FaGamepad /><Box ml={2}>{t("game.gamemodes")}</Box></Tab>
                            <Tab color="green.500"><FaUser/> <Box ml={2}>{t("game.userinfo")}</Box></Tab>
                          </TabList>
                          <TabPanels>
                            <TabPanel>
                            {!active && (
                              <Flex justify="center" flexWrap="wrap" flexDirection={{ base: "column", md: "row" }}>
                                {modes.length > 0 && modes.map(mode => (
                                  <Button
                                    key={mode.internal_representation}
                                    colorScheme={"green"}
                                    variant={selectedButton === mode.name ? "solid" : "ghost"}
                                    textAlign="center"
                                    m="1em"
                                    display="flex"
                                    flexDirection="column"
                                    alignItems="center"
                                    size="lg"
                                    height="4rem"
                                    maxW={{ base: "100%", md: "calc(100% / 3 - 2em)" }}
                                    onClick={() => {
                                      setSelectedButton(mode.name);
                                      setGameMode(mode.internal_representation);
                                    }}
                                  >
                                    {selectIcon(mode.icon_name)}
                                    <Box>{mode.name}</Box>
                                  </Button>
                                ))}
                                <SettingsButton onClick={() => setIsSettingsOpen(true)} name={t("game.custom")}/>
                                <CustomGameMenu isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)}/>
                              </Flex>
                            )}
                            </TabPanel>
                            <TabPanel>
                              <Stack spacing={2}>
                                <Heading as="h3" color="green.400" fontSize="xl">{t("session.username")}</Heading>
                                <Text fontWeight='extrabold' color={"forest_green.400"}>{user.username}</Text>
                                <Heading as="h3" color="green.400" fontSize="xl">{t("session.email")}</Heading>
                                <Text fontWeight='extrabold' color={"forest_green.400"}>{user.email}</Text>
                                <UserStatistics />
                              </Stack>
                            </TabPanel>
                          </TabPanels>
                        </Tabs>
                        <Flex justify="center">
                          {!active ? (
                            <Button
                              type="submit"
                              data-testid={"Play"}
                              variant={"solid"}
                              colorScheme={"pigment_green"}
                              margin={"0.5rem"}
                              className={"custom-button effect2"}
                              onClick={initializeGameMode}
                              size={"lg"}
                              fontSize={"2xl"}
                              flex="1"
                              id={"play"}
                            >
                              {t("common.play")}
                            </Button>
                          ) : (
                              <Button
                                type="submit"
                                data-testid={"Resume"}
                                variant={"solid"}
                                colorScheme={"pigment_green"}
                                margin={"0.5rem"}
                                className={"custom-button effect2"}
                                onClick={initializeGameMode}
                                size={"lg"}
                                id={"resumeBtn"}
                                fontSize={"2xl"}
                                flex="1"
                              >
                                {t("session.resume")}
                              </Button>
                          )}
                        </Flex>
                    </Stack>
                </>
                }
            </Box>
          </>
        )}
      </Center>
    );
}