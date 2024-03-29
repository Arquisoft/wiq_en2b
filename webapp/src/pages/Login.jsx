import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { FaLock, FaAddressCard } from "react-icons/fa";
import { Center } from "@chakra-ui/layout";
import { Heading, Input, InputGroup, Stack, InputLeftElement, chakra, Box, Avatar, FormControl, InputRightElement, IconButton, Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import ButtonEf from '../components/ButtonEf';
import '../styles/AppView.css';
import { isUserLogged, login } from "../components/auth/AuthUtils";
import { logoutUser } from "../components/game/Logout"; // Importa la función logoutUser

export default function Login() {

    const navigate = useNavigate();
    const navigateToDashboard = () => {
        if (isUserLogged()) {
            navigate("/dashboard");
        }
    }

    useEffect(() => {
        const checkUserLoggedIn = async () => {
            if (isUserLogged()) {
                try {
                    await logoutUser(); // Cierra sesión antes de redirigir al inicio de sesión
                } catch (error) {
                    console.error("Error al cerrar sesión:", error);
                }
            }
        };

        checkUserLoggedIn();
    }, []); // Solo se ejecuta al montar el componente

    const [hasError, setHasError] = useState(false);
    const { t } = useTranslation();

    const [showPassword, setShowPassword] = useState(false);
    const changeShowP = () => setShowPassword(!showPassword);

    const ChakraFaCardAlt = chakra(FaAddressCard);
    const ChakraFaLock = chakra(FaLock);

    const sendLogin = async (errorMessage) => {
        const loginData = {
            "email": document.getElementById("user").value,
            "password": document.getElementById("password").value
        };
        await login(loginData, navigateToDashboard, () => setHasError(true));
        if (errorMessage) {
            setErrorMessage(errorMessage);
        }
    }

    const [errorMessage, setErrorMessage] = useState("");

    return (
        <Center display={"flex"} flexDirection={"column"} w={"100wh"} h={"100vh"}
            bg={"blue.50"} justifyContent={"center"} alignItems={"center"} bgImage={'/background.svg'}>
            <Stack flexDir={"column"} mb="2" justifyContent="center" alignItems={"center"}>
                <Avatar bg="pigment_green.500" />
                <Heading as="h2">{t("common.login")}</Heading>
                {
                    hasError &&
                    <Alert status='error' rounded="1rem" margin={"1vh 0vw"}>
                        <AlertIcon />
                        <AlertTitle>{t("error.login")}</AlertTitle>
                        <AlertDescription>{errorMessage ? errorMessage : t("error.login-desc")}</AlertDescription>
                    </Alert>
                }
                <Box minW={{ md: "400px" }} shadow="2xl">
                    <Stack spacing={4} p="1rem" backgroundColor="whiteAlpha.900" boxShadow="md" rounded="1rem">
                        <FormControl>
                            <InputGroup>
                                <InputLeftElement>
                                    <ChakraFaCardAlt color="gray.300" />
                                </InputLeftElement>
                                <Input type="text" id={"user"} placeholder={t("session.email")} />
                            </InputGroup>
                        </FormControl>
                        <FormControl>
                            <InputGroup>
                                <InputLeftElement>
                                    <ChakraFaLock color="gray.300" />
                                </InputLeftElement>
                                <Input type={showPassword ? "text" : "password"} id={"password"} placeholder={t("session.password")} />
                                <InputRightElement>
                                    <IconButton h="1.75rem" size="sm" onClick={changeShowP} aria-label='Shows or hides the password' icon={showPassword ? <ViewOffIcon /> : <ViewIcon />} data-testid="togglePasswordButton" />
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <ButtonEf dataTestId={"Login"} variant={"solid"} colorScheme={"pigment_green"} text={t("common.login")} onClick={() => sendLogin(t("error.login-send"))} />
                    </Stack>
                </Box>
            </Stack>
        </Center>
    );
}
