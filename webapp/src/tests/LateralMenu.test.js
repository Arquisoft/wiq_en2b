import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../styles/theme';
import AuthManager from '../components/auth/AuthManager';
import LateralMenu from '../components/menu/LateralMenu';
import userEvent from '@testing-library/user-event';

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

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));
  
  const authManager = new AuthManager();

describe('LateralMenu component', () => {
    beforeEach(() => {
        authManager.reset();
        jest.clearAllMocks();
    });

    const props = {
        isOpen: true,
        onClose: jest.fn(),
        changeLanguage: jest.fn(),
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

    it('does not render dashboard button when isLoggedIn is false', () => {
        const newProps = { ...props, isLoggedIn: false };
        render(<ChakraProvider theme={theme}><MemoryRouter><LateralMenu {...newProps} /></MemoryRouter></ChakraProvider>);
        const dashboardButton = screen.queryByText('common.dashboard');
        expect(dashboardButton).toBeNull();
    });

    it('does not render dashboard button when isLoggedIn is false', () => {
        const newProps = { ...props, isLoggedIn: false };
        render(<ChakraProvider theme={theme}><MemoryRouter><LateralMenu {...newProps} /></MemoryRouter></ChakraProvider>);
        const dashboardButton = screen.queryByText('common.dashboard');
        expect(dashboardButton).toBeNull();
    });
  
    it('renders API button when isLoggedIn is true', async () => {
        authManager.setLoggedIn(true);
        const { getByText } = render(<ChakraProvider theme={theme}><MemoryRouter><LateralMenu {...props}/></MemoryRouter></ChakraProvider>);
        await waitFor(() => {
          expect(getByText('API')).toBeInTheDocument();
        });
    });
    
    it('does not render API button when isLoggedIn is false', () => {
        const newProps = { ...props, isLoggedIn: false };
        render(<ChakraProvider theme={theme}><MemoryRouter><LateralMenu {...newProps} /></MemoryRouter></ChakraProvider>);
        const apiButton = screen.queryByText('API');
        expect(apiButton).toBeNull();
    });

    it('renders statistics button when isLoggedIn is true', async () => {
        authManager.setLoggedIn(true);
        const { getByText } = render(<ChakraProvider theme={theme}><MemoryRouter><LateralMenu {...props}/></MemoryRouter></ChakraProvider>);
        await waitFor(() => {
          expect(getByText('common.statistics.title')).toBeInTheDocument();
        });
    });

    it('does not render statistics button when isLoggedIn is false', () => {
        const newProps = { ...props, isLoggedIn: false };
        render(<ChakraProvider theme={theme}><MemoryRouter><LateralMenu {...newProps} /></MemoryRouter></ChakraProvider>);
        const statisticsButton = screen.queryByText('common.statistics.title');
        expect(statisticsButton).toBeNull();
    });

    it('renders rules button when isLoggedIn is true', async () => {
        authManager.setLoggedIn(true);
        const { getByText } = render(<ChakraProvider theme={theme}><MemoryRouter><LateralMenu {...props}/></MemoryRouter></ChakraProvider>);
        await waitFor(() => {
          expect(getByText('common.rules')).toBeInTheDocument();
        });
    });

    it('does not render rules button when isLoggedIn is false', () => {
        const newProps = { ...props, isLoggedIn: false };
        render(<ChakraProvider theme={theme}><MemoryRouter><LateralMenu {...newProps} /></MemoryRouter></ChakraProvider>);
        const rulesButton = screen.queryByText('common.rules');
        expect(rulesButton).toBeNull();
    });

    it('does not render logout button when isLoggedIn is false', () => {
        const newProps = { ...props, isLoggedIn: false };
        render(<ChakraProvider theme={theme}><MemoryRouter><LateralMenu {...newProps} /></MemoryRouter></ChakraProvider>);
        const logoutButton = screen.queryByText('common.logout');
        expect(logoutButton).toBeNull();
    });

    it('renders logout button when isLoggedIn is true', async () => {
      authManager.setLoggedIn(true);
      const { getByText } = render(<ChakraProvider theme={theme}><MemoryRouter><LateralMenu {...props}/></MemoryRouter></ChakraProvider>);
      await waitFor(() => {
        expect(getByText('common.logout')).toBeInTheDocument();
      });
    });

    it('renders about button', () => {
        render(<ChakraProvider theme={theme}><MemoryRouter><LateralMenu {...props} /></MemoryRouter></ChakraProvider>);
        const aboutButton = screen.getByLabelText('About');
        expect(aboutButton).toBeInTheDocument();
    });
    it('changes language on select change', async () => {
      const changeLanguageMock = jest.fn();
      render(<LateralMenu isOpen={true} onClose={() => {}} changeLanguage={changeLanguageMock} isDashboard={false} />);

      userEvent.selectOptions(screen.getByTestId('language-select'), 'en');
      await waitFor(() => {
          expect(changeLanguageMock).toHaveBeenCalledWith('en');
      });
    });
    it('renders API button when isLoggedIn is true', async () => {
      authManager.setLoggedIn(true);
      const { getByText } = render(<ChakraProvider theme={theme}><MemoryRouter><LateralMenu {...props}/></MemoryRouter></ChakraProvider>);
      await waitFor(() => {
        expect(getByText('API')).toBeInTheDocument();
      });      
      fireEvent.click(screen.getByTestId('API'));
      await waitFor(() => {
        expect(screen.getByText('KIWIQ')).toBeInTheDocument();
      });
  });
});
