import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import About from '../pages/About';
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

describe('About Component', () => {
    it('renders title and description correctly', () => {
        const { getByText } = render(<ChakraProvider theme={theme}><MemoryRouter><About /></MemoryRouter></ChakraProvider>);

        expect(getByText('about.title')).toBeInTheDocument();
        expect(getByText('about.description1')).toBeInTheDocument();
    });

    it('renders table rows with correct data', () => {
        const { getByText } = render(<ChakraProvider theme={theme}><MemoryRouter><About /></MemoryRouter></ChakraProvider>);

        expect(getByText('Gonzalo Alonso Fernández')).toBeInTheDocument();
    });
});
