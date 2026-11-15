import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders todolist heading', () => {
  const { getByText } = render(<App />);
  const heading = getByText(/what to learn/i);
  expect(heading).toBeInTheDocument();
});
