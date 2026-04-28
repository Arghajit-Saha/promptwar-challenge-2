import { motion } from 'framer-motion';
import { voterStories } from '../../data/voterStories';
import { Quote } from 'lucide-react';

const VoterStoriesList = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {voterStories.map((story, i) => (
        <motion.div
          key={story.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className={`bg-white border text-navy-800 p-6 shadow-card hover:shadow-lg transition-shadow relative ${
            i % 2 !== 0 ? 'md:mt-12' : '' // Staggered masonry effect
          } group`}
        >
          <Quote className="absolute top-4 right-4 text-navy-100 w-12 h-12 transform group-hover:scale-110 transition-transform" />
          
          <div className="relative z-10">
            <p className="font-serif italic text-lg leading-relaxed mb-6">
              "{story.story}"
            </p>
            
            <div className="border-t border-navy-100 pt-4 mt-auto">
              <h4 className="font-sans font-bold text-navy-900 uppercase tracking-widest text-sm">
                {story.name}
              </h4>
              <p className="text-xs text-navy-500 mt-1">
                {story.age} • {story.background}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default VoterStoriesList;
