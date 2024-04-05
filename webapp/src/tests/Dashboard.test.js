import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Dashboard from '../pages/Dashboard';
import AuthManager from 'components/auth/AuthManager';
import MockAdapter from 'axios-mock-adapter';
import { HttpStatusCode } from 'axios';
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

const authManager = new AuthManager();
let mockAxios;

describe('Dashboard component', () => {

  beforeEach(() => {
    authManager.reset();
    mockAxios = new MockAdapter(authManager.getAxiosInstance());
  })

  it('renders dashboard elements correctly', async () => {
    const { getByText } = render(<ChakraProvider theme={theme}><MemoryRouter><Dashboard/></MemoryRouter></ChakraProvider>);

    expect(getByText("common.dashboard")).toBeInTheDocument();

    expect(screen.getByTestId('Play')).toBeInTheDocument();

    expect(screen.getByText(/logout/i)).toBeInTheDocument();
  });

  it('navigates to the game route on "Play" button click', () => {
    render(<ChakraProvider theme={theme}><MemoryRouter><Dashboard/></MemoryRouter></ChakraProvider>);
  
    const playButton = screen.getByTestId('Play');
    fireEvent.click(playButton);
  
    expect(screen.getByText("common.play")).toBeInTheDocument();
  });

  it('handles logout successfully', async () => {
    render(<ChakraProvider theme={theme}><MemoryRouter><Dashboard/></MemoryRouter></ChakraProvider>);
    mockAxios.onGet().replyOnce(HttpStatusCode.Ok);
    const logoutButton = screen.getByText(/logout/i);

    await act(async () => {
      fireEvent.click(logoutButton);
    });

    expect(mockAxios.history.get.length).toBe(1);
    expect(screen.getByText("common.dashboard")).toBeInTheDocument();
  });
});
