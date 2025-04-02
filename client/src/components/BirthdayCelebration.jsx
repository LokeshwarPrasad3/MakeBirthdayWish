import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useBirthday } from '../context/birthday/BirthdayContext';
import { getMonthName } from '../utils/utilities';

const triggerConfetti = () => {
  const defaults = {
    startVelocity: 45,
    spread: 360,
    ticks: 200,
    zIndex: 0,
    particleCount: 30,
    scalar: 1.2,
    shapes: ['star', 'circle', 'square'],
    colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'],
  };

  setInterval(() => {
    confetti({
      ...defaults,
      origin: { x: Math.random() * 0.4 + 0.1, y: Math.random() - 0.2 },
    });
    confetti({
      ...defaults,
      origin: { x: Math.random() * 0.4 + 0.5, y: Math.random() - 0.2 },
    });
  }, 300);
};

const BirthdayCelebration = () => {
  const { name, profilePicture, message, birthdayDate } = useBirthday();

  useEffect(() => {
    triggerConfetti();
  }, []);

  return (
    <div className="birthday-content-container">
      <div className="birthday-content">
        <div className="profile-section">
          <div className="profile-image">
            <img src={profilePicture} alt="Birthday Person" />
          </div>
          <div className="birthday-date">
            {birthdayDate.split('-')[2]}{' '}
            {getMonthName(Number(birthdayDate.split('-')[1]))}{' '}
            <span className="heart">❤</span>
          </div>

          <h1 className="birthday-text">Happy Birthday!</h1>
          <h2 className="name-text">{name}</h2>
        </div>
        <div className="message-section">
          <p className="wish-text">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default BirthdayCelebration;
