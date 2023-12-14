import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CardModal = ({ isOpen, onClose, title, authorName, publishDate, description }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: '50%' }}
          animate={{ opacity: 1, y: '0%' }}
          exit={{ opacity: 0, y: '-50%' }}
          transition={{ duration: 0.3 }}
          className="modal-backdrop"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="modal-title">{title}</h2>
            <p className="modal-author-name">Author: {authorName}</p>
            <p className="modal-publish-date">Publish Date: {publishDate}</p>
            <p className="modal-description">{description}</p>
            <button className="modal-close-button" onClick={onClose}>
              x
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CardModal;
