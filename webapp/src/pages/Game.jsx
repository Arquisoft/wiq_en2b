import React, { useState, useEffect, useCallback } from "react";
import { Grid, Flex, Heading, Button, Box, Text, Spinner, CircularProgress } from "@chakra-ui/react";
import { Center } from "@chakra-ui/layout";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Confetti from "react-confetti";
import { newGame, startRound, getCurrentQuestion, answerQuestion } from '../components/game/Game';
import LateralMenu from '../components/LateralMenu';
import MenuButton from '../components/MenuButton';

export default function Game() {
    const navigate = useNavigate();

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
    const [questionLoading, setQuestionLoading] = useState(false);

    const { t, i18n } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const changeLanguage = (selectedLanguage) => {
        i18n.changeLanguage(selectedLanguage);
    };

    const calculateProgress = (timeElapsed) => {
        const totalTime = 30;
        const percentage = (((Date.now()-timeStartRound)/1000) / totalTime) * 100;
        return Math.min(Math.max(percentage, 0), 100);
    };
    /*
      Initialize game when loading the page
     */
    useEffect(() => {
        const initializeGame = async () => {
            try {
                const newGameResponse = await newGame();
                if (newGameResponse) {
                    setLoading(false);
                    setRoundNumber(newGameResponse.actual_round)
                    await setGameId(newGameResponse.id);
                    setTimeStartRound(new Date(newGameResponse.round_start_time).getTime());
                    setRoundDuration(newGameResponse.round_duration)
                    setMaxRoundNumber(newGameResponse.rounds);
                    try{
                        await getCurrentQuestion(newGameResponse.id).then((result) => {
                            if (result.status === 200) {
                                setQuestion(result.data);
                                setQuestionLoading(false);
                            }
                        });
                    }catch (error) {
                        await startNewRound(newGameResponse.id);
                    }

                } else {
                    navigate("/dashboard");
                }
            } catch (error) {
                console.error("Error initializing game:", error);
                navigate("/dashboard");
            }
        };

        initializeGame();
    }, [navigate]);


    /*
        Generate new question when the round changes
     */
    const assignQuestion = useCallback(async () => {
        try {
            const result = await getCurrentQuestion(gameId);
            if (result.status === 200) {
                await setQuestion(result.data);
                await setQuestionLoading(false);
                setTimeElapsed(0);
            } else {
                console.log(result)
                //navigate("/dashboard");
            }
        } catch (error) {
            console.error("Error fetching question:", error);
            //navigate("/dashboard");
        }
    }, [gameId, navigate]);
    useEffect(() => {
        if (gameId !== null) {
            //setSelectedOption(null);
            //generateQuestion();
        }
    }, [gameId, assignQuestion]);

    const answerButtonClick = (optionIndex, answer) => {
        const selectedOptionIndex = selectedOption === optionIndex ? null : optionIndex;
        setSelectedOption(selectedOptionIndex);
        setAnswer(answer);
        const anyOptionSelected = selectedOptionIndex !== null;
        setNextDisabled(!anyOptionSelected);
    };

    const nextButtonClick = useCallback(async () => {
        try {
            const isCorrect = (await answerQuestion(gameId, answer.id)).correctly_answered_questions;

            if (isCorrect) {
                setCorrectAnswers(correctAnswers + (isCorrect ? 1 : 0));
                setShowConfetti(true);
            }

            setSelectedOption(null);
            await nextRound()

        } catch (error) {
            console.error("Error processing next question:", error);
            navigate("/dashboard");
        }
    }, [gameId, answer.id, roundNumber, correctAnswers, assignQuestion, navigate]);

    const nextRound = useCallback(async () => {
        const nextRoundNumber = roundNumber + 1;
        if (nextRoundNumber > maxRoundNumber)
            navigate("/dashboard/game/results", { state: { correctAnswers: correctAnswers } });
        else {
            setAnswer({});
            setRoundNumber(nextRoundNumber);
            setNextDisabled(true);
            setQuestionLoading(true);
            await startNewRound(gameId);

            await assignQuestion();
        }

    }, [gameId, answer.id, roundNumber, correctAnswers, assignQuestion, navigate]);

    const startNewRound = useCallback(async (gameId) => {
        try{
            const result = await startRound(gameId);
            setTimeStartRound(new Date(result.data.round_start_time).getTime());
            setRoundNumber(result.data.actual_round )
            setRoundDuration(result.data.round_duration);
            await assignQuestion();
        }
        catch(error){
            if(error.status === 409){
                if(roundNumber >= 9){
                    navigate("/dashboard/game/results", { state: { correctAnswers: correctAnswers } });
                } else {
                    await assignQuestion()
                }
            }

        }

    }, [gameId, answer.id, roundNumber, correctAnswers, assignQuestion, navigate]);


    useEffect(() => { 
        let timeout;
        if (showConfetti)
            timeout = setTimeout(() => { setShowConfetti(false); }, 3000);
        return () => clearTimeout(timeout);
    }, [showConfetti]);

    useEffect(() => {
        let timeout;

        //console.log(timeElapsed)
        if ((Date.now()-timeStartRound)/1000 >= roundDuration && timeStartRound !== -1) {
            timeout = setTimeout(() => nextRound(), 1000);

        } else {
            timeout = setTimeout(() => {
                setTimeElapsed((prevTime) => prevTime + 1);
            }, 1000); 
        }
        return () => clearTimeout(timeout);
    }, [timeElapsed, nextButtonClick]);


    return (
        <Center display="flex" flexDirection="column" w="100wh" h="100vh" justifyContent="center" alignItems="center" padding={"4"} bgImage={'/background.svg'}>
            <MenuButton onClick={() => setIsMenuOpen(true)} />
            <LateralMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} changeLanguage={changeLanguage} isDashboard={false}/>

            <Heading as="h2">{t("game.round") + `${roundNumber}`}</Heading>

            <Heading as="h3" color="pigment_green.400" fontSize="xl">{`Correct answers: ${correctAnswers}`}</Heading>

            <CircularProgress value={calculateProgress(timeElapsed)} color="green" size="120px" thickness="12px" capIsRound />

            <Box bg="white" p={4} borderRadius="md" boxShadow="md" mt={4} mb={4} w="fit-content" shadow="2xl" rounded="1rem" alignItems="center">
                {loading ? (
                    <Spinner
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='green.500'
                        size='xl'
                    />
                ) : (
                    question && (
                        <> 
                            <Text fontWeight='extrabold' fontSize="2xl" color={"forest_green.400"}>{question.content}</Text>

                            <Grid templateColumns="repeat(2, 1fr)" gap={4} mb={4}>
                                {question.answers.map((answer, index) => (
                                    <Button
                                        key={index}
                                        data-testid={`Option${index + 1}`}
                                        variant={selectedOption === index ? "solid" : "outline"}
                                        colorScheme={"green"}
                                        onClick={() => answerButtonClick(index, answer)}
                                        style={{ backgroundColor: selectedOption === index ? "green" : "white", color: selectedOption === index ? "white" : "green" }}
                                    >
                                        {answer.text}
                                    </Button>
                                ))}
                            </Grid>

                            <Flex direction="row" justifyContent="center" alignItems="center">
                                <Button data-testid={"Next"} isDisabled={nextDisabled || questionLoading} colorScheme="pigment_green" className={"custom-button effect1"} onClick={nextButtonClick} w="100%" margin={"10px"}>
                                    {t("game.next")}
                                </Button>
                            </Flex>

                            {showConfetti && (
                                <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={200} />
                            )}
                        </>
                    )
                )}
            </Box>
        </Center>
    );
}