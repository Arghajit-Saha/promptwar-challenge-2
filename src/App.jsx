import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Nav from './components/Nav/Nav';
import Home from './pages/Home';
import TimelinePage from './pages/TimelinePage';
import QuizPage from './pages/QuizPage';
import EligibilityPage from './pages/EligibilityPage';
import PollingPage from './pages/PollingPage';
import GlossaryPage from './pages/GlossaryPage';
import AskElectED from './components/AskElectED/ChatPanel';
import ProgressBar from './components/shared/ProgressBar';

function App() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      <ProgressBar />
      <Nav />
      {/* Banner */}
      <div className="bg-navy-900 text-ivory text-xs px-4 py-1.5 text-center font-medium opacity-90">
        Not official government advice. For educational purposes only.
      </div>
      
      <main className="flex-grow flex flex-col relative z-0">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/timeline" element={<TimelinePage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/eligibility" element={<EligibilityPage />} />
            <Route path="/polling" element={<PollingPage />} />
            <Route path="/glossary" element={<GlossaryPage />} />
          </Routes>
        </AnimatePresence>
      </main>

      <AskElectED />
    </div>
  );
}

export default App;
