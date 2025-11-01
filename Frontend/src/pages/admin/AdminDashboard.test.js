import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AdminDashboard from './AdminDashboard';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

// Mock the AdminNavPanel to avoid rendering its complexity
jest.mock('./adminComponent/AdminNavPanel', () => () => <div>Mocked AdminNavPanel</div>);

describe('AdminDashboard', () => {
  test('renders form and allows input changes and submission', () => {
    render(
      <MemoryRouter>
        <AdminDashboard />
      </MemoryRouter>
    );

    // Check that form elements are rendered
    expect(screen.getByLabelText(/temperature/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/max tokens/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/top p/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/frequency penalty/i)).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/temperature/i), {
      target: { value: '0.8' },
    });
    fireEvent.change(screen.getByLabelText(/max tokens/i), {
      target: { value: '26' },
    });
    fireEvent.change(screen.getByLabelText(/top p/i), {
      target: { value: '1' },
    });
    fireEvent.change(screen.getByLabelText(/frequency penalty/i), {
      target: { value: '0.5' },
    });

    fireEvent.click(screen.getByRole('button', { name: /update model/i }));
  });
});
