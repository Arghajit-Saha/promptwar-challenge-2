import { useState } from 'react';
import { motion } from 'framer-motion';
import { glossaryTerms } from '../data/glossary';
import { Search, BookOpen, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const GlossaryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTerms = glossaryTerms.filter(item => 
    item.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.def.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => a.term.localeCompare(b.term));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-ivory min-h-screen pt-8 pb-20"
    >
      <div className="max-w-4xl mx-auto px-4">
        <header className="mb-12 border-b-2 border-navy-900 pb-8">
          <h1 className="text-5xl font-serif font-black text-navy-900 mb-4 tracking-tight flex items-center gap-4">
            <BookOpen className="text-red" size={48} />
            Election <span className="italic">Dictionary</span>
          </h1>
          <p className="text-xl font-sans text-navy-700 max-w-2xl">
            Political jargon, decoded. Search directly or browse alphabetically.
          </p>

          <div className="mt-8 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-navy-400" size={20} />
            <input 
              type="text" 
              placeholder="Search terms like 'Filibuster' or 'Manifesto'..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 text-lg font-sans border-2 border-navy-900 focus:outline-none focus:ring-0 focus:border-red transition-colors"
            />
          </div>
        </header>

        <div className="space-y-6">
          {filteredTerms.length > 0 ? (
            filteredTerms.map((item, idx) => (
              <motion.div 
                key={item.term}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white p-6 border-l-4 border-navy-900 shadow-sm hover:shadow-md transition-shadow group"
              >
                <h3 className="text-2xl font-serif font-bold text-navy-900 mb-2">
                  {item.term}
                </h3>
                <p className="text-navy-700 font-sans text-lg mb-4 leading-relaxed">
                  {item.def}
                </p>
                
                <div className="bg-ivory-dark p-3 text-sm font-sans italic text-navy-600 border-l-2 border-gold mb-4">
                  "{item.example}"
                </div>

                <div className="border-t border-navy-100 pt-3 mt-4 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider font-bold text-navy-400">Related to Phase:</span>
                  <Link 
                    to="/timeline" 
                    className="text-xs font-bold uppercase tracking-wider text-red flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity"
                  >
                    {item.stepRef} <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-20">
              <span className="text-6xl mb-4 block">🔍</span>
              <h3 className="text-2xl font-serif text-navy-800">No terms found.</h3>
              <p className="text-navy-500 font-sans mt-2">Try adjusting your search criteria.</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default GlossaryPage;
