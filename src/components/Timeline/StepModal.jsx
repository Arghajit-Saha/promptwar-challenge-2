import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Info, Scale, Clock } from 'lucide-react';

export const StepModal = ({ step, onClose }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; }
  }, []);

  if (!step) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex justify-center items-center p-4 bg-navy-900/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-ivory w-full max-w-2xl shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-navy-900 px-6 py-4 flex justify-between items-center text-ivory">
            <div className="flex items-center gap-3">
              <span className="font-serif font-bold text-2xl text-red">
                {(step.id || 0).toString().padStart(2, '0')}
              </span>
              <h2 className="font-serif text-xl tracking-wide">{step.title}</h2>
            </div>
            <button onClick={onClose} className="hover:text-red transition-colors text-ivory">
              <X size={24} />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto w-full">
            <div className="flex items-center gap-2 mb-6">
              <span className={`px-2 py-1 text-[10px] uppercase font-bold tracking-widest text-white rounded ${
                step.phase === 'Pre-Election' ? 'bg-gold' : 
                step.phase === 'Election Day' ? 'bg-red' : 'bg-navy-600'
              }`}>
                {step.phase}
              </span>
            </div>

            <div className="prose prose-navy max-w-none">
              <p className="text-xl font-sans text-navy-800 leading-relaxed mb-8 border-l-4 border-navy-900 pl-4 py-1">
                {step.description}
              </p>

              <div className="grid sm:grid-cols-2 gap-6 mt-8 border-t border-navy-200 pt-8">
                <div>
                  <h4 className="flex items-center gap-2 text-sm font-sans font-bold text-navy-500 uppercase tracking-wider mb-2">
                    <Clock size={16} /> Key Dates
                  </h4>
                  <p className="text-navy-900 font-medium">{step.dateDetails}</p>
                </div>

                <div>
                  <h4 className="flex items-center gap-2 text-sm font-sans font-bold text-navy-500 uppercase tracking-wider mb-2">
                    <Scale size={16} /> Legal Reference
                  </h4>
                  <p className="text-navy-900 font-medium">{step.law}</p>
                </div>
              </div>

              <div className="mt-8 bg-gold/10 p-5 border border-gold/30">
                <h4 className="flex items-center gap-2 text-sm font-serif font-bold text-navy-900 mb-2">
                  <Info size={16} className="text-gold" /> Did You Know?
                </h4>
                <p className="text-navy-800 italic">{step.didYouKnow}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
