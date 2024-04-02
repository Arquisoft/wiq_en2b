import React, { useState } from "react";
import { Grid, Flex, Heading, Button, Box } from "@chakra-ui/react";
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
          <LateralMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} changeLanguage={changeLanguage} currentLanguage={currentLanguage}/>

          <Heading as="h2">{t("common.dashboard")}</Heading>
    
          <Box bg="white" p={4} borderRadius="md" boxShadow="md" mt={4} mb={4} w="fit-content" shadow="2xl" rounded="1rem">
            <Grid templateColumns="repeat(3, 1fr)" gap={4}>
              <ButtonEf dataTestId={"Rules"} variant={"outline"} colorScheme={"green"} text={t("common.rules")} onClick={() => navigate("/dashboard/rules")}/>
              <ButtonEf dataTestId={"Play"} variant={"solid"} colorScheme={"forest_green"} text={t("common.play")} onClick={() => navigate("/dashboard/game")}/>
              <ButtonEf dataTestId={"Statistics"} variant={"outline"} colorScheme={"green"} text={t("common.statistics.title")} onClick={() => navigate("/dashboard/statistics")}/>
            </Grid>

            <Flex direction="row" justifyContent="center" alignItems="center">
              <Button type="submit" colorScheme="red" margin={"10px"} className={"custom-button effect1"} onClick={handleLogout} w="100%">
                {t("common.logout")}
              </Button>
            </Flex>
          </Box>
        </Center>
    );
}
