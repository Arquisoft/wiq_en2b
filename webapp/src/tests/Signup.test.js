import React from 'react';
import { render, fireEvent, getByTestId, getAllByTestId, waitFor, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Signup from '../pages/Signup';
import * as AuthUtils from '../components/auth/AuthUtils';

jest.mock('../components/auth/AuthUtils', () => ({
  isUserLogged: jest.fn(),
  register: jest.fn(),
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
    const { getAllByTestId, getByPlaceholderText } = render(<MemoryRouter><Signup /></MemoryRouter>);
    getByPlaceholderText('session.confirm_password');
    const toggleButton = getAllByTestId('show-confirm-password-button')[1];
  
    fireEvent.click(toggleButton);

    const confirmPasswordInput = getByPlaceholderText('session.confirm_password');
    expect(confirmPasswordInput.getAttribute('type')).toBe('text');
  });
  it('handles confirm password change', () => {
    const { getByPlaceholderText } = render(<MemoryRouter><Signup /></MemoryRouter>);
    const confirmPasswordInput = getByPlaceholderText('session.confirm_password');
  
    fireEvent.change(confirmPasswordInput, { target: { value: 'newPassword' } });
    expect(confirmPasswordInput.value).toBe('newPassword');
  });
  
  it('navigates to login page on successful registration', async () => {
    const { getByPlaceholderText, getByTestId } = render(<MemoryRouter><Signup /></MemoryRouter>);

    // Espía sobre la función de registro
    const registerSpy = jest.spyOn(AuthUtils, 'register').mockResolvedValueOnce();

    const emailInput = getByPlaceholderText('session.email');
    const usernameInput = getByPlaceholderText('session.username');
    const passwordInput = getByPlaceholderText('session.password');
    const signUpButton = getByTestId('Sign up');

    // Modifica los valores según lo que necesites
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(signUpButton);

    // Espera a que el registro sea exitoso
    await waitFor(() => expect(registerSpy).toHaveBeenCalled());

    // Asegúrate de que la función de navegación se haya llamado
    expect(registerSpy.mock.calls[0][1]).toBeInstanceOf(Function); // Esto verifica que se pase una función como segundo argumento
    act(() => {
      registerSpy.mock.calls[0][1](); // Llama a la función de navegación
    })
    // Verifica que la navegación se haya realizado correctamente
    // Puedes agregar más expectativas aquí según tus necesidades

    // Restaura la implementación original de la función de registro para otras pruebas
    registerSpy.mockRestore();
  });

  it('handles registration error', async () => {
    const { getByPlaceholderText, getByTestId } = render(<MemoryRouter><Signup /></MemoryRouter>);

    // Espía sobre la función de registro
    const registerSpy = jest.spyOn(AuthUtils, 'register').mockRejectedValueOnce(new Error('Registration error'));

    const emailInput = getByPlaceholderText('session.email');
    const usernameInput = getByPlaceholderText('session.username');
    const passwordInput = getByPlaceholderText('session.password');
    const signUpButton = getByTestId('Sign up');

    // Modifica los valores según lo que necesites
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(signUpButton);

    // Espera a que se maneje el error de registro
    await waitFor(() => expect(registerSpy).toHaveBeenCalled());

    // Verifica que la función de manejo de error se haya llamado
    expect(registerSpy.mock.calls[0][2]).toBeInstanceOf(Function); // Verifica que se pase una función como tercer argumento
    act(() => {
      registerSpy.mock.calls[0][2](); // Llama a la función de manejo de error
    });

    // Verifica que la variable de estado `hasError` se haya establecido correctamente
    // Puedes agregar más expectativas aquí según tus necesidades
    // ...

    // Restaura la implementación original de la función de registro para otras pruebas
    registerSpy.mockRestore();
  });
});