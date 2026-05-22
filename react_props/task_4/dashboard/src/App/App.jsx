import { Fragment } from 'react';
import './App.css';
import Notifications from '../Notifications/Notifications.jsx';
import Header from '../Header/Header.jsx';
import LoginForm from '../Login/Login.jsx';
import CourseList from '../CourseList/CourseList.jsx';
import Footer from '../Footer/Footer.jsx';
import { getLatestNotification } from '../utils/utils';

function App({ isLoggedIn = true }) {
  // Déclaration de notificationsList
  const notificationsList = [
    {id: 1, type: 'default', value: 'New course available'},
    {id: 2, type: 'urgent', value: 'New resume available'},
    {id: 3, type: 'urgent', html: getLatestNotification()}
  ];
  // Déclaration de coursesList
  const coursesList = [
    { id: 1, name: 'ES6', credit: '60'},
    { id: 2, name: 'Webpack', credit: '20'},
    { id: 3, name: 'React', credit: '40'}
  ];
  return (
    <Fragment>
      <div className="root-notifications">
        <Notifications notifications={notificationsList} />
      </div>
      <Header />
      {isLoggedIn ? <CourseList courses={coursesList} /> : <LoginForm />}
      <Footer />
    </Fragment>
  )
}

export default App
