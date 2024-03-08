import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router';
import Login from '../pages/Login';
import { login as mockLogin } from '../components/auth/AuthUtils';

jest.mock('../components/auth/AuthUtils', () => ({
  isUserLogged: jest.fn(),
  login: jest.fn(),
}));

describe('Login Component', () => {
  it('renders form elements correctly', () => {
    const { getByPlaceholderText, getByTestId } = render(<MemoryRouter><Login /></MemoryRouter>);

    expect(getByPlaceholderText('session.email')).toBeInTheDocument();
    expect(getByPlaceholderText('session.password')).toBeInTheDocument();
    expect(getByTestId('Login')).toBeInTheDocument();
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

  it('calls login function with correct credentials on submit', async () => {
    const { getByPlaceholderText, getByTestId } = render(<Login />, { wrapper: MemoryRouter });
    const emailInput = getByPlaceholderText('session.email');
    const passwordInput = getByPlaceholderText('session.password');
    const loginButton = getByTestId('Login');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith(
        { email: 'test@example.com', password: 'password123' },
        expect.any(Function),
        expect.any(Function)
      );
    });
  });
});