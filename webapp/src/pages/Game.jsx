import React, { useState, useEffect, useRef, useCallback } from "react";
import { Flex, Heading, Button, Box, Text, Image, Spinner, CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import { Center } from "@chakra-ui/layout";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Confetti from "react-confetti";
import {  startRound, getCurrentQuestion, answerQuestion, getCurrentGame, getGameDetails } from '../components/game/Game';
import LateralMenu from '../components/menu/LateralMenu';
import MenuButton from '../components/menu/MenuButton';
import { HttpStatusCode } from "axios";

export default function Game() {
    const navigate = useRef(useNavigate()).current;
    const [loading, setLoading] = useState(true);
    const [gameId, setGameId] = useState(null); 
    const [question, setQuestion] = useState(null);
    const [answer, setAnswer] = useState({});
    const [selectedOption, setSelectedOption] = useState(null);
    const [nextDisabled, setNextDisabled] = useState(true);
    const [roundNumber, setRoundNumber] = useState(1);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [showConfetti, setShowConfetti] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [timeStartRound, setTimeStartRound] = useState(-1);
    const [roundDuration, setRoundDuration] = useState(0);
    const [maxRoundNumber, setMaxRoundNumber] = useState(9);
    const [hasImage, setHasImage] = useState(false);
    const [hasAnswered, setHasAnswered] = useState(false);

    const { t, i18n } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const changeLanguage = (selectedLanguage) => {
        i18n.changeLanguage(selectedLanguage);
    };

    const calculateProgress = () => {
        const percentage = ((roundDuration - timeElapsed) / roundDuration) * 100;
        return Math.min(Math.max(percentage, 0), 100);
    };
    
    const assignQuestion = useCallback(async (gameId) => {
        try {
            const result = await getCurrentQuestion(gameId);
            if (result.status === HttpStatusCode.Ok) {
                setQuestion(result.data);
                setTimeElapsed(0);
                setHasAnswered(false)
                if (result.data.image) {
                    setHasImage(true);
                }
            } else {
                navigate("/dashboard");
            }
        } catch (error) {
            if (error.response.status === HttpStatusCode.Conflict) {
                throw error;
            } else {
                console.error("Error fetching question:", error);
                navigate("/dashboard");
            }
        }
    }, [setQuestion, setTimeElapsed, navigate])

    const answerButtonClick = async (optionIndex, answer) => {
        const selectedOptionIndex = selectedOption === optionIndex ? null : optionIndex;
        setSelectedOption(selectedOptionIndex);
        setHasAnswered(true);
        setAnswer(answer);
        const anyOptionSelected = selectedOptionIndex !== null;
        setNextDisabled(!anyOptionSelected);
    };

    const startNewRound = useCallback(async (gameId, startsGame) => {
        if (hasAnswered || startsGame) {
            try{
                const result = await startRound(gameId);
                setTimeStartRound(new Date(result.data.round_start_time).getTime());
                setRoundNumber(result.data.actual_round )
                setRoundDuration(result.data.round_duration);
                await assignQuestion(gameId);
                setLoading(false);
            } catch(error){
                console.log(error)
                if(error.response.status === 409){
                    if(roundNumber >= 9){
                        navigate("/dashboard/game/results", { state: { correctAnswers: correctAnswers } });
                    } else {
                        await assignQuestion(gameId)
                    }
                }
            }
        }
    }, [setTimeStartRound, setRoundDuration, setRoundNumber, hasAnswered,
        assignQuestion, setLoading, navigate, correctAnswers, roundNumber])

    const nextRound = useCallback(async () => {
        if (roundNumber + 1 > maxRoundNumber) {
            let gameDetails = (await getGameDetails(gameId)).data;
            navigate("/dashboard/game/results", { state: { correctAnswers: gameDetails.correctly_answered_questions } });
        } else {
            setAnswer({});
            setHasImage(false);
            setNextDisabled(true);
            await startNewRound(gameId);
        }
    }, [navigate, setAnswer, setNextDisabled, startNewRound,
        gameId, maxRoundNumber, roundNumber]);

    const nextButtonClick = async () => {
        try {
            const result = await answerQuestion(gameId, answer.id);
            let isCorrect = result.data.was_correct;
            if (isCorrect) {
                setCorrectAnswers(correctAnswers + 1);
                setShowConfetti(true);
            }
            setNextDisabled(true);
            setSelectedOption(null);
            setLoading(true)
            await nextRound();

        } catch (error) {
            if(error.response.status === 400){
                setTimeout(nextButtonClick, 2000)
            }
        }
    }
    
    useEffect(() => {
        const initializeGame = async () => {
            try {
                const newGameResponse = (await getCurrentGame()).data;
                if (newGameResponse) {
                    setGameId(newGameResponse.id);
                    setTimeStartRound(new Date(newGameResponse.round_start_time).getTime());
                    setRoundDuration(newGameResponse.round_duration)
                    setMaxRoundNumber(newGameResponse.rounds);
                    setRoundNumber(newGameResponse.actual_round);

                    try{
                        await assignQuestion(newGameResponse.id);
                        setCorrectAnswers(newGameResponse.correctly_answered_questions);
                        setLoading(false);
                        setTimeElapsed(Math.round((Date.now() - new Date(newGameResponse.round_start_time).getTime()) / 1000));
                    }catch(error){
                        startNewRound(newGameResponse.id, true);
                    }
                } else {
                    navigate("/dashboard");
                }
            } catch (error) {
                navigate("/dashboard");
            }
        };
        if (!gameId) {
            initializeGame();
        }
    }, [setGameId, gameId, setTimeStartRound, setRoundDuration, setMaxRoundNumber,
        setQuestion, setLoading, startNewRound, navigate, assignQuestion, timeStartRound]);
    useEffect(() => { 
        let timeout;
        if (showConfetti)
            timeout = setTimeout(() => { setShowConfetti(false); }, 3000);
        return () => clearTimeout(timeout);
    }, [showConfetti]);

    useEffect(() => {
        let timeout;
        if (timeElapsed >= roundDuration && timeStartRound !== -1) {
            timeout = setTimeout(() => {
                setHasAnswered(true);
                nextRound();
            }, 1000);

        } else {
            timeout = setTimeout(() => {
                setTimeElapsed((prevTime) => prevTime + 1);
            }, 1000); 
        }
        return () => clearTimeout(timeout);
    }, [timeElapsed, timeStartRound, roundDuration, nextRound, setHasAnswered]);


    return (
        <Center display="flex" flexDirection="column" w="100vw" h="100vh" 
            justifyContent="center" alignItems="center" padding={"4"} bgImage={'/background.svg'} bgSize={"contain"}>
            <MenuButton onClick={() => setIsMenuOpen(true)} />
            <LateralMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} changeLanguage={changeLanguage} isDashboard={false}/>

            <Heading as="h2">{t("game.round", {currentRound: roundNumber, roundAmount: maxRoundNumber})}</Heading>
            <Heading as="h3" color="pigment_green.400" fontSize="xl">{t("game.correct_counter", {correctCount: correctAnswers})}</Heading>

            <CircularProgress value={calculateProgress()} color="green" size="120px" thickness="12px" capIsRound>
                <CircularProgressLabel>{roundDuration - timeElapsed}</CircularProgressLabel>
            </CircularProgress>
            {
                (!loading && hasImage) && <Flex maxH={"40vh"} 
                                            maxW={"40vw"} justify={"center"}>
                <Image src={question.image} data-testid={"image"} alt={t("game.image")}></Image>
                </Flex>
            }
            <Box bg="white" p={"4 0.5"} borderRadius="md" boxShadow="md" mt={4} mb={4} w={["80%", "60%"]} shadow="2xl" rounded="1rem" alignItems="center">
                {(question === null) ? (
                    <Spinner
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='green.500'
                        size='xl'
                        data-testid={"spinner"}
                    />
                ) : <> 
                        <Text fontWeight='extrabold' fontSize="2xl" color={"forest_green.400"} id={"question"} textAlign={"center"}>{question.content}</Text>
                        <Flex flexWrap={"wrap"} gap={4} mb={4} justify={"center"}>
                            {question.answers.map((answer, index) => (
                                <Button className={"question-answer"}
                                    key={index}
                                    data-testid={`Option${index + 1}`}
                                    variant={selectedOption === index ? "solid" : "outline"}
                                    colorScheme={"green"} maxW={"fit-content"} minW={"40%"}
                                    onClick={() => answerButtonClick(index, answer)}
                                    fontSize={["0.85em", "1em"]} display={"flex"}
                                    style={{ backgroundColor: selectedOption === index ? "green" : "white", color: selectedOption === index ? "white" : "green" }}
                                >
                                    {answer.text}
                                </Button>
                            ))}
                        </Flex>

                        <Flex direction="row" justifyContent="center" alignItems="center">
                            <Button data-testid={"Next"} isDisabled={nextDisabled} colorScheme="pigment_green"
                            className={"custom-button effect1"} onClick={nextButtonClick} w={["80%", "50%"]} margin={"10px"}>
                                {t("game.answer")}
                            </Button>
                        </Flex>

                        {showConfetti && (
                            <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={200} data-testid={"confetti"} />
                        )}
                    </>
                }
            </Box>
        </Center>
    );
}