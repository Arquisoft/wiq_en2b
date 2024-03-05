import React, { useState, useEffect as confetti } from "react";
import { Grid, Flex, Heading, Button, Box } from "@chakra-ui/react";
import { Center } from "@chakra-ui/layout";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import ButtonEf from '../components/ButtonEf';

export default function Game() {
	const navigate = useNavigate();

	const [selectedOption, setSelectedOption] = useState(null);
	const [nextDisabled, setNextDisabled] = useState(true);
	const [roundNumber, setRoundNumber] = useState(1);
	const [correctAnswers, setCorrectAnswers] = useState(0);
	const [showConfetti, setShowConfetti] = useState(false);

	const answerButtonClick = (option) => {
		setSelectedOption((prevOption) => (prevOption === option ? null : option));
		const anyOptionSelected = option === selectedOption ? null : option;
		setNextDisabled(anyOptionSelected === null);
	};

	const nextButtonClick = () => {
		const isCorrect = selectedOption === 1; // Right now the correct option is the first one.

		if (isCorrect) {
			setCorrectAnswers((prevCorrectAnswers) => prevCorrectAnswers + 1);
			setShowConfetti(true);
		}

		setSelectedOption(null);

		const nextRoundNumber = roundNumber + 1; // Round N
		if (nextRoundNumber > 9)
			navigate("/dashboard/game/results", { state: { correctAnswers: correctAnswers + (isCorrect ? 1 : 0) } });
		else {
			setRoundNumber(nextRoundNumber);
			setNextDisabled(true);
		}
	};

	confetti(() => { // stop the confeti after 3000 milliseconds
		let timeout;
		if (showConfetti)
			timeout = setTimeout(() => { setShowConfetti(false); }, 3000);
		return () => clearTimeout(timeout);
	}, [showConfetti]);

	return (
		<Center display="flex" flexDirection="column" w="100wh" h="100vh" bg="blue.50" justifyContent="center" alignItems="center" padding={"4"}>
			<Heading as="h2" color="blue.400">{`Round ${roundNumber}`}</Heading>

			<Heading as="h3" color="green.400" fontSize="xl">{`Correct answers: ${correctAnswers}`}</Heading>

			<Box bg="white" p={4} borderRadius="md" boxShadow="md" mt={4} mb={4} w="fit-content" shadow="2xl" rounded="1rem">
				<Box bg="white" color="blue.400" p={4} borderRadius="md" mb={4} fontSize="xl" border="2px solid" borderColor="blue.400">
					{"Question"}
				</Box>

				<Grid templateColumns="repeat(2, 1fr)" gap={4} mb={4}>
					<ButtonEf dataTestId={"Option1"} variant={selectedOption === 1 ? "solid" : "outline"} colorScheme={"blue"} text={"option1"} onClick={() => answerButtonClick(1)} />
					<ButtonEf dataTestId={"Option2"} variant={selectedOption === 2 ? "solid" : "outline"} colorScheme={"blue"} text={"option2"} onClick={() => answerButtonClick(2)} />
				</Grid>

				<Flex direction="row" justifyContent="center" alignItems="center">
					<Button isDisabled={nextDisabled} colorScheme="blue" className={"custom-button effect1"} onClick={nextButtonClick} w="100%" margin={"10px"}>
						{"Next"}
					</Button>
				</Flex>

				{showConfetti && (
					<Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={200} />
				)}
			</Box>
		</Center>
	);
}