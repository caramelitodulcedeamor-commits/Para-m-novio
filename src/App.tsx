import { useState } from 'react';
import AccessGate from './components/AccessGate';
import MainPage from './components/MainPage';

export default function App() {
  const [unlocked, setUnlocked] = useState(false);

  const handleUnlock = () => {
    setUnlocked(true);
  };
  
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {unlocked ? (
        <MainPage />
      ) : (
        <AccessGate onUnlock={handleUnlock} />
      )}
    </div>
  );
}
