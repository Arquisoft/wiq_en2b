import { Center } from "@chakra-ui/layout";
import { Grid, Flex, Heading, Button, Box } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ButtonEf from '../components/ButtonEf';

export default function Dashboard() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <Center display="flex" flexDirection="column" w="100wh" h="100vh" bg="blue.50" justifyContent="center" alignItems="center">
          <Heading as="h2" color="blue.400">{("User's Dashboard")}</Heading>
    
          <Box bg="white" p={4} borderRadius="md" boxShadow="md" mt={4} mb={4} w="fit-content">
            <Grid templateColumns="repeat(3, 1fr)" gap={4}>
              <ButtonEf dataTestId={"Rules"} variant={"outline"} colorScheme={"blue"} text={t("common.rules")} onClick={() => navigate("/rules")}/>
              <ButtonEf dataTestId={"Play"} variant={"solid"} colorScheme={"blue"} text={t("common.play")} onClick={() => navigate("/game")}/>
              <ButtonEf dataTestId={"Statistics"} variant={"outline"} colorScheme={"blue"} text={t("common.statistics.title")} onClick={() => navigate("/statistics")}/>
            </Grid>
            
            <Flex direction="row" justifyContent="center" alignItems="center">
              <Button type="submit" variant="solid" colorScheme="red" margin={"10px"} className={"custom-button effect1"} onClick={() => navigate("/login")} w="100%">
                Log Out
              </Button>
            </Flex>
          </Box>
        </Center>
    );
}
