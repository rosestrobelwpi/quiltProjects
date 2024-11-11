import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

import React from "react";
import "./Button.css";

function Button({ text }) {
  return <button>{text}</button>;
}

export default Button;
