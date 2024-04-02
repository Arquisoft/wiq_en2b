import React, { useState } from "react";
import { Heading, Button, Box, Stack } from "@chakra-ui/react";
import { Center } from "@chakra-ui/layout";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ButtonEf from '../components/ButtonEf';
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
    const currentLanguage = i18n.language;
    const changeLanguage = (selectedLanguage) => {
        i18n.changeLanguage(selectedLanguage);
    };

    return (
        <Center display="flex" flexDirection="column" w="100wh" h="100vh" justifyContent="center" alignItems="center" bgImage={'/background.svg'}>
          <MenuButton onClick={() => setIsMenuOpen(true)} />
          <LateralMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} changeLanguage={changeLanguage} currentLanguage={currentLanguage} isLoggedIn={true} isDashboard={true}/>

          <Heading as="h2">{t("common.dashboard")}</Heading>
    
          <Box minW={{ md: "400px" }} shadow="2xl">
            <Stack spacing={4} p="1rem" backgroundColor="whiteAlpha.900" boxShadow="md" rounded="1rem">
              <ButtonEf dataTestId={"Play"} variant={"solid"} colorScheme={"forest_green"} text={t("common.play")} onClick={() => navigate("/dashboard/game")}/>
              <Button type="submit" colorScheme="red" margin={"10px"} className={"custom-button effect1"} onClick={handleLogout}>{t("common.logout")}</Button>
            </Stack>
          </Box>
        </Center>
    );
}
