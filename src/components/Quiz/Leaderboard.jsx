import { Trophy } from 'lucide-react';

const Leaderboard = ({ leaderboard }) => {
  return (
    <div className="bg-navy-900 text-ivory p-6 shadow-md sticky top-24">
      <h3 className="font-serif font-bold text-xl flex items-center gap-2 mb-6 border-b border-navy-700 pb-4">
        <Trophy size={20} className="text-gold" /> Global Top 5
      </h3>
      
      <div className="space-y-4">
        {leaderboard.map((user, i) => (
          <div key={i} className="flex justify-between items-center bg-navy-800 p-3">
            <div className="flex items-center gap-3">
              <span className={`font-bold ${i===0?'text-gold' : i===1?'text-gray-300': i===2?'text-amber-700':'text-navy-400'}`}>
                #{i+1}
              </span>
              <span className="font-sans font-medium text-sm">{user.name}</span>
            </div>
            <div className="text-right">
              <div className="font-bold text-white leading-none">{user.score}</div>
              <div className="text-[10px] text-navy-300 mt-1">{user.time}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-navy-700 text-[10px] text-navy-400 text-center uppercase tracking-wider">
        Powered by Firebase Realtime DB
      </div>
    </div>
  );
};

export default Leaderboard;
