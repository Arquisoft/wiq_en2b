import { Center } from "@chakra-ui/layout";
import { Button, FormControl, FormLabel, Heading, Input, Text, Stack } from "@chakra-ui/react";
import axios, { HttpStatusCode } from "axios";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function Login() {

    const [hasError, setHasError] = useState(false);
    const navigate = useNavigate();
    const { t } = useTranslation();

    const sendLogin = async () => {
        let data = {};
        let response = await axios.post(process.env.API_URL, data);
        if (response.status === HttpStatusCode.Accepted) {
            navigate("/home");
        } else {
            setHasError(true);
        }
    }

    return (
        <Center display={"flex"} flexDirection={"column"} maxW={"100%"} minW={"30%"} mt={"2vh"}>
            <Heading as="h2">{ t("common.login")}</Heading>
            { 
                !hasError ? 
                <></> : 
                <Center bgColor={"#FFA98A"} margin={"1vh 0vw"} padding={"1vh 0vw"} 
                    color={"#FF0500"} border={"0.1875em solid #FF0500"}
                    borderRadius={"0.75em"} maxW={"100%"} minW={"30%"}>
                        <Text>Error</Text>
                </Center> 
            }
            <Stack spacing={4} mt={4} width="100%" mx={"auto"} maxWidth={"400px"}>
                <FormControl as="fieldset" padding={"1vh 0vw"} isRequired>
                    <FormLabel>{ t("session.username") }</FormLabel>
                    <Input type="text" />
                </FormControl>
                <FormControl as="fieldset" padding={"1vh 0vw"} isRequired>
                    <FormLabel> {t("session.password")}</FormLabel>
                    <Input type="password" />
                </FormControl>
                <Button type="submit" onClick={sendLogin}>Enviar</Button>
            </Stack>
        </Center>
    );
}