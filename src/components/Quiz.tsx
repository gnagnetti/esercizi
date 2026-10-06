import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, XCircle, Info, ChevronRight, RotateCcw } from 'lucide-react';
import { Exercise, Question } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface QuizProps {
  exercise: Exercise;
  onBack: (accuracy?: number) => void;
}

export const Quiz: React.FC<QuizProps> = ({ exercise, onBack }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [answeredCount, setAnsweredCount] = useState(0);

  const currentQuestion = exercise.questions[currentQuestionIndex];
  const isCorrect = selectedOption === currentQuestion?.correctIndex;

  const handleOptionSelect = (index: number) => {
    if (selectedOption !== null) return;
    
    setSelectedOption(index);
    setShowExplanation(true);
    setAnsweredCount(prev => prev + 1);
    
    if (index === currentQuestion.correctIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < exercise.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setScore(0);
    setCompleted(false);
    setAnsweredCount(0);
  };

  const progress = (answeredCount / exercise.questions.length) * 100;
  const accuracy = answeredCount > 0 ? (score / answeredCount) * 100 : 0;

  if (completed) {
    return (
      <div className="max-w-2xl mx-auto p-4 md:p-6 pt-8 md:pt-12" id="completion-screen">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem] shadow-2xl text-center border-b-8 border-slate-200 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500" />
          <div className="w-16 h-16 md:w-24 md:h-24 bg-emerald-100 text-emerald-600 rounded-2xl md:rounded-[2rem] flex items-center justify-center mx-auto mb-6 md:mb-8 shadow-inner ring-4 md:ring-8 ring-emerald-50">
            <CheckCircle2 size={32} className="md:w-[56px] md:h-[56px]" />
          </div>
          <h2 className="text-2xl md:text-4xl font-black mb-3 md:mb-4 text-slate-900 tracking-tight uppercase">Esercizio Completato!</h2>
          <p className="text-slate-500 text-sm md:text-lg mb-8 md:mb-10 font-medium">Ottimo lavoro! Hai completato il modulo con questi risultati:</p>
          
          <div className="grid grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12">
            <div className="p-4 md:p-6 bg-indigo-50 rounded-2xl md:rounded-[2rem] border-2 border-indigo-100">
              <div className="text-2xl md:text-4xl font-black text-indigo-600">{score}/{exercise.questions.length}</div>
              <div className="text-[8px] md:text-[10px] font-black text-indigo-400 uppercase tracking-widest mt-1 md:mt-2">Punteggio</div>
            </div>
            <div className="p-4 md:p-6 bg-emerald-50 rounded-2xl md:rounded-[2rem] border-2 border-emerald-100">
              <div className="text-2xl md:text-4xl font-black text-emerald-600">{Math.round(accuracy)}%</div>
              <div className="text-[8px] md:text-[10px] font-black text-emerald-400 uppercase tracking-widest mt-1 md:mt-2">Precisione</div>
            </div>
          </div>

          <div className="flex flex-col gap-3 md:gap-4">
            <button 
              onClick={() => onBack(accuracy)}
              className="w-full py-4 md:py-5 bg-indigo-600 text-white rounded-xl md:rounded-[1.5rem] font-black uppercase tracking-tighter hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
            >
              Torna alla Home
            </button>
            <button 
              onClick={handleRestart}
              className="w-full py-4 md:py-5 bg-white text-slate-500 border-2 border-slate-200 rounded-xl md:rounded-[1.5rem] font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2 text-sm md:text-base"
            >
              <RotateCcw size={16} /> Rifai l'esercizio
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6" id="quiz-container">
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <button 
          onClick={() => onBack(false)}
          className="flex items-center gap-2 text-indigo-400 hover:text-indigo-600 transition-all font-black text-[10px] md:text-xs uppercase tracking-widest group"
        >
          <div className="w-7 h-7 md:w-8 md:h-8 rounded-full border-2 border-indigo-100 flex items-center justify-center group-hover:bg-indigo-50 transition-colors">
            <ArrowLeft size={14} className="md:w-4 md:h-4 group-hover:-translate-x-1 transition-transform" />
          </div>
          <span className="hidden xs:inline">Esci dal modulo</span>
          <span className="xs:hidden">Esci</span>
        </button>

        <div className="flex items-center gap-4 md:gap-6">
          <div className="text-right">
            <span className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-0.5">Precisione</span>
            <span className={`font-black text-lg md:text-xl ${accuracy >= 80 ? 'text-emerald-500' : accuracy >= 50 ? 'text-amber-500' : 'text-slate-400'}`}>
              {Math.round(accuracy)}%
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl md:rounded-[2.5rem] shadow-2xl border-b-8 border-slate-200 overflow-hidden flex flex-col min-h-[500px] md:min-h-[600px]">
        {/* Progress Bar */}
        <div className="h-2 md:h-3 bg-slate-50 w-full">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-indigo-500 shadow-[0_0_10px_rgba(79,70,229,0.4)] transition-all"
          />
        </div>

        <div className="p-6 md:p-12 flex-grow flex flex-col">
          <div className="flex justify-between items-start mb-6 md:mb-10">
            <div className="w-full">
              <span className="bg-indigo-100 text-indigo-600 px-3 py-1 md:px-4 md:py-1.5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-tight shadow-sm">
                Modulo {String(exercise.id).padStart(2, '0')} • Domanda {currentQuestionIndex + 1}/{exercise.questions.length}
              </span>
              <div className="mt-6 md:mt-8">
                <h2 className="text-xl md:text-3xl font-black leading-tight text-slate-900 max-w-2xl" id="question-text">
                  {currentQuestion.text.includes('(') ? (
                    <>
                      {currentQuestion.text.split('(')[0].split('...').map((part, i, arr) => (
                        <React.Fragment key={i}>
                          {part}
                          {i < arr.length - 1 && <span className="text-indigo-600 px-1 border-b-4 border-indigo-100 font-black italic">___</span>}
                        </React.Fragment>
                      ))}
                    </>
                  ) : (
                    currentQuestion.text.split('...').map((part, i, arr) => (
                      <React.Fragment key={i}>
                        {part}
                        {i < arr.length - 1 && <span className="text-indigo-600 px-1 border-b-4 border-indigo-100 font-black italic">___</span>}
                      </React.Fragment>
                    ))
                  )}
                </h2>
                {currentQuestion.text.includes('(') && (
                  <p className="text-slate-400 text-sm italic font-medium mt-3" id="translation-text">
                    ({currentQuestion.text.split('(').slice(1).join('(')}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {currentQuestion.options.map((option, index) => {
              const label = ['A', 'B', 'C', 'D'][index];
              let buttonStyles = "border-slate-100 hover:border-indigo-300 hover:bg-indigo-50";
              let labelStyles = "bg-slate-100 text-slate-500 group-hover:bg-indigo-600 group-hover:text-white";
              
              if (selectedOption === index) {
                if (index === currentQuestion.correctIndex) {
                  buttonStyles = "bg-emerald-50 border-emerald-500 text-emerald-900 ring-4 ring-emerald-100";
                  labelStyles = "bg-emerald-500 text-white";
                } else {
                  buttonStyles = "bg-red-50 border-red-500 text-red-900 ring-4 ring-red-100";
                  labelStyles = "bg-red-500 text-white";
                }
              } else if (selectedOption !== null && index === currentQuestion.correctIndex) {
                buttonStyles = "border-emerald-200 bg-emerald-50/30 opacity-70";
                labelStyles = "bg-emerald-200 text-emerald-700";
              } else if (selectedOption !== null) {
                buttonStyles = "opacity-40 grayscale border-slate-50";
              }

              return (
                <button
                  key={index}
                  disabled={selectedOption !== null}
                  onClick={() => handleOptionSelect(index)}
                  className={`group p-4 md:p-6 rounded-2xl md:rounded-[1.5rem] border-2 transition-all flex items-center gap-3 md:gap-5 text-left ${buttonStyles}`}
                >
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center font-black text-base md:text-lg transition-all flex-shrink-0 ${labelStyles}`}>
                    {label}
                  </div>
                  <span className="text-base md:text-lg font-bold">
                    {option}
                  </span>
                  {selectedOption === index && (
                    <div className="ml-auto flex-shrink-0">
                      {index === currentQuestion.correctIndex ? <CheckCircle2 size={24} className="text-emerald-500" /> : <XCircle size={24} className="text-red-500" />}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <AnimatePresence>
            {showExplanation && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-auto pt-8 border-t-2 border-slate-50"
              >
                <div className={`rounded-2xl md:rounded-[2rem] p-5 md:p-8 flex flex-col md:flex-row items-start gap-4 md:gap-6 ${isCorrect ? 'bg-emerald-100 border-2 border-emerald-200 text-emerald-900' : 'bg-amber-100 border-2 border-amber-200 text-amber-900'}`}>
                  <div className="flex items-start gap-4 flex-grow">
                    <div className="text-3xl md:text-4xl filter drop-shadow-sm flex-shrink-0">
                      {isCorrect ? '✨' : '🧐'}
                    </div>
                    <div>
                      <h4 className={`font-black uppercase text-[10px] md:text-xs tracking-[0.2em] mb-1 md:mb-2 ${isCorrect ? 'text-emerald-700' : 'text-amber-700'}`}>
                        {isCorrect ? 'Corretto!' : 'Spiegazione'}
                      </h4>
                      <p className="font-bold leading-snug md:leading-relaxed text-sm md:text-lg">
                        {currentQuestion.explanation}
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={handleNext}
                    className={`w-full md:w-auto px-6 md:px-8 py-3 md:py-5 rounded-xl md:rounded-[1.2rem] font-black uppercase tracking-tighter transition-all shadow-lg ${isCorrect ? 'bg-emerald-500 text-white shadow-emerald-200' : 'bg-amber-500 text-white shadow-amber-200'}`}
                  >
                    {currentQuestionIndex < exercise.questions.length - 1 ? 'Avanti' : 'Fine'}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
