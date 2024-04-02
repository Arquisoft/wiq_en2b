import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { Center, Heading, Stack, Box, Avatar, Text } from '@chakra-ui/react';
import { InfoIcon } from '@chakra-ui/icons';

import LateralMenu from '../components/LateralMenu';
import MenuButton from '../components/MenuButton';
import GoBack from "components/GoBack";

export default function About() {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const changeLanguage = (selectedLanguage) => {
    i18n.changeLanguage(selectedLanguage);
  };

  return (
    <Center display="flex" flexDirection="column" w="100wh" h="100vh" justifyContent="center" alignItems="center" bgImage="/background.svg">
        <MenuButton onClick={() => setIsMenuOpen(true)} />
        <LateralMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} changeLanguage={changeLanguage} currentLanguage={currentLanguage} isLoggedIn={false}/>
        <Stack flexDir="column" mb="2" justifyContent="center" alignItems="center">
            <InfoIcon boxSize={10} color="pigment_green.500" />
            <Heading as="h2">{t('about.title')}</Heading>
            <Box>
                <Stack spacing={4} p="1rem" backgroundColor="whiteAlpha.900" boxShadow="md" rounded="1rem">
                    <Text>🥝🍌🍌</Text>
                    <GoBack />
                </Stack>
            </Box>
        </Stack>
    </Center>
  );
}