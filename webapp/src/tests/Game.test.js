import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Game from '../pages/Game';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../styles/theme';
import { getQuestion } from '../components/game/Questions';

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    }
  },
}));

jest.mock('../components/game/Questions', () => ({
  getQuestion: jest.fn(),
}));

describe('Game component', () => {
  /*
  beforeEach(() => {
    getQuestion.mockResolvedValue({
      content: 'Test question',
      answers: [
        { id: 1, text: 'Test answer 1', category: 'Test category 1' },
        { id: 2, text: 'Test answer 2', category: 'Test category 2' },
      ],
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('selects an option when clicked', async () => {
    render(<ChakraProvider theme={theme}><MemoryRouter><Game/></MemoryRouter></ChakraProvider>);
    const option1Button = await screen.findByTestId('Option1');

    act(() => fireEvent.click(option1Button));

    expect(option1Button).toHaveClass('chakra-button custom-button effect1 css-m4hh83');
  });

  test('disables next button when no option is selected', async () => {
    render(<ChakraProvider theme={theme}><MemoryRouter><Game/></MemoryRouter></ChakraProvider>);
    const nextButton = await screen.findByTestId('Next');

    expect(nextButton).toBeDisabled();
  });

  test('enables next button when an option is selected', async () => {
    render(<ChakraProvider theme={theme}><MemoryRouter><Game/></MemoryRouter></ChakraProvider>);
    const option1Button = await screen.findByTestId('Option1');
    const nextButton = await screen.findByTestId('Next');

    act(() => fireEvent.click(option1Button));

    expect(nextButton).toBeEnabled();
  });

  test('renders ButtonEf component correctly', async () => {
    render(<ChakraProvider theme={theme}><MemoryRouter><Game/></MemoryRouter></ChakraProvider>);
    const option2Button = await screen.findByTestId('Option2');

    expect(option2Button).toHaveClass('chakra-button custom-button effect1 css-147pzm2');

    act(() => fireEvent.click(option2Button));

    expect(option2Button).toHaveClass('chakra-button custom-button effect1 css-m4hh83');
  });
  */
});
