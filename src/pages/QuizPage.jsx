import { useState } from 'react';
import { motion } from 'framer-motion';
import { Target } from 'lucide-react';
import { quizQuestions } from '../data/quizQuestions';
import { useCountry } from '../components/shared/CountryContext';
import Leaderboard from '../components/Quiz/Leaderboard';
import QuizEngine from '../components/Quiz/QuizEngine';

const QuizPage = () => {
  const { country } = useCountry();
  const rawQuestions = quizQuestions[country] || quizQuestions['US'];
  
  const [leaderboard] = useState([
    { name: "Alex V.", score: 100, time: "2:15" },
    { name: "CivicNerd99", score: 90, time: "1:45" },
    { name: "Priya R.", score: 90, time: "2:30" },
    { name: "DemocracyFan", score: 80, time: "1:50" },
    { name: "TromboneKing", score: 80, time: "3:00" },
  ]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-background min-h-[calc(100vh-100px)] py-12 px-4"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-black text-navy-900 mb-4 tracking-tight flex justify-center items-center gap-3">
            <Target className="text-red" size={36} /> Test Your <span className="italic">Civic IQ</span>
          </h1>
          <p className="text-navy-600 font-sans max-w-lg mx-auto">
            10 questions. 30 seconds each. Can you top the leaderboard?
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <QuizEngine country={country} questions={rawQuestions} />
          </div>

          <div className="md:col-span-1">
            <Leaderboard leaderboard={leaderboard} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default QuizPage;
