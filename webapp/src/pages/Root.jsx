import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Center } from "@chakra-ui/layout";
import { Text, Heading, Stack, Link, Image } from "@chakra-ui/react";

import ButtonEf from '../components/ButtonEf';

export default function Root() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const signup = () => {
        navigate("/signup");
    }

    return (
        <Center display={"flex"} flexDirection={"column"} w={"100wh"} h={"100vh"} bg={"moonstone.900"} justifyContent={"center"} alignItems={"center"}>
            <Image
                borderRadius='full'
                boxSize='150px'
                src='/kiwiq-icon.ico'
                alt='kiwiq icon'
            />
            <Heading as="h1" color="forest_green.400">{"KIWIQ"}</Heading>
            <Text>{t("session.welcome")}</Text>
            <Stack spacing={4} p="3rem">
                <ButtonEf dataTestId={"Login"} variant={"solid"} colorScheme={"pigment_green"} text={t("common.login")} onClick={() => navigate("/login")}/>
                <Text>{t("session.account")} <Link as="span" color={"forest_green.400"} onClick={signup}>{t("session.clickHere")}</Link></Text>
            </Stack>  
        </Center>
    );
}