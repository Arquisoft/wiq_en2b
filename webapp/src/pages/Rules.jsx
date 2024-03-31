import React from "react";
import { useTranslation } from "react-i18next";
import { Center } from "@chakra-ui/layout";
import { Text, Heading, Box } from "@chakra-ui/react";
import GoBack from "components/GoBack";

export default function Rules() {
    const { t } = useTranslation();

    return (
        <Center display="flex" flexDirection="column" w="100wh" h="100vh" bg="blue.50" justifyContent="center" alignItems="center" bgImage={'/background.svg'}>
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