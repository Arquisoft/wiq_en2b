import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Center } from "@chakra-ui/layout";
import { Text, Heading, Box } from "@chakra-ui/react";

import GoBack from "components/GoBack";
import LateralMenu from '../components/LateralMenu';
import MenuButton from '../components/MenuButton';

export default function Rules() {
    const { t, i18n } = useTranslation();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const currentLanguage = i18n.language;
    const changeLanguage = (selectedLanguage) => {
        i18n.changeLanguage(selectedLanguage);
    };

    return (
        <Center display="flex" flexDirection="column" w="100wh" h="100vh" justifyContent="center" alignItems="center" bgImage={'/background.svg'}>
            <MenuButton onClick={() => setIsMenuOpen(true)} />
            <LateralMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} changeLanguage={changeLanguage} currentLanguage={currentLanguage} isLoggedIn={true} isDashboard={false}/>

            <Heading as="h2">{t("common.rules")}</Heading>
    
            <Box bg="white" p={4} borderRadius="md" boxShadow="md" mt={4} mb={4} maxW="400px" w="90%" shadow="2xl" rounded="1rem" textAlign={"justify"}>
                <Text>{t("rules.description1")}</Text>
                <br></br>
                <Text>{t("rules.description2")}</Text>
                <br></br>
                <Text>{t("rules.description3")}</Text>
                <br></br>
                <Text>{t("rules.description4")}</Text>
                <GoBack />
            </Box>
        </Center>
    );
}