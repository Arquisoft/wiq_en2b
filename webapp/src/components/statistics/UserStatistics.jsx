import { Box, Flex, Heading, Stack, StackDivider, useMediaQuery, Text, CircularProgress } from "@chakra-ui/react";
import { HttpStatusCode } from "axios";
import ErrorMessageAlert from "components/ErrorMessageAlert";
import AuthManager from "components/auth/AuthManager";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

export default function UserStatistics() {
    const {t} = useTranslation();
    const [userData, setUserData] = useState({
        "raw": [
            {
                "name": t("statistics.rightAnswers"),
                "value": 15
            },
            {
                "name": t("statistics.wrongAnswers"),
                "value": 3
            }
        ],
        "rate": 50
    });
    const [retrievedData, setRetrievedData] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const getData = async () => {
        try {
            const request = await new AuthManager().getAxiosInstance()
                                                   .get(process.env.REACT_APP_API_ENDPOINT + "/statistics/personal");
            if (request.status === HttpStatusCode.Ok) {
                setUserData({
                    "raw": [
                        {
                            "name": t("statistics.texts.personalRight"),
                            "value": request.data.correct
                        },
                        {
                            "name": t("statistics.texts.personalWrong"),
                            "value": request.data.wrong
                        }
                    ],
                    "rate": request.data.correctRate
                });
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

    return <Flex w={"100%"} minH={"15%"} onLoad={getData}
            flexDirection={"column"}>
            {
                retrievedData ? <>
                <Stack divider={<StackDivider />}>
                    <ErrorMessageAlert errorMessage={errorMessage} t={t} errorWhere={"error.statistics.personal"}/>
                    <Heading as="h2" fontSize={"1.75em"}>{t("common.statistics.personal")}</Heading>
                    <Box>
                        <Heading as="h3" fontSize={"1.25em"}>
                            {t("statistics.rightAnswers")}
                        </Heading>
                        <Text>
                            {t("statistics.texts.personalRight", {right: userData.raw[0].value})}
                        </Text>
                    </Box>
                    <Box>
                        <Text>
                            {t("statistics.texts.personalWrong", {wrong: userData.raw[1].value}) }
                        </Text>
                    </Box>
                    <Box>
                        <Heading as="h3" fontSize={"1.25em"}>
                            {t("statistics.percentage")}
                        </Heading>
                        <Text>
                            {t("statistics.texts.personalRate", {rate: userData.rate})}
                        </Text>
                    </Box>
                </Stack>
                <Box minW={"50%"} minH={"50%"}>
                    <ResponsiveContainer width={"100%"} minHeight={"100%"}>
                        <PieChart>
                            <Pie data={userData.raw} dataKey="value" innerRadius={48} outerRadius={65}
                             fill="#82ca9d" paddingAngle={5}>
                                <Cell key={"cell-right"} fill={"green"} />
                                <Cell key={"cell-right"} fill={"red"} />
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </Box>
                </>
                : <CircularProgress isIndeterminate color="green"/>
            }
        </Flex>
}