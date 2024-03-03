import { Center } from "@chakra-ui/layout";
import { Heading, Input, Button, InputGroup, Stack, InputLeftElement, chakra, Box, Avatar, FormControl, InputRightElement, Text } from "@chakra-ui/react";
import React, {useState} from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { FaLock, FaAddressCard } from "react-icons/fa";
import ButtonEf from '../components/ButtonEf';
import '../styles/AppView.css';
import {isUserLogged, login, saveToken} from "../components/auth/AuthUtils";

export default function Login() {

    const navigate = useNavigate();
    if (isUserLogged()) {
        navigate("/dashboard");
    }

    const [hasError, setHasError] = useState(false);
    const { t } = useTranslation();

    const sendLogin = async () => {
        const loginData = {
            "email": document.getElementById("user").value,
            "password": document.getElementById("password").value
        };
        login(loginData).then(requestAnswer => {
            saveToken(requestAnswer);
            navigate("/dashboard");
        }).catch(err => {
            setHasError(true);
        });
    }

    const [showPassword, setShowPassword] = useState(false);

    const changeShowP = () => setShowPassword(!showPassword);

    const ChakraFaCardAlt = chakra(FaAddressCard);
    const ChakraFaLock = chakra(FaLock);

    return (
        <Center display={"flex"} flexDirection={"column"} w={"100wh"} h={"100vh"}
            bg={"blue.50"} justifyContent={"center"} alignItems={"center"}>
            <Stack flexDir={"column"} mb="2" justifyContent="center" alignItems={"center"}>
                <Avatar bg="blue.500" />
                <Heading as="h2" color="blue.400">{ t("common.login")}</Heading>
                { 
                    !hasError ? 
                    <></> : 
                    <Center bgColor={"#FFA98A"} margin={"1vh 0vw"} padding={"1vh 0vw"} 
                        color={"#FF0500"} border={"0.1875em solid #FF0500"}
                        borderRadius={"0.75em"} maxW={"100%"} minW={"30%"}>
                            <Text>Error</Text>
                    </Center> 
                }
                <Box minW={{md: "400px"}}>
                    <Stack spacing={4} p="1rem" backgroundColor="whiteAlpha.900" boxShadow="md">
                        <FormControl>
                            <InputGroup>
                                <InputLeftElement children={<ChakraFaCardAlt color="gray.300" />}/>
                                <Input type="text" id="user" placeholder={t("session.email")} />
                            </InputGroup>
                        </FormControl>
                        <FormControl>
                            <InputGroup>
                                <InputLeftElement children={<ChakraFaLock color="gray.300" />}/>
                                <Input type={showPassword ? "text" : "password"} id="password" placeholder={t("session.password")}/>
                                <InputRightElement width="4.5rem">
                                    <Button h="1.75rem" size="sm" onClick={changeShowP}>{
                                        showPassword ? "Hide" : "Show"
                                    }</Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <ButtonEf type={"submit"} text="Login" onClick={sendLogin}/>
                    </Stack>
                </Box>
            </Stack>
        </Center>
    );
}