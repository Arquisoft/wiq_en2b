import { Box, Flex, Heading, Stack, Text, CircularProgress } from "@chakra-ui/react";
import { HttpStatusCode } from "axios";
import ErrorMessageAlert from "components/ErrorMessageAlert";
import AuthManager from "components/auth/AuthManager";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Cell, Pie, PieChart } from "recharts";

export default function UserStatistics() {
    const { t } = useTranslation();
    const [userData, setUserData] = useState(null);
    const [retrievedData, setRetrievedData] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const getData = async () => {
        try {
            const request = await new AuthManager().getAxiosInstance().get(process.env.REACT_APP_API_ENDPOINT + "/statistics/personal");
            if (request.status === HttpStatusCode.Ok) {
                setUserData({
                    raw: [
                        {
                            name: t("statistics.texts.personalRight"),
                            value: 60,
                        },
                        {
                            name: t("statistics.texts.personalWrong"),
                            value: 40,
                        },
                    ],
                    rate: 60
                });
                setRetrievedData(true);
            } else {
                throw request;
            }
        } catch (error) {
            let errorType;
            switch (error.response ? error.response.status : null) {
                case 400:
                    errorType = { type: t("error.validation.type"), message: t("error.validation.message") };
                    break;
                case 404:
                    errorType = { type: t("error.notFound.type"), message: t("error.notFound.message") };
                    break;
                default:
                    errorType = { type: t("error.unknown.type"), message: t("error.unknown.message") };
                    break;
            }
            setErrorMessage(errorType);
        }
    };
    useEffect(() => {
        if (!retrievedData) {
            getData();
        }
    });

    return (
        <Flex w={"100%"} minH={"10%"} data-testid={"user-statistics"} flexDirection={"column"}>
            {retrievedData ? (
                <Stack align={"center"} width="100%">
                    <ErrorMessageAlert errorMessage={errorMessage} t={t} errorWhere={"error.statistics.personal"} />
                    <Heading as="h2" fontSize={"1.75em"}>
                        {t("common.statistics.personal")}
                    </Heading>
                    <Stack width="100%" direction={"row"} justifyContent={"space-between"} alignItems={"flex-start"}>
                        <Stack paddingLeft={"6rem"}>
                            <Box>
                                <Heading mt={2} mb={2} display={"flex"} justifyContent={"center"} alignItems={"center"} as="h3" fontSize={"1.25em"}>
                                    {t("statistics.rightAnswers")}
                                </Heading>
                                <Text display={"flex"} justifyContent={"center"} alignItems={"center"}>
                                    {t("statistics.texts.personalRight", { right: userData.raw[0].value })}
                                </Text>
                            </Box>
                            <Box>
                                <Heading mt={2} mb={2} display={"flex"} justifyContent={"center"} alignItems={"center"} as="h3" fontSize={"1.25em"}>
                                    {t("statistics.wrongAnswers")}
                                </Heading>
                                <Text display={"flex"} justifyContent={"center"} alignItems={"center"}>
                                    {t("statistics.texts.personalWrong", { wrong: userData.raw[1].value })}
                                </Text>
                            </Box>
                            <Box>
                                <Heading mt={2} mb={2} display={"flex"} justifyContent={"center"} alignItems={"center"} as="h3" fontSize={"1.25em"}>
                                    {t("statistics.percentage")}
                                </Heading>
                                <Text display={"flex"} justifyContent={"center"} alignItems={"center"}>
                                    {t("statistics.texts.personalRate", { rate: userData.rate })}
                                </Text>
                            </Box>
                        </Stack>
                        <Box width={"50%"} height={"50%"} paddingLeft={"2rem"}>
                            <PieChart width={200} height={200} data-testid={"chart"}>
                                <Pie data={userData.raw} dataKey="value" innerRadius={48} outerRadius={65} fill="#82ca9d" paddingAngle={5}>
                                    <Cell key={"cell-right"} fill={"green"} />
                                    <Cell key={"cell-right"} fill={"red"} />
                                </Pie>
                            </PieChart>
                        </Box>
                    </Stack>
                </Stack>
            ) : (
                <CircularProgress isIndeterminate color="green" data-testid={"user-statistics-spinner"} />
            )}
        </Flex>
    );
}
