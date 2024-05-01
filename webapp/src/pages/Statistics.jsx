import {
    Box,
    Center,
    Heading,
    Stack,
    Table,
    Tbody,
    Text,
    CircularProgress,
    AccordionItem,
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionPanel,
    Flex, ListItem, ListIcon, UnorderedList
} from "@chakra-ui/react";
import Avatar, { genConfig } from 'react-nice-avatar';
import React, {useEffect, useState} from "react";
import { useTranslation } from "react-i18next";
import GoBack from "components/GoBack";
import AuthManager from "components/auth/AuthManager";
import { HttpStatusCode } from "axios";
import ErrorMessageAlert from "components/ErrorMessageAlert";
import { FaChartBar } from 'react-icons/fa';
import MenuButton from '../components/menu/MenuButton';
import LateralMenu from '../components/menu/LateralMenu';
import {MdCheckCircle, MdClear, MdPercent} from "react-icons/md";
import {Cell, Pie, PieChart} from "recharts";

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
            return <AccordionItem key={`row-${counter}`}>
                <AccordionButton _hover={{animation:"zoomIn 0.05s ease-in forwards"}}>
                    <Box as='span' flex='1' textAlign='space-around'>
                        <Flex justifyContent="space-between">
                            <Text fontSize='l' fontWeight='extrabold' color={"pigment_green.400"} minW={"10%"} >{counter + 1}</Text>
                            <Text fontSize='l'>{element.user.username} </Text>
                            <Text fontSize='l' fontWeight='extrabold' color={"pigment_green.400"}>{element.points} {element.user.username !== 'Dario G. Mori'? '🥝': '🍌' } </Text>
                        </Flex>
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                    <Flex justifyContent={"space-around"}>
                        <Avatar style={{ width: '6rem', height: '6rem' }} {...genConfig(element.user.email)} data-testid={"avatar"}/>
                        <Flex minW={"60%"} justifyContent={"space-between"}>
                            <PieChart width={100} height={100} data-testid={"chart"}>
                                <Pie data={[
                                    {
                                        name: t("statistics.texts.personalRight"),
                                        value: element.right,
                                    },
                                    {
                                        name: t("statistics.texts.personalWrong"),
                                        value: element.wrong,
                                    },
                                ]} dataKey="value" innerRadius={28} outerRadius={40} fill="#82ca9d" paddingAngle={5}
                                     cx={50} cy={50} labelLine={false} >
                                    <Cell key={"cell-right"} fill={"green"}/>
                                    <Cell key={"cell-right"} fill={"#955e42"}/>
                                </Pie>
                            </PieChart>
                            <UnorderedList spacing={3}>
                                <ListItem key={`row-${counter}-right`}>
                                    <ListIcon as={MdCheckCircle} color={"green"} />
                                    {t("statistics.texts.personalRight", {right: element.right})}
                                </ListItem>
                                <ListItem key={`row-${counter}-wrong`}>
                                    <ListIcon as={MdClear} color={"red"}/>
                                    {t("statistics.texts.personalWrong", {wrong: element.wrong})}
                                </ListItem>
                                <ListItem key={`row-${counter}-percentage`}>
                                    <ListIcon as={MdPercent} color={"blue"}/>
                                    {t("statistics.texts.personalRate", {rate: element.percentage})}
                                </ListItem>
                            </UnorderedList>
                        </Flex>
                    </Flex>
                </AccordionPanel>
            </AccordionItem>



        }); 
    }
    useEffect(() => {
        if(!retrievedData){
            getData();
        }
    });

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const changeLanguage = (selectedLanguage) => {
        i18n.changeLanguage(selectedLanguage);
    };

    return (
        <Center display={"flex"} data-testid={"background"}
            flexDirection={"column"} w={"100vw"} h={"100vh"} 
            justifyContent={"center"} alignItems={"center"} bgImage={'/background.svg'} >
            <MenuButton onClick={() => setIsMenuOpen(true)}/>
            <LateralMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} 
                changeLanguage={changeLanguage} isDashboard={false}/>
            <Stack flexDir={"column"} justifyContent="center" alignItems={"center"} spacing={"12px"} >
                <ErrorMessageAlert errorMessage={errorMessage} 
                    t={t} errorWhere={"error.statistics.top"} />
                <FaChartBar style={{ fontSize: '2.5rem', color: 'green' }} /> 
                <Heading as="h1">{t("common.statistics.title")}</Heading>
                <Stack spacing={4} backgroundColor="whiteAlpha.900" maxWidth={"600px"}  w={"90vw"}
                       boxShadow="md" rounded="1rem" data-testid={"leaderboard-component"}>
                        {retrievedData ? 
                            <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
                            <Heading as="h2" fontSize={"1.75em"}>
                                    {t("common.statistics.general")}
                            </Heading>
                            {
                                topTen.length === 0 ?
                                <Text>{t("statistics.empty")}</Text> : 
                                <Table mt={1} mb={1} variant="simple" className="statistics-table" data-testid={"top-ten"}>
                                    <Tbody>
                                        <Accordion allowToggle>
                                            {formatTopTen()}
                                        </Accordion>
                                    </Tbody>
                                </Table>
                            }
                            </Box>
                        : <CircularProgress data-testid="leaderboard-spinner" isIndeterminate color={"green"} />
                        }
                    <GoBack />
                </Stack>
            </Stack>
        </Center>
    );
}