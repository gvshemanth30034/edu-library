import React, { useEffect, useState } from 'react';
import { forgotPasswordWithBackend, resetPasswordWithBackend } from '../services/authApi.js';

/**
 * Recovery Modal
 * - Step guide UI
 * - Email input
 * - Submit and close actions
 */
export const RecoveryModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [generatedToken, setGeneratedToken] = useState('');
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClose = () => {
    setEmail('');
    setResetToken('');
    setNewPassword('');
    setConfirmPassword('');
    setGeneratedToken('');
    setStep(1);
    setError('');
    setSuccess('');
    setIsSubmitting(false);
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      setEmail('');
      setResetToken('');
      setNewPassword('');
      setConfirmPassword('');
      setGeneratedToken('');
      setStep(1);
      setError('');
      setSuccess('');
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (step === 1) {
      if (!email.trim()) {
        setError('Registered email is required');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setError('Please enter a valid email');
        return;
      }

      setIsSubmitting(true);
      try {
        const result = await forgotPasswordWithBackend(email);
        setGeneratedToken(result?.resetToken || '');
        setSuccess(result?.message || 'Recovery token generated.');
        setStep(2);
      } catch (apiError) {
        setError(apiError?.message || 'Unable to process recovery request.');
      }
      setIsSubmitting(false);
      return;
    }

    if (!resetToken.trim()) {
      setError('Reset token is required');
      return;
    }
    if (!newPassword.trim() || newPassword.length < 6) {
      setError('New password must be at least 6 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await resetPasswordWithBackend({
        email,
        resetToken,
        newPassword,
      });
      setSuccess(result?.message || 'Password reset successful.');
      setStep(3);
    } catch (apiError) {
      setError(apiError?.message || 'Unable to reset password.');
    }
    setIsSubmitting(false);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content recovery-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="heading-entrance heading-premium">
            <span className="header-icon">👤🕒</span> Account Recovery
          </h3>
          <button className="close-btn" onClick={handleClose} type="button">
            &times;
          </button>
        </div>

        <div className="modal-body">
          <div className="steps-container">
            <div className="step-item">
              <div className={`step-circle ${step === 1 ? 'bounce' : ''} ${step > 1 ? '' : ''}`}>1</div>
              <p>Enter Registered email</p>
            </div>
            <div className="step-item">
              <div className={`step-circle ${step >= 2 ? '' : 'step-inactive'} ${step === 2 ? 'bounce' : ''}`}>2</div>
              <p>Enter token & new password</p>
            </div>
            <div className="step-item">
              <div className={`step-circle ${step === 3 ? '' : 'step-inactive'}`}>3</div>
              <p>Done</p>
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
                disabled={step !== 1}
              />
            </div>

            {step >= 2 && (
              <>
                {generatedToken && (
                  <div className="register-message register-message--success">
                    Demo reset token: <strong>{generatedToken}</strong>
                  </div>
                )}

                <div className="form-row">
                  <label>
                    🔑 Reset Token <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Paste reset token"
                    className="recovery-input"
                    value={resetToken}
                    onChange={(e) => setResetToken(e.target.value)}
                    disabled={step === 3}
                  />
                </div>

                <div className="form-row">
                  <label>
                    🔒 New Password <span className="required">*</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Enter new password"
                    className="recovery-input"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    disabled={step === 3}
                  />
                </div>

                <div className="form-row">
                  <label>
                    🔒 Confirm Password <span className="required">*</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    className="recovery-input"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={step === 3}
                  />
                </div>
              </>
            )}

            <div className="modal-footer recovery-footer">
              <button className="btn btn-green" type="submit" disabled={isSubmitting || step === 3}>
                {isSubmitting ? '⏳ Submitting...' : step === 1 ? '✔ Generate Token' : '✔ Reset Password'}
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
