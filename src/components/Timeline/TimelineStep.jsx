import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

const TimelineStep = ({ step, index, onClick }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 0.6, delay: 0.1 }}
      onClick={() => onClick(step)}
      className={`relative w-full flex flex-col md:flex-row items-center justify-between min-h-[40vh] py-12 cursor-pointer group ${isEven ? 'md:flex-row-reverse' : ''}`}
    >
      <div className="hidden md:block w-5/12"></div>

      <div className="absolute top-1/2 left-[24px] md:left-1/2 transform -translate-y-1/2 md:-translate-x-1/2 flex items-center justify-center w-8 h-8 z-10">
        <div className="w-4 h-4 bg-navy-900 rounded-full ring-4 ring-ivory shadow-md group-hover:bg-red group-hover:scale-150 transition-all duration-300"></div>
      </div>

      <div className="w-full pl-[64px] md:pl-0 md:w-5/12">
        <div className={`flex flex-col h-full bg-white p-8 md:p-12 border-navy-900 shadow-card hover:shadow-editorial hover:-translate-y-2 transition-all duration-300 relative
          ${isEven ? 'border-l-8 md:border-l-0 md:border-r-8' : 'border-l-8'}`}
        >
          <div className="flex justify-between items-start mb-6 gap-4 border-b-2 border-navy-100 pb-4">
            <span className="font-serif font-black text-5xl md:text-6xl text-navy-200 group-hover:text-red transition-colors leading-none">
              {(index + 1).toString().padStart(2, '0')}
            </span>
            <span className={`px-3 py-1.5 text-xs uppercase font-bold tracking-widest text-white whitespace-nowrap shadow-sm
              ${step.phase === 'Pre-Election' ? 'bg-gold' : step.phase === 'Election Day' ? 'bg-red' : 'bg-navy-600'}`}>
              {step.phase}
            </span>
          </div>

          <h3 className="font-serif font-bold text-3xl md:text-4xl text-navy-900 mb-4 leading-tight">
            {step.title}
          </h3>

          <p className="text-lg font-sans text-navy-600 leading-relaxed mb-8">
            {step.description}
          </p>

          <div className="mt-auto flex items-center gap-2 text-sm font-bold text-red uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
            Deep Dive <Search size={16} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TimelineStep;
