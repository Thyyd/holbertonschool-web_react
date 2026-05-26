import CloseButton from '../assets/close-button.png';
import NotificationItem from './NotificationItem';
import './Notifications.css';

function Notifications({ notifications=[], displayDrawer=true }) {
  const handleClick = () => console.log('Close button has been clicked');
  return (
    <div className='Notification-Component'>
      <div className="notification-title">
        <p>Your notifications</p>
      </div>
      {displayDrawer && <div className="notification-items">
        <p>Here is the list of notifications</p>
        <button aria-label='Close' style={{
          width: '1.75rem',
          height: '1rem',
          marginTop: '0.25rem',
          marginLeft: 'auto',
          background: 'none',
          border: 'none',
          cursor: 'pointer'
        }}
        onClick={handleClick}>
          <img src={CloseButton} />
        </button>
        <ul>
          {notifications.length===0 ? 'No new notification for now' :
            notifications.map((notification) => (
            <NotificationItem key={notification.id} type={notification.type} value={notification.value} html={notification.html} />
          ))}
        </ul>
      </div>}
    </div>
  )
}

export default Notifications;
