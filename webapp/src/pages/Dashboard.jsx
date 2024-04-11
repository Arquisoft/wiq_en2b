import React, { useState } from "react";
import { Heading, Button, Box, Stack, Tabs, TabList, Tab, TabPanels, TabPanel, Flex } from "@chakra-ui/react";
import { Center } from "@chakra-ui/layout";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Avatar, { genConfig } from 'react-nice-avatar';
import { SettingsIcon } from '@chakra-ui/icons';
import { FaUser, FaGamepad, FaCity, FaRandom } from "react-icons/fa";
import { MdOutlineStadium } from "react-icons/md";
import { IoIosFootball, IoLogoGameControllerB } from "react-icons/io";
import { AiFillPicture } from "react-icons/ai";

import DashboardButton from '../components/DashboardButton';
import LateralMenu from '../components/LateralMenu';
import MenuButton from '../components/MenuButton';
import UserStatistics from "../components/statistics/UserStatistics";

export default function Dashboard() {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedButtons, setSelectedButtons] = useState(new Set());
    
    const changeLanguage = (selectedLanguage) => {
        i18n.changeLanguage(selectedLanguage);
    };

    const config = genConfig("pepe@test.com") 
    const user = {
      username: "User1"
    };

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
                <Tab color="green.500"><SettingsIcon mr={2}/> Settings</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Flex justify="center" align="center" flexWrap={{ base: "wrap", md: "nowrap" }}>
                    <DashboardButton 
                      label="Ballon d'Or"
                      selectedButtons={selectedButtons}
                      onClick={handleButtonClick}
                      icon={<IoIosFootball style={{ marginBottom: '0.5em', marginRight: '0.25em' }} />}
                    />
                    <DashboardButton 
                      label="Capitals"
                      selectedButtons={selectedButtons}
                      onClick={handleButtonClick}
                      icon={<FaCity style={{ marginBottom: '0.5em', marginRight: '0.25em' }} />}
                    />
                    <DashboardButton 
                      label="Videogame publishers"
                      selectedButtons={selectedButtons}
                      onClick={handleButtonClick}
                      icon={<IoLogoGameControllerB style={{ marginBottom: '0.5em', marginRight: '0.25em' }} />}
                    />
                    <DashboardButton 
                      label="Stadiums"
                      selectedButtons={selectedButtons}
                      onClick={handleButtonClick}
                      icon={<MdOutlineStadium style={{ marginBottom: '0.5em', marginRight: '0.25em' }} />}
                    />
                    <DashboardButton 
                      label="Drawings"
                      selectedButtons={selectedButtons}
                      onClick={handleButtonClick}
                      icon={<AiFillPicture style={{ marginBottom: '0.5em', marginRight: '0.25em' }} />}
                    />
                    <DashboardButton 
                      label="Random"
                      selectedButtons={selectedButtons}
                      onClick={handleButtonClick}
                      icon={<FaRandom style={{ marginBottom: '0.5em', marginRight: '0.25em' }} />}
                    />
                  </Flex>
                </TabPanel>
                <TabPanel>
                  <UserStatistics />
                </TabPanel>
                <TabPanel>
                  <p>user and game settings</p>
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
