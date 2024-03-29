import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Game from '../pages/Game';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../styles/theme';

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

describe('Game component', () => {
  test('renders without crashing', () => {
    render(<ChakraProvider theme={theme}><MemoryRouter><Game/></MemoryRouter></ChakraProvider>);
  });

  test('selects an option when clicked', () => {
    const { getByTestId } = render(<ChakraProvider theme={theme}><MemoryRouter><Game/></MemoryRouter></ChakraProvider>);
    const option1Button = getByTestId('Option1');
    
    fireEvent.click(option1Button);
    
    expect(option1Button).toHaveClass('chakra-button custom-button effect1 css-m4hh83');
  });

  test('disables next button when no option is selected', () => {
    const { getByText } = render(<ChakraProvider theme={theme}><MemoryRouter><Game/></MemoryRouter></ChakraProvider>);
    const nextButton = getByText('Next');
    
    expect(nextButton).toBeDisabled();
  });

  test('enables next button when an option is selected', () => {
    const { getByTestId, getByText } = render(<ChakraProvider theme={theme}><MemoryRouter><Game/></MemoryRouter></ChakraProvider>);
    const option1Button = getByTestId('Option1');
    const nextButton = getByText('Next');
    
    fireEvent.click(option1Button);
    
    expect(nextButton).toBeEnabled();
  });

  test('renders ButtonEf component correctly', () => {
    const { getByTestId } = render(<ChakraProvider theme={theme}><MemoryRouter><Game/></MemoryRouter></ChakraProvider>);
    const option2Button = getByTestId('Option2');
  
    expect(option2Button).toHaveClass('chakra-button custom-button effect1 css-147pzm2');

    fireEvent.click(option2Button);
  
    expect(option2Button).toHaveClass('chakra-button custom-button effect1 css-m4hh83');
  });
});