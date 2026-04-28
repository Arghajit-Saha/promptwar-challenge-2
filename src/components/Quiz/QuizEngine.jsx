import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Trophy, Clock } from 'lucide-react';

const QuizEngine = ({ country, questions }) => {
  const [gameState, setGameState] = useState('start'); 
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (gameState === 'playing') {
      const q = questions[currentQ];
      setOptions([...q.options].sort(() => Math.random() - 0.5));
      setTimeLeft(30);
      setSelectedAnswer(null);
    }
  }, [currentQ, gameState, questions]);

  useEffect(() => {
    let timer;
    if (gameState === 'playing' && timeLeft > 0 && !selectedAnswer) {
      timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0 && !selectedAnswer) {
      handleAnswer(''); 
    }
    return () => clearInterval(timer);
  }, [timeLeft, gameState, selectedAnswer]);

  const handleAnswer = (answer) => {
    if (selectedAnswer) return;
    setSelectedAnswer(answer);
    
    const isCorrect = answer === questions[currentQ].answer;
    
    if (isCorrect) {
      setScore(s => s + 10);
      setStreak(s => s + 1);
    } else {
      setStreak(0);
    }

    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        setCurrentQ(q => q + 1);
      } else {
        finishQuiz();
      }
    }, 2500); 
  };

  const finishQuiz = () => {
    setGameState('result');
    if (score === questions.length * 10 || score > 80) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#1E3A6E', '#C0392B', '#C8A84B', '#FFFFFF']
      });
    }
  };

  const startQuiz = () => {
    setGameState('playing');
    setCurrentQ(0);
    setScore(0);
    setStreak(0);
  };

  return (
    <AnimatePresence mode="wait">
      {gameState === 'start' && (
        <motion.div
          key="start"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white p-12 text-center border-t-4 border-navy-900 shadow-editorial"
        >
          <Trophy size={64} className="text-gold mx-auto mb-6" />
          <h2 className="text-3xl font-serif text-navy-900 font-bold mb-4">Ready to Prove It?</h2>
          <p className="text-navy-600 mb-8 font-sans">
            You'll be tested on {country} election history, laws, and processes. No looking up answers!
          </p>
          <button onClick={startQuiz} className="btn-primary text-xl px-12 py-4">
            Start Challenge
          </button>
        </motion.div>
      )}

      {gameState === 'playing' && (
        <motion.div
          key="playing"
          initial={{ rotateY: -90, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          exit={{ rotateY: 90, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white border text-navy-900 shadow-editorial relative p-6 md:p-8 perspective-1000"
        >
          <div className="flex justify-between items-center mb-6 border-b-2 border-navy-900 pb-4">
            <div className="text-sm font-bold uppercase tracking-widest text-navy-400">
              Question {currentQ + 1} of 10
            </div>
            <div className="flex items-center gap-4">
              {streak > 2 && (
                <motion.span 
                  initial={{ scale: 0 }} 
                  animate={{ scale: 1 }} 
                  className="text-red font-bold flex gap-1 items-center bg-red/10 px-2 py-1"
                >
                  🔥 {streak} Streak
                </motion.span>
              )}
              <div className={`flex items-center gap-2 font-bold ${timeLeft < 10 ? 'text-red animate-pulse' : 'text-navy-900'}`}>
                <Clock size={18} /> 00:{timeLeft.toString().padStart(2, '0')}
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-serif font-bold mb-8 leading-tight">
            {questions[currentQ].q}
          </h3>

          <div className="grid sm:grid-cols-2 gap-4">
            {options.map((opt, i) => {
              let btnClass = "border-2 border-navy-200 bg-white hover:border-navy-900 transition-colors";
              if (selectedAnswer) {
                if (opt === questions[currentQ].answer) {
                  btnClass = "border-green-600 bg-green-50 text-green-800";
                } else if (opt === selectedAnswer) {
                  btnClass = "border-red bg-red/10 text-red";
                } else {
                  btnClass = "border-gray-200 opacity-50";
                }
              }
              
              return (
                <button
                  key={i}
                  disabled={!!selectedAnswer}
                  onClick={() => handleAnswer(opt)}
                  className={`text-left p-4 font-sans font-medium hover:bg-ivory-dark ${btnClass}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {selectedAnswer && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-navy-100 border-l-4 border-navy-900"
            >
              <strong className="block text-navy-900 font-sans text-sm tracking-widest uppercase mb-1">
                {selectedAnswer === questions[currentQ].answer ? '✓ Correct' : '✗ Incorrect'}
              </strong>
              <p className="text-navy-700 italic font-serif text-lg">
                {questions[currentQ].explanation}
              </p>
            </motion.div>
          )}
        </motion.div>
      )}

      {gameState === 'result' && (
        <motion.div
          key="result"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-12 text-center border-t-4 border-navy-900 shadow-editorial"
        >
          <h2 className="text-4xl font-serif font-bold text-navy-900 mb-2">Quiz Complete</h2>
          
          <div className="text-8xl font-black text-red my-8 font-serif leading-none">
            {score}<span className="text-4xl text-navy-300">/100</span>
          </div>
          
          <p className="text-xl text-navy-600 mb-8 font-sans">
            {score === 100 ? "Flawless victory. A true civic scholar." : 
             score >= 70 ? "Great job! Your civic knowledge is solid." : 
             "Good effort. Read through the timeline and try again!"}
          </p>

          <div className="p-4 bg-ivory-dark border border-navy-300 border-dashed inline-block mb-8 text-left">
            <p className="font-bold text-xs uppercase tracking-widest text-navy-400 mb-2">Shareable Result</p>
            <p className="font-mono text-navy-900">
              I scored {score}/100 on the ElectED Civic Quiz! 🗳️<br/>
              Can you beat me? test-your-iq.elected.org
            </p>
          </div>

          <div>
            <button onClick={startQuiz} className="btn-primary w-full sm:w-auto">Play Again</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuizEngine;
