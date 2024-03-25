import React from "react";
import { Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react";

const ErrorMessageAlert = ({ errorMessage, t, errorWhere }) => {
    return (
        errorMessage && (
            <Alert status='error' rounded="1rem" margin={"1vh 0vw"}>
                <AlertIcon />
                <AlertTitle>
                    {errorMessage && errorMessage.type === "unknown"
                        ? t(errorWhere)
                        : errorMessage.type}
                </AlertTitle>
                <AlertDescription>{errorMessage.message}</AlertDescription>
            </Alert>
        )
    );
};

export default ErrorMessageAlert;
