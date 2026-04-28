import { motion } from 'framer-motion';
import { ChevronRight, Globe, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCountry } from '../components/shared/CountryContext';
import VoterStoriesList from '../components/VoterStories/VoterStoriesList';

const Home = () => {
  const { country, setCountry } = useCountry();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-20"
    >
      <section className="relative px-4 pt-16 pb-24 md:pt-24 md:pb-32 max-w-7xl mx-auto overflow-hidden">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          <div className="z-10">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-ivory-dark border border-navy-200 uppercase tracking-widest text-xs font-bold text-navy-600 mb-6"
            >
              <Globe size={14} /> 
              Select Region: 
              <select 
                value={country} 
                onChange={(e) => setCountry(e.target.value)}
                className="bg-transparent border-none outline-none text-red cursor-pointer"
              >
                <option value="US">United States</option>
                <option value="UK">United Kingdom</option>
                <option value="IN">India</option>
                <option value="EU">European Union</option>
              </select>
            </motion.div>
            
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl font-serif font-black leading-tight text-navy-900 mb-6"
            >
              Democracy doesn't happen by <span className="italic text-red">accident.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-navy-700 font-sans mb-10 max-w-lg leading-relaxed"
            >
              Learn how your election process works. Step by step, rule by rule, clear and simple.
            </motion.p>
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/timeline" className="btn-primary flex items-center gap-2 group">
                Explore the Timeline 
                <ChevronRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/quiz" className="btn-secondary">
                Test Your Civic IQ
              </Link>
            </motion.div>
          </div>

          <div className="relative h-96 flex justify-center items-center">
            <motion.div
              initial={{ y: -100, rotate: -5, opacity: 0 }}
              animate={{ y: 0, rotate: 0, opacity: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: 0.6 
              }}
              className="absolute z-10 w-48 h-64 bg-ivory shadow-card border-x border-t border-navy-200 transform -translate-y-12 rotate-[-5deg]"
            >
              {/* Ballot Details */}
              <div className="p-4 border-b-2 border-navy-900 mb-4">
                <div className="h-4 w-20 bg-navy-900 mb-2"></div>
                <div className="h-2 w-32 bg-navy-300"></div>
              </div>
              <div className="px-4 space-y-4">
                {[1,2,3].map(i => (
                  <div key={i} className="flex gap-3 items-center">
                    <div className="w-5 h-5 border-2 border-navy-900 rounded-sm"></div>
                    <div className="h-3 flex-1 bg-navy-200"></div>
                  </div>
                ))}
              </div>
              
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.2, type: 'spring' }}
                className="absolute top-20 right-6 text-red"
              >
                <CheckCircle size={40} className="fill-white" />
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="absolute bottom-0 w-64 h-40 bg-navy-800 shadow-editorial z-0 border-t-8 border-navy-900 flex justify-center"
            >
              <div className="w-32 h-3 bg-navy-900 mt-6 shadow-inner"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 opacity-20 border-2 border-white p-2 text-white font-serif tracking-widest text-xl">
                BALLOT
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-ivory border-y-2 border-navy-900 py-16">
        <div className="max-w-5xl mx-auto px-4 editorial-columns">
          <p className="text-lg font-sans text-navy-800 mb-6 drop-cap">
            <span className="float-left text-6xl font-serif text-red font-black leading-none pr-3 pb-2 mt-1">E</span>
            lections are the bedrock of any functioning democracy. Yet, the mechanics of how we vote, how those votes are counted, and the journey from a candidate's registration to their final victory often remains shrouded in bureaucratic mystery.
          </p>
          <p className="text-lg font-sans text-navy-800 mb-6">
            ElectED was built to demystify this process. Whether you are a first-time voter trying to understand eligibility, or a seasoned citizen wanting to test your knowledge, we provide clear, sourced, and educational insights into the civic timeline.
          </p>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-navy-900 mb-4 tracking-tight">Real Voices</h2>
          <div className="w-24 h-1 bg-red md:mx-auto"></div>
          <p className="mt-6 text-navy-600 max-w-2xl mx-auto">
            Democracy is shaped by the people who participate. Read fictionalized accounts based on real voter experiences from different backgrounds.
          </p>
        </div>
        
        <VoterStoriesList />
      </section>
    </motion.div>
  );
};

export default Home;
