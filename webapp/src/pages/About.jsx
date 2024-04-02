import React from 'react';
import { useTranslation } from 'react-i18next';
import { Center, Heading, Stack, Box, Avatar, Text } from '@chakra-ui/react';

export default function About() {
  const { t } = useTranslation();

  return (
    <Center display="flex" flexDirection="column" w="100wh" h="100vh" justifyContent="center" alignItems="center" bgImage="/background.svg">
        <Stack flexDir="column" mb="2" justifyContent="center" alignItems="center">
            <Avatar bg="pigment_green.500" />
            <Heading as="h2">{t('about.title')}</Heading>
            <Box minW={{ md: '400px' }} shadow="2xl">
                <Stack spacing={4} p="1rem" backgroundColor="whiteAlpha.900" boxShadow="md" rounded="1rem">
                    <Text>Prueba</Text>
                </Stack>
            </Box>
        </Stack>
    </Center>
  );
}