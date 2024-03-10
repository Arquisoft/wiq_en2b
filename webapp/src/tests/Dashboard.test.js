import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Dashboard from '../pages/Dashboard';
import ButtonEf from '../components/ButtonEf';

describe('Dashboard component', () => {
  it('renders dashboard elements correctly', async () => {
    const { getByText } = render(<MemoryRouter><Dashboard/></MemoryRouter>);

    expect(getByText("common.dashboard")).toBeInTheDocument();

    expect(screen.getByTestId('Rules')).toBeInTheDocument();
    expect(screen.getByTestId('Play')).toBeInTheDocument();
    expect(screen.getByTestId('Statistics')).toBeInTheDocument();

    expect(screen.getByText(/logout/i)).toBeInTheDocument();
  });

  it('navigates to the rules route on button click', () => {
    render(<MemoryRouter><Dashboard /></MemoryRouter>);
  
    const rulesButton = screen.getByTestId('Rules');
    fireEvent.click(rulesButton);
  
    expect(screen.getByText("common.rules")).toBeInTheDocument();
  });

  it('do not navigates to the statistics route on button click', () => {
    render(<MemoryRouter><Dashboard /></MemoryRouter>);
  
    const statisticsButton = screen.getByTestId('Statistics');
    fireEvent.click(statisticsButton);
  
    expect(screen.getByText("common.dashboard")).toBeInTheDocument();
  });

  it('navigates to the game route on "Play" button click', () => {
    render(<MemoryRouter><Dashboard /></MemoryRouter>);
  
    const playButton = screen.getByTestId('Play');
    fireEvent.click(playButton);
  
    expect(screen.getByText("common.play")).toBeInTheDocument();
  });

  it('does not navigate to the statistics route on button click', () => {
    render(<MemoryRouter><Dashboard /></MemoryRouter>);
  
    const statisticsButton = screen.getByTestId('Statistics');
    fireEvent.click(statisticsButton);
  
    expect(screen.getByText("common.dashboard")).toBeInTheDocument();
  });

  it('renders ButtonEf correctly', () => {
    const { getByTestId } = render(<ButtonEf dataTestId="TestId" variant="outline" colorScheme="blue" text="Test Text" onClick={() => {}} />);
  
    expect(getByTestId('TestId')).toBeInTheDocument();
  });
});
