import { render, screen } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  test('Vérification texte h1 App-header', () => {
    render(<App />);
    const headerh1 = screen.getByRole('heading', { level: 1, name: /School dashboard/i });
    expect(headerh1).toBeInTheDocument();
  });

  test('Vérification texte App-body', () => {
    render(<App />);
    const bodyp = screen.getByText(/Login to access the full dashboard/i);
    expect(bodyp).toBeInTheDocument();
  });

  test('Vérification texte App-footer', () => {
    render(<App />);
    const footerp = screen.getByText(/Copyright \d{4} - holberton School/i);
    expect(footerp).toBeInTheDocument();
  });

  test('Vérification alt image App-header', () => {
    render(<App />);
    const headerImgAlt = screen.getByAltText(/holberton logo/i);
    expect(headerImgAlt).toBeInTheDocument();
  });

  // Tests Composant Login
  test('Vérification de la présence du composant Login quand LoggedIn est false (Comportement par défaut)', () => {
    render(<App />);
    const loginText = screen.getByText(/login to access the full dashboard/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const formButton = screen.getByRole('button', { name: /OK/i });
    expect(loginText).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(formButton).toBeInTheDocument();
  });

  // Tests CourseList
  test('Vérification de la présence du composant CourseList quand isLoggedIn est true', () => {
    render(<App isLoggedIn={true} />);
    const tableElement = screen.getByRole('table');
    expect(tableElement).toBeInTheDocument();
  });
});
