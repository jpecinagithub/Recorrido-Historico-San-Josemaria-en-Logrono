import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Trophy, RotateCcw, Brain, Zap, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { getRandomQuestions, QUIZ_QUESTIONS_COUNT, QuizQuestion } from '@/data/quiz';
import { useAppStore } from '@/store/appStore';
import { cn } from '@/lib/utils';

type QuizState = 'intro' | 'playing' | 'result';

const QuizView = () => {
  const [quizState, setQuizState] = useState<QuizState>('intro');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  
  const { quizBestScore, setQuizBestScore } = useAppStore();

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length || QUIZ_QUESTIONS_COUNT;
  const progress = ((currentIndex + (isAnswered ? 1 : 0)) / totalQuestions) * 100;

  const startQuiz = () => {
    const randomQuestions = getRandomQuestions();
    setQuestions(randomQuestions);
    setQuizState('playing');
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setAnswers([]);
  };

  const handleAnswer = (answerIndex: number) => {
    if (isAnswered || !currentQuestion) return;
    
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
    
    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
    setAnswers((prev) => [...prev, isCorrect]);
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    setQuizState('result');
    if (score > quizBestScore) {
      setQuizBestScore(score);
    }
  };

  const getScoreMessage = () => {
    const percentage = (score / totalQuestions) * 100;
    if (percentage === 100) return '¡Perfecto! Eres un crack 🎯';
    if (percentage >= 80) return '¡Genial! Casi perfecto 🔥';
    if (percentage >= 60) return '¡Muy bien! Vas por buen camino 💪';
    if (percentage >= 40) return '¡No está mal! Sigue intentándolo 📚';
    return '¡Ánimo! Explora la ruta para aprender más 🚀';
  };

  // Intro screen
  if (quizState === 'intro') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full text-center"
        >
          <div className="bg-gradient-to-br from-primary to-accent w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
            <Brain className="h-12 w-12 text-white" />
          </div>
          
          <h1 className="text-3xl font-bold text-foreground mb-3">
            ¡Ponte a prueba!
          </h1>
          <p className="text-muted-foreground mb-8">
            ¿Cuánto sabes sobre San Josemaría en Logroño? Demuestra tus conocimientos con {QUIZ_QUESTIONS_COUNT} preguntas aleatorias.
          </p>
          
          <div className="bg-card rounded-2xl p-5 mb-8 border border-border shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <span className="text-muted-foreground flex items-center gap-2">
                <Zap className="h-4 w-4 text-accent" />
                Preguntas
              </span>
              <span className="font-bold text-lg">{QUIZ_QUESTIONS_COUNT}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground flex items-center gap-2">
                <Star className="h-4 w-4 text-accent" />
                Tu récord
              </span>
              <span className="font-bold text-lg text-primary">
                {quizBestScore}/{QUIZ_QUESTIONS_COUNT}
              </span>
            </div>
          </div>
          
          <Button 
            onClick={startQuiz} 
            size="lg" 
            className="w-full h-14 text-lg font-semibold rounded-xl bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
          >
            ¡Empezar! 🚀
          </Button>
        </motion.div>
      </div>
    );
  }

  // Result screen
  if (quizState === 'result') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center"
        >
          <div className="bg-gradient-to-br from-accent to-primary w-28 h-28 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
            <Trophy className="h-14 w-14 text-white" />
          </div>
          
          <h1 className="text-3xl font-bold text-foreground mb-2">
            ¡Completado!
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            {getScoreMessage()}
          </p>
          
          {/* Score */}
          <div className="bg-card rounded-3xl p-8 mb-8 border border-border shadow-lg">
            <div className="text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
              {score}/{totalQuestions}
            </div>
            <p className="text-muted-foreground">
              {Math.round((score / totalQuestions) * 100)}% de aciertos
            </p>
            
            {/* Answer indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {answers.map((correct, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className={cn(
                    "w-3 h-3 rounded-full",
                    correct ? "bg-green-500" : "bg-destructive"
                  )}
                />
              ))}
            </div>
          </div>
          
          {score > quizBestScore - 1 && score === quizBestScore && quizBestScore > 0 && (
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-accent font-semibold mb-6 flex items-center justify-center gap-2"
            >
              <Star className="h-5 w-5" />
              ¡Nuevo récord personal!
            </motion.p>
          )}
          
          <Button 
            onClick={startQuiz} 
            size="lg" 
            className="w-full h-14 text-lg font-semibold rounded-xl gap-2"
          >
            <RotateCcw className="h-5 w-5" />
            Intentar de nuevo
          </Button>
        </motion.div>
      </div>
    );
  }

  // Playing screen - guard against no question
  if (!currentQuestion) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Progress header */}
      <div className="sticky top-16 z-10 bg-background/95 backdrop-blur-sm border-b border-border p-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-muted-foreground">
              Pregunta {currentIndex + 1} de {totalQuestions}
            </span>
            <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
              {score} pts
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Question */}
      <div className="p-4 max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6 pt-4"
          >
            <h2 className="text-xl md:text-2xl font-bold text-foreground leading-relaxed">
              {currentQuestion.question}
            </h2>
            
            {/* Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === currentQuestion.correctAnswer;
                const showResult = isAnswered;
                
                return (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleAnswer(index)}
                    disabled={isAnswered}
                    className={cn(
                      "w-full p-4 rounded-2xl text-left transition-all border-2",
                      "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                      !showResult && "bg-card border-border hover:border-primary/50 hover:bg-secondary/50",
                      showResult && isCorrect && "bg-green-500/10 border-green-500",
                      showResult && isSelected && !isCorrect && "bg-destructive/10 border-destructive",
                      showResult && !isSelected && !isCorrect && "opacity-50"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 transition-colors",
                        !showResult && "bg-secondary text-secondary-foreground",
                        showResult && isCorrect && "bg-green-500 text-white",
                        showResult && isSelected && !isCorrect && "bg-destructive text-white"
                      )}>
                        {showResult && isCorrect ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : showResult && isSelected && !isCorrect ? (
                          <XCircle className="h-5 w-5" />
                        ) : (
                          String.fromCharCode(65 + index)
                        )}
                      </div>
                      <span className="text-foreground font-medium">{option}</span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
            
            {/* Explanation */}
            <AnimatePresence>
              {isAnswered && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-secondary/50 rounded-2xl p-4 border border-border"
                >
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">💡 </span>
                    {currentQuestion.explanation}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Next button */}
            {isAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Button 
                  onClick={nextQuestion} 
                  size="lg" 
                  className="w-full h-14 text-lg font-semibold rounded-xl"
                >
                  {currentIndex < questions.length - 1 ? 'Siguiente →' : 'Ver resultados 🎉'}
                </Button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default QuizView;
