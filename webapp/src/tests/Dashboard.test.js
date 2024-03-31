import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Dashboard from '../pages/Dashboard';
import ButtonEf from '../components/ButtonEf';
import AuthManager from 'components/auth/AuthManager';
import MockAdapter from 'axios-mock-adapter';
import { HttpStatusCode } from 'axios';

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
let mockAxios;

describe('Dashboard component', () => {

  beforeEach(() => {
    authManager.reset();
    mockAxios = new MockAdapter(authManager.getAxiosInstance());
  })

  it('renders dashboard elements correctly', async () => {
    const { getByText } = render(<MemoryRouter><Dashboard/></MemoryRouter>);

    expect(getByText("common.dashboard")).toBeInTheDocument();

    expect(screen.getByTestId('Rules')).toBeInTheDocument();
    expect(screen.getByTestId('Play')).toBeInTheDocument();
    expect(screen.getByTestId('Statistics')).toBeInTheDocument();

    expect(screen.getByText(/logout/i)).toBeInTheDocument();
  });

  it('navigates to the rules route on button click', () => {
    render(<MemoryRouter><Dashboard /></MemoryRouter>);
  
    const rulesButton = screen.getByTestId('Rules');
    fireEvent.click(rulesButton);
  
    expect(screen.getByText("common.rules")).toBeInTheDocument();
  });

  it('do not navigates to the statistics route on button click', () => {
    render(<MemoryRouter><Dashboard /></MemoryRouter>);
  
    const statisticsButton = screen.getByTestId('Statistics');
    fireEvent.click(statisticsButton);
  
    expect(screen.getByText("common.dashboard")).toBeInTheDocument();
  });

  it('navigates to the game route on "Play" button click', () => {
    render(<MemoryRouter><Dashboard /></MemoryRouter>);
  
    const playButton = screen.getByTestId('Play');
    fireEvent.click(playButton);
  
    expect(screen.getByText("common.play")).toBeInTheDocument();
  });

  it('does not navigate to the statistics route on button click', () => {
    render(<MemoryRouter><Dashboard /></MemoryRouter>);
  
    const statisticsButton = screen.getByTestId('Statistics');
    fireEvent.click(statisticsButton);
  
    expect(screen.getByText("common.dashboard")).toBeInTheDocument();
  });

  it('renders ButtonEf correctly', () => {
    const { getByTestId } = render(<ButtonEf dataTestId="TestId" variant="outline" colorScheme="blue" text="Test Text" onClick={() => {}} />);
  
    expect(getByTestId('TestId')).toBeInTheDocument();
  });

  it('handles logout successfully', async () => {
    render(<MemoryRouter><Dashboard/></MemoryRouter>);
    mockAxios.onGet().replyOnce(HttpStatusCode.Ok);
    const logoutButton = screen.getByText(/logout/i);

    await act(async () => {
      fireEvent.click(logoutButton);
    });

    expect(mockAxios.history.get.length).toBe(1);
    expect(screen.getByText("common.dashboard")).toBeInTheDocument();
  });

  it('does not navigate to the statistics route on disabled button click', () => {
    render(<MemoryRouter><Dashboard /></MemoryRouter>);
  
    const statisticsButton = screen.getByTestId('Statistics');
    fireEvent.click(statisticsButton);
  
    expect(screen.getByText("common.dashboard")).toBeInTheDocument();
  });
});
