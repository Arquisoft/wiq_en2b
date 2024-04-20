import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Dashboard from '../pages/Dashboard';
import { MemoryRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../styles/theme';
import MockAdapter from 'axios-mock-adapter';
import AuthManager from 'components/auth/AuthManager';
import { HttpStatusCode } from 'axios';

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

describe('Dashboard', () => {
  let mockUserInfo, mockGameModes, mockIsActive, mockNewGame, authManager, mockAxios;

  beforeEach(() => {
    mockUserInfo = jest.fn().mockResolvedValue({id: 1, username: 'testUser', email: 'test@example.com' });
    mockGameModes = jest.fn().mockResolvedValue({ data: [{ name: "KiWiQ", description: "Test description of the game mode", internal_representation: "KIWIQ_QUEST", icon_name: "FaKiwiBird" }] });
    mockIsActive = true;
    mockNewGame = jest.fn().mockResolvedValue(true);

    authManager = new AuthManager();
    mockAxios = new MockAdapter(authManager.getAxiosInstance());
    mockAxios.onAny().reply(HttpStatusCode.Ok);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders Dashboard component with user data and game modes', async () => {
    let isActive = jest.fn();
    let userInfo = jest.fn();
    let gameModes = jest.fn();
    isActive.mockResolvedValueOnce(mockIsActive);
    userInfo.mockImplementationOnce(mockUserInfo);
    gameModes.mockImplementationOnce(mockGameModes);

    render(
      <ChakraProvider theme={theme}>
        <MemoryRouter>
          <Dashboard />
        </MemoryRouter>
      </ChakraProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('avatar')).toBeInTheDocument();
      expect(screen.getByTestId('Welcome')).toHaveTextContent('common.welcome testUser');
      expect(mockUserInfo).toHaveBeenCalled();
      expect(mockGameModes).toHaveBeenCalled();
    });
  });

  test('renders Play button when game is active', async () => {
    let isActive = jest.fn();
    isActive.mockResolvedValueOnce(mockIsActive);

    render(
      <ChakraProvider theme={theme}>
        <MemoryRouter>
          <Dashboard />
        </MemoryRouter>
      </ChakraProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('Play')).toBeInTheDocument();
    });
  });

  test('renders Resume button when game is not active', async () => {
    let isActive = jest.fn();
    isActive.mockResolvedValueOnce(false);

    render(
      <ChakraProvider theme={theme}>
        <MemoryRouter>
          <Dashboard />
        </MemoryRouter>
      </ChakraProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('Resume')).toBeInTheDocument();
    });
  });

  test('clicking Play button initializes a new game', async () => {
    let isActive = jest.fn();
    let newGame = jest.fn();
    isActive.mockResolvedValueOnce(mockIsActive);
    newGame.mockImplementationOnce(mockNewGame);

    render(
      <ChakraProvider theme={theme}>
        <MemoryRouter>
          <Dashboard />
        </MemoryRouter>
      </ChakraProvider>
    );

    fireEvent.click(screen.getByTestId('Play'));

    await waitFor(() => {
      expect(mockNewGame).toHaveBeenCalled();
    });
  });

  test('changing language updates language', async () => {
    const mockChangeLanguage = jest.fn();
    const mockI18n = { changeLanguage: mockChangeLanguage };
    jest.mock('react-i18next', () => ({
      useTranslation: () => ({ t: (key) => key, i18n: mockI18n }),
    }));

    render(
      <ChakraProvider theme={theme}>
        <MemoryRouter>
          <Dashboard />
        </MemoryRouter>
      </ChakraProvider>
    );

    fireEvent.click(screen.getByText('EN'));

    await waitFor(() => {
      expect(mockChangeLanguage).toHaveBeenCalledWith('en');
    });
  });
});
