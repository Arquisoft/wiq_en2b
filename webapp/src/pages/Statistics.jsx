import { Box,  Center, Heading, Stack, StackDivider, Table, Tbody, Text,
        Td, Th, Thead, Tr, CircularProgress} from "@chakra-ui/react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import GoBack from "components/GoBack";
import AuthManager from "components/auth/AuthManager";
import { HttpStatusCode } from "axios";
import ErrorMessageAlert from "components/ErrorMessageAlert";
import UserStatistics from "components/statistics/UserStatistics";
import { FaChartBar } from 'react-icons/fa';
import MenuButton from '../components/MenuButton';
import LateralMenu from '../components/LateralMenu';

export default function Statistics() {
    const { t, i18n } = useTranslation();
    const [retrievedData, setRetrievedData] = useState(false);
    const [topTen, setTopTen] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const getData = async () => {
        try {
            const request = await new AuthManager().getAxiosInstance()
                                                   .get(process.env.REACT_APP_API_ENDPOINT + "/statistics/top");
            if (request.status === HttpStatusCode.Ok) {
                setTopTen(request.data);
                setRetrievedData(true);
            } else {
                throw request;
            }
        } catch (error) {
            let errorType;
            switch (error.response ? error.response.status : null) {
                case 400:
                    errorType = { type: t("error.validation.type"), message: t("error.validation.message")};
                    break;
                case 403:
                    errorType = { type: t("error.authorized.type"), message: t("error.authorized.message")};
                    break;
                default:
                    errorType = { type: t("error.unknown.type"), message: t("error.unknown.message")};
                    break;
            }
            setErrorMessage(errorType);
        }
    }

    const formatTopTen = () => { 
        return topTen.map((element, counter) => { 
            return <Tr key={`row-${counter}`}> 
                <Th isNumeric scope="row">{counter + 1}</Th> 
                <Td>{element.username}</Td> 
                <Td isNumeric>{element.correct}</Td> 
                <Td isNumeric>{element.wrong}</Td> 
                <Td isNumeric>{element.total}</Td> 
                <Td>{element.rate}%</Td> 
            </Tr> 
        }); 
    } 


    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const changeLanguage = (selectedLanguage) => {
        i18n.changeLanguage(selectedLanguage);
    };

    return (
        <Center display={"flex"} onLoad={getData} data-testid={"background"}
            flexDirection={"column"} w={"100vw"} h={"100vh"} 
            justifyContent={"center"} alignItems={"center"} bgImage={'/background.svg'}>
            <MenuButton onClick={() => setIsMenuOpen(true)}/>
            <LateralMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} 
                changeLanguage={changeLanguage} isDashboard={false}/>
            <Stack flexDir={"column"} justifyContent="center" alignItems={"center"}>
                <ErrorMessageAlert errorMessage={errorMessage} 
                    t={t} errorWhere={"error.statistics.top"}/> 
                <FaChartBar style={{ fontSize: '2.5rem', color: 'green' }} /> 
                <Heading as="h1">{t("common.statistics.title")}</Heading>
                <Stack spacing={4} divider={<StackDivider />} minH="50vh" 
                    p="1rem" backgroundColor="whiteAlpha.900" shadow="2xl"
                    boxShadow="md" rounded="1rem" alignItems={"center"} data-testid={"leaderboard-component"}>
                        {retrievedData ? 
                            <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
                            <Heading as="h2" fontSize={"1.75em"}>
                                    {t("common.statistics.general")}
                            </Heading>
                            {
                                topTen.length === 0 ?
                                <Text>{t("statistics.empty")}</Text> : 
                                <Table className="statistics-table" data-testid={"top-ten"}>
                                    <Thead>
                                        <Tr>
                                            <Th scope="col">{t("statistics.position")}</Th>
                                            <Th scope="col">{t("statistics.username")}</Th>
                                            <Th scope="col">{t("statistics.rightAnswers")}</Th>
                                            <Th scope="col">{t("statistics.wrongAnswers")}</Th>
                                            <Th scope="col">{t("statistics.totalAnswers")}</Th>
                                            <Th scope="col">{t("statistics.percentage")}</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {formatTopTen()}
                                    </Tbody>
                                </Table>
                            }
                            </Box>
                        : <CircularProgress data-testid="leaderboard-spinner" isIndeterminate color={"green"} />
                        }
                    <UserStatistics />
                </Stack>
                <GoBack />
            </Stack>
        </Center>
    );
}