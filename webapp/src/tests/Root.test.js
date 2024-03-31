import React from 'react';
import { render, screen, fireEvent, getByTestId } from '@testing-library/react';
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

  it('renders KIWIQ heading', () => {
    render(<ChakraProvider theme={theme}><MemoryRouter><Root /></MemoryRouter></ChakraProvider>);
    const headingElement = screen.getByText('KIWIQ');
    expect(headingElement).toBeInTheDocument();
  });

  it('renders welcome message', () => {
    render(<ChakraProvider theme={theme}><MemoryRouter><Root /></MemoryRouter></ChakraProvider>);
    const welcomeMessage = screen.getByText('session.welcome');
    expect(welcomeMessage).toBeInTheDocument();
  });

  it('renders Log In button', () => {
    render(<ChakraProvider theme={theme}><MemoryRouter><Root /></MemoryRouter></ChakraProvider>);
    expect(getByTestId(document.body, 'Login')).toBeInTheDocument();
  });

  it('navigates to /login when Log In button is clicked', () => {
    render(<ChakraProvider theme={theme}><MemoryRouter><Root /></MemoryRouter></ChakraProvider>);
    fireEvent.click(screen.getByTestId('Login'));
    expect(screen.getByText('KIWIQ')).toBeInTheDocument();
    expect(screen.getByText('session.welcome')).toBeInTheDocument();
    expect(screen.getByTestId('Login')).toBeInTheDocument();
  });

  it('navigates to /signup when "You don\'t have an account?" message is clicked', () => {
    render(<ChakraProvider theme={theme}><MemoryRouter><Root /></MemoryRouter></ChakraProvider>);
    fireEvent.click(screen.getByText('session.account'));
    expect(screen.getByText('KIWIQ')).toBeInTheDocument();
    expect(screen.getByText('session.welcome')).toBeInTheDocument();
    expect(screen.getByTestId('Login')).toBeInTheDocument();
  });
});