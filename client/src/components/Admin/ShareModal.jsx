import React, { useState } from 'react';
import {
  FaTimes,
  FaCopy,
  FaWhatsapp,
  FaInstagram,
  FaTwitter,
  FaCheck,
} from 'react-icons/fa';

const ShareModal = ({ shareLink }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <a
        className="submit-btn"
        onClick={() => setIsOpen(true)}
      >
        Share
      </a>
      {isOpen && (
        <div className="modal-overlay" onClick={handleOverlayClick}>
          <div className="modal-content">
            <button className="close-btn" onClick={() => setIsOpen(false)}>
              <FaTimes className="icon" />
            </button>

            <h3>Share Options</h3>
            <div className="link-container">
              <p className="link-text">{shareLink}</p>...
              <button
                className={`copy-btn ${copied ? 'copied' : ''}`}
                onClick={handleCopy}
              >
                {copied ? (
                  <FaCheck className="icon" />
                ) : (
                  <FaCopy className="icon" />
                )}
              </button>
            </div>

            <div className="share-options">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(shareLink)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="share-icon whatsapp"
              >
                <FaWhatsapp />
              </a>
              <a
                href={`https://www.instagram.com/?url=${encodeURIComponent(shareLink)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="share-icon instagram"
              >
                <FaInstagram />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareLink)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="share-icon twitter"
              >
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShareModal;
