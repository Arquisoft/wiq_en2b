import React from "react";
import { Grid, Flex, Heading, Button, Box } from "@chakra-ui/react";
import { Center } from "@chakra-ui/layout";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { logoutUser } from "../components/game/Logout";
import ButtonEf from '../components/ButtonEf';

export default function Dashboard() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleLogout = async () => {
        try {
            await logoutUser();
            navigate("/");
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    return (
        <Center display="flex" flexDirection="column" w="100wh" h="100vh" justifyContent="center" alignItems="center" bgImage={'/background.svg'}>
          <Heading as="h2">{t("common.dashboard")}</Heading>
    
          <Box bg="white" p={4} borderRadius="md" boxShadow="md" mt={4} mb={4} w="fit-content" shadow="2xl" rounded="1rem">
            <Grid templateColumns="repeat(3, 1fr)" gap={4}>
              <ButtonEf dataTestId={"Rules"} variant={"outline"} colorScheme={"green"} text={t("common.rules")} onClick={() => navigate("/dashboard/rules")}/>
              <ButtonEf dataTestId={"Play"} variant={"solid"} colorScheme={"forest_green"} text={t("common.play")} onClick={() => navigate("/dashboard/game")}/>
              <Button isDisabled data-testid={"Statistics"} type="submit" colorScheme={"pigment_green"} margin={"10px"} className={"custom-button effect1"} onClick={() => navigate("/dashboard/statistics")}>
                {t("common.statistics.title")}
              </Button>
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
