import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom'; // Wrap the test in a router
import Context from './Context';

import '@testing-library/jest-dom'; // Import jest-dom for toBeInTheDocument

describe('Context Component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Context />
      </MemoryRouter>
    );
  });

  it('renders all form fields and button correctly', () => {
    // Check if form fields and button are rendered
    expect(screen.getByLabelText(/Department Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Course ID/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Course Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Context/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Upload PDF/i)).toBeInTheDocument();
    
    // Use the correct role for the button
    expect(screen.getByRole('button', { name: /Update Context/i })).toBeInTheDocument();
  });

  it('updates form data on input change', async () => {
    const user = userEvent.setup();

    // Simulate user input
    await user.type(screen.getByLabelText(/Department Name/i), 'Computer Science');
    await user.type(screen.getByLabelText(/Course ID/i), 'CS101');
    await user.type(screen.getByLabelText(/Course Name/i), 'Introduction to Computer Science');
    await user.type(screen.getByLabelText(/Context/i), 'This is a sample context for the course.');

    // Verify the form data updates
    expect(screen.getByLabelText(/Department Name/i).value).toBe('Computer Science');
    expect(screen.getByLabelText(/Course ID/i).value).toBe('CS101');
    expect(screen.getByLabelText(/Course Name/i).value).toBe('Introduction to Computer Science');
    expect(screen.getByLabelText(/Context/i).value).toBe('This is a sample context for the course.');
  });

  it('updates file input correctly', async () => {
    const file = new File(['sample content'], 'test.pdf', { type: 'application/pdf' });
    const fileInput = screen.getByLabelText(/Upload PDF/i);

    // Simulate file selection
    fireEvent.change(fileInput, { target: { files: [file] } });

    // Ensure the file input contains the correct file
    await waitFor(() => {
      expect(fileInput.files[0].name).toBe('test.pdf');
    });
  });

  it('calls handleSubmit and logs the form data', async () => {
    const user = userEvent.setup();
    
    // Mocking console.log
    const handleSubmit = jest.spyOn(console, 'log').mockImplementation(() => {});

    // Fill out the form
    await user.type(screen.getByLabelText(/Department Name/i), 'Computer Science');
    await user.type(screen.getByLabelText(/Course ID/i), 'CS101');
    await user.type(screen.getByLabelText(/Course Name/i), 'Introduction to Computer Science');
    await user.type(screen.getByLabelText(/Context/i), 'This is a sample context for the course.');

    // Simulate the submit button click
    const submitButton = screen.getByRole('button', { name: /Update Context/i });
    await user.click(submitButton);

    // Check if console.log was called with the correct data
    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalled(); // Ensures the function was called
      
      // Split the console.log call to capture both the message and data separately
      const [message, loggedData] = handleSubmit.mock.calls[0];

      // Check if the message contains 'Updated Context:'
      expect(message).toContain('Updated Context:');

      // Check if the form data is correct
      expect(loggedData).toEqual({
        department: 'Computer Science',
        courseId: 'CS101',
        courseName: 'Introduction to Computer Science',
        context: 'This is a sample context for the course.',
        file: null, // No file uploaded in this case
      });
    });

    // Clean up mock
    handleSubmit.mockRestore();
  });
});
