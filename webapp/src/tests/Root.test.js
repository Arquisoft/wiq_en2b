import React from 'react';
import { render, screen, fireEvent, getByTestId } from '@testing-library/react';
import { MemoryRouter, createMemoryRouter } from 'react-router';
import Root from '../pages/Root';

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
    render(<MemoryRouter><Root /></MemoryRouter>);
    const headingElement = screen.getByText('KIWIQ');
    expect(headingElement).toBeInTheDocument();
  });

  it('renders welcome message', () => {
    render(<MemoryRouter><Root /></MemoryRouter>);
    const welcomeMessage = screen.getByText('session.welcome');
    expect(welcomeMessage).toBeInTheDocument();
  });

  it('renders Log In button', () => {
    render(<MemoryRouter><Root /></MemoryRouter>);
    expect(getByTestId(document.body, 'Login')).toBeInTheDocument();
  });

  it('navigates to /login when Log In button is clicked', () => {
    render(<MemoryRouter><Root /></MemoryRouter>);
    fireEvent.click(screen.getByTestId('Login'));
    expect(screen.getByText('KIWIQ')).toBeInTheDocument();
    expect(screen.getByText('session.welcome')).toBeInTheDocument();
    expect(screen.getByTestId('Login')).toBeInTheDocument();
  });

  it('navigates to /signup when "You don\'t have an account?" message is clicked', () => {
    render(<MemoryRouter><Root /></MemoryRouter>);
    fireEvent.click(screen.getByText('session.account'));
    expect(screen.getByText('KIWIQ')).toBeInTheDocument();
    expect(screen.getByText('session.welcome')).toBeInTheDocument();
    expect(screen.getByTestId('Login')).toBeInTheDocument();
  });
});