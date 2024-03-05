import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Center } from "@chakra-ui/layout";
import { Text, Flex, Heading, Button, Box } from "@chakra-ui/react";

export default function Rules() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <Center display="flex" flexDirection="column" w="100wh" h="100vh" bg="blue.50" justifyContent="center" alignItems="center">
            <Heading as="h2" color="blue.400">{t("common.rules")}</Heading>
    
            <Box bg="white" p={4} borderRadius="md" boxShadow="md" mt={4} mb={4} maxW="400px" w="90%" shadow="2xl" rounded="1rem">
                <Text margin={"10px"}>The <strong>WIQ</strong> game consists of quick games of 9 rounds. In each round there is one question and two possible answers. The key to earning points lies in choosing the correct answer.</Text>
                <Text margin={"10px"}>There is only one correct answer.</Text>
                <Text margin={"10px"}>You have to select a question before time runs out.</Text>
                <Text margin={"10px"}>To start playing you have to click on the Play button.</Text>
                <Flex direction="row" justifyContent="center" alignItems="center">
                    <Button data-testid={"GoBack"} type="submit" colorScheme="blue" margin={"10px"} className={"custom-button effect1"} onClick={() => navigate("/dashboard")} w="100%">
                        {t("common.goBack")}
                    </Button>
                </Flex>
            </Box>
        </Center>
    );
}