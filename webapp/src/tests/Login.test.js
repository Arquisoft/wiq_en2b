import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router';
import Login from '../pages/Login';
import AuthManager from 'components/auth/AuthManager';
import MockAdapter from 'axios-mock-adapter';
import { HttpStatusCode } from 'axios';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../styles/theme';

jest.mock('../components/auth/AuthUtils', () => ({
  isUserLogged: jest.fn(),
  login: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
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

const authManager = new AuthManager();
let mockAxios = new MockAdapter(authManager.getAxiosInstance());

describe('Login Component', () => {
  beforeEach(() => {
    authManager.reset();
    jest.clearAllMocks();
    mockAxios = new MockAdapter(authManager.getAxiosInstance());
  });

  it('calls logoutUser when user is already logged in', async () => {
    jest.spyOn(AuthUtils, 'isUserLogged').mockReturnValue(true);

    render(<ChakraProvider theme={theme}><MemoryRouter><Login/></MemoryRouter></ChakraProvider>);

    expect(logoutUser).toHaveBeenCalled();
  });

  it('calls login function with correct credentials on submit', async () => {
    const { getByPlaceholderText, getByTestId } = render(<ChakraProvider theme={theme}><MemoryRouter><Login/></MemoryRouter></ChakraProvider>);
    const emailInput = getByPlaceholderText('session.email');
    const passwordInput = getByPlaceholderText('session.password');
    const loginButton = getByTestId('Login');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(mockAxios.history.post[0].data).toBe(JSON.stringify({ email: 'test@example.com', password: 'password123' }));
    });
  });

  it('renders form elements correctly', () => {
    const { getByPlaceholderText, getByTestId } = render(<ChakraProvider theme={theme}><MemoryRouter><Login/></MemoryRouter></ChakraProvider>);

    expect(getByPlaceholderText('session.email')).toBeInTheDocument();
    expect(getByPlaceholderText('session.password')).toBeInTheDocument();
    expect(getByTestId('Login')).toBeInTheDocument();
  });


  it('toggles password visibility', () => {
    const { getByLabelText, getByPlaceholderText } = render(<ChakraProvider theme={theme}><MemoryRouter><Login/></MemoryRouter></ChakraProvider>);
    
    const passwordInput = getByPlaceholderText('session.password');
    expect(passwordInput).toHaveAttribute('type', 'password');
    
    const toggleButton = getByLabelText('Shows or hides the password');
    fireEvent.click(toggleButton);
    
    expect(passwordInput).toHaveAttribute('type', 'text');
  });

  it('displays error message on failed login attempt', async () => {
    mockAxios.onPost().replyOnce(HttpStatusCode.BadRequest);
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