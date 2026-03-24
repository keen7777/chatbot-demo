import dayjs from 'dayjs';
import RobotProfileImage from '../assets/robot.png';
// import UserProfileImage from '../assets/user.png'
import UserProfileImage from '../assets/profile-1.jpg';


import './ChatMessage.css';

export function ChatMessage({ message, sender, time }) {
  // prop = short for properties, shortcut
  // console.log(UserProfileImage);
  return (
    // use ternary Op to design different UI for user/robot
    <div className={
      sender === 'robot'
        ? 'chat-msg-user'
        : 'chat-msg-robot'
    }>
      {sender === 'robot' &&
        (<img src={RobotProfileImage} className="chat-msg-profile" />)
      }
      <div className="chat-msg-time-container">
        <div className="chat-msg-text">
          {message}
        </div>

        {time && (
          <div className='chat-msg-time'>
            {dayjs(time).format('h:mma')}
          </div>
        )}
      </div>
      {sender === 'user' &&
        (<img src={UserProfileImage} className="chat-msg-profile" />)
      }
    </div>
  );
}