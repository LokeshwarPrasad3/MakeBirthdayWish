import React, { useState } from 'react';
import { useBirthday } from '../context/birthday/BirthdayContext';

const BirthdayForm = () => {
  const FrontendURL = import.meta.env.VITE_FRONTEND_URL;
  const { handleSetBirthdayBoyDetails } = useBirthday();
  const [formData, setFormData] = useState({
    name: '',
    photo: null,
    birthDate: '',
  });
  const [generatedLink, setGeneratedLink] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // set user details
    handleSetBirthdayBoyDetails({
      name: formData.name,
      profilePicture: formData.photo,
      birthdayDate: formData.birthDate,
    });
    const shortName = formData.name.toLowerCase().replace(/\s+/g, '-');
    setGeneratedLink(`${FrontendURL}/${shortName}`);
  };

  return (
    <div className="birthday-form-container">
      <div className="birthday-form-wrapper">
        <h2>Create Birthday Celebration</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Birthday Star's Name</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Enter name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="photo">Upload Photo</label>
            <input
              type="file"
              id="photo"
              accept="image/*"
              onChange={(e) =>
                setFormData({ ...formData, photo: URL.createObjectURL(e.target.files[0]) })
              }
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="birthDate">Birth Date</label>
            <input
              type="date"
              id="birthDate"
              value={formData.birthDate}
              onChange={(e) =>
                setFormData({ ...formData, birthDate: e.target.value })
              }
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Generate Birthday Page
          </button>
        </form>

        {generatedLink && (
          <div className="generated-link">
            <p>Your celebration page is ready at:</p>
            <a href={generatedLink} target="_blank" rel="noopener noreferrer">
              {generatedLink}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default BirthdayForm;
