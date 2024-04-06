import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react'; // Importa act desde @testing-library/react
import { MemoryRouter } from 'react-router';
import Root from '../pages/Root';
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

describe('Root component', () => {

  it('renders KIWIQ heading', async () => {
    await act(async () => {
      render(<ChakraProvider theme={theme}><MemoryRouter><Root /></MemoryRouter></ChakraProvider>);
    });
    const headingElement = screen.getByText('KIWIQ');
    expect(headingElement).toBeInTheDocument();
  });

  it('renders welcome message', async () => {
    await act(async () => {
      render(<ChakraProvider theme={theme}><MemoryRouter><Root /></MemoryRouter></ChakraProvider>);
    });
    const welcomeMessage = screen.getByText('session.welcome');
    expect(welcomeMessage).toBeInTheDocument();
  });

  it('renders Log In button', async () => {
    await act(async () => {
      render(<ChakraProvider theme={theme}><MemoryRouter><Root /></MemoryRouter></ChakraProvider>);
    });
    expect(screen.getByTestId('Login')).toBeInTheDocument();
  });

  it('navigates to /login when Log In button is clicked', async () => {
    await act(async () => {
      render(<ChakraProvider theme={theme}><MemoryRouter><Root /></MemoryRouter></ChakraProvider>);
    });
    fireEvent.click(screen.getByTestId('Login'));
    expect(screen.getByText('KIWIQ')).toBeInTheDocument();
    expect(screen.getByText('session.welcome')).toBeInTheDocument();
    expect(screen.getByTestId('Login')).toBeInTheDocument();
  });

  it('navigates to /signup when "You don\'t have an account?" message is clicked', async () => {
    await act(async () => {
      render(<ChakraProvider theme={theme}><MemoryRouter><Root /></MemoryRouter></ChakraProvider>);
    });
    fireEvent.click(screen.getByText('session.account'));
    expect(screen.getByText('KIWIQ')).toBeInTheDocument();
    expect(screen.getByText('session.welcome')).toBeInTheDocument();
    expect(screen.getByTestId('Login')).toBeInTheDocument();
  });
});
