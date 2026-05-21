import { Fragment } from 'react';
import './App.css';
import Notifications from '../Notifications/Notifications.jsx';
import Header from '../Header/Header.jsx';
import LoginForm from '../Login/Login.jsx';
import Footer from '../Footer/Footer.jsx';
import { getLatestNotification } from '../utils/utils';

function App() {
  const notificationsList = [
    {id: 1, type: 'default', value: 'New course available'},
    {id: 2, type: 'urgent', value: 'New resume available'},
    {id: 3, type: 'urgent', html: getLatestNotification()}
  ];
  return (
    <Fragment>
      <div className="root-notifications">
        <Notifications notifications={notificationsList}/>
      </div>
      <Header/>
      <LoginForm/>
      <Footer/>
    </Fragment>
  )
}

export default App
