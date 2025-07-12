import { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { useBirthday } from '../context/birthday/BirthdayContext';
import { getMonthName, musicsList } from '../utils/utilities';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // <-- add useNavigate
import { FaPlus } from 'react-icons/fa';

const BirthdayCelebration = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const intervalRef = useRef(null);
  const { name, profilePicture, message, birthdayDate, musicId } =
    useBirthday();

  // Redirect if any required data is missing
  useEffect(() => {
    if (!name || !profilePicture || !message || !birthdayDate || !musicId) {
      navigate('/');
    }
  }, [name, profilePicture, message, birthdayDate, musicId, navigate]);

  // music is music id so find that music from the list .url is need to paly
  const startMusic = () => {
    if (musicId) {
      // get music url from array musicList then .url
      const music = musicsList.find((m) => m.id === musicId);
      const audio = new Audio(music.url);
      audio.loop = true;
      audio.play().catch((error) => {
        console.error('Error playing music:', error);
      });
    } else {
      console.warn('No music selected for birthday celebration.');
    }
  };

  useEffect(() => {
    if (location.pathname === '/birthday') {
      triggerConfetti();
      startMusic();
    }

    // Cleanup: Clear confetti interval when leaving the route
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [location.pathname]);

  const triggerConfetti = () => {
    const defaults = {
      startVelocity: 45,
      spread: 360,
      ticks: 200,
      zIndex: 0,
      particleCount: 30,
      scalar: 1.2,
      shapes: ['star', 'circle', 'square'],
      colors: [
        '#ff0000',
        '#00ff00',
        '#0000ff',
        '#ffff00',
        '#ff00ff',
        '#00ffff',
      ],
    };

    const intervalId = setInterval(() => {
      confetti({
        ...defaults,
        origin: { x: Math.random() * 0.4 + 0.1, y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        origin: { x: Math.random() * 0.4 + 0.5, y: Math.random() - 0.2 },
      });
    }, 300);

    intervalRef.current = intervalId; // Store interval ID in ref
  };

  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 7000);

    return () => clearTimeout(timer); // Cleanup on unmount
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

          <h1 className="birthday-text font-bold">Happy Birthday!</h1>
          <h2 className="name-text font-bold">{name}</h2>
        </div>
        <div className="message-section">
          <p className="wish-text">{message}</p>
        </div>
      </div>
      {isVisible && (
        <Link to="/" className="close-btn create-new-button">
          <FaPlus className="icon-plus" /> Create New Wish
        </Link>
      )}
    </div>
  );
};

export default BirthdayCelebration;
