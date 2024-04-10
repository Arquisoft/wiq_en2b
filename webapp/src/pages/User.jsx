import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Center } from "@chakra-ui/layout";
import { Text, Heading, Box, Stack } from "@chakra-ui/react";
import UserStatistics from "../components/statistics/UserStatistics";
import Avatar, { genConfig } from 'react-nice-avatar'

import LateralMenu from '../components/LateralMenu';
import MenuButton from '../components/MenuButton';

export default function Profile() {
    const { t, i18n } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const changeLanguage = (selectedLanguage) => {
        i18n.changeLanguage(selectedLanguage);
    };

    const user = {
        username: "User1"
    };

    const config = genConfig("pepe@test.com") 

    return (
        <Center display="flex" flexDirection="column" w="100wh" h="100vh" justifyContent="center" alignItems="center" bgImage={'/background.svg'}>
            <MenuButton data-testid="menu-button" onClick={() => setIsMenuOpen(true)} />
            <LateralMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} changeLanguage={changeLanguage} isDashboard={false}/>
            
            <Avatar style={{ width: '8rem', height: '8rem' }} {...config} />
            <Heading as="h2" mt={4}>{t("common.welcome") + " " + user.username}</Heading>
            <Text>{user.bio}</Text>
    
            <Box bg="white" p={4} borderRadius="md" boxShadow="md" mt={4} mb={4} maxW="400px" w="90%" shadow="2xl" rounded="1rem" textAlign={"justify"}>
                <Stack spacing={2}>
                    <UserStatistics />
                </Stack>
            </Box>
        </Center>
    );
}
