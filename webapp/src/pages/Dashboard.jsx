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
    const [selectedButtons, setSelectedButtons] = useState(new Set());
    
    const changeLanguage = (selectedLanguage) => {
        i18n.changeLanguage(selectedLanguage);
    };

    const user = {
      username: "User1",
      email: "pepe@test.com"
    };
    const config = genConfig(user.email) 
    
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const handleButtonClick = (label) => {
      const newSelectedButtons = new Set(selectedButtons);
      if (selectedButtons.has(label)) {
          newSelectedButtons.delete(label);
      } else {
          newSelectedButtons.add(label);
      }
      setSelectedButtons(newSelectedButtons);
    };

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
                  <Flex justify="center" align="center" flexWrap={{ base: "wrap", md: "nowrap" }}>
                    <DashboardButton 
                      label="Default"
                      selectedButtons={selectedButtons}
                      onClick={handleButtonClick}
                      icon={<FaKiwiBird style={{ marginBottom: '0.5em', marginRight: '0.25em' }} />}
                    />
                    <DashboardButton 
                      label="Football"
                      selectedButtons={selectedButtons}
                      onClick={handleButtonClick}
                      icon={<IoIosFootball style={{ marginBottom: '0.5em', marginRight: '0.25em' }} />}
                    />
                    <DashboardButton 
                      label="Geography"
                      selectedButtons={selectedButtons}
                      onClick={handleButtonClick}
                      icon={<TbWorld style={{ marginBottom: '0.5em', marginRight: '0.25em' }} />}
                    />
                    <DashboardButton 
                      label="Videogames"
                      selectedButtons={selectedButtons}
                      onClick={handleButtonClick}
                      icon={<IoLogoGameControllerB style={{ marginBottom: '0.5em', marginRight: '0.25em' }} />}
                    />
                    <DashboardButton 
                      label="History"
                      selectedButtons={selectedButtons}
                      onClick={handleButtonClick}
                      icon={<FaPalette style={{ marginBottom: '0.5em', marginRight: '0.25em' }} />}
                    />
                    <DashboardButton 
                      label="Random"
                      selectedButtons={selectedButtons}
                      onClick={handleButtonClick}
                      icon={<FaRandom style={{ marginBottom: '0.5em', marginRight: '0.25em' }} />}
                    />
                    <SettingsButton onClick={() => setIsSettingsOpen(true)}/>
                    <CustomGameMenu isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} changeLanguage={changeLanguage}/>
                    {/* <Button
                      colorScheme="green"
                      variant="outline"
                      textAlign="center"
                      m="1em"
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      size="lg"
                      height="4rem"
                      maxW={{ base: "100%", md: "calc(100% / 3 - 2em)" }}
                    >
                      <SettingsIcon style={{ marginBottom: '0.5em', marginRight: '0.25em' }} />
                      <Box>Custom</Box>
                    </Button> */}
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
                margin={"5px"} 
                className={"custom-button effect1"} 
                onClick={() => navigate("/dashboard/game")}
                size={"lg"}
                fontSize={"2xl"}
                maxW={{ base: "100%", md: "calc(100% / 3 - 2em)" }} 
              >
                {t("common.play")}
              </Button>
            </Flex>
          </Stack>
        </Box>
      </Center>
    );
}
