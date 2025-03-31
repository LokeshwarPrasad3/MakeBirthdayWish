import React, { useState } from 'react';
import { useBirthday } from '../context/birthday/BirthdayContext';
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';


const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

const BirthdayForm = () => {
  const FrontendURL = `${window.location.origin}${location.pathname}${location.search}`;
  const { handleSetBirthdayBoyDetails } = useBirthday();
  const [formData, setFormData] = useState({
    name: '',
    photoId: '',
    birthDate: '',
  });
  const [generatedLink, setGeneratedLink] = useState('');

  // Initialize Cloudinary instance
  const cld = new Cloudinary({
    cloud: {
      cloudName: CLOUD_NAME,
      apiKey: import.meta.env.VITE_CLOUDINARY_API_KEY,
      apiSecret: import.meta.env.VITE_CLOUDINARY_API_SECRET, 
    },
  });

  const handleFileChange = async (e) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    const uploadData = new FormData();
    uploadData.append('file', file);
    uploadData.append('upload_preset', 'make-birthday');

    // Show toast while uploading
    const uploadToast = toast.loading('Uploading image...');

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: uploadData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        setFormData((prev) => ({ ...prev, photoId: data.secure_url }));
        toast.success('Image uploaded successfully!', { id: uploadToast });
      } else {
        toast.error(`Upload failed: ${data.error?.message || 'Unknown error'}`, {
          id: uploadToast,
        });
      }
    } catch (error) {
      console.error('Upload failed:', error);
      toast.error('Something went wrong!', { id: uploadToast });
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("photos gone", formData.photoId)
    handleSetBirthdayBoyDetails({
      name: formData.name,
      profilePicture: formData.photoId,
      birthdayDate: formData.birthDate,
    });

    const shortName = formData.name.toLowerCase().replace(/\s+/g, '-');
    setGeneratedLink(shortName);
  };

  // Transform the uploaded image
  const img = formData.photoId
    ? cld.image(formData.photoId).resize(auto().gravity(autoGravity()).width(500).height(500))
    : null;


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
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
              onChange={handleFileChange}
              required
            />
          </div>

          {/* {img && (
            <div className="uploaded-image-preview">
              <AdvancedImage cldImg={img} />
            </div>
          )} */}

          <div className="form-group">
            <label htmlFor="birthDate">Birth Date</label>
            <input
              type="date"
              id="birthDate"
              value={formData.birthDate}
              onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
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
            <Link to={`/${generatedLink}`} rel="noopener noreferrer">
              {FrontendURL}{generatedLink}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default BirthdayForm;
