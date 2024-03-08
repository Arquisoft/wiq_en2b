import React from 'react';
import { render, fireEvent, waitFor, getByTestId, getAllByTestId } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter } from 'react-router';
import Signup from '../pages/Signup';
import { register as mockRegister } from '../components/auth/AuthUtils';

jest.mock('../components/auth/AuthUtils', () => ({
  isUserLogged: jest.fn(),
  register: jest.fn(),
}));

describe('Signup Component', () => {

  it('renders form elements correctly', () => {
    const { getByPlaceholderText } = render(<MemoryRouter><Signup /></MemoryRouter>);
    
    expect(getByPlaceholderText('session.email')).toBeInTheDocument();
    expect(getByPlaceholderText('session.username')).toBeInTheDocument();
    expect(getByPlaceholderText('session.password')).toBeInTheDocument();
    expect(getByTestId(document.body, 'Sign up')).toBeInTheDocument();
  });

  it('toggles password visibility', () => {
    const { getByPlaceholderText } = render(<MemoryRouter><Signup /></MemoryRouter>);
  
    const passwordInput = getByPlaceholderText('session.password');
    const showPasswordButtons = getAllByTestId(document.body, 'show-confirm-password-button');

    fireEvent.click(showPasswordButtons[0]);
  
    expect(passwordInput.getAttribute('type')).toBe('text');
  });

  it('submits form data correctly', async () => {
    const { getByPlaceholderText, getByTestId } = render(<MemoryRouter><Signup /></MemoryRouter>);
  
    // Get form elements and submit button by their text and placeholder values
    const emailInput = getByPlaceholderText('session.email');
    const usernameInput = getByPlaceholderText('session.username');
    const passwordInput = getByPlaceholderText('session.password');
    const signUpButton = getByTestId('Sign up');
    
    // Fill out the form with valid data and submit it
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(signUpButton);
    
    // Check if the form data was sent correctly
    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith(
        { email: 'test@example.com', username: 'testuser', password: 'password' },
        expect.any(Function),
        expect.any(Function)
      );
    });
  });
});