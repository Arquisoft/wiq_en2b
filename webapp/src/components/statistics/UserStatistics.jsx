import { Box, Flex, Heading, Stack, StackDivider, useMediaQuery, Text, CircularProgress } from "@chakra-ui/react";
import { HttpStatusCode } from "axios";
import ErrorMessageAlert from "components/ErrorMessageAlert";
import AuthManager from "components/auth/AuthManager";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Pie, PieChart, ResponsiveContainer } from "recharts";

export default function UserStatistics() {
    const {t} = useTranslation();
    const [userData, setUserData] = useState({
        "raw": [
            {
                "name": "aciertos",
                "value": 3
            },
            {
                "name": "fallos",
                "value": 3
            }
        ],
        "rate": 50
    });
    const [retrievedData, setRetrievedData] = useState(true);
    const [tooSmall] = useMediaQuery("(max-width: 800px)");
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

    return <Flex w={"100%"} //onLoad={getData}
            flexDirection={tooSmall ? "column" : "row"}>
            <Stack w={!tooSmall && "50%"} divider={<StackDivider />}> 
            {
                retrievedData ? 
                <>
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
                                {t("statistics.texts.personalRate", {rate: userData.rate[0]})}
                            </Text>
                        </Box>
                        <ResponsiveContainer width="50%" height={"auto"}>
                            <PieChart>
                                <Pie data={userData.raw} dataKey={"userData"}></Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </>
                    : <CircularProgress isIndeterminate color="green"/>
            }
            </Stack>
        </Flex>
}