import React, { useEffect, useState } from 'react';

/**
 * Recovery Modal
 * - Step guide UI
 * - Email input
 * - Submit and close actions
 */
export const RecoveryModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClose = () => {
    setEmail('');
    setError('');
    setSuccess('');
    setIsSubmitting(false);
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      setEmail('');
      setError('');
      setSuccess('');
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email.trim()) {
      setError('Registered email is required');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess('Recovery link sent to your email.');
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content recovery-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>
            <span className="header-icon">👤🕒</span> Account Recovery
          </h3>
          <button className="close-btn" onClick={handleClose} type="button">
            &times;
          </button>
        </div>

        <div className="modal-body">
          <div className="steps-container">
            <div className="step-item">
              <div className="step-circle bounce">1</div>
              <p>Enter Registered email</p>
            </div>
            <div className="step-item">
              <div className="step-circle step-inactive">2</div>
              <p>Get Recovery Link</p>
            </div>
            <div className="step-item">
              <div className="step-circle step-inactive">3</div>
              <p>Set new Password</p>
            </div>
          </div>

          <hr className="divider" />

          <form className="recovery-form" onSubmit={handleSubmit}>
            {error && <div className="register-message register-message--error">{error}</div>}
            {success && <div className="register-message register-message--success">{success}</div>}

            <div className="form-row">
              <label>
                ✉ Registered Email <span className="required">*</span>
              </label>
              <input
                type="email"
                placeholder="Enter your registered email here"
                className="recovery-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="modal-footer recovery-footer">
              <button className="btn btn-green" type="submit" disabled={isSubmitting}>
                {isSubmitting ? '⏳ Submitting...' : '✔ Submit'}
              </button>
              <button className="btn btn-close" type="button" onClick={handleClose}>
                ✖ Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
