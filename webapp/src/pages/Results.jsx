import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Flex, Box, Heading, Center } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import UserStatistics from "../components/statistics/UserStatistics";

export default function Results() {
    const { t } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    const correctAnswers = location.state?.correctAnswers || 0;

    return (
        <Center display="flex" flexDirection="column" w="100wh" h="100vh" justifyContent="center" alignItems="center" bgImage={'/background.svg'}>
            <Heading as="h2">{t("common.results")}</Heading>
            <Box bg="white" p={4} borderRadius="md" boxShadow="md" mt={4} mb={4} w="fit-content" shadow="2xl" rounded="1rem">
                <Heading as="h3" color="green.400" fontSize="xl">{`Correct answers: ${correctAnswers}`}</Heading>
                <Flex direction="row" justifyContent="center" alignItems="center">
                    <Button data-testid={"GoBack"} type="submit" variant="solid" colorScheme="pigment_green" margin={"10px"} className={"custom-button effect1"} onClick={() => navigate("/dashboard")} w="100%">
                        {t("common.finish")}
                    </Button>
                </Flex>
                <UserStatistics />
            </Box>
        </Center>
    );
}
