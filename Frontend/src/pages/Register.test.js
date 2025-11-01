
import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RegisterPage from './RegisterPage';
import '@testing-library/jest-dom'; 


const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('RegisterPage Component', () => {
  beforeEach(() => {
    // Render the component inside a MemoryRouter
    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>
    );
  });

  it('renders the registration form correctly', () => {
    // Check if key elements are rendered
    expect(screen.getByText(/create your account/i)).toBeInTheDocument();

    // Match labels exactly, including the asterisk (*)
    const emailInput = screen.getByLabelText(/^email \*$/i); // Matches "Email *"
    expect(emailInput).toBeInTheDocument();

    const passwordInput = screen.getByLabelText(/^password \*$/i); // Matches "Password *"
    expect(passwordInput).toBeInTheDocument();

    const confirmPasswordInput = screen.getByLabelText(/^confirm password \*$/i); // Matches "Confirm Password *"
    expect(confirmPasswordInput).toBeInTheDocument();

    const registerButton = screen.getByRole('button', { name: /register/i });
    expect(registerButton).toBeInTheDocument();

    const loginLink = screen.getByText(/already have an account\? login/i);
    expect(loginLink).toBeInTheDocument();
  });

  it('displays an error when passwords do not match', async () => {
    // Fill out the form with mismatched passwords
    const emailInput = screen.getByLabelText(/^email \*$/i);
    const passwordInput = screen.getByLabelText(/^password \*$/i); // Specific to "Password *"
    const confirmPasswordInput = screen.getByLabelText(/^confirm password \*$/i); // Specific to "Confirm Password *"
    const registerButton = screen.getByRole('button', { name: /register/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'wrongpassword' } });
    fireEvent.click(registerButton);

    // Wait for the error message to appear
    const errorMessage = await screen.findByText(/passwords do not match/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('displays an error when required fields are empty', async () => {
    // Click the register button without filling out any fields
    const registerButton = screen.getByRole('button', { name: /register/i });
    fireEvent.click(registerButton);

    // Wait for the custom error message to appear
    const errorMessage = await screen.findByText(/all fields are required/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('navigates to the login page after successful registration', async () => {
    // Fill out the form with valid data
    const emailInput = screen.getByLabelText(/^email \*$/i);
    const passwordInput = screen.getByLabelText(/^password \*$/i); // Specific to "Password *"
    const confirmPasswordInput = screen.getByLabelText(/^confirm password \*$/i); // Specific to "Confirm Password *"
    const registerButton = screen.getByRole('button', { name: /register/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
    fireEvent.click(registerButton);

    // Wait for navigation to occur
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
  });

  it('redirects to the login page when the login link is clicked', () => {
    const loginLink = screen.getByText(/already have an account\? login/i);
    fireEvent.click(loginLink);
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });
});