import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Game from '../pages/Game';

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
    render(<MemoryRouter><Game/></MemoryRouter>);
  });

  test('selects an option when clicked', () => {
    const { getByTestId } = render(<MemoryRouter><Game/></MemoryRouter>);
    const option1Button = getByTestId('Option1');
    
    fireEvent.click(option1Button);
    
    expect(option1Button).toHaveClass('chakra-button custom-button effect1 css-1vdwnhw');
  });

  test('disables next button when no option is selected', () => {
    const { getByText } = render(<MemoryRouter><Game/></MemoryRouter>);
    const nextButton = getByText('Next');
    
    expect(nextButton).toBeDisabled();
  });

  test('enables next button when an option is selected', () => {
    const { getByTestId, getByText } = render(<MemoryRouter><Game/></MemoryRouter>);
    const option1Button = getByTestId('Option1');
    const nextButton = getByText('Next');
    
    fireEvent.click(option1Button);
    
    expect(nextButton).toBeEnabled();
  });

  test('renders ButtonEf component correctly', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <Game/>
      </MemoryRouter>
    );
    const option2Button = getByTestId('Option2');
  
    // Assuming 'outline' variant is the default state
    expect(option2Button).toHaveClass('chakra-button css-1vdwnhw');
    
    // Simulate selecting the option
    fireEvent.click(option2Button);
  
    // Ensure the 'solid' variant is applied when the option is selected
    expect(option2Button).toHaveClass('chakra-button custom-button effect1 css-1vdwnhw');
  });
});