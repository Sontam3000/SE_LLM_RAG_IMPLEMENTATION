import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; // Import userEvent
import Header from './Header';
import '@testing-library/jest-dom';

describe('Header Component', () => {
  it('renders department and course select fields correctly', () => {
    render(<Header />);

    // Check if the department and course select fields are rendered
    expect(screen.getByLabelText(/Department/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Course/i)).toBeInTheDocument();
  });

  it('updates department state on department selection change', async () => {
    render(<Header />);
    const user = userEvent.setup();
  
    const departmentSelect = screen.getByLabelText(/Department/i);
    await user.click(departmentSelect);
  
    const option = await screen.findByRole('option', { name: /Computer Science/i });
    await user.click(option);
  
    expect(screen.getByLabelText(/Department/i)).toHaveTextContent('Computer Science');
  });
  

  it('updates course state on course selection change', async () => {
    render(<Header />);
    const user = userEvent.setup();
  
    const courseSelect = screen.getByLabelText(/Course/i);
  
    // Open the select menu
    await user.click(courseSelect);
  
    // Click the menu item with value "101"
    const option = await screen.findByRole('option', { name: /Course 101/i });
    await user.click(option);
  
    // Assertion - check if the value is set
    expect(screen.getByLabelText(/Course/i)).toHaveTextContent('Course 101');
  });
  

  it('renders and clicks the Feedback button', () => {
    render(<Header />);

    // Check if the Feedback button is rendered
    const feedbackButton = screen.getByRole('button', { name: /Feedback/i });
    expect(feedbackButton).toBeInTheDocument();

    // Simulate clicking the Feedback button
    userEvent.click(feedbackButton);

    // Since the button doesn't have any effect, we just check its existence here
    expect(feedbackButton).toBeInTheDocument();
  });
});
