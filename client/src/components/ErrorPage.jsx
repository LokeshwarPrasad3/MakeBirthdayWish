import React from 'react';
import '../styles/errorPage.css';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="error_page_container !h-[100dvh]">
      <h1>🎂 Birthday not found. The link might be broken. 🔗❌</h1>
      <section className="error-container">
        <span className="four">
          <span className="screen-reader-text">4</span>
        </span>
        <span className="zero">
          <span className="screen-reader-text">0</span>
        </span>
        <span className="four">
          <span className="screen-reader-text">4</span>
        </span>
      </section>
      <div class="link-containerr">
        <Link to="/" class="more-link">
          Go To HOME
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
