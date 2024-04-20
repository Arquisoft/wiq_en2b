import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Dashboard from '../pages/Dashboard';
import { MemoryRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../styles/theme';
import MockAdapter from 'axios-mock-adapter';
import AuthManager from 'components/auth/AuthManager';
import { HttpStatusCode } from 'axios';
import { __esModule } from '@testing-library/jest-dom/dist/matchers';

const api = process.env.REACT_APP_API_ENDPOINT;

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str) => str,
      i18n: {
        changeLanguage: () => new Promise(() => { }),
        language: "en"
      },
    }
  },
}));

describe('Dashboard', () => {

  const authManager = new AuthManager();
  let mockAxios;

  beforeEach(() => {
    authManager.reset();
    mockAxios = new MockAdapter(authManager.getAxiosInstance());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders Dashboard component with user data and game modes', async () => {
    mockAxios.onGet(`${api}/games/is-active`).reply(HttpStatusCode.Ok, {
      "is_active": true
    });

    mockAxios.onGet(`${api}/games/gamemodes`).reply(HttpStatusCode.Ok, {
      name: "KiWiQ",
      description: "Test description of the game mode",
      internal_representation: "KIWIQ_QUEST",
      icon_name: "FaKiwiBird"
    });

    mockAxios.onGet(`${api}/users/details`).reply(HttpStatusCode.Ok, {
      id: 1,
      username: 'testUser',
      email: 'test@example.com'
    });

    mockAxios.onGet(`${api}/games/question-categories`).reply(HttpStatusCode.Ok, [
      {
        "name": "Sports",
        "description": "Test description of the question category",
        "internal_representation": "SPORTS"
      }
    ])

    render(
      <ChakraProvider theme={theme}>
        <MemoryRouter>
          <Dashboard />
        </MemoryRouter>
      </ChakraProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('Welcome')).toHaveTextContent('common.welcome testUser');
      expect(mockAxios.history.get.length).toBeGreaterThan(4);
    });
  });

  test('renders Play button when game is active', async () => {

    mockAxios.onGet(`${api}/games/is-active`).reply(HttpStatusCode.Ok, {
      "is_active": true
    });

    mockAxios.onGet(`${api}/games/gamemodes`).reply(HttpStatusCode.Ok, {
      name: "KiWiQ",
      description: "Test description of the game mode",
      internal_representation: "KIWIQ_QUEST",
      icon_name: "FaKiwiBird"
    });

    mockAxios.onGet(`${api}/users/details`).reply(HttpStatusCode.Ok, {
      id: 1,
      username: 'testUser',
      email: 'test@example.com'
    });

    mockAxios.onGet(`${api}/games/question-categories`).reply(HttpStatusCode.Ok, [
      {
        "name": "Sports",
        "description": "Test description of the question category",
        "internal_representation": "SPORTS"
      }
    ])

    const {container} = render(
      <ChakraProvider theme={theme}>
        <MemoryRouter>
          <Dashboard />
        </MemoryRouter>
      </ChakraProvider>
    );

    await waitFor(() => {
      expect(container.querySelector('#play')).toBeInTheDocument();
    });
  });

  test('renders Resume button when game is not active', async () => {
    mockAxios.onGet(`${api}/games/is-active`).reply(HttpStatusCode.Ok, {
      "is_active": false
    });

    mockAxios.onGet(`${api}/games/gamemodes`).reply(HttpStatusCode.Ok, {
      name: "KiWiQ",
      description: "Test description of the game mode",
      internal_representation: "KIWIQ_QUEST",
      icon_name: "FaKiwiBird"
    });

    mockAxios.onGet(`${api}/users/details`).reply(HttpStatusCode.Ok, {
      id: 1,
      username: 'testUser',
      email: 'test@example.com'
    });

    mockAxios.onGet(`${api}/games/question-categories`).reply(HttpStatusCode.Ok, [
      {
        "name": "Sports",
        "description": "Test description of the question category",
        "internal_representation": "SPORTS"
      }
    ])

    const {container} = render(
      <ChakraProvider theme={theme}>
        <MemoryRouter>
          <Dashboard />
        </MemoryRouter>
      </ChakraProvider>
    );
    
    // FIXME: This does not pass
    await waitFor(() => {
      expect(container.querySelector('#resumeBtn')).toBeInTheDocument();
    });
  });

  test('clicking Play button initializes a new game', async () => {
    mockAxios.onGet(`${api}/games/is-active`).reply(HttpStatusCode.Ok, {
      "is_active": false
    });

    mockAxios.onGet(`${api}/games/gamemodes`).reply(HttpStatusCode.Ok, {
      name: "KiWiQ",
      description: "Test description of the game mode",
      internal_representation: "KIWIQ_QUEST",
      icon_name: "FaKiwiBird"
    });

    mockAxios.onGet(`${api}/users/details`).reply(HttpStatusCode.Ok, {
      id: 1,
      username: 'testUser',
      email: 'test@example.com'
    });

    mockAxios.onGet(`${api}/games/question-categories`).reply(HttpStatusCode.Ok, [
      {
        "name": "Sports",
        "description": "Test description of the question category",
        "internal_representation": "SPORTS"
      }
    ])

    const {container} = render(
      <ChakraProvider theme={theme}>
        <MemoryRouter>
          <Dashboard />
        </MemoryRouter>
      </ChakraProvider>
    );

    await waitFor(() => {
      fireEvent.click(container.querySelector("#play"));

      expect(mockAxios.history.post.length).toBeGreaterThan(0);
    });
  });

});
