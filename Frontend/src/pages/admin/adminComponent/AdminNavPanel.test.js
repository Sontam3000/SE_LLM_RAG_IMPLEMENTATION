import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import AdminNavPanel from './AdminNavPanel';
import '@testing-library/jest-dom'; 

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('AdminNavPanel', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <AdminNavPanel />
      </MemoryRouter>
    );
  });

  it('renders all nav items correctly', () => {
    const navItems = ['Prompt Setting', 
      'Context', 
      'Feedback', 
      // 'Statistics', 
      // 'Chat', 
      'Logout'
    ];
    navItems.forEach((item) => {
      const button = screen.getByRole('button', { name: item });
      expect(button).toBeInTheDocument(); // This matcher works if jest-dom is imported
    });
  });

  it('calls navigate with correct path when nav item is clicked', async () => {
    const user = userEvent.setup();

    const contextButton = screen.getByText('Context');
    await user.click(contextButton);

    expect(mockNavigate).toHaveBeenCalledWith('/admin/context');
  });
});
