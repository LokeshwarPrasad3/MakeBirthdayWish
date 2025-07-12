import { createContext, useContext, useState } from 'react';

const BirthdayContext = createContext();

const BirthdayContextProvider = ({ children }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [message, setMessage] = useState('');
  const [birthdayDate, setBirthdayDate] = useState('');
  const [musicId, setMusicId] = useState('');

  const handleSetBirthdayBoyDetails = ({
    name,
    email,
    profilePicture,
    message,
    birthdayDate,
    musicId,
  }) => {
    // console.log("messages", message)
    setName(name);
    setEmail(email);
    setMessage(message);
    setProfilePicture(profilePicture);
    setBirthdayDate(birthdayDate);
    setMusicId(musicId);
  };

  return (
    <BirthdayContext.Provider
      value={{
        name,
        email,
        profilePicture,
        birthdayDate,
        message,
        musicId,
        handleSetBirthdayBoyDetails,
      }}
    >
      {children}
    </BirthdayContext.Provider>
  );
};

export const useBirthday = () => useContext(BirthdayContext);
export default BirthdayContextProvider;
