import Notifications from './Notifications';
import { getLatestNotification } from '../utils/utils';
import { render, screen, fireEvent } from '@testing-library/react';

// Déclaration de notificaionsList
const notificationsList = [
  {id: 1, type: 'default', value: 'New course available'},
  {id: 2, type: 'urgent', value: 'New resume available'},
  {id: 3, type: 'urgent', html: getLatestNotification()}
];

describe('Notifications component', () => {
  test("Vérification de la présence du message 'Here is the list of notifications'", () => {
    render(<Notifications displayDrawer={true}/>);
    const notifTitle = screen.getByText(/Here is the list of notifications/i);
    expect(notifTitle).toBeInTheDocument();
  });

  test('Vérification de la présence du bouton close', () => {
    render(<Notifications displayDrawer={true}/>);
    const closeButton = screen.getByRole('button');
    expect(closeButton).toBeInTheDocument();
  });

  test('Vérification de la présence des 3 li', () => {
    render(<Notifications notifications={notificationsList} displayDrawer={true} />);
    const liElements = screen.getAllByRole('listitem');
    expect(liElements).toHaveLength(3);
  });

  test('Vérification du texte des 3 li', () => {
    render(<Notifications notifications={notificationsList} displayDrawer={true} />);
    const liElements = screen.getAllByRole('listitem');
    expect(liElements[0]).toHaveTextContent(/New course available/i);
    expect(liElements[1]).toHaveTextContent(/New resume available/i);
    expect(liElements[2]).toHaveTextContent(/Urgent requirement - complete by EOD/i);
  });

  test("Vérification de l'eventHandler 'click' sur le bouton", () => {
    render(<Notifications displayDrawer={true}/>);
    const consoleSpy = jest.spyOn(console, 'log')
    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);
    expect(consoleSpy).toHaveBeenCalledWith('Close button has been clicked');
    consoleSpy.mockRestore();
  });

  test("Vérification que les éléments de notifications-item s'affichent quand displayDrawer est true et que notifications n'est pas vide", () => {
    render(<Notifications notifications={notificationsList} displayDrawer={true}/>);
    const notificationText = screen.getByText(/Your notifications/i);
    expect(notificationText).toBeInTheDocument();
    // Vérification des éléments qui doivent s'afficher
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText(/Here is the list of notifications/i)).toBeInTheDocument();
    const liElements = screen.getAllByRole('listitem');
    expect(liElements[0]).toHaveTextContent(/New course available/i);
    expect(liElements[1]).toHaveTextContent(/New resume available/i);
    expect(liElements[2]).toHaveTextContent(/Urgent requirement - complete by EOD/i);
  });

  test("Vérification de l'affichage du message 'No new notification for now' quand displayDrawer est true et que notifications est vide", () => {
    render(<Notifications displayDrawer={true}/>);
    const notificationText = screen.getByText(/Your notifications/i);
    expect(notificationText).toBeInTheDocument();
    // Vérification des éléments qui doivent s'afficher
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText(/Here is the list of notifications/i)).toBeInTheDocument();
    const noNotifMessage = screen.getByText(/No new notification for now/i);
    expect(noNotifMessage).toBeInTheDocument();
  });

  test("Vérification que les éléments de notifications-item ne s'affichent pas quand displayDrawer est false", () => {
    render(<Notifications displayDrawer={false}/>);
    const notificationText = screen.getByText(/Your notifications/i);
    expect(notificationText).toBeInTheDocument();
    // Vérification des éléments qui ne doivent pas s'afficher
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
    expect(screen.queryByText(/Here is the list of notifications/i)).not.toBeInTheDocument();
  });
});
