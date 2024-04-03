import { Box, Flex, Heading, Stack, StackDivider, useMediaQuery, Text } from "@chakra-ui/react";
import { HttpStatusCode } from "axios";
import ErrorMessageAlert from "components/ErrorMessageAlert";
import AuthManager from "components/auth/AuthManager";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { PieChart, ResponsiveContainer } from "recharts";

export default function UserStatistics() {
    const {t} = useTranslation();
    const [userData, setUserData] = useState(null);
    const [retrievedData, setRetrievedData] = useState(false);
    const [tooSmall] = useMediaQuery("(max-width: 800px)");
    const [errorMessage, setErrorMessage] = useState(null);

    const getData = async () => {
        try {
            const request = await new AuthManager().getAxiosInstance()
                                                   .get(process.env.REACT_APP_API_ENDPOINT + "/statistics/personal");
            if (request.status === HttpStatusCode.Ok) {
                setUserData(request.data);
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

    return <Flex w={"100%"} onLoad={getData}
            flexDirection={tooSmall ? "column" : "row"}>
            <Stack w={!tooSmall && "50%"} divider={<StackDivider />}>
                <ErrorMessageAlert errorMessage={errorMessage} t={t} errorWhere={"error.statistics.personal"}/>
                <Heading as="h2" fontSize={"1.75em"}>{t("common.statistics.personal")}</Heading>
                    <Box>
                        <Heading as="h3" fontSize={"1.25em"}>
                            {t("statistics.rightAnswers")}
                        </Heading>
                        <Text>
                            {t("statistics.texts.personalRight", {right: userData.absolute.right})}
                        </Text>
                    </Box>
                    <Box>
                        <Text>
                            {t("statistics.texts.personalWrong", {wrong: userData.absolute.wrong}) }
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
            </Stack>
        </Flex>
}