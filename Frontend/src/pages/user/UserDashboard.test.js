// src/pages/user/UserDashboard.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import UserDashboard from './UserDashboard';
import '@testing-library/jest-dom';

describe('UserDashboard Component', () => {
  beforeEach(() => {
    render(<UserDashboard />);
  });

  it('renders the header text', () => {
    expect(screen.getByText(/InfoBot Chat Interface/i)).toBeInTheDocument();
  });

  it('renders initial InfoBot and User messages', () => {
    expect(screen.getByText(/InfoBot: Hello! How can I assist you today?/i)).toBeInTheDocument();
    expect(screen.getByText(/User: Can you help me find my class schedule?/i)).toBeInTheDocument();
  });

  it('renders the text input field', () => {
    expect(screen.getByPlaceholderText(/Type your message/i)).toBeInTheDocument();
  });

  it('renders the send button', () => {
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });
  
});
