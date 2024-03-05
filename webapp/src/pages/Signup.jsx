import { Center } from "@chakra-ui/layout";
import { Heading, Input, Button, InputGroup, Stack, InputLeftElement, chakra, Box, Avatar, FormControl, InputRightElement, Text, FormHelperText, IconButton } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import axios, { HttpStatusCode } from "axios";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { FaUserAlt, FaLock, FaAddressCard } from "react-icons/fa";
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

    const sendLogin = async () => {
        try {
            const response = await axios.post(process.env.API_URL, { email, username, password });
            if (response.status === HttpStatusCode.Accepted) {
                navigate("/home");
            }
        } catch (error) {
            setHasError(true);
        }
    };

    return (
        <Center
            display={"flex"}
            flexDirection={"column"}
            w={"100wh"}
            h={"100vh"}
            bg={"blue.50"}
            justifyContent={"center"}
            alignItems={"center"}
        >
            {hasError && (
                <div className="error-container">
                    <Text>Error</Text>
                </div>
            )}
            <Stack flexDir={"column"} mb="2" justifyContent="center" alignItems={"center"}>
                <Avatar bg="blue.500" />
                <Heading as="h2" color="blue.400">
                    {t("common.register")}
                </Heading>
                {!hasError ? (
                    <></>
                ) : (
                    <Center
                        bgColor={"#FFA98A"}
                        margin={"1vh 0vw"}
                        padding={"1vh 0vw"}
                        color={"#FF0500"}
                        border={"0.1875em solid #FF0500"}
                        borderRadius={"0.75em"}
                        maxW={"100%"}
                        minW={"30%"}
                    >
                        <Text>Error</Text>
                    </Center>
                )}
                <Box minW={{ md: "400px" }}>
                    <Stack spacing={4} p="1rem" backgroundColor="whiteAlpha.900" boxShadow="md">
                        <FormControl>
                            <InputGroup>
                                <InputLeftElement children={<ChakraFaCardAlt color="gray.300" />} />
                                <Input
                                    type="text"
                                    placeholder={t("session.email")}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </InputGroup>
                        </FormControl>
                        <FormControl>
                            <InputGroup>
                                <InputLeftElement children={<ChakraFaUserAlt color="gray.300" />} />
                                <Input
                                    type="text"
                                    placeholder={t("session.username")}
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </InputGroup>
                        </FormControl>
                        <FormControl>
                            <InputGroup>
                                <InputLeftElement children={<ChakraFaLock color="gray.300" />} />
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder={t("session.password")}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <InputRightElement>
                                    <IconButton aria-label='Shows or hides the password' data-testid="show-confirm-password-button" h="1.75rem" size="sm" onClick={() => setShowPassword(!showPassword)} icon={showPassword ? <ViewOffIcon/> : <ViewIcon/>}/>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <FormControl>
                            <InputGroup>
                                <InputLeftElement children={<ChakraFaLock color="gray.300" />} />
                                <Input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder={t("session.confirm_password")}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <InputRightElement>
                                    <IconButton aria-label='Shows or hides the password' data-testid="show-confirm-password-button" h="1.75rem" size="sm" onClick={() => setShowConfirmPassword(!showConfirmPassword)} icon={showConfirmPassword ? <ViewOffIcon/> : <ViewIcon/>}/>
                                </InputRightElement>
                            </InputGroup>
                            {confirmPassword && password && confirmPassword !== password && (
                                <FormHelperText color="red">Las contraseñas no coinciden</FormHelperText>
                            )}
                        </FormControl>
                        <ButtonEf dataTestId={"Sign up"} variant={"solid"} colorScheme={"blue"} text={t("common.register")} onClick={sendLogin}/>
                    </Stack>
                </Box>
            </Stack>
        </Center>
    );
}
