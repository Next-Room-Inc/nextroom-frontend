import { XMarkIcon } from '@heroicons/react/20/solid';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

interface ModalOverlayProps {
  onClose: () => void;
  children: React.ReactNode;
}

export const ModalOverlay: React.FC<ModalOverlayProps> = ({ onClose, children }) => {
  return (
    <AnimatePresence>
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 bg-black z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed inset-0 flex items-center justify-center z-50"
      >
        <div
          className="bg-white w-full max-w-2xl rounded-2xl px-6 py-10 relative shadow-lg mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            aria-label="Close modal"
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
          >
            <XMarkIcon className="w-5 h-5 cursor-pointer" />
          </button>

          {/* Modal Content */}
          {children}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

 