import { Center } from "@chakra-ui/layout";
import { Heading, Input, InputGroup, Stack, InputLeftElement, chakra, Box, Avatar, FormControl, InputRightElement, FormHelperText, IconButton, Flex, Button} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { FaUserAlt, FaLock, FaAddressCard } from "react-icons/fa";

import ErrorMessageAlert from "components/ErrorMessageAlert";
import AuthManager from "components/auth/AuthManager";
import LateralMenu from 'components/menu/LateralMenu';
import MenuButton from 'components/menu/MenuButton';

export default function Signup() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    const ChakraFaCardAlt = chakra(FaAddressCard);
    const ChakraFaUserAlt = chakra(FaUserAlt);
    const ChakraFaLock = chakra(FaLock);

    const navigateToDashboard = async () => {
        if (await new AuthManager().isLoggedIn()) {
            navigate("/dashboard");
        }
    }
    const sendRegistration = async () => {
        const registerData = {
            "email": email,
            "username": username,
            "password": password
        };
        try {
            await new AuthManager().register(registerData, navigateToDashboard, setLocalizedErrorMessage);
        } catch {
            const message = { type: t("error.register"), message: t("error.register-desc")};
            setErrorMessage(message);
        }
    };

    const setLocalizedErrorMessage = (error) => {
        switch (error.response.status) {
            case 400:
                setErrorMessage({ type: t("error.conflict.type"), message: t("error.conflict.message")});
                break;
            case 401:
                setErrorMessage({ type: t("error.authorized.type"), message: t("error.authorized.message")});
                break;
            default:
                setErrorMessage({ type: t("error.register"), message: t("error.register-desc")});
                break;
        }
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setErrorMessage(false); 
    }

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
        setErrorMessage(false); 
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setErrorMessage(false); 
    }

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setErrorMessage(false); 
    }

    const registerOnEnter = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            sendRegistration();
        }
    }

    navigateToDashboard();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const changeLanguage = (selectedLanguage) => {
        i18n.changeLanguage(selectedLanguage);
    };

    return (
        <Center display={"flex"} flexDirection={"column"} w={"100wh"} h={"100vh"} justifyContent={"center"} alignItems={"center"} onKeyDown={registerOnEnter} bgImage={'/background.svg'}>
            <MenuButton onClick={() => setIsMenuOpen(true)} />
            <LateralMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} changeLanguage={changeLanguage} isDashboard={false}/>
            
            <Stack flexDir={"column"} mb="2" justifyContent="center" alignItems={"center"}>
                <Avatar bg="pigment_green.500" />
                <Heading as="h2">
                    {t("common.register")}
                </Heading>
                <ErrorMessageAlert errorMessage={errorMessage} t={t} errorWhere={"error.register"}/>
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
                        <Flex>
                            <Button data-testid={"GoBack"} type="submit" variant={"solid"} colorScheme="raw_umber" margin={"10px"} className={"custom-button effect1"} onClick={() => navigate("/")} flex="1">{t("common.goBack")}</Button>
                            <Button type="submit" data-testid={"Sign up"} variant={"solid"} colorScheme={"pigment_green"} margin={"10px"} className={"custom-button effect1"} onClick={sendRegistration} flex="1">{t("common.register")}</Button>
                        </Flex>
                    </Stack>
                </Box>
            </Stack>
        </Center>
    );
}
