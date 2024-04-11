import React, { useState } from "react";
import { Heading, Button, Box, Stack, Tabs, TabList, Tab, TabPanels, TabPanel, Flex } from "@chakra-ui/react";
import { Center } from "@chakra-ui/layout";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Avatar, { genConfig } from 'react-nice-avatar';
import { SettingsIcon } from '@chakra-ui/icons';

import AuthManager from "components/auth/AuthManager";
import LateralMenu from '../components/LateralMenu';
import MenuButton from '../components/MenuButton';

export default function Dashboard() {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    const handleLogout = async () => {
        try {
            await new AuthManager().logout();
            navigate("/");
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const changeLanguage = (selectedLanguage) => {
        i18n.changeLanguage(selectedLanguage);
    };

    const config = genConfig("pepe@test.com") 
    const user = {
      username: "User1"
    };

    return (
        <Center display="flex" flexDirection="column" w="100wh" h="100vh" justifyContent="center" alignItems="center" bgImage={'/background.svg'}>
          <MenuButton onClick={() => setIsMenuOpen(true)} />
          <LateralMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} changeLanguage={changeLanguage} isDashboard={true}/>
          <Avatar style={{ width: '8rem', height: '8rem' }} {...config} /> 
          <Heading as="h2">{t("common.welcome") + " " + user.username}</Heading>
    
          <Box minW={{ md: "400px" }} shadow="2xl">
            <Stack spacing={4} p="1rem" backgroundColor="whiteAlpha.900" boxShadow="md" rounded="1rem">
              <Tabs isFitted variant='enclosed'>
                <TabList mb='1em'>
                  <Tab color="green.500">Game modes</Tab>
                  <Tab color="green.500"><SettingsIcon mr={1}/> Settings</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <Flex justify="center" align="center" flexWrap="wrap">
                      <Button colorScheme={"green"} variant="outline" textAlign="center" m="1em">
                        Flags
                      </Button>
                      <Button colorScheme={"green"} variant="outline" textAlign="center" m="1em">
                        Capitals
                      </Button>
                      <Button colorScheme={"green"} variant="outline" textAlign="center" m="1em">
                        Football
                      </Button>
                      <Button colorScheme={"green"} variant="outline" textAlign="center" m="1em">
                        Party
                      </Button>
                    </Flex>
                  </TabPanel>
                  <TabPanel>
                    <p>user and game settings</p>
                  </TabPanel>
                </TabPanels>
              </Tabs>
              <Button type="submit" data-testid={"Play"} variant={"solid"} colorScheme={"pigment_green"} margin={"5px"} size="lg" className={"custom-button effect1"} onClick={() => navigate("/dashboard/game")}>{t("common.play")}</Button>
              <Button type="submit" colorScheme="raw_umber" margin={"5px"} className={"custom-button effect1"} onClick={handleLogout}>{t("common.logout")}</Button>
            </Stack>
          </Box>
        </Center>
    );
}
