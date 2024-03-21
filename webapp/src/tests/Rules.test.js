import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Rules from '../pages/Rules';

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

describe('Rules component', () => {
  it('renders rules elements correctly', async () => {
    const { getByText, getByTestId } = render(<MemoryRouter><Rules/></MemoryRouter>);

    // Check if the heading is rendered
    expect(getByText("common.rules")).toBeInTheDocument();

    // Check if the button is rendered
    expect(getByTestId('GoBack')).toBeInTheDocument();
  });
});
