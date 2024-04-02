import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Center } from "@chakra-ui/layout";
import { Text, Heading, Stack, Link, Image, Box, Button, Icon } from "@chakra-ui/react";
import { HamburgerIcon } from '@chakra-ui/icons';
import LateralMenu from '../components/LateralMenu';

import ButtonEf from '../components/ButtonEf';
import AuthManager from "components/auth/AuthManager";

export default function Root() {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const navigateToDashboard = async () => {
        if (await new AuthManager().isLoggedIn()) {
            navigate("/dashboard");
        }
    }
    navigateToDashboard();

    const changeLanguage = (e) => {
        const selectedLanguage = e.target.value;
        i18n.changeLanguage(selectedLanguage);
    };

    return (
        <Center display={"flex"} flexDirection={"column"} w={"100wh"} h={"100vh"} bgImage={'/background.svg'}>
            <Button 
                position="absolute" 
                top="1rem" 
                right="1rem" 
                onClick={() => setIsMenuOpen(true)}
                bg="pigment_green.600"
                color="whiteAlpha.900"
                size="xl"
                borderRadius="md"
                _hover={{ bg: 'pigment_green.600' }}
                justifyContent="center"
                alignItems="center" 
                p={4}
            >
                <Icon as={HamburgerIcon} boxSize={6} />
            </Button>

            <LateralMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} isRoot={true} changeLanguage={changeLanguage}/>
            
            <Center flexDir={"column"} mb="2" justifyContent="center" alignItems={"center"}>
                <Stack flexDir={"column"} mb="2" justifyContent="center" alignItems={"center"}>
                    <Image borderRadius='full' boxSize='150px' src='/kiwiq-icon.ico' alt='kiwiq icon'/>
                    <Box minW={{md:"400px"}} textAlign="center">
                        <Stack spacing={4} p="1rem" backgroundColor="whiteAlpha.900" shadow="2xl" rounded="1rem">
                            <Heading as="h1">{"KIWIQ"}</Heading>
                            <Text fontWeight='extrabold' color={"forest_green.400"}>{t("session.welcome")}</Text>
                            <ButtonEf dataTestId={"Login"} variant={"solid"} colorScheme={"pigment_green"} text={t("common.login")} onClick={() => navigate("/login")}/>
                            <Text>{t("session.account")} <Link as="span" onClick={() => navigate("/signup")}>{t("session.clickHere")}</Link></Text>
                        </Stack>
                    </Box>
                </Stack> 
            </Center>
        </Center>
    );
}