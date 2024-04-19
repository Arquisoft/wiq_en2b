import React from 'react';
import { render, fireEvent, screen, act, waitFor } from '@testing-library/react';
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
  });

  it('navigates to the game route on "Play" button click', async () => {
  });
});
