import React from 'react';
import { render, screen, fireEvent, getByTestId } from '@testing-library/react';
import { MemoryRouter, createMemoryRouter } from 'react-router';
import Root from '../pages/Root';

describe('Root component', () => {

  it('renders WIQ-EN2B heading', () => {
    render(<MemoryRouter><Root /></MemoryRouter>);
    const headingElement = screen.getByText('WIQ-EN2B');
    expect(headingElement).toBeInTheDocument();
  });

  it('renders welcome message', () => {
    render(<MemoryRouter><Root /></MemoryRouter>);
    const welcomeMessage = screen.getByText('session.welcome');
    expect(welcomeMessage).toBeInTheDocument();
  });

  it('renders Log In button', () => {
    render(<MemoryRouter><Root /></MemoryRouter>);
    expect(getByTestId(document.body, 'Login')).toBeInTheDocument();
  });

  it('navigates to /login when Log In button is clicked', () => {
    const { container } = render(<MemoryRouter><Root /></MemoryRouter>);
    fireEvent.click(getByTestId(document.body, 'Login'));
    expect(container.innerHTML).toMatch('<div class=\"css-xmmg5m\"><h1 class=\"chakra-heading css-p03q1r\">WIQ-EN2B</h1><p>session.welcome</p><div class=\"chakra-stack css-gjlptk\"><button type=\"submit\" class=\"chakra-button custom-button effect1 css-1vdwnhw\" data-testid=\"Login\">common.login</button><p style=\"cursor: pointer;\">session.account</p></div></div>');
  });

  it('navigates to /signup when "You don\'t have an account?" message is clicked', () => {
    const { container } = render(<MemoryRouter><Root /></MemoryRouter>);
    fireEvent.click(screen.getByText('session.account'));
    expect(container.innerHTML).toMatch('<div class=\"css-xmmg5m\"><h1 class=\"chakra-heading css-p03q1r\">WIQ-EN2B</h1><p>session.welcome</p><div class=\"chakra-stack css-gjlptk\"><button type=\"submit\" class=\"chakra-button custom-button effect1 css-1vdwnhw\" data-testid=\"Login\">common.login</button><p style=\"cursor: pointer;\">session.account</p></div></div>');
  });
});