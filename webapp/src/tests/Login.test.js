import React from 'react';
import { render, fireEvent, screen, waitFor, act, getByLabelText, getByTestId } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Login from '../pages/Login';
import { MemoryRouter, createMemoryRouter } from 'react-router';
import router from '../components/Router';

const mockAxios = new MockAdapter(axios);
const mockRouter = createMemoryRouter(router);

describe('Login component', () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  it('renders form elements correctly', async () => {
    const { getByPlaceholderText, getByText } = render(<MemoryRouter><Login /></MemoryRouter>);

    expect(getByPlaceholderText('session.email')).toBeInTheDocument();
    expect(getByPlaceholderText('session.password')).toBeInTheDocument();
    expect(getByTestId(document.body, 'Login')).toBeInTheDocument();
  });

  it('toggles password visibility', () => {
    const { getByPlaceholderText, getByText } = render(<MemoryRouter><Login /></MemoryRouter>);
  
    const passwordInput = getByPlaceholderText('session.password');
    const showPasswordButton = getByTestId(document.body, 'togglePasswordButton');

    fireEvent.click(showPasswordButton);
  
    expect(passwordInput.getAttribute('type')).toBe('text');
  });

  it('submits form data correctly', async () => {
    const axiosMock = jest.spyOn(axios, 'post');
    axiosMock.mockResolvedValueOnce({ status: 202 }); // Accepted status code
  
    // Render the Signup component
    const { getByPlaceholderText, getByText } = render(<MemoryRouter><Login /></MemoryRouter>);
  
    // Get form elements and submit button by their text and placeholder values
    const emailInput = getByPlaceholderText('session.email');
    const passwordInput = getByPlaceholderText('session.password');
    const signUpButton = getByTestId(document.body, 'Login');
    
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
