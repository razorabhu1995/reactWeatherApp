import { render, screen } from '@testing-library/react';
import LoadingScreen from '../components/LoadingScreen.js';

test('renders loading', () => {
  render(<LoadingScreen />);
  const element = screen.getByText('Loading...');
  expect(element).toBeInTheDocument();
});