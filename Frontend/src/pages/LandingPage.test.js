import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LandingPage from './LandingPage';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
  }));

const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('LandingPage Component', () => {
  test('renders title correctly', () => {
    renderWithRouter(<LandingPage />);
    expect(screen.getByText(/InfoBot for College Students/i)).toBeInTheDocument();
  });

  test('renders Student Zone card with content', () => {
    renderWithRouter(<LandingPage />);
    expect(screen.getByText(/Student Zone/i)).toBeInTheDocument();
    expect(screen.getByText(/Find academic resources/i)).toBeInTheDocument();
  });

  test('renders Professor Zone card with content and buttons', () => {
    renderWithRouter(<LandingPage />);
    expect(screen.getByText(/Professor Zone/i)).toBeInTheDocument();
    expect(screen.getByText(/Access tools for managing classes/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Register Account/i })).toBeInTheDocument();
  });

  test('navigates to login page on Login button click', () => {
    const mockNavigate = jest.fn();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockImplementation(() => mockNavigate);

    renderWithRouter(<LandingPage />);
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  test('navigates to register page on Register button click', () => {
    const mockNavigate = jest.fn();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockImplementation(() => mockNavigate);

    renderWithRouter(<LandingPage />);
    fireEvent.click(screen.getByRole('button', { name: /Register Account/i }));
    expect(mockNavigate).toHaveBeenCalledWith('/register');
  });
});
