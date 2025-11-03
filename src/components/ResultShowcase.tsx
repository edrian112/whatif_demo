import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Share2, Download, Link2, Heart, RotateCcw, Play, ArrowLeft } from 'lucide-react';

interface ResultShowcaseProps {
  prompt: string;
  onRestart: () => void;
}

export default function ResultShowcase({ prompt, onRestart }: ResultShowcaseProps) {
  const [usersCount, setUsersCount] = useState(0);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    // Users count animation
    const usersInterval = setInterval(() => {
      setUsersCount((prev) => {
        if (prev >= 3247) {
          clearInterval(usersInterval);
          return 3247;
        }
        return prev + 50;
      });
    }, 20);

    // Rating animation
    const ratingInterval = setInterval(() => {
      setRating((prev) => {
        if (prev >= 4.8) {
          clearInterval(ratingInterval);
          return 4.8;
        }
        return prev + 0.1;
      });
    }, 50);

    return () => {
      clearInterval(usersInterval);
      clearInterval(ratingInterval);
    };
  }, []);

  const socialButtons = [
    { icon: Share2, label: '공유' },
    { icon: Download, label: '저장' },
    { icon: Link2, label: '링크' },
    { icon: Heart, label: '좋아요' },
  ];

  return (
    <motion.div
      className="relative w-full h-screen bg-slate-900 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center py-8 px-4">
        {/* Header */}
        <div className="w-full max-w-2xl mb-10">
          <motion.button
            onClick={onRestart}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            whileHover={{ x: -5 }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>처음으로</span>
          </motion.button>
        </div>

        {/* Video Player (Placeholder) */}
        <motion.div
          className="w-full max-w-sm mb-10"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="aspect-[9/16] bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900 rounded-2xl shadow-2xl glow-purple flex items-center justify-center overflow-hidden relative">
            {/* Video Placeholder Content */}
            <div className="text-center text-white p-8">
              <motion.div
                className="text-6xl mb-6"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                🎬
              </motion.div>
              <h3 className="text-2xl font-bold mb-6">생성된 영상</h3>
              <p className="text-gray-300 text-sm px-4 leading-relaxed">
                "{prompt}"
              </p>
              <motion.div
                className="mt-10 inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full"
                whileHover={{ scale: 1.05 }}
              >
                <Play className="w-5 h-5" />
                <span>재생</span>
              </motion.div>
            </div>

            {/* Animated Border */}
            <motion.div
              className="absolute inset-0 border-2 border-purple-500/50 rounded-2xl"
              animate={{
                borderColor: [
                  'rgba(139, 92, 246, 0.5)',
                  'rgba(236, 72, 153, 0.5)',
                  'rgba(139, 92, 246, 0.5)',
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="w-full max-w-sm grid grid-cols-2 gap-4 mb-8"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="backdrop-blur-custom bg-white/5 border border-white/10 rounded-xl p-5 text-center">
            <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              {usersCount.toLocaleString()}
            </div>
            <div className="text-gray-400 text-sm mt-2">명이 사용 중</div>
          </div>
          <div className="backdrop-blur-custom bg-white/5 border border-white/10 rounded-xl p-5 text-center">
            <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
              {rating.toFixed(1)}/5.0
            </div>
            <div className="text-gray-400 text-sm mt-2">평균 만족도</div>
          </div>
        </motion.div>

        {/* Prompt Summary */}
        <motion.div
          className="w-full max-w-sm mb-8"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="backdrop-blur-custom bg-white/5 border border-white/10 rounded-xl p-5">
            <h4 className="text-white font-semibold mb-3">당신의 선택</h4>
            <p className="text-gray-300 text-sm">{prompt}</p>
          </div>
        </motion.div>

        {/* Social Buttons */}
        <motion.div
          className="w-full max-w-sm grid grid-cols-4 gap-4 mb-8"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {socialButtons.map((button, index) => (
            <motion.button
              key={index}
              className="backdrop-blur-custom bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center gap-2 hover:bg-white/10 hover:border-purple-500/50 transition-all"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <button.icon className="w-5 h-5 text-white" />
              <span className="text-white text-xs">{button.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="w-full max-w-sm space-y-4"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <motion.button
            onClick={onRestart}
            className="w-full py-4 bg-gradient-primary text-white font-bold text-lg rounded-xl glow-purple transition-all duration-300 flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <RotateCcw className="w-5 h-5" />
            <span>다시 만들기</span>
          </motion.button>

          <motion.button
            className="w-full py-4 backdrop-blur-custom bg-white/10 border border-white/20 text-white font-semibold text-base rounded-xl hover:bg-white/20 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            더 긴 버전 보기 (DLC)
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}
