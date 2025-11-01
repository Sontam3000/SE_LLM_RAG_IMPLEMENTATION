import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Feedback from './Feedback';
import '@testing-library/jest-dom';

describe('Feedback Component', () => {
  

  it('renders the table headers correctly', () => {
    render(
      <MemoryRouter>
        <Feedback />
      </MemoryRouter>
    );

    // Check if the table headers are rendered correctly using getByRole with name
    expect(screen.getByRole('columnheader', { name: /Date/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /Feedback/i })).toBeInTheDocument();
  });

  it('renders the feedback data in the table correctly', () => {
    render(
      <MemoryRouter>
        <Feedback />
      </MemoryRouter>
    );

    // Check if the feedback data is displayed correctly in the table
    expect(screen.getByText('2025-04-22')).toBeInTheDocument();
    expect(screen.getByText('Great feature, very intuitive.')).toBeInTheDocument();
    expect(screen.getByText('2025-04-21')).toBeInTheDocument();
    expect(screen.getByText('Needs improvement in loading time.')).toBeInTheDocument();
  });
});
