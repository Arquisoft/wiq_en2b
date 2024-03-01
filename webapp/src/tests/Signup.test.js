import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import Signup from '../pages/Signup';

describe('Signup Component', () => {

  it('renders form elements correctly', () => {
    const { getByPlaceholderText, getByText } = render(<Signup />);
    
    expect(getByPlaceholderText('session.email')).toBeInTheDocument();
    expect(getByPlaceholderText('session.username')).toBeInTheDocument();
    expect(getByPlaceholderText('session.password')).toBeInTheDocument();
    expect(getByPlaceholderText('session.confirm_password')).toBeInTheDocument();
    expect(getByText('Sign Up')).toBeInTheDocument();
  });

  it('toggles password visibility', () => {
    const { getByPlaceholderText, getByText } = render(<Signup />);
  
    const passwordInput = getByPlaceholderText('session.password');
    const confirmPasswordInput = getByPlaceholderText('session.confirm_password');
    const showPasswordButton = getByText('Show');
    const showConfirmPasswordButton = getByText('Show');
  
    fireEvent.click(showPasswordButton);
    fireEvent.click(showConfirmPasswordButton);
  
    expect(passwordInput.getAttribute('type')).toBe('text');
    expect(confirmPasswordInput.getAttribute('type')).toBe('text');
  });

  it('displays error message on failed submission', async () => {
    const { getByText } = render(<Signup />);

    const signUpButton = getByText('Sign Up');
    fireEvent.click(signUpButton);

    await waitFor(() => {
      expect(getByText('Error')).toBeInTheDocument();
    });
  });

  it('submits form data correctly', async () => {
    const axiosMock = jest.spyOn(axios, 'post');
    axiosMock.mockResolvedValueOnce({ status: 202 }); // Accepted status code
  
    // Render the Signup component
    const { getByPlaceholderText, getByText } = render(<Signup />);
  
    // Get form elements and submit button by their text and placeholder values
    const emailInput = getByPlaceholderText('session.email');
    const usernameInput = getByPlaceholderText('session.username');
    const passwordInput = getByPlaceholderText('session.password');
    const confirmPasswordInput = getByPlaceholderText('session.confirm_password');
    const signUpButton = getByText('Sign Up');
    
    // Fill out the form with valid data and submit it
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password' } });
    fireEvent.click(signUpButton);
    
    // Check if the form data was sent correctly
    await waitFor(() => {
      expect(axiosMock).toHaveBeenCalledWith(process.env.API_URL, {});
      expect(axiosMock).toHaveBeenCalledTimes(1);
    });
  
    axiosMock.mockRestore();
  });
});