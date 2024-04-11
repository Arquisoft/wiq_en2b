import React, { useState } from "react";
import { Heading, Button, Box, Stack, Tabs, TabList, Tab, TabPanels, TabPanel, Flex, Text } from "@chakra-ui/react";
import { Center } from "@chakra-ui/layout";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Avatar, { genConfig } from 'react-nice-avatar';
import { FaUser, FaGamepad, FaKiwiBird, FaRandom, FaPalette } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import { IoIosFootball, IoLogoGameControllerB } from "react-icons/io";

import DashboardButton from '../components/dashboard/DashboardButton';
import CustomGameMenu from '../components/dashboard/CustomGameMenu';
import LateralMenu from '../components/menu/LateralMenu';
import MenuButton from '../components/menu/MenuButton';
import UserStatistics from "../components/statistics/UserStatistics";
import SettingsButton from "../components/dashboard/CustomGameButton";

export default function Dashboard() {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedButton, setSelectedButton] = useState("Kiwi Quest");
    
    const changeLanguage = (selectedLanguage) => {
        i18n.changeLanguage(selectedLanguage);
    };

    const user = {
      username: "User1",
      email: "pepe@test.com"
    };
    const config = genConfig(user.email) 
    
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    return (
      <Center display={"flex"} flexDirection={"column"} w={"100wh"} h={"100vh"} justifyContent={"center"} alignItems={"center"} bgImage={'/background.svg'}>
        <MenuButton onClick={() => setIsMenuOpen(true)} />
        <LateralMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} changeLanguage={changeLanguage} isDashboard={true}/>
        <Avatar style={{ width: '8rem', height: '8rem' }} {...config} /> 
        <Heading as="h2">{t("common.welcome") + " " + user.username}</Heading>
  
        <Box minW={{ md: "400px" }} shadow="2xl">
          <Stack spacing={4} p="1rem" backgroundColor="whiteAlpha.900" boxShadow="md" rounded="1rem">
            <Tabs isFitted variant='enclosed'>
              <TabList mb='1em'>
                <Tab color="green.500"><FaGamepad /><Box ml={2}>Game modes</Box></Tab>
                <Tab color="green.500"><FaUser/> <Box ml={2}>User info</Box></Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Flex justify="center" flexWrap="wrap" flexDirection={{ base: "column", md: "row" }}>
                    <DashboardButton 
                      label="Kiwi Quest"
                      selectedButton={selectedButton}
                      onClick={setSelectedButton}
                      icon={<FaKiwiBird style={{ marginBottom: '0.5em', marginRight: '0.25em', fontSize: '1.8em' }} />}
                    />
                    <DashboardButton 
                      label="Football Showdown"
                      selectedButton={selectedButton}
                      onClick={setSelectedButton}
                      icon={<IoIosFootball style={{ marginBottom: '0.5em', marginRight: '0.25em', fontSize: '1.8em' }} />}
                    />
                    <DashboardButton 
                      label="Geo Genius"
                      selectedButton={selectedButton}
                      onClick={setSelectedButton}
                      icon={<TbWorld style={{ marginBottom: '0.5em', marginRight: '0.25em', fontSize: '1.8em' }} />}
                    />
                    <DashboardButton 
                      label="Videogame adventure"
                      selectedButton={selectedButton}
                      onClick={setSelectedButton}
                      icon={<IoLogoGameControllerB style={{ marginBottom: '0.5em', marginRight: '0.25em', fontSize: '1.8em' }} />}
                    />
                    <DashboardButton 
                      label="Ancient Odyssey"
                      selectedButton={selectedButton}
                      onClick={setSelectedButton}
                      icon={<FaPalette style={{ marginBottom: '0.5em', marginRight: '0.25em', fontSize: '1.8em' }} />}
                    />
                    <DashboardButton 
                      label="Random"
                      selectedButton={selectedButton}
                      onClick={setSelectedButton}
                      icon={<FaRandom style={{ marginBottom: '0.5em', marginRight: '0.25em', fontSize: '1.8em' }} />}
                    />
                    <SettingsButton onClick={() => setIsSettingsOpen(true)}/>
                    <CustomGameMenu isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} changeLanguage={changeLanguage}/>
                  </Flex>
                </TabPanel>
                <TabPanel>
                  <Stack spacing={2}>
                    <Heading as="h3" color="green.400" fontSize="xl">Username</Heading>
                    <Text fontWeight='extrabold' color={"forest_green.400"}>{user.username}</Text>
                    <Heading as="h3" color="green.400" fontSize="xl">Email</Heading>
                    <Text fontWeight='extrabold' color={"forest_green.400"}>{user.email}</Text>
                    <UserStatistics />
                  </Stack>
                </TabPanel>
              </TabPanels>
            </Tabs>
              <Flex justify="center">
                <Button  
                  type="submit" 
                  data-testid={"Play"} 
                  variant={"solid"} 
                  colorScheme={"pigment_green"} 
                  margin={"0.5rem"} 
                  className={"custom-button effect2"} 
                  onClick={() => navigate("/dashboard/game")}
                  size={"lg"}
                  fontSize={"2xl"}
                  flex="1"
                >
                  {t("common.play")}
                </Button>
              </Flex>
          </Stack>
        </Box>
      </Center>
    );
}
