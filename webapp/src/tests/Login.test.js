import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router';
import Login from '../pages/Login';

describe('Login Component', () => {
  it('renders form elements correctly', () => {
    const { getByPlaceholderText, getByTestId } = render(<MemoryRouter><Login /></MemoryRouter>);

    expect(getByPlaceholderText('session.email')).toBeInTheDocument();
    expect(getByPlaceholderText('session.password')).toBeInTheDocument();
    expect(getByTestId('Login')).toBeInTheDocument();
  });

  it('displays error message on failed login attempt', async () => {
    const { getByTestId, getByPlaceholderText, getByText } = render(<MemoryRouter><Login /></MemoryRouter>);
    
    // Simulate failed login attempt
    fireEvent.change(getByPlaceholderText('session.email'), { target: { value: 'test@example.com' } });
    fireEvent.change(getByPlaceholderText('session.password'), { target: { value: 'incorrectpassword' } });
    fireEvent.click(getByTestId('Login'));
    
    // Wait for error message to be displayed
    await waitFor(() => {
      expect(getByText('error.login')).toBeInTheDocument();
      expect(getByText('error.login-desc')).toBeInTheDocument();
    });
  });

  it('toggles password visibility', () => {
    const { getByLabelText, getByPlaceholderText } = render(<MemoryRouter><Login /></MemoryRouter>);
    
    // Initially password should be hidden
    const passwordInput = getByPlaceholderText('session.password');
    expect(passwordInput).toHaveAttribute('type', 'password');
    
    // Click on the toggle password button
    const toggleButton = getByLabelText('Shows or hides the password');
    fireEvent.click(toggleButton);
    
    // Password should now be visible
    expect(passwordInput).toHaveAttribute('type', 'text');
  });
});