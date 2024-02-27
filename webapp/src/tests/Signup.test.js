import React from 'react';
import { render, fireEvent, screen, waitFor, act } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Signup from '../pages/Signup';

const mockAxios = new MockAdapter(axios);

describe('Signup component', () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  it('should log in successfully', async () => {
    render(<Signup />);

    const emailInput = screen.getByLabelText(/Email/i);
    const usernameInput = screen.getByLabelText(/Username/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const signupButton = screen.getByRole('button', { name: /Signup/i });

    // Mock the axios.post request to simulate a successful response
    mockAxios.onPost('http://localhost:8000/signup').reply(200, { createdAt: '2024-01-01T12:34:56Z' });

    // Simulate user input
    await act(async () => {
        fireEvent.change(emailInput, { target: { value: 'testEmail' } });
        fireEvent.change(usernameInput, { target: { value: 'testUser' } });
        fireEvent.change(passwordInput, { target: { value: 'testPassword' } });
        fireEvent.click(signupButton);
      });

    // Verify that the user information is displayed
    expect(screen.getByText(/Hello testUser!/i)).toBeInTheDocument();
    expect(screen.getByText(/Your account was created on 1\/1\/2024/i)).toBeInTheDocument();
  });

  it('should handle error when logging in', async () => {
    render(<Signup />);

    const emailInput = screen.getByLabelText(/Email/i);
    const usernameInput = screen.getByLabelText(/Username/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const signupButton = screen.getByRole('button', { name: /Signup/i });

    // Mock the axios.post request to simulate an error response
    mockAxios.onPost('http://localhost:8000/signup').reply(401, { error: 'Unauthorized' });

    // Simulate user input
    fireEvent.change(emailInput, { target: { value: 'testEmail' } });
    fireEvent.change(usernameInput, { target: { value: 'testUser' } });
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });

    // Trigger the signup button click
    fireEvent.click(signupButton);

    // Wait for the error Snackbar to be open
    await waitFor(() => {
      expect(screen.getByText(/Error: Unauthorized/i)).toBeInTheDocument();
    });

    // Verify that the user information is not displayed
    expect(screen.queryByText(/Hello testUser!/i)).toBeNull();
    expect(screen.queryByText(/Your account was created on/i)).toBeNull();
  });
});