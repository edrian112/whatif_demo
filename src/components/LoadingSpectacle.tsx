import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface LoadingSpectacleProps {
  onComplete: () => void;
}

const loadingStages = [
  { min: 0, max: 33, message: '시나리오 분석 중...' },
  { min: 34, max: 66, message: '영상 생성 중...' },
  { min: 67, max: 100, message: '마무리 중...' },
];

// Particle component
const Particle = ({ delay }: { delay: number }) => {
  const randomX = Math.random() * 100;
  const randomY = Math.random() * 100;
  const randomDuration = 2 + Math.random() * 3;

  return (
    <motion.div
      className="absolute w-1 h-1 bg-white rounded-full"
      initial={{ x: `${randomX}vw`, y: `${randomY}vh`, opacity: 0 }}
      animate={{
        x: [`${randomX}vw`, `${randomX + (Math.random() - 0.5) * 20}vw`],
        y: [`${randomY}vh`, `${randomY + (Math.random() - 0.5) * 20}vh`],
        opacity: [0, 1, 0],
      }}
      transition={{
        duration: randomDuration,
        repeat: Infinity,
        delay: delay,
        ease: "easeInOut",
      }}
    />
  );
};

export default function LoadingSpectacle({ onComplete }: LoadingSpectacleProps) {
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);
  const [showExplosion, setShowExplosion] = useState(false);

  useEffect(() => {
    const duration = 5000; // 5 seconds
    const intervalTime = 50; // Update every 50ms
    const increment = (100 / duration) * intervalTime;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = Math.min(prev + increment, 100);

        // Update stage
        if (newProgress >= 67) setCurrentStage(2);
        else if (newProgress >= 34) setCurrentStage(1);
        else setCurrentStage(0);

        // Complete
        if (newProgress >= 100) {
          clearInterval(interval);
          setShowExplosion(true);
          setTimeout(() => {
            onComplete();
          }, 1000);
        }

        return newProgress;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="relative w-full h-screen bg-black flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Space Background with Stars */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950 via-purple-950 to-black" />
        {Array.from({ length: 50 }).map((_, i) => (
          <Particle key={i} delay={i * 0.1} />
        ))}
      </div>

      {/* Explosion Effect */}
      <AnimatePresence>
        {showExplosion && (
          <div className="absolute inset-0">
            {Array.from({ length: 20 }).map((_, i) => {
              const angle = (i / 20) * Math.PI * 2;
              const distance = 500;
              const x = Math.cos(angle) * distance;
              const y = Math.sin(angle) * distance;

              return (
                <motion.div
                  key={`explosion-${i}`}
                  className="absolute top-1/2 left-1/2 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{
                    x: x,
                    y: y,
                    opacity: 0,
                    scale: 0,
                  }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              );
            })}
          </div>
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 w-full max-w-2xl px-6">
        {/* Loading Icon */}
        <div className="flex justify-center mb-12">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 className="w-16 h-16 text-purple-500" />
          </motion.div>
        </div>

        {/* Loading Message */}
        <AnimatePresence mode="wait">
          <motion.h2
            key={currentStage}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {loadingStages[currentStage].message}
          </motion.h2>
        </AnimatePresence>

        {/* Progress Bar Container */}
        <div className="relative">
          {/* Progress Bar Background */}
          <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
            {/* Progress Bar Fill */}
            <motion.div
              className="h-full bg-gradient-progress rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Progress Percentage */}
          <motion.div
            className="mt-6 text-center text-xl font-bold text-white"
            animate={{
              opacity: [1, 0.7, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {Math.round(progress)}%
          </motion.div>
        </div>

        {/* Hint Text */}
        <motion.p
          className="text-center text-gray-400 text-sm mt-12"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          AI가 당신의 미래를 그리고 있습니다...
        </motion.p>
      </div>
    </motion.div>
  );
}
