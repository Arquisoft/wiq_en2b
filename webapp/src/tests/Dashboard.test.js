import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Dashboard from '../pages/Dashboard';
import * as LogoutModule from '../components/game/Logout';
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

describe('Dashboard component', () => {
  it('renders dashboard elements correctly', async () => {
    const { getByText } = render(<ChakraProvider theme={theme}><MemoryRouter><Dashboard/></MemoryRouter></ChakraProvider>);

    expect(getByText("common.dashboard")).toBeInTheDocument();

    expect(screen.getByTestId('Rules')).toBeInTheDocument();
    expect(screen.getByTestId('Play')).toBeInTheDocument();
    expect(screen.getByTestId('Statistics')).toBeInTheDocument();

    expect(screen.getByText(/logout/i)).toBeInTheDocument();
  });

  it('navigates to the rules route on button click', () => {
    render(<ChakraProvider theme={theme}><MemoryRouter><Dashboard/></MemoryRouter></ChakraProvider>);
  
    const rulesButton = screen.getByTestId('Rules');
    fireEvent.click(rulesButton);
  
    expect(screen.getByText("common.rules")).toBeInTheDocument();
  });

  it('do not navigates to the statistics route on button click', () => {
    render(<ChakraProvider theme={theme}><MemoryRouter><Dashboard/></MemoryRouter></ChakraProvider>);
  
    const statisticsButton = screen.getByTestId('Statistics');
    fireEvent.click(statisticsButton);
  
    expect(screen.getByText("common.dashboard")).toBeInTheDocument();
  });

  it('navigates to the game route on "Play" button click', () => {
    render(<ChakraProvider theme={theme}><MemoryRouter><Dashboard/></MemoryRouter></ChakraProvider>);
  
    const playButton = screen.getByTestId('Play');
    fireEvent.click(playButton);
  
    expect(screen.getByText("common.play")).toBeInTheDocument();
  });

  it('does not navigate to the statistics route on button click', () => {
    render(<ChakraProvider theme={theme}><MemoryRouter><Dashboard/></MemoryRouter></ChakraProvider>);
  
    const statisticsButton = screen.getByTestId('Statistics');
    fireEvent.click(statisticsButton);
  
    expect(screen.getByText("common.dashboard")).toBeInTheDocument();
  });

  it('handles logout successfully', async () => {
    render(<ChakraProvider theme={theme}><MemoryRouter><Dashboard/></MemoryRouter></ChakraProvider>);

    const logoutButton = screen.getByText(/logout/i);

    const logoutUserMock = jest.spyOn(LogoutModule, 'logoutUser').mockResolvedValueOnce();

    await act(async () => {
      fireEvent.click(logoutButton);
    });

    expect(logoutUserMock).toHaveBeenCalledTimes(1);
    expect(screen.getByText("common.dashboard")).toBeInTheDocument();
  });

  it('does not navigate to the statistics route on disabled button click', () => {
    render(<ChakraProvider theme={theme}><MemoryRouter><Dashboard/></MemoryRouter></ChakraProvider>);
  
    const statisticsButton = screen.getByTestId('Statistics');
    fireEvent.click(statisticsButton);
  
    expect(screen.getByText("common.dashboard")).toBeInTheDocument();
  });
});
