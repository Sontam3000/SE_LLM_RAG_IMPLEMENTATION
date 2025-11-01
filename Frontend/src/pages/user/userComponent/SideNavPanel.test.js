// src/pages/user/userComponent/SideNavPanel.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import SideNavPanel from './SideNavPanel';
import '@testing-library/jest-dom';

describe('SideNavPanel Component', () => {
  beforeEach(() => {
    render(<SideNavPanel />);
  });

  it('renders the user name correctly', () => {
    expect(screen.getByText(/User: xa/i)).toBeInTheDocument();
  });

  it('renders all navigation list items', () => {
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Chat History/i)).toBeInTheDocument();
    expect(screen.getByText(/Settings/i)).toBeInTheDocument();
  });

  it('renders the footer text correctly', () => {
    expect(screen.getByText(/© 2025 InfoBot Admin/i)).toBeInTheDocument();
  });
});
