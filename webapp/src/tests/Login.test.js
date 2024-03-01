import React from 'react';
import { render, fireEvent, screen, waitFor, act } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Login from '../pages/Login';

const mockAxios = new MockAdapter(axios);

describe('Login component', () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  it('renders form elements correctly', async () => {
    const { getByPlaceholderText, getByText } = render(<Login />);

    expect(getByPlaceholderText('Email')).toBeInTheDocument();
    expect(getByPlaceholderText('Password')).toBeInTheDocument();
    expect(getByText('Login')).toBeInTheDocument();
  });

  it('toggles password visibility', () => {
    const { getByPlaceholderText, getByText } = render(<Login />);
  
    const passwordInput = getByPlaceholderText('Password');
    const showPasswordButton = getByText('Show');
  
    fireEvent.click(showPasswordButton);
  
    expect(passwordInput.getAttribute('type')).toBe('text');
  });

  it('displays error message on failed submission', async () => {
    const { getByText } = render(<Login />);

    const signUpButton = getByText('Login');
    fireEvent.click(signUpButton);

    await waitFor(() => {
      expect(getByText('Error')).toBeInTheDocument();
    });
  });

  it('submits form data correctly', async () => {
    const axiosMock = jest.spyOn(axios, 'post');
    axiosMock.mockResolvedValueOnce({ status: 202 }); // Accepted status code
  
    // Render the Signup component
    const { getByPlaceholderText, getByText } = render(<Login />);
  
    // Get form elements and submit button by their text and placeholder values
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const signUpButton = getByText('Login');
    
    // Fill out the form with valid data and submit it
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(signUpButton);
    
    // Check if the form data was sent correctly
    await waitFor(() => {
      expect(axiosMock).toHaveBeenCalledWith(process.env.API_URL, {});
      expect(axiosMock).toHaveBeenCalledTimes(1);
    });
  
    axiosMock.mockRestore();
  });
});
