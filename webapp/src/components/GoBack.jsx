import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

export default function GoBack() {
    const {t} = useTranslation();
    const navigate = useNavigate();
    return <Flex justify={"center"}>
        <Button size={"lg"} fontSize={"2xl"} flex={1} data-testid={"GoBack"} type="submit" colorScheme="pigment_green" margin={"0.5rem"} className={"custom-button effect1"} onClick={() => navigate("/")}>
            {t("common.goBack")}
        </Button>
    </Flex>
}