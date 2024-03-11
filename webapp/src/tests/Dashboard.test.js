import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Dashboard from '../pages/Dashboard';

describe('Dashboard component', () => {
  it('renders dashboard elements correctly', async () => {
    const { getByText } = render(<MemoryRouter><Dashboard/></MemoryRouter>);

    // Check if the heading is rendered
    expect(getByText("common.dashboard")).toBeInTheDocument();

    // Check if the buttons are rendered
    expect(screen.getByTestId('Rules')).toBeInTheDocument();
    expect(screen.getByTestId('Play')).toBeInTheDocument();
    expect(screen.getByTestId('Statistics')).toBeInTheDocument();

    // Check if the logout button is rendered
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
  });

  it('navigates to the rules route on button click', () => {
    // Render the component
    render(<MemoryRouter><Dashboard /></MemoryRouter>);
  
    const rulesButton = screen.getByTestId('Rules');
    fireEvent.click(rulesButton);
  
    // Check the change of path
    expect(screen.getByText("common.rules")).toBeInTheDocument();
  });

  it('do not navigates to the statistics route on button click', () => {
    // Render the component
    render(<MemoryRouter><Dashboard /></MemoryRouter>);
  
    const statisticsButton = screen.getByTestId('Statistics');
    fireEvent.click(statisticsButton);
  
    // Check the change of path
    expect(screen.getByText("common.dashboard")).toBeInTheDocument();
  });

  // Test the play and log out buttons.
});
