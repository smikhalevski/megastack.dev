import React, { MouseEventHandler } from 'react';
import css from './ErrorPage.module.css';

export default function ErrorPage() {
  const handleGoBack: MouseEventHandler = event => {
    event.preventDefault();

    // Force-reload
    window.location.assign(window.location.origin);
  };

  return (
    <div className={css.ErrorPage}>
      <h3>{'Sorry, an error occurred'}</h3>

      <p>
        <a
          href={window.location.origin}
          onClick={handleGoBack}
        >
          {'← Go back to home page'}
        </a>
      </p>
    </div>
  );
}
