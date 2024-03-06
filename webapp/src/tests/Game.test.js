import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Game from '../pages/Game';

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
});
