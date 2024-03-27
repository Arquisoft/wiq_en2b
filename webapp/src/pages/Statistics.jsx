import { Box, Card, CardBody, CardHeader, Center, Flex, 
        Heading, Stack, StackDivider, Table, Tbody, Text,
        Td, Th, Thead, Tr, useMediaQuery, Grid, GridItem } from "@chakra-ui/react";
import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { DoughnutController, ArcElement} from "chart.js/auto"; // These imports are necessary
import { useTranslation } from "react-i18next";

export default function Statistics() {
    const {t} = useTranslation();
    const [topTen, setTopTen] = useState([]);
    const [userData, setUserData] = useState({
        "rate": [50,50],
        "absolute": {
            "right": 6,
            "wrong": 6,
            "total": 12
        }
    });
    const getTopTenData = () => {
        return topTen.map((element, counter) => {
            return <Tr>
                <Th isNumeric scope="row">{counter + 1}</Th>
                <Td>{element.username}</Td>
                <Td>{element.correct}</Td>
                <Td>{element.wrong}</Td>
                <Td>{element.total}</Td>
                <Td>{element.rate}</Td>
            </Tr>
        });
    }

    const [tooSmall] = useMediaQuery("(max-width: 800px)");

    const getData = () => {
        // TODO: Connection with API
    }

    return (
        <Center display={"flex"} onLoad={(getData)} flexDirection={"column"} 
            w={"100wh"} h={"100vh"} bg={"blue.50"}
            justifyContent={"center"} alignItems={"center"}>
            <Stack flexDir={"column"} mb="2" justifyContent="center" alignItems={"center"}>
                <Heading as="h1" color="blue.400">{t("common.statistics.title")}</Heading>
                <Stack spacing={4} divider={<StackDivider />} 
                    p="1rem" backgroundColor="whiteAlpha.900" shadow="2xl"
                    boxShadow="md" rounded="1rem" justifyContent="center" alignItems={"center"}>
                    <Box display={"flex"} flexDirection={"column"} 
                        justifyContent={"center"} alignItems={"center"}>
                        <Heading as="h2" color="blue.400"
                            fontSize={"1.75em"}>
                                {t("common.statistics.general")}
                        </Heading>
                        <Table className="statistics-table">
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
                                {getTopTenData()}
                            </Tbody>
                        </Table>
                    </Box>
                    <Flex w={"100%"} flexDirection={tooSmall ? "column" : "row"}>
                        <Stack w={!tooSmall && "60%"} divider={<StackDivider />}>
                            <Heading as="h2" color="blue.400"
                                    fontSize={"1.75em"}>{t("common.statistics.personal")}</Heading>
                                <Box>
                                    <Heading as="h3" fontSize={"1.25em"}
                                        color="blue.400">
                                        {t("statistics.rightAnswers")}
                                    </Heading>
                                    <Text>
                                        {userData.rate[0]} %
                                    </Text>
                                </Box>
                                <Box>
                                    <Heading as="h3" fontSize={"1.25em"}
                                        color="blue.400">
                                        {t("statistics.wrongAnswers")}
                                    </Heading>
                                    <Text>
                                        {userData.rate[1]} %
                                    </Text>
                                </Box>
                                <Box>
                                    <Heading as="h3" fontSize={"1.25em"}
                                        color="blue.400">
                                        {t("statistics.")}
                                    </Heading>
                                    <Text>
                                        {userData.rate[0]} %
                                    </Text>
                                </Box>
                        </Stack>
                        <Box minW="50%">
                            <Doughnut
                                data={{
                                    "labels": [t("statistics.rightAnswers"), t("statistics.wrongAnswers")],
                                    "datasets": [{
                                        "label": t("statistics.percentage"),
                                        "data": userData.rate,
                                        "backgroundColor": [
                                            "#3cacff", "#f28a9c"
                                        ],
                                        "borderColor":[
                                            "#2594ff", "red"
                                        ]
                                    }]
                                }}
                                options={{
                                    cutout: 50,
                                    radius: 70,
                                    plugins: {
                                        legend: {
                                            onClick: () => {}
                                        }
                                    }
                                }}></Doughnut>
                        </Box>
                    </Flex>
                </Stack>
            </Stack>
        </Center>
    );
}