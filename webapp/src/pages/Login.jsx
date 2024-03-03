import { Center } from "@chakra-ui/layout";
import { Heading, Input, InputGroup, Stack, InputLeftElement, chakra, Box, Avatar, FormControl, InputRightElement, Text, IconButton } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import axios, { HttpStatusCode } from "axios";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { FaLock, FaAddressCard } from "react-icons/fa";
import ButtonEf from '../components/ButtonEf';
import '../styles/AppView.css';

export default function Login() {

    const [hasError, setHasError] = useState(false);
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [showPassword, setShowPassword] = useState(false);
    const changeShowP = () => setShowPassword(!showPassword);

    const ChakraFaCardAlt = chakra(FaAddressCard);
    const ChakraFaLock = chakra(FaLock);

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
                            <Text>{t("error.login")}</Text>
                    </Center> 
                }
                <Box minW={{md: "400px"}}>
                    <Stack spacing={4} p="1rem" backgroundColor="whiteAlpha.900" boxShadow="md">
                        <FormControl>
                            <InputGroup>
                                <InputLeftElement children={<ChakraFaCardAlt color="gray.300" />}/>
                                <Input type="text" placeholder={t("session.email")} />
                            </InputGroup>
                        </FormControl>
                        <FormControl>
                            <InputGroup>
                                <InputLeftElement children={<ChakraFaLock color="gray.300" />}/>
                                <Input type={showPassword ? "text" : "password"}  placeholder={t("session.password")}/>
                                <InputRightElement>
                                    <IconButton h="1.75rem" size="sm" onClick={changeShowP} aria-label='Shows or hides the password' icon={showPassword ? <ViewOffIcon/> : <ViewIcon/>}/>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <ButtonEf variant={"solid"} colorScheme={"blue"} text="Login" onClick={sendLogin}/>
                    </Stack>
                </Box>
            </Stack>
        </Center>
    );
}