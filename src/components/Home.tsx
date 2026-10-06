import React from 'react';
import { BookOpen, ChevronRight, GraduationCap, CheckCircle2 } from 'lucide-react';
import { Exercise, UserProgress } from '../types';
import { motion } from 'motion/react';

interface HomeProps {
  exercises: Exercise[];
  onSelectExercise: (exercise: Exercise) => void;
  progress: UserProgress[];
}

const AccuracyPie = ({ percentage }: { percentage: number }) => {
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-12 h-12 flex-shrink-0" id="accuracy-pie">
      <svg className="w-12 h-12 transform -rotate-90">
        <circle
          cx="24"
          cy="24"
          r={radius}
          stroke="currentColor"
          strokeWidth="3.5"
          fill="transparent"
          className="text-slate-100"
        />
        <circle
          cx="24"
          cy="24"
          r={radius}
          stroke="currentColor"
          strokeWidth="3.5"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="transparent"
          className="text-emerald-500 transition-all duration-700"
        />
      </svg>
      <span className="absolute text-[8px] font-black text-emerald-600">
        {Math.round(percentage)}%
      </span>
    </div>
  );
};

export const Home: React.FC<HomeProps> = ({ exercises, onSelectExercise, progress }) => {
  const totalCompleted = progress.length;
  const totalPercentage = exercises.length > 0 ? Math.round((totalCompleted / exercises.length) * 100) : 0;

  return (
    <div className="flex flex-col min-h-screen" id="home-container">
      {/* Header */}
      <header className="h-16 md:h-20 bg-white border-b-4 border-indigo-100 flex items-center justify-between px-4 md:px-8 shadow-sm flex-shrink-0 sticky top-0 z-10">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-indigo-600 rounded-lg md:rounded-xl flex items-center justify-center text-white font-bold text-lg md:text-xl ring-4 ring-indigo-50">A</div>
          <h1 className="text-lg md:text-2xl font-black tracking-tight text-indigo-900 uppercase">
            Accademia <span className="text-indigo-500">Russa</span>
          </h1>
        </div>
        
        <div className="flex items-center gap-4 md:gap-8">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5 md:mb-1">Progresso Globale</span>
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-24 md:w-48 h-2 md:h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${totalPercentage}%` }}
                  className="h-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]"
                />
              </div>
              <span className="text-xs md:text-sm font-black text-emerald-600 w-8 md:w-10 text-right">{totalPercentage}%</span>
            </div>
          </div>
          <div className="bg-amber-50 px-3 py-1.5 md:px-4 md:py-2 rounded-xl md:rounded-2xl border-2 border-amber-100 flex items-center gap-1.5 md:gap-2">
            <span className="text-lg md:text-xl">🏆</span>
            <span className="font-extrabold text-amber-700 text-[10px] md:text-sm whitespace-nowrap">{totalCompleted}</span>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-5xl mx-auto w-full p-6 md:p-12">
        <header className="mb-8 md:mb-12">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-indigo-500 font-black text-[10px] md:text-xs uppercase tracking-[0.2em] mb-3 md:mb-4 block"
          >
            Benvenuti nell'area di studio
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 md:mb-6 leading-tight">
            Pratica i casi e la <br className="hidden md:block"/>
            <span className="text-indigo-600">reggenza verbale.</span>
          </h2>
          <p className="text-slate-500 text-base md:text-lg max-w-2xl leading-relaxed">
            Seleziona un modulo per iniziare il test. Ogni esercizio è basato sul manuale originale e include spiegazioni dettagliate in italiano.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12" id="exercise-grid">
          {exercises.map((exercise, index) => {
            const userProg = progress.find(p => p.exerciseId === exercise.id);
            const isCompleted = !!userProg;
            return (
              <motion.button
                key={exercise.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => onSelectExercise(exercise)}
                className={`flex items-center p-6 bg-white rounded-[2rem] border-2 transition-all text-left relative overflow-hidden group hover:shadow-xl ${
                  isCompleted ? "border-emerald-100 bg-emerald-50/10" : "border-slate-100 hover:border-indigo-500 shadow-sm"
                }`}
                id={`exercise-card-${exercise.id}`}
              >
                <div className={`absolute top-0 left-0 w-2 h-full transition-opacity ${
                  isCompleted ? "bg-emerald-500 opacity-100" : "bg-indigo-500 opacity-0 group-hover:opacity-100"
                }`} />
                
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl mr-5 transition-all flex-shrink-0 ${
                  isCompleted 
                    ? "bg-emerald-500 text-white shadow-lg shadow-emerald-100" 
                    : "bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white"
                }`}>
                  {isCompleted ? <CheckCircle2 size={24} /> : String(index + 1).padStart(2, '0')}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className={`text-xl font-bold mb-1 uppercase tracking-tight truncate ${
                    isCompleted ? "text-emerald-900" : "text-slate-800 group-hover:text-indigo-900"
                  }`}>
                    {exercise.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <BookOpen size={14} className={isCompleted ? "text-emerald-400" : "text-indigo-400"} />
                    <span className={`text-[10px] font-black uppercase tracking-widest leading-none ${
                      isCompleted ? "text-emerald-400" : "text-indigo-400"
                    }`}>
                      {isCompleted ? "Completato" : "Modulo interattivo"}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  {isCompleted && <AccuracyPie percentage={userProg.accuracy} />}
                  <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${
                    isCompleted 
                      ? "border-emerald-200 text-emerald-500 bg-emerald-50" 
                      : "border-slate-50 text-slate-300 group-hover:text-indigo-500 group-hover:border-indigo-100"
                  }`}>
                    <ChevronRight size={20} />
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </main>
      
      <footer className="h-12 bg-indigo-900 flex items-center px-8 text-indigo-300 text-[10px] font-bold uppercase tracking-widest">
        <div className="flex gap-6 items-center">
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Sistema Attivo</span>
          <span className="opacity-60">Polyglot Learning v.2.4</span>
        </div>
      </footer>
    </div>
  );
};
