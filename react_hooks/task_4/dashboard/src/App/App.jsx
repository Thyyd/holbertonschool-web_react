import { memo, useState, useCallback } from 'react';
import Notifications from '../Notifications/Notifications.jsx';
import Header from '../Header/Header.jsx';
import LoginForm from '../Login/Login.jsx';
import CourseList from '../CourseList/CourseList.jsx';
import Footer from '../Footer/Footer.jsx';
import BodySection from '../BodySection/BodySection.jsx';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom.jsx'
import newContext from '../Context/context.js';
import { getLatestNotification } from '../utils/utils';

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

function App() {
  // Déclaration des différents states
  const [displayDrawer, setDisplayDrawer] = useState(true);
  const [user, setUser] = useState({ email: '', password: '', isLoggedIn: false });
  const [notifications, setNotifications] = useState(notificationsList);


  const handleDisplayDrawer = useCallback(() => {
    setDisplayDrawer(true);
  }, []);
  const handleHideDrawer = useCallback(() => {
    setDisplayDrawer(false);
  }, []);

  // Fonction logIn
  const logIn = useCallback((email, password) => {
    const user = { email, password, isLoggedIn: true };
    setUser(user);
  }, []);

  // Fonction logOut
  const logOut = useCallback(() => {
    const user = { email: '', password: '', isLoggedIn: false };
    setUser(user);
  }, []);

  // Fonction markNotificationAsRead
  const markNotificationAsRead = useCallback((id) => {
    console.log(`Notification ${id} has been marked as read`);
    setNotifications(notifications.filter(item => item.id !== id));
  }, [notifications]);

  // Déclaration de contextValue
  const contextValue = { user: user, logOut: logOut };

  return (
    <newContext.Provider value={ contextValue } >
      <div className='flex flex-col min-h-screen'>
        <div className="header flex md:justify-between flex-col-reverse md:flex-row md:items-center">
          <div className="header-wrapper grow">
            <Header />
          </div>
          <div className="root-notifications">
            <Notifications notifications={notifications}
              markNotificationAsRead={markNotificationAsRead}
              displayDrawer={displayDrawer}
              handleDisplayDrawer={handleDisplayDrawer}
              handleHideDrawer={handleHideDrawer} />
          </div>
        </div>
        {user.isLoggedIn ?
          <BodySectionWithMarginBottom title={'Course list'}>
            <CourseList courses={coursesList} />
          </BodySectionWithMarginBottom>:
          <BodySectionWithMarginBottom title={'Log in to continue'}>
            <LoginForm logIn={logIn} email={user.email} password={user.password} />
          </BodySectionWithMarginBottom>
        }
        <BodySection title={'News from the School'}>
          <p className='pl-4'>ipsum Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Similique, asperiores architecto blanditiis fuga doloribus sit illum aliquid ea distinctio
            minus accusantium, impedit quo voluptatibus ut magni dicta. Recusandae, quia dicta?</p>
        </BodySection>
        <Footer />
      </div>
    </newContext.Provider>
  )
}

export default App;
