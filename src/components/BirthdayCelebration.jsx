import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

const names = [
  "Lokeshwar Dewangan"
];

const imageUrls = [
  "https://i.ibb.co/zwtdD5C/photo-2025-03-31-16-55-17.jpg"
];

const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];

const triggerConfetti = () => {
  const defaults = {
    startVelocity: 45,
    spread: 360,
    ticks: 200,
    zIndex: 0,
    particleCount: 30,
    scalar: 1.2,
    shapes: ["star", "circle", "square"],
    colors: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"]
  };

  setInterval(() => {
    confetti({ ...defaults, origin: { x: Math.random() * 0.4 + 0.1, y: Math.random() - 0.2 } });
    confetti({ ...defaults, origin: { x: Math.random() * 0.4 + 0.5, y: Math.random() - 0.2 } });
  }, 300);
};

const BirthdayCelebration = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    setName(getRandomItem(names));
    setImage(getRandomItem(imageUrls));
    triggerConfetti();
  }, []);

  return (
    <div className="content">
      <div className="profile-section">
        <div className="profile-image">
          <img src={image} alt="Birthday Person" />
        </div>
        <h1 className="birthday-text">Happy Birthday!</h1>
        <h2 className="name-text">{name}</h2>
      </div>
      <div className="message-section">
        <p className="wish-text">Wishing you a day filled with joy and laughter!</p>
      </div>
    </div>
  );
};

export default BirthdayCelebration;
