import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Center } from "@chakra-ui/layout";
import { Text, Heading, Stack, Link } from "@chakra-ui/react";

import ButtonEf from '../components/ButtonEf';

export default function Root() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const signup = () => {
        navigate("/signup");
    }

    return (
        <Center display={"flex"} flexDirection={"column"} w={"100wh"} h={"100vh"} bg={"blue.50"} justifyContent={"center"} alignItems={"center"}>
            <Heading as="h1" color="blue.400">{"WIQ-EN2B"}</Heading>
            <Text>{t("session.welcome")}</Text>
            <Stack spacing={4} p="3rem">
                <ButtonEf dataTestId={"Login"} variant={"solid"} colorScheme={"blue"} text={t("common.login")} onClick={() => navigate("/login")}/>
                <p onClick={signup} onKeyDown={signup} style={{ cursor: 'pointer' }}>{t("session.account")}</p>
            </Stack>  
        </Center>
    );
}