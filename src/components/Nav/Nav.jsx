import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const pages = [
  { path: '/timeline', label: 'Timeline' },
  { path: '/quiz', label: 'Quiz' },
  { path: '/eligibility', label: 'Check Eligibility' },
  { path: '/polling', label: 'Find Polling Place' },
  { path: '/glossary', label: 'Glossary' },
];

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const handleTranslate = () => {
    const translateEl = document.getElementById('google_translate_element');
    if (translateEl) {
      if (translateEl.style.display === 'none') {
        translateEl.style.display = 'block';
        translateEl.style.position = 'absolute';
        translateEl.style.top = '60px';
        translateEl.style.right = '20px';
        translateEl.style.zIndex = '9999';
      } else {
        translateEl.style.display = 'none';
      }
    }
  };

  return (
    <nav className="sticky top-0 z-40 bg-background border-b-2 border-navy-900 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
            <div className="w-8 h-8 bg-red flex items-center justify-center rounded-sm transform group-hover:rotate-12 transition-transform">
              <span className="text-ivory font-serif font-black text-xl">E</span>
            </div>
            <span className="font-serif font-bold text-2xl text-navy-900 uppercase tracking-widest">
              ElectED
            </span>
          </Link>

          <div className="hidden md:flex flex-1 justify-center space-x-6">
            {pages.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium font-sans uppercase tracking-wider relative py-2 transition-colors ${
                  location.pathname === item.path ? 'text-red' : 'text-navy-700 hover:text-navy-900'
                }`}
              >
                {item.label}
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-red"
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center">
            <button 
              onClick={handleTranslate}
              className="flex items-center gap-1 text-xs font-sans font-bold text-navy-700 hover:bg-ivory-dark py-1.5 px-3 rounded transition-colors"
            >
              <Globe size={14} /> Translate
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-navy-900 p-2 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-navy-200 bg-background overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1 sm:px-3 flex flex-col">
              {pages.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-4 text-base font-medium font-serif border-b border-navy-100 ${
                    location.pathname === item.path ? 'text-red' : 'text-navy-800'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <button 
                onClick={() => { handleTranslate(); setIsOpen(false); }}
                className="mt-4 flex items-center gap-2 text-sm font-sans font-bold text-navy-700 w-full px-3 py-3 rounded bg-ivory-dark"
              >
                <Globe size={16} /> Translate
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Nav;
