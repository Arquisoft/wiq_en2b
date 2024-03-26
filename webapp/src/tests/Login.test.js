import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router';
import Login from '../pages/Login';
import { login as mockLogin } from '../components/auth/AuthUtils';
import * as AuthUtils from '../components/auth/AuthUtils';
import { logoutUser } from "../components/game/Logout";

jest.mock('../components/auth/AuthUtils', () => ({
  isUserLogged: jest.fn(),
  login: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('../components/game/Logout', () => ({
  logoutUser: jest.fn(),
}));

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

describe('Login Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls logoutUser when user is already logged in', async () => {
    jest.spyOn(AuthUtils, 'isUserLogged').mockReturnValue(true);

    render(<MemoryRouter><Login /></MemoryRouter>);

    expect(logoutUser).toHaveBeenCalled();
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
        expect.any(Function),
        expect.any(Function)
      );
    });
  });

  it('calls logoutUser during useEffect when user is already logged in', async () => {
    jest.spyOn(AuthUtils, 'isUserLogged').mockReturnValue(true);

    render(<MemoryRouter><Login /></MemoryRouter>);

    expect(logoutUser).toHaveBeenCalled();
  });

  it('renders form elements correctly', () => {
    const { getByPlaceholderText, getByTestId } = render(<MemoryRouter><Login /></MemoryRouter>);

    expect(getByPlaceholderText('session.email')).toBeInTheDocument();
    expect(getByPlaceholderText('session.password')).toBeInTheDocument();
    expect(getByTestId('Login')).toBeInTheDocument();
  });


  it('toggles password visibility', () => {
    const { getByLabelText, getByPlaceholderText } = render(<MemoryRouter><Login /></MemoryRouter>);
    
    const passwordInput = getByPlaceholderText('session.password');
    expect(passwordInput).toHaveAttribute('type', 'password');
    
    const toggleButton = getByLabelText('Shows or hides the password');
    fireEvent.click(toggleButton);
    
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
        expect.any(Function),
        expect.any(Function)
      );
    });
  });

  it('displays error message on failed login attempt', async () => {
    jest.spyOn(AuthUtils, 'login').mockRejectedValueOnce(); // Simulating a failed login attempt
    const { getByPlaceholderText, getByTestId } = render(<Login />, { wrapper: MemoryRouter });
    const emailInput = getByPlaceholderText('session.email');
    const passwordInput = getByPlaceholderText('session.password');
    const loginButton = getByTestId('Login');
  
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);
  
    await waitFor(() => {
      expect(getByTestId('error-message')).toBeInTheDocument();
    });
  });
});