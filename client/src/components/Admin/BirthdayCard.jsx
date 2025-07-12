import React from 'react';

const BirthdayCard = ({
  avatar,
  name,
  birthdayId,
  message,
  dob,
  createdAt,
}) => {
  return (
    <div className="birthday-card flex flex-col items-center justify-center">
      <img src={avatar} alt={name} className="avatar" />
      <h3 className="name">{name}</h3>
      <p className="birthday-id">ID: {birthdayId}</p>
      {message && <p className="message">"{message}"</p>}
      <p className="dob">
        🎂 DOB: <span>{dob}</span>
      </p>
      <p className="created-at">
        📅 Created:{' '}
        <span>{new Date(createdAt).toLocaleDateString('en-GB')} </span>⏰{' '}
        <span>
          {new Date(createdAt).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          })}
        </span>
      </p>
    </div>
  );
};

export default BirthdayCard;
