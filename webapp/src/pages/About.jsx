import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { Center, Heading, Stack, Box, Text, Table, Tr, Td, Tbody, Container, Link, Avatar } from '@chakra-ui/react';
import { InfoIcon } from '@chakra-ui/icons';

import LateralMenu from '../components/menu/LateralMenu';
import MenuButton from '../components/menu/MenuButton';
import GoBack from "components/GoBack";

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
              <Heading as="h2">{t('about.title')}</Heading>
            </Box> 
            <Stack spacing={4} p="1rem" backgroundColor="whiteAlpha.900" boxShadow="md" rounded="1rem" data-testid={"About page"}>
              <Text>{t("about.description1")}</Text>
              <Text fontWeight='extrabold' color={"forest_green.400"} textAlign={"center"} fontSize={"md"}>{t("about.tableheader")}</Text>
              <Table variant="simple">
                <Tbody>
                  <Tr>
                    <Td><Avatar name='Gonzalo Alonso Fernández' src='./img/avatar/avatar-gonzaa.jpg' /></Td>
                    <Td><Link href='https://www.linkedin.com/in/gonzalo-alonso-fern%C3%A1ndez-277436219//' isExternal > Gonzalo Alonso Fernández</Link></Td>
                  </Tr>
                  <Tr>
                    <Td><Avatar name='Sergio Rodríguez García' src='./img/avatar/avatar-sergior.jpg' /></Td>
                    <Td><Link href='mailto:uo282598@uniovi.es' isExternal >Sergio Rodríguez García</Link></Td>
                  </Tr>
                  <Tr>
                    <Td><Avatar name='Jorge Joaquín Gancedo Fernández' src='./img/avatar/avatar-jorge.jpg' /></Td>
                    <Td><Link href='mailto:uo282161@uniovi.es' isExternal >Jorge Joaquín Gancedo Fernández</Link></Td>
                  </Tr>
                  <Tr>
                    <Td><Avatar name='Dario G. Mori' src='./img/avatar/avatar-dario.jpg'/></Td>
                    <Td><Link href='https://www.linkedin.com/in/dariogmori/' isExternal >Darío G. Mori </Link></Td>
                  </Tr>
                  <Tr>
                    <Td><Avatar name='Sergio Quintana Fernández' src='./img/avatar/avatar-sergioq.jpg' /></Td>
                    <Td><Link href='mailto:uo288090@uniovi.es' isExternal >Sergio Quintana Fernández</Link></Td>
                  </Tr>
                  <Tr>
                    <Td><Avatar name='Diego Villanueva Berros' src='./img/avatar/avatar-diego.jpg' /></Td>
                    <Td><Link href='mailto:uo283615@uniovi.es' isExternal >Diego Villanueva Berros</Link></Td>
                  </Tr>
                  <Tr>
                    <Td><Avatar name='Gonzalo Suárez Losada' src='./img/avatar/avatar-gonzas.jpg' /></Td>
                    <Td><Link href='mailto:gonzalo.suarez.losada@gmail.com' isExternal>Gonzalo Suárez Losada</Link></Td>
                  </Tr>
                </Tbody>
              </Table>
              <GoBack/>
            </Stack>
        </Container>
    </Center>
  );
}