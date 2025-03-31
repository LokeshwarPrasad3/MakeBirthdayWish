import { createContext, useContext, useState } from 'react';

const BirthdayContext = createContext();

const BirthdayContextProvider = ({ children }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [birthdayDate, setBirthdayDate] = useState('');

  const handleSetBirthdayBoyDetails = ({
    name,
    email,
    profilePicture,
    birthdayDate,
  }) => {
    setName(name);
    setEmail(email);
    setProfilePicture(profilePicture);
    setBirthdayDate(birthdayDate);
  };

  return (
    <BirthdayContext.Provider
      value={{
        name,
        email,
        profilePicture,
        birthdayDate,
        handleSetBirthdayBoyDetails,
      }}
    >
      {children}
    </BirthdayContext.Provider>
  );
};

export const useBirthday = () => useContext(BirthdayContext);
export default BirthdayContextProvider;
