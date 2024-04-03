import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../styles/theme';
import LateralMenu from '../components/LateralMenu';

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

describe('LateralMenu component', () => {
    const props = {
        isOpen: true,
        onClose: jest.fn(),
        changeLanguage: jest.fn(),
        currentLanguage: 'es',
        isLoggedIn: true,
        isDashboard: false,
    };

    it('renders KIWIQ heading', () => {
        render(<ChakraProvider theme={theme}><MemoryRouter><LateralMenu {...props} /></MemoryRouter></ChakraProvider>);
        const headingElement = screen.getByText('KIWIQ');
        expect(headingElement).toBeInTheDocument();
    });

    it('renders language select', () => {
        render(<ChakraProvider theme={theme}><MemoryRouter><LateralMenu {...props} /></MemoryRouter></ChakraProvider>);
        const languageSelect = screen.getByText('common.language');
        expect(languageSelect).toBeInTheDocument();
    });

    it('changes language when select value is changed', () => {
        render(<ChakraProvider theme={theme}><MemoryRouter><LateralMenu {...props} /></MemoryRouter></ChakraProvider>);
        const selectElement = screen.getByTestId('language-select');
        fireEvent.change(selectElement, { target: { value: 'en' } });
        expect(props.changeLanguage).toHaveBeenCalledWith('en');
    });

    it('renders dashboard button when isLoggedIn is true and isDashboard is false', () => {
        render(<ChakraProvider theme={theme}><MemoryRouter><LateralMenu {...props} /></MemoryRouter></ChakraProvider>);
        const dashboardButton = screen.getByText('common.dashboard');
        expect(dashboardButton).toBeInTheDocument();
    });

    it('does not render dashboard button when isLoggedIn is false', () => {
        const newProps = { ...props, isLoggedIn: false };
        render(<ChakraProvider theme={theme}><MemoryRouter><LateralMenu {...newProps} /></MemoryRouter></ChakraProvider>);
        const dashboardButton = screen.queryByText('common.dashboard');
        expect(dashboardButton).toBeNull();
    });
  
    it('renders API button when isLoggedIn is true', () => {
        render(<ChakraProvider theme={theme}><MemoryRouter><LateralMenu {...props} /></MemoryRouter></ChakraProvider>);
        const apiButton = screen.getByText('API');
        expect(apiButton).toBeInTheDocument();
    });

    it('does not render API button when isLoggedIn is false', () => {
        const newProps = { ...props, isLoggedIn: false };
        render(<ChakraProvider theme={theme}><MemoryRouter><LateralMenu {...newProps} /></MemoryRouter></ChakraProvider>);
        const apiButton = screen.queryByText('API');
        expect(apiButton).toBeNull();
    });

    it('renders statistics button when isLoggedIn is true', () => {
        render(<ChakraProvider theme={theme}><MemoryRouter><LateralMenu {...props} /></MemoryRouter></ChakraProvider>);
        const statisticsButton = screen.getByText('common.statistics.title');
        expect(statisticsButton).toBeInTheDocument();
    });

    it('does not render statistics button when isLoggedIn is false', () => {
        const newProps = { ...props, isLoggedIn: false };
        render(<ChakraProvider theme={theme}><MemoryRouter><LateralMenu {...newProps} /></MemoryRouter></ChakraProvider>);
        const statisticsButton = screen.queryByText('common.statistics.title');
        expect(statisticsButton).toBeNull();
    });

    it('renders rules button when isLoggedIn is true', () => {
        render(<ChakraProvider theme={theme}><MemoryRouter><LateralMenu {...props} /></MemoryRouter></ChakraProvider>);
        const rulesButton = screen.getByText('common.rules');
        expect(rulesButton).toBeInTheDocument();
    });

    it('does not render rules button when isLoggedIn is false', () => {
        const newProps = { ...props, isLoggedIn: false };
        render(<ChakraProvider theme={theme}><MemoryRouter><LateralMenu {...newProps} /></MemoryRouter></ChakraProvider>);
        const rulesButton = screen.queryByText('common.rules');
        expect(rulesButton).toBeNull();
    });

    it('renders logout button when isLoggedIn is true', () => {
        render(<ChakraProvider theme={theme}><MemoryRouter><LateralMenu {...props} /></MemoryRouter></ChakraProvider>);
        const logoutButton = screen.getByText('common.logout');
        expect(logoutButton).toBeInTheDocument();
    });

    it('does not render logout button when isLoggedIn is false', () => {
        const newProps = { ...props, isLoggedIn: false };
        render(<ChakraProvider theme={theme}><MemoryRouter><LateralMenu {...newProps} /></MemoryRouter></ChakraProvider>);
        const logoutButton = screen.queryByText('common.logout');
        expect(logoutButton).toBeNull();
    });

    it('renders about button', () => {
        render(<ChakraProvider theme={theme}><MemoryRouter><LateralMenu {...props} /></MemoryRouter></ChakraProvider>);
        const aboutButton = screen.getByLabelText('About');
        expect(aboutButton).toBeInTheDocument();
    });
});
