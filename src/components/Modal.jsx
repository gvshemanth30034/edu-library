import React, { useEffect } from 'react';
import { X } from 'lucide-react';

/**
 * Reusable Modal Component
 * - Centered layout
 * - Blur background
 * - Keyboard ESC support
 * - Click outside to close
 * - Fade-in + scale animation
 */
export const Modal = ({ isOpen, onClose, children, title, width = '500px' }) => {
  // Handle ESC key press
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="modal-overlay"
      onClick={onClose}
    >
      <div 
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ width, maxWidth: '90vw' }}
      >
        {/* Close Button */}
        <button
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Modal Title */}
        {title && <h2 className="modal-title">{title}</h2>}

        {/* Modal Content */}
        {children}
      </div>
    </div>
  );
};
