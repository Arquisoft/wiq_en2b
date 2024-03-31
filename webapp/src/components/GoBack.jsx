import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

export default function GoBack() {
    const {t} = useTranslation();
    const navigate = useNavigate();
    return <Flex direction="row" justifyContent="center" alignItems="center">
        <Button data-testid={"GoBack"} type="submit" colorScheme="pigment_green" margin={"10px"} className={"custom-button effect1"} onClick={() => navigate("/dashboard")} w="100%">
            {t("common.goBack")}
        </Button>
    </Flex>
}