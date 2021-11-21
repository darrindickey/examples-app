import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Darrin Dickey text', () => {
  render(<App />);
  const linkElement = screen.getByText(/Darrin Dickey/i);
  expect(linkElement).toBeInTheDocument();
});
