import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { FaUserAlt, FaLock, FaAddressCard } from "react-icons/fa";
import { Center } from "@chakra-ui/layout";
import { Heading, Input, InputGroup, Stack, InputLeftElement, chakra, Box, Avatar, FormControl, InputRightElement, FormHelperText, IconButton, Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { isUserLogged, register } from "../components/auth/AuthUtils";

import ButtonEf from '../components/ButtonEf';

export default function Signup() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [hasError, setHasError] = useState(false);

    const navigate = useNavigate();
    const { t } = useTranslation();

    const ChakraFaCardAlt = chakra(FaAddressCard);
    const ChakraFaUserAlt = chakra(FaUserAlt);
    const ChakraFaLock = chakra(FaLock);

    const navigateToDashboard = () => {
        if (isUserLogged()) {
            navigate("/dashboard");
        }
    }

    useEffect(navigateToDashboard);

    const sendRegistration = async () => {
        const registerData = {
            "email": document.getElementById("user").value,
            "username": document.getElementById("username").value,
            "password": document.getElementById("password").value
        };
        await register(registerData, navigateToDashboard, () => setHasError(true));
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setHasError(false); 
    }

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
        setHasError(false); 
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setHasError(false); 
    }

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setHasError(false); 
    }

    return (
        <Center
            display={"flex"} flexDirection={"column"} w={"100wh"} h={"100vh"} bg={"blue.50"} justifyContent={"center"} alignItems={"center"}>
            <Stack flexDir={"column"} mb="2" justifyContent="center" alignItems={"center"}>
                <Avatar bg="blue.500" />
                <Heading as="h2" color="blue.400">
                    {t("common.register")}
                </Heading>
                {
                    hasError && 
                    <Alert status='error'rounded="1rem" margin={"1vh 0vw"}>
                        <AlertIcon />
                        <AlertTitle>{t("error.register")}</AlertTitle>
                        <AlertDescription>{t("error.register-desc")}</AlertDescription>
                    </Alert>
                }
                <Box minW={{ md: "400px" }} shadow="2xl">
                    <Stack spacing={4} p="1rem" backgroundColor="whiteAlpha.900" boxShadow="md" rounded="1rem">
                        <FormControl>
                            <InputGroup>
                                <InputLeftElement>
                                    <ChakraFaCardAlt color="gray.300"/>
                                </InputLeftElement>
                                <Input
                                    type="text"
                                    id="user"
                                    placeholder={t("session.email")}
                                    value={email}
                                    onChange={handleEmailChange}
                                />
                            </InputGroup>
                        </FormControl>
                        <FormControl>
                            <InputGroup>
                                <InputLeftElement>
                                    <ChakraFaUserAlt color="gray.300"/>
                                </InputLeftElement>
                                <Input
                                    type="text"
                                    id="username"
                                    placeholder={t("session.username")}
                                    value={username}
                                    onChange={handleUsernameChange}
                                />
                            </InputGroup>
                        </FormControl>
                        <FormControl>
                            <InputGroup>
                                <InputLeftElement>
                                    <ChakraFaLock color="gray.300"/>
                                </InputLeftElement>
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    placeholder={t("session.password")}
                                    value={password}
                                    onChange={handlePasswordChange}
                                />
                                <InputRightElement>
                                    <IconButton aria-label='Shows or hides the password' data-testid="show-confirm-password-button" h="1.75rem" size="sm" onClick={() => setShowPassword(!showPassword)} icon={showPassword ? <ViewOffIcon/> : <ViewIcon/>}/>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <FormControl>
                            <InputGroup>
                                <InputLeftElement>
                                    <ChakraFaLock color="gray.300"/>
                                </InputLeftElement>
                                <Input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder={t("session.confirm_password")}
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                />
                                <InputRightElement>
                                    <IconButton aria-label='Shows or hides the password' data-testid="show-confirm-password-button" h="1.75rem" size="sm" onClick={() => setShowConfirmPassword(!showConfirmPassword)} icon={showConfirmPassword ? <ViewOffIcon/> : <ViewIcon/>}/>
                                </InputRightElement>
                            </InputGroup>
                            {confirmPassword && password && confirmPassword !== password && (
                                <FormHelperText color="red">Las contraseñas no coinciden</FormHelperText>
                            )}
                        </FormControl>
                        <ButtonEf dataTestId={"Sign up"} variant={"solid"} colorScheme={"blue"} text={t("common.register")} onClick={sendRegistration}/>
                    </Stack>
                </Box>
            </Stack>
        </Center>
    );
}
