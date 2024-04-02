import React from 'react';
import { render, fireEvent, getByTestId, getAllByTestId, waitFor, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Signup from '../pages/Signup';
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

describe('Signup Component', () => {

  it('renders form elements correctly', () => {
    const { getByPlaceholderText } = render(<ChakraProvider theme={theme}><MemoryRouter><Signup /></MemoryRouter></ChakraProvider>);
    
    expect(getByPlaceholderText('session.email')).toBeInTheDocument();
    expect(getByPlaceholderText('session.username')).toBeInTheDocument();
    expect(getByPlaceholderText('session.password')).toBeInTheDocument();
    expect(getByTestId(document.body, 'Sign up')).toBeInTheDocument();
  });

  it('toggles password visibility', () => {
    const { getByPlaceholderText } = render(<ChakraProvider theme={theme}><MemoryRouter><Signup /></MemoryRouter></ChakraProvider>);
  
    const passwordInput = getByPlaceholderText('session.password');
    const showPasswordButtons = getAllByTestId(document.body, 'show-confirm-password-button');

    fireEvent.click(showPasswordButtons[0]);
  
    expect(passwordInput.getAttribute('type')).toBe('text');
  });

  it('submits form data correctly', async () => {
    const { getByPlaceholderText, getByTestId } = render(<ChakraProvider theme={theme}><MemoryRouter><Signup /></MemoryRouter></ChakraProvider>);
  
    const emailInput = getByPlaceholderText('session.email');
    const usernameInput = getByPlaceholderText('session.username');
    const passwordInput = getByPlaceholderText('session.password');
    const signUpButton = getByTestId('Sign up');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(signUpButton);
  });

  it('toggles confirm password visibility', () => {
    const { getAllByTestId, getByPlaceholderText } = render(<ChakraProvider theme={theme}><MemoryRouter><Signup /></MemoryRouter></ChakraProvider>);
    getByPlaceholderText('session.confirm_password');
    const toggleButton = getAllByTestId('show-confirm-password-button')[1];
  
    fireEvent.click(toggleButton);

    const confirmPasswordInput = getByPlaceholderText('session.confirm_password');
    expect(confirmPasswordInput.getAttribute('type')).toBe('text');
  });

  it('handles confirm password change', () => {
    const { getByPlaceholderText } = render(<ChakraProvider theme={theme}><MemoryRouter><Signup /></MemoryRouter></ChakraProvider>);
    const confirmPasswordInput = getByPlaceholderText('session.confirm_password');
  
    fireEvent.change(confirmPasswordInput, { target: { value: 'newPassword' } });
    expect(confirmPasswordInput.value).toBe('newPassword');
  });

});