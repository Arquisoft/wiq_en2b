import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { FaLock, FaAddressCard } from "react-icons/fa";
import { Center } from "@chakra-ui/layout";
import { Heading, Input, InputGroup, Stack, InputLeftElement, chakra, Box, Avatar, FormControl, InputRightElement, IconButton, Flex, Button} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

import ErrorMessageAlert from "components/ErrorMessageAlert";
import AuthManager from "components/auth/AuthManager";
import LateralMenu from 'components/LateralMenu';
import MenuButton from 'components/MenuButton';

export default function Login() {
    const navigate = useNavigate();
    const navigateToDashboard = async () => {
        if (await new AuthManager().isLoggedIn()) {
            navigate("/dashboard");
        }
    }

    const [errorMessage, setErrorMessage] = useState(null);
    const { t, i18n } = useTranslation();

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
            await new AuthManager().login(loginData, navigateToDashboard, setErrorMessage);
        } catch {
            setErrorMessage("Error desconocido");
        }
    }

    const loginOnEnter = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            sendLogin();
        }
    }

    navigateToDashboard();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const currentLanguage = i18n.language;
    const changeLanguage = (selectedLanguage) => {
        i18n.changeLanguage(selectedLanguage);
    };

    return (
        <Center onLoad={navigateToDashboard} display={"flex"} flexDirection={"column"} w={"100wh"} h={"100vh"}
            justifyContent={"center"} alignItems={"center"} onKeyDown={loginOnEnter} bgImage={'/background.svg'}>
            
            <MenuButton onClick={() => setIsMenuOpen(true)} />
            <LateralMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} changeLanguage={changeLanguage} currentLanguage={currentLanguage} isDashboard={false}/>

            <Stack flexDir={"column"} mb="2" justifyContent="center" alignItems={"center"}>
                <Avatar bg="pigment_green.500" />
                <Heading as="h2">{t("common.login")}</Heading>
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
                        <Flex>
                            <Button data-testid={"GoBack"} variant={"solid"} type="submit" colorScheme="raw_umber" margin={"10px"} className={"custom-button effect1"} onClick={() => navigate("/")} flex="1">{t("common.goBack")}</Button>
                            <Button data-testid={"Login"} variant={"solid"} type="submit" colorScheme="pigment_green" margin={"10px"} className={"custom-button effect1"} onClick={sendLogin} flex="1">{t("common.login")}</Button>
                        </Flex>  
                    </Stack>
                </Box>
            </Stack>
        </Center>
    );
}
