import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCountry } from '../components/shared/CountryContext';
import { CheckCircle, XCircle, AlertCircle, RefreshCw, ExternalLink } from 'lucide-react';

const EligibilityPage = () => {
  const { country } = useCountry();
  const [step, setStep] = useState(0);
  
  const [answers, setAnswers] = useState({
    age: '',
    citizenship: '',
    residency: '',
    criminal: ''
  });

  const handleAnswer = (key, value) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
    if (step < questions.length - 1) {
      setStep(prev => prev + 1);
    } else {
      setStep(questions.length); // Show result
    }
  };

  const resetForm = () => {
    setAnswers({ age: '', citizenship: '', residency: '', criminal: '' });
    setStep(0);
  };

  const questions = [
    {
      key: 'age',
      q: "Are you 18 years of age or older on or before Election Day?",
      options: [
        { label: 'Yes, 18 or older', value: 'yes' },
        { label: 'No, under 18', value: 'no' }
      ]
    },
    {
      key: 'citizenship',
      q: `Are you a citizen of ${country === 'US' ? 'the United States' : country === 'UK' ? 'the UK, Ireland, or a qualifying Commonwealth country' : country === 'IN' ? 'India' : 'an EU Member State'}?`,
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    {
      key: 'residency',
      q: "Have you met the residency requirements for your local given jurisdiction?",
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No / Not Sure', value: 'no' }
      ]
    },
    {
      key: 'criminal',
      q: "Are you currently serving a prison sentence for a felony/serious conviction?",
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    }
  ];

  const getResult = () => {
    if (answers.age === 'no' || answers.citizenship === 'no') {
      return {
        status: 'ineligible',
        title: 'You are NOT currently eligible.',
        desc: 'Based on your age or citizenship status, you do not meet the core federal/national requirements to cast a ballot in this region. If you are underage, you may be able to register early depending on your state/region.',
        color: 'text-red',
        bg: 'bg-red/10',
        border: 'border-red',
        icon: <XCircle size={48} className="text-red" />
      };
    }
    
    if (answers.criminal === 'yes') {
      return {
        status: 'maybe',
        title: 'You MAY be eligible — Please check local laws.',
        desc: 'Voting rights for individuals with felony convictions vary wildly by state or specific region. Some places revoke rights permanently, while others restore them automatically upon release.',
        color: 'text-gold',
        bg: 'bg-gold/10',
        border: 'border-gold',
        icon: <AlertCircle size={48} className="text-gold" />
      };
    }

    if (answers.residency === 'no') {
      return {
        status: 'maybe',
        title: 'Check your local residency rules.',
        desc: 'You meet the primary criteria, but you must establish residency in the area you wish to vote. This often requires living there for 30+ days prior to the election.',
        color: 'text-gold',
        bg: 'bg-gold/10',
        border: 'border-gold',
        icon: <AlertCircle size={48} className="text-gold" />
      };
    }

    return {
      status: 'eligible',
      title: 'You ARE eligible to vote!',
      desc: 'Based on your answers, you meet the standard criteria. Your next step is to ensure you are officially registered before the deadline.',
      color: 'text-green-700',
      bg: 'bg-green-50',
      border: 'border-green-600',
      icon: <CheckCircle size={48} className="text-green-600" />
    };
  };

  const currentQuestion = questions[step];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-background min-h-[calc(100vh-100px)] py-12 px-4"
    >
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-black text-navy-900 mb-4 tracking-tight">
            Eligibility <span className="text-red italic">Checker</span>
          </h1>
          <p className="text-navy-600 font-sans">
            A quick questionnaire to see if you meet the baseline requirements for {country}.
          </p>
        </div>

        <div className="bg-white border-t-4 border-navy-900 shadow-editorial relative overflow-hidden">
          
          <div className="absolute top-0 left-0 h-1 bg-red transition-all duration-500 ease-in-out" style={{ width: `${(step / questions.length) * 100}%` }}></div>

          <div className="p-8 md:p-12 min-h-[350px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {step < questions.length ? (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-sm font-bold text-navy-400 uppercase tracking-widest mb-4 border-b border-navy-100 pb-2">
                    Step {step + 1} of {questions.length}
                  </p>
                  <h2 className="text-2xl font-serif font-bold text-navy-900 mb-8 leading-relaxed">
                    {currentQuestion.q}
                  </h2>

                  <div className="space-y-4">
                    {currentQuestion.options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleAnswer(currentQuestion.key, opt.value)}
                        className="w-full text-left p-4 border-2 border-navy-100 hover:border-navy-900 hover:bg-ivory-dark transition-colors font-sans text-navy-800 font-medium text-lg flex justify-between items-center group"
                      >
                        {opt.label}
                        <div className="w-5 h-5 rounded-full border-2 border-navy-300 group-hover:border-navy-900"></div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`border-2 ${getResult().border} ${getResult().bg} p-8 text-center`}
                >
                  <div className="flex justify-center mb-6">
                    {getResult().icon}
                  </div>
                  <h2 className={`text-3xl font-serif font-bold mb-4 ${getResult().color}`}>
                    {getResult().title}
                  </h2>
                  <p className="text-navy-800 font-sans mb-8 leading-relaxed">
                    {getResult().desc}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a 
                      href="https://vote.gov" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn-primary flex items-center justify-center gap-2"
                    >
                      Official Registry Portal <ExternalLink size={16} />
                    </a>
                    <button onClick={resetForm} className="btn-secondary flex items-center justify-center gap-2">
                      <RefreshCw size={16} /> Start Over
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-8 text-center bg-ivory-dark p-4 text-xs font-sans text-navy-500 border border-navy-200">
          <strong>Disclaimer:</strong> This tool provides educational guidance based on general national rules. It is NOT legal advice. Always check with your local election office for your specific status.
        </div>
      </div>
    </motion.div>
  );
};

export default EligibilityPage;
