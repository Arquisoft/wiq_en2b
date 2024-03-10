import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import Game from '../pages/Game';

const mock = new MockAdapter(axios);

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

  test('handles next button click and navigates to results page', async () => {
    // Mocking axios call
    mock.onPost('/api/answerQuestion').reply(200, { wasCorrect: true });

    const { getByTestId, getByText } = render(<MemoryRouter><Game/></MemoryRouter>);
    const option1Button = getByTestId('Option1');
    const nextButton = getByText('Next');

    // Select an option
    fireEvent.click(option1Button);

    // Click the Next button
    fireEvent.click(nextButton);

    // Check if the navigation to the results page is triggered
    expect(mock.history.post.length).toBe(1);
    expect(mock.history.post[0].data).toBe(JSON.stringify({ questionId: 1, answerId: 1 }));
    await waitFor(() => expect(getByText(/Round 2/i)).toBeInTheDocument());
  });

  test('handles next button click and continues to the next round', async () => {
    // Mocking axios call
    mock.onPost('/api/answerQuestion').reply(200, { wasCorrect: false });

    const { getByTestId, getByText } = render(<MemoryRouter><Game/></MemoryRouter>);
    const option1Button = getByTestId('Option1');
    const nextButton = getByText('Next');

    // Select an option
    fireEvent.click(option1Button);

    // Click the Next button
    fireEvent.click(nextButton);

    // Check if the game continues to the next round
    expect(mock.history.post.length).toBe(1);
    expect(mock.history.post[0].data).toBe(JSON.stringify({ questionId: 1, answerId: 1 }));
    await waitFor(() => expect(getByText(/Round 2/i)).toBeInTheDocument());
  });

  test('selects the second option when clicked', () => {
    const { getByTestId } = render(<MemoryRouter><Game/></MemoryRouter>);
    const option2Button = getByTestId('Option2');

    fireEvent.click(option2Button);

    expect(option2Button).toHaveClass('chakra-button custom-button effect1 css-1vdwnhw');
  });
});
