import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { makeBirthdayWish } from '../services/user.services';
import { Copy, Check } from 'lucide-react';
import ShareModal from './Admin/ShareModal';

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

const MakeBirthdayWishForm = () => {
  const FrontendURL = `${window.location.origin}${location.pathname}${location.search}`;
  const [photoId, setPhotoId] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { mutate: MakeBirthdayWishMutate, isPending } = useMutation({
    mutationFn: makeBirthdayWish,
    onSuccess: (data) => {
      // console.log(data);
      const generatedBirthdayId = data.data.data.birthdayId;
      setGeneratedLink(generatedBirthdayId);
      toast.success('Birthday saved successfully!');
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleFileChange = async (e) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    const uploadData = new FormData();
    uploadData.append('file', file);
    uploadData.append('upload_preset', 'make-birthday');

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
        setPhotoId(data.secure_url); // Keeping this if needed elsewhere
        setFieldValue('photoId', data.secure_url); // ✅ Updating Formik’s state
        toast.success('Image uploaded successfully!', { id: uploadToast });
      } else {
        toast.error(
          `Upload failed: ${data.error?.message || 'Unknown error'}`,
          {
            id: uploadToast,
          }
        );
      }
    } catch (error) {
      console.error('Upload failed:', error);
      toast.error('Something went wrong!', { id: uploadToast });
    }
  };

  // Define validation schema with Yup
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    photoId: Yup.string().required('Photo ID is required'),
    birthDate: Yup.date().required('Birthdate is required').nullable(),
    message: Yup.string().required('Message is required'),
  });

  // Formik setup
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleSubmit,
    handleChange,
    setFieldValue,
  } = useFormik({
    initialValues: {
      name: '',
      birthDate: '',
      photoId: '',
      message:
        'May this year bring you endless joy and everything your heart desires.🎉🥳🎂✨',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // console.log(values);
      MakeBirthdayWishMutate({
        name: values.name,
        avatar: values.photoId,
        dob: values.birthDate,
        message: values.message,
      });
    },
  });

  const handleCopy = () => {
    const fullLink = `${FrontendURL}${generatedLink}`;
    navigator.clipboard.writeText(fullLink);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="birthday-form-contents-container">
      <div className="birthday-form-container">
        <div className="birthday-form-wrapper">
          <h2>Create Birthday Celebration</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Birthday Star's Name</label>
              <input
                type="text"
                id="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter name"
              />
              {errors.name && touched.name && (
                <span className="form-error-text">{errors.name}</span>
              )}
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea
                id="message"
                value={values.message}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your message"
              ></textarea>
              {errors.message && touched.message && (
                <span className="form-error-text">{errors.message}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="photo">Upload Photo</label>
              <input
                type="file"
                id="photo"
                accept="image/*"
                onChange={(e) => handleFileChange(e)}
              />
              {errors.photoId && touched.photoId && (
                <span className="form-error-text">{errors.photoId}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="birthDate">Birth Date</label>
              <input
                type="date"
                id="birthDate"
                value={values.birthDate}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.birthDate && touched.birthDate && (
                <span className="form-error-text">{errors.birthDate}</span>
              )}
            </div>

            {!generatedLink ? (
              <button type="submit" className="submit-btn">
                {isPending ? 'Generating...' : 'Generate Birthday Page'}
              </button>
            ) : (
              <div className="container_button_generated">
                <a href="" className="submit-btn">
                  Refresh
                </a>
                <ShareModal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  shareLink={`${FrontendURL}${generatedLink}`}
                />
              </div>
            )}

            {photoId && (
              <div className="profile-image-container">
                <img src={photoId} alt="Profile" />
              </div>
            )}
          </form>

          {generatedLink && (
            <div className="generated-link">
              <p>Your celebration page is ready at:</p>
              <Link to={`/${generatedLink}`} rel="noopener noreferrer">
                {FrontendURL}
                {generatedLink}
              </Link>

              <button
                onClick={handleCopy}
                className={`copy-btn ${copied ? 'copied' : ''}`}
              >
                {copied ? (
                  <Check className="icon copied-icon" />
                ) : (
                  <Copy className="icon" />
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MakeBirthdayWishForm;
