import React from 'react';
import { render, waitFor, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Forks from './';

import * as githubApi from '../../api/github';

import { gist } from '../../__mocks__/gist';
import { forks } from '../../__mocks__/forks';

describe('Forks', () => {
  afterEach(() => { 
    cleanup();
  });
  test('should render properly', async () => {
    render(<Forks gist={gist} />);    
    const forksElement = screen.getByText(/0 forks/i);
    expect(forksElement).toBeInTheDocument();
  });

test('should get forks and render the right quantity of avatars', async () => {
    const githubApiMock = jest.spyOn(githubApi, 'fetchFromUrl');
    githubApiMock.mockResolvedValue(forks);

    const { container } = render(<Forks gist={gist} />);  

    const forksStringElement = await waitFor(() => screen.getByText(/forks/i));
    const forksAvatarElements = await waitFor(() => container.querySelectorAll('.avatar'));

    expect(forksStringElement).toHaveTextContent('10 forks:');
    expect(forksAvatarElements.length).toBe(3);
    expect(githubApiMock).toBeCalledTimes(1);

    githubApiMock.mockRestore();
  });
});
