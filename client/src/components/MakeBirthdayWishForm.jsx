import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { makeBirthdayWish } from '../services/user.services';
import { Copy, Check, Music, RefreshCcw } from 'lucide-react';
import ShareModal from './Admin/ShareModal';
import { IoMdHeart } from 'react-icons/io';
import ChooseMusicsModal from './modal/ChooseMusicsModal';
import ModalPortal from './layouts/ModalPortal';
import '../styles/birthdayForm.css';
import { musicsList as musics } from '../utils/utilities';

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
      const selectedMusicId = selectedMusic ? selectedMusic.id : 'BS00';
      MakeBirthdayWishMutate({
        name: values.name,
        avatar: values.photoId,
        dob: values.birthDate,
        message: values.message,
        music: selectedMusicId,
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

  const [showModal, setShowModal] = useState(false);
  const [selectedMusic, setSelectedMusic] = useState(null);

  return (
    <div className="birthday-form-contents-container">
      <div className="birthday-form-container">
        <div className="birthday-form-wrapper">
          <div className="headings_">
            {photoId && (
              <div className="profile-image-container">
                <img src={photoId} alt="Profile" />
              </div>
            )}
            <p className="text-xl sm:text-3xl text-center font-bold mb-4 sm:mb-5 bg-gradient-to-r from-purple-300 via-pink-200 to-yellow-200 bg-clip-text text-transparent">
              Create Birthday Celebration
            </p>
          </div>
          <form className="birthday_form" onSubmit={handleSubmit}>
            <div className="form_group">
              <label className="form_label" htmlFor="name">
                Birthday Star's Name
              </label>
              <input
                type="text"
                id="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter name"
                className="bg-[#ffffff33] text-white rounded-lg p-2 outline-none border-none focus:border-white/50 focus:ring-1 focus:ring-white/50 transition-all duration-200"
              />
              {errors.name && touched.name && (
                <span className="formik_error_text">{errors.name}</span>
              )}
            </div>

            <div className="form_group">
              <label className="form_label">Message</label>
              <textarea
                id="message"
                value={values.message}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your message"
                className="bg-[#ffffff33] text-white rounded-lg p-2 outline-none border-none focus:border-white/50 focus:ring-1 focus:ring-white/50 transition-all duration-200"
              ></textarea>
              {errors.message && touched.message && (
                <span className="formik_error_text">{errors.message}</span>
              )}
            </div>

            <div className="form_group">
              <label htmlFor="photo" className="form_label">
                Upload Photo
              </label>

              <div className="relative w-full">
                <input
                  type="file"
                  id="photo"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-white file:mr-4 file:py-2 file:px-4
        file:rounded-none file:border-0
        file:text-sm file:font-semibold
        file:bg-gradient-to-r file:from-purple-500 file:to-pink-500 file:text-white
        
        bg-[#ffffff33] rounded-lg outline-none focus:ring-2 focus:ring-white/30 transition-all duration-200 cursor-pointer"
                />
              </div>

              {errors.photoId && touched.photoId && (
                <p clas className="formik_error_text">
                  {errors.photoId}
                </p>
              )}
            </div>

            <div className="form_group">
              <label className="form_label" htmlFor="photo">
                Add Music
              </label>
              <div className="music_selection_container bg-[#ffffff33] flex justify-between items-center p-2 rounded-xl">
                {selectedMusic ? (
                  <div className="flex items-center gap-2 text-white flex-1 min-w-0">
                    <div className="p-1.5 w-fit rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
                      <Music className="w-4 h-4 text-white" />
                    </div>
                    <span className="truncate flex-1 bg-gradient-to-r from-purple-200 to-pink-200 font-bold bg-clip-text text-transparent">
                      {selectedMusic.name}
                    </span>
                  </div>
                ) : (
                  <p
                    onClick={() => setShowModal(true)}
                    className="text-white cursor-pointer flex items-center gap-2 flex-1"
                  >
                    <span className="pl-2">Select Music 🎵</span>
                  </p>
                )}
                <button
                  onClick={() => setShowModal(true)}
                  className="hover:bg-gradient-to-bl bg-gradient-to-r from-purple-500 to-pink-500 flex-shrink-0 text-sm cursor-pointer text-white px-4 py-1 rounded-lg ml-2"
                >
                  Choose
                </button>
                <ModalPortal>
                  <ChooseMusicsModal
                    musics={musics}
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    onSet={(music) => setSelectedMusic(music)}
                  />
                </ModalPortal>
              </div>
            </div>

            <div className="form_group">
              <label className="form_label" htmlFor="birthDate">
                Birth Date
              </label>
              <input
                type="date"
                id="birthDate"
                value={values.birthDate}
                onChange={handleChange}
                onBlur={handleBlur}
                className="bg-[#ffffff33] w-full text-white rounded-lg p-2 outline-none border-none focus:border-white/50 focus:ring-1 focus:ring-white/50 transition-all duration-200"
              />
              {errors.birthDate && touched.birthDate && (
                <span className="formik_error_text">{errors.birthDate}</span>
              )}
            </div>

            {!generatedLink ? (
              <button
                disabled={isPending}
                type="submit"
                className="submit-btn bg-gradient-to-r mt-4 from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isPending ? 'Generating...' : 'Generate Birthday Page'}
              </button>
            ) : (
              <div className="container_button_generated">
                  <a href="" className="hover:bg-gradient-to-bl bg-gradient-to-r from-purple-500 to-pink-500 flex-shrink-0 text-sm cursor-pointer text-white px-5 py-1 rounded-lg ml-2">
                    <RefreshCcw className='inline h-4 w-4 mr-1.5' />
                  Refresh
                </a>
                <ShareModal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  shareLink={`${FrontendURL}${generatedLink}`}
                />
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
      <a
        target="_blank"
        href="https://github.com/LokeshwarPrasad3/"
        className="red-heart"
      >
        Made by Dev
        <IoMdHeart className="icon-heart" />
      </a>
    </div>
  );
};

export default MakeBirthdayWishForm;
