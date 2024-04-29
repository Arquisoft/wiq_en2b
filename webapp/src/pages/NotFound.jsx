import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { Center, Heading, Stack, Box, Text, Image, Container, SimpleGrid} from '@chakra-ui/react';
import { InfoIcon } from '@chakra-ui/icons';

import LateralMenu from '../components/menu/LateralMenu';
import MenuButton from '../components/menu/MenuButton';
import GoBack from "components/GoBack";
import "../styles/animations.css";
export default function About() {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const changeLanguage = (selectedLanguage) => {
    i18n.changeLanguage(selectedLanguage);
  };

  return (
    <Center display={"flex"} flexDirection={"column"} w={"100wh"} h={"100vh"}
    justifyContent={"center"} alignItems={"center"} bgImage="/background.svg">
        <MenuButton data-testid="menu-button" onClick={() => setIsMenuOpen(true)} />
        <LateralMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} changeLanguage={changeLanguage} isDashboard={false}/>
        <Container maxW="lg">
            <Box textAlign="center">
              <InfoIcon boxSize={10} color="pigment_green.500" />
              <Heading as="h2">{t('page404.title')}</Heading>
            </Box> 
            <Stack spacing={4} p="1rem" backgroundColor="whiteAlpha.900" boxShadow="md" rounded="1rem" data-testid={"About page"} alignItems="center">
                <Image src='/img/kiwi.png' alt='404Kiwi' boxSize='120px' />
                <Text fontWeight='extrabold' color={"forest_green.400"} textAlign={"center"} fontSize={"md"}>{t("page404.text")}</Text>
                <GoBack/>
            </Stack>
        </Container>
    </Center>
  );
}