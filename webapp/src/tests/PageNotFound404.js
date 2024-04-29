import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import PageNotFound from '../pages/NotFound';
import theme from '../styles/theme';
import { ChakraProvider } from '@chakra-ui/react';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: key => key,
    i18n: {
        changeLanguage: () => new Promise(() => {}),
    },
  }),
}));

describe('404 page', () => {
    it('renders title and description correctly', () => {
        const { getByText } = render(<ChakraProvider theme={theme}><MemoryRouter><PageNotFound /></MemoryRouter></ChakraProvider>);

        expect(getByText('404 - Page not found')).toBeInTheDocument();
        expect(getByText('Woops! You seem lost! Click on go back to find your way.')).toBeInTheDocument();
    });
});
