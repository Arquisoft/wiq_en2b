import { Center } from "@chakra-ui/layout";
import { Heading, Input, Button, InputGroup, Stack, InputLeftElement, chakra, Box, Avatar, FormControl, InputRightElement, Text, FormHelperText } from "@chakra-ui/react";
import axios, { HttpStatusCode } from "axios";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { FaUserAlt, FaLock, FaAddressCard } from "react-icons/fa";
import { useForm } from "react-hook-form";

export default function Signup() {

    const [hasError, setHasError] = useState(false);
    const navigate = useNavigate();
    const { t } = useTranslation();
    const {register, watch} = useForm();

    const [showPassword, setShowPassword] = useState(false);
    const changeShowP = () => setShowPassword(!showPassword);

    const [confirmPassword, setConfirmPassword] = useState(null);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const changeShowConfirmP = () => setShowConfirmPassword(!showConfirmPassword);

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const ChakraFaCardAlt = chakra(FaAddressCard);
    const ChakraFaUserAlt = chakra(FaUserAlt);
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
            {hasError && (
                <div className="error-container">
                    <Text>Error</Text>
                </div>
            )}
            <Stack flexDir={"column"} mb="2" justifyContent="center" alignItems={"center"}>
                <Avatar bg="blue.500" />
                <Heading as="h2" color="blue.400">{ t("common.register")}</Heading>
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
                                <Input type="text" placeholder={t("session.email")} />
                            </InputGroup>
                        </FormControl>
                        <FormControl>
                            <InputGroup>
                                <InputLeftElement children={<ChakraFaUserAlt color="gray.300" />}/>
                                <Input type="text" placeholder={t("session.username")} />
                            </InputGroup>
                        </FormControl>
                        <FormControl>
                <InputGroup>
                    <InputLeftElement children={<ChakraFaLock color="gray.300" />} />
                    <Input type={showPassword ? 'text' : 'password'} placeholder={t("session.password")} {...register('password', { required: true })} />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={changeShowP}>
                            {showPassword ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
                    </FormControl>
                    <FormControl>
                        <InputGroup>
                            <InputLeftElement children={<ChakraFaLock color="gray.300" />} />
                            <Input
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder={t("session.confirm_password")}
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                            />
                            <InputRightElement width="4.5rem">
                                <Button h="1.75rem" size="sm" onClick={changeShowConfirmP}>
                                    {showConfirmPassword ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        {confirmPassword && confirmPassword !== watch('password') && (
                            <FormHelperText color="red">Las contraseñas no coinciden</FormHelperText> 
                        )} {/* To be changed */}
                    </FormControl>
                        <Button type="submit" variant="solid" colorScheme="blue" onClick={sendLogin}>Sign Up</Button>
                    </Stack>
                </Box>
            </Stack>
        </Center>
    );
}