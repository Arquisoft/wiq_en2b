import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { FaLock, FaAddressCard } from "react-icons/fa";
import { Center } from "@chakra-ui/layout";
import { Heading, Input, InputGroup, Stack, InputLeftElement, chakra, Box, Avatar, FormControl, InputRightElement, IconButton} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import ButtonEf from '../components/ButtonEf';
import '../styles/AppView.css';
import ErrorMessageAlert from "../components/ErrorMessageAlert";
import AuthManager from "components/auth/AuthManager";

export default function Login() {

    const navigate = useNavigate();
    const navigateToDashboard = () => {
        if (AuthManager.getInstance().isLoggedIn()) {
            navigate("/dashboard");
        }
    }

    const [errorMessage, setErrorMessage] = useState(null);
    const { t } = useTranslation();

    const [showPassword, setShowPassword] = useState(false);
    const changeShowP = () => setShowPassword(!showPassword);

    const ChakraFaCardAlt = chakra(FaAddressCard);
    const ChakraFaLock = chakra(FaLock);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setErrorMessage(false); 
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setErrorMessage(false); 
    }

    const sendLogin = async () => {
        const loginData = {
            "email": email,
            "password": password
        };
        try {
            await AuthManager.getInstance().login(loginData, navigateToDashboard, setErrorMessage);
        } catch {
            setErrorMessage("Error desconocido");
        }
    }

    return (
        <Center onLoad={navigateToDashboard} display={"flex"} flexDirection={"column"} w={"100wh"} h={"100vh"}
            bg={"blue.50"} justifyContent={"center"} alignItems={"center"}>
            <Stack flexDir={"column"} mb="2" justifyContent="center" alignItems={"center"}>
                <Avatar bg="blue.500" />
                <Heading as="h2" color="blue.400">{t("common.login")}</Heading>
                <ErrorMessageAlert errorMessage={errorMessage} t={t} errorWhere={"error.login"}/>
                <Box minW={{ md: "400px" }} shadow="2xl">
                    <Stack spacing={4} p="1rem" backgroundColor="whiteAlpha.900" boxShadow="md" rounded="1rem">
                        <FormControl>
                            <InputGroup>
                                <InputLeftElement>
                                    <ChakraFaCardAlt color="gray.300" />
                                </InputLeftElement>
                                <Input 
                                    type="text" 
                                    id={"user"} 
                                    placeholder={t("session.email")} 
                                    value={email} 
                                    onChange={handleEmailChange}
                                />
                            </InputGroup>
                        </FormControl>
                        <FormControl>
                            <InputGroup>
                                <InputLeftElement>
                                    <ChakraFaLock color="gray.300" />
                                </InputLeftElement>
                                <Input 
                                    type={showPassword ? "text" : "password"} 
                                    id={"password"} 
                                    placeholder={t("session.password")} 
                                    value={password} 
                                    onChange={handlePasswordChange}
                                />
                                <InputRightElement>
                                    <IconButton h="1.75rem" size="sm" onClick={changeShowP} aria-label='Shows or hides the password' icon={showPassword ? <ViewOffIcon /> : <ViewIcon />} data-testid="togglePasswordButton" />
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <ButtonEf dataTestId={"Login"} variant={"solid"} colorScheme={"blue"} text={t("common.login")} onClick={sendLogin} />
                    </Stack>
                </Box>
            </Stack>
        </Center>
    );
}
