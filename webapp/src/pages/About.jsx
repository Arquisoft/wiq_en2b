import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { Center, Heading, Stack, Box, Text, Table, Thead, Tr, Td, Th, Tbody, Container } from '@chakra-ui/react';
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
    <Center bgImage="/background.svg">
        <MenuButton onClick={() => setIsMenuOpen(true)} />
        <LateralMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} changeLanguage={changeLanguage} currentLanguage={currentLanguage} isDashboard={false}/>
        <Container maxW="lg">
            <Box textAlign="center">
              <InfoIcon boxSize={10} color="pigment_green.500" />
              <Heading as="h2">{t('about.title')}</Heading>
            </Box> 
            <Stack spacing={4} p="1rem" backgroundColor="whiteAlpha.900" boxShadow="md" rounded="1rem">
              <Text>{t("about.description1")}</Text>
              <br></br>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th><Text fontWeight='extrabold' color={"forest_green.400"} textAlign={"center"} fontSize={"md"}>{t("about.table1")}</Text></Th>
                    <Th><Text fontWeight='extrabold' color={"forest_green.400"} textAlign={"center"} fontSize={"md"}>{t("about.table2")}</Text></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>Gonzalo Alonso Fernández</Td>
                    <Td>UO282104</Td>
                  </Tr>
                  <Tr>
                    <Td>Sergio Rodríguez García</Td>
                    <Td>UO282598</Td>
                  </Tr>
                  <Tr>
                    <Td>Jorge Joaquín Gancedo Fernández</Td>
                    <Td>UO282161</Td>
                  </Tr>
                  <Tr>
                    <Td>Darío Gutiérrez Mori</Td>
                    <Td>UO282435</Td>
                  </Tr>
                  <Tr>
                    <Td>Sergio Quintana Fernández</Td>
                    <Td>UO288090</Td>
                  </Tr>
                  <Tr>
                    <Td>Diego Villanueva Berros</Td>
                    <Td>UO283615</Td>
                  </Tr>
                  <Tr>
                    <Td>Gonzalo Suárez Losada</Td>
                    <Td>UO283928</Td>
                  </Tr>
                </Tbody>
              </Table>
              <GoBack/>
            </Stack>
        </Container>
    </Center>
  );
}