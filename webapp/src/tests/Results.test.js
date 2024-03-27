import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import Results from '../pages/Results';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    state: { correctAnswers: 3 },
  }),
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

describe('Results Component', () => {
    test('renders results with correct answers', () => {
        const { getByText, getByTestId } = render(
        <BrowserRouter>
            <Results />
        </BrowserRouter>
        );

        expect(getByText('Results')).toBeInTheDocument();
        expect(getByText('Correct answers: 3')).toBeInTheDocument();
        expect(getByTestId('GoBack')).toBeInTheDocument();
        expect(getByTestId('GoBack')).toHaveTextContent('common.finish');
    });

    it('navigates to dashboard on button click', async () => {
        const navigateMock = jest.fn();
        jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(navigateMock);

        const { getByTestId } = render(
        <BrowserRouter>
            <Results />
        </BrowserRouter>
        );

        const goBackButton = getByTestId('GoBack');
        fireEvent.click(goBackButton);

        await waitFor(() => {
        expect(navigateMock).toHaveBeenCalled();
        expect(navigateMock).toHaveBeenCalledWith('/dashboard');
        });
    });
});
