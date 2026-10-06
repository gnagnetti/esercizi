import { useState, useEffect } from 'react';
import { Home } from './components/Home';
import { Quiz } from './components/Quiz';
import { Exercise, UserProgress } from './types';
import exercisesData from './exercises.json';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [progress, setProgress] = useState<UserProgress[]>([]);

  useEffect(() => {
    setExercises(exercisesData as Exercise[]);
    const saved = localStorage.getItem('user_progress');
    if (saved) {
      setProgress(JSON.parse(saved));
    } else {
      // Migrate old data if it exists
      const oldSaved = localStorage.getItem('completed_exercises');
      if (oldSaved) {
        const completedIds = JSON.parse(oldSaved) as number[];
        const migrated = completedIds.map(id => ({ exerciseId: id, accuracy: 100 }));
        setProgress(migrated);
        localStorage.setItem('user_progress', JSON.stringify(migrated));
      }
    }
  }, []);

  const handleSelectExercise = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = (accuracy?: number) => {
    if (accuracy !== undefined && selectedExercise) {
      const existingIndex = progress.findIndex(p => p.exerciseId === selectedExercise.id);
      let newProgress = [...progress];
      
      if (existingIndex > -1) {
        // Keep the best accuracy? Or just update to latest? 
        // User asked for "percentage of exercise done well", let's update to latest.
        newProgress[existingIndex] = { exerciseId: selectedExercise.id, accuracy };
      } else {
        newProgress.push({ exerciseId: selectedExercise.id, accuracy });
      }
      
      setProgress(newProgress);
      localStorage.setItem('user_progress', JSON.stringify(newProgress));
    }
    setSelectedExercise(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen pb-20 bg-brand-blue" id="main-app">
      <AnimatePresence mode="wait">
        {!selectedExercise ? (
          <motion.div
            key="home"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <Home 
              exercises={exercises} 
              onSelectExercise={handleSelectExercise} 
              progress={progress}
            />
          </motion.div>
        ) : (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Quiz exercise={selectedExercise} onBack={handleBack} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
