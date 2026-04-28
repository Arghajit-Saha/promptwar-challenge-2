import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TimelineTrack from '../components/Timeline/TimelineTrack';
import { StepModal } from '../components/Timeline/StepModal';
import { useCountry } from '../components/shared/CountryContext';
import { timelineData } from '../data/timeline';

const TimelinePage = () => {
  const [selectedStep, setSelectedStep] = useState(null);
  const { country } = useCountry();
  const data = timelineData[country] || timelineData['US'];

  // Calculate viewed steps (mock progress based on selection)
  const [viewedSteps, setViewedSteps] = useState(new Set());

  const handleStepClick = (step) => {
    setSelectedStep(step);
    setViewedSteps(prev => new Set(prev).add(step.id));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-ivory min-h-screen pt-8 pb-20"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <header className="mb-12 border-b-2 border-navy-900 pb-8 flex flex-col md:flex-row md:justify-between md:items-end">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-serif font-black text-navy-900 mb-4 tracking-tight">
              The Election <span className="text-red italic">Timeline</span>
            </h1>
            <p className="text-xl font-sans text-navy-700">
              Scroll horizontally to follow the journey from the first registration to the final inauguration.
            </p>
          </div>
          <div className="mt-6 md:mt-0 text-right">
            <div className="inline-block bg-white border border-navy-200 px-4 py-2 font-sans font-bold text-sm text-navy-800 shadow-sm">
              <span className="text-red text-lg">{viewedSteps.size}</span> / {data.length} Steps Explored
            </div>
          </div>
        </header>

        {/* Legend */}
        <div className="flex gap-6 mb-8 text-xs font-bold uppercase tracking-wider text-navy-600">
          <div className="flex items-center gap-2"><span className="w-3 h-3 bg-gold rounded-full"></span> Pre-Election</div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 bg-red rounded-full"></span> Election Day</div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 bg-navy-600 rounded-full"></span> Post-Election</div>
        </div>

        <TimelineTrack onStepClick={handleStepClick} />

      </div>

      {selectedStep && (
        <StepModal step={selectedStep} onClose={() => setSelectedStep(null)} />
      )}
    </motion.div>
  );
};

export default TimelinePage;
