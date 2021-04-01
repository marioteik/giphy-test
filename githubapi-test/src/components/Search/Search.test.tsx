import React from 'react';
import { render, waitFor, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { mockReactRedux } from "mock-react-redux";
import Search from './';

import { users } from '../../__mocks__/users';

describe('Search', () => {
  afterEach(() => { 
    cleanup();
  });

  test('should render properly', async () => {
    mockReactRedux().state({
      users: users,
    });

    render(<Search />);    
    const forksElement = screen.getByText(/ErikHellman/i);
    expect(forksElement).toBeInTheDocument();
  });
});
