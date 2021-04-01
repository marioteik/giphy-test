import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  test('should render properly', () => {
    render(<App />);
    const textElement = screen.getByText(/Github Users:/i);
    expect(textElement).toBeInTheDocument();
  });  
});
