import { Center } from "@chakra-ui/layout";
import { Heading, Stack } from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ButtonEf from '../components/ButtonEf';

export default function Root() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <Center display={"flex"} flexDirection={"column"} w={"100wh"} h={"100vh"}
            bg={"blue.50"} justifyContent={"center"} alignItems={"center"}>
            <Heading as="h1" color="blue.400">{"WIQ-EN2B"}</Heading>
            <p>Welcome to the WIQ-EN2B page</p>
            <Stack spacing={4} p="3rem">
                <ButtonEf dataTestId={"Login"} variant={"solid"} colorScheme={"blue"} text={t("common.login")} onClick={() => navigate("/login")}/>
                <p onClick={() => navigate("/signup")} style={{ cursor: 'pointer' }}>You don´t have an account?</p>
            </Stack>  
        </Center>
    );
}