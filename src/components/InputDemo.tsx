import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface InputDemoProps {
  onSubmit: (prompt: string) => void;
}

const templates = [
  { emoji: "📱", text: "매일 30분 운동을 시작했더라면..." },
  { emoji: "📚", text: "매일 1시간씩 책을 읽었더라면..." },
  { emoji: "🎸", text: "대학 때 기타를 계속 쳤더라면..." },
  { emoji: "💼", text: "그때 창업을 시작했더라면..." },
];

export default function InputDemo({ onSubmit }: InputDemoProps) {
  const [prompt, setPrompt] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const autoTypingTimer = setTimeout(() => {
      startAutoTyping();
    }, 5000);

    return () => clearTimeout(autoTypingTimer);
  }, []);

  const startAutoTyping = () => {
    setIsTyping(true);
    const exampleText = templates[0].text;
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      if (currentIndex <= exampleText.length) {
        setPrompt(exampleText.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);

        // 타이핑 완료 2초 후 자동 제출
        // setTimeout(() => {
        // handleSubmit(exampleText);
        // }, 2000);
      }
    }, 80);
  };

  const handleSubmit = (text?: string) => {
    const finalPrompt = text || prompt;
    if (finalPrompt.trim()) {
      onSubmit(finalPrompt);
    }
  };

  const handleTemplateClick = (template: string) => {
    setPrompt(template);
  };

  return (
    <motion.div
      className="relative w-full h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 flex items-center justify-center overflow-hidden px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-3xl">
        {/* Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            당신의 <span className="text-gradient">WhatIf</span>는?
          </h2>
          <p className="text-gray-400 text-base sm:text-lg">
            과거의 선택이 달랐다면 어떤 삶을 살고 있을까요?
          </p>
        </motion.div>

        {/* Input Card */}
        <motion.div
          className="backdrop-blur-custom bg-white/5 border border-purple-500/30 rounded-3xl p-6 sm:p-8"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="예: 매일 30분 운동을 시작했더라면..."
            className="w-full h-32 sm:h-40 bg-transparent text-white text-base sm:text-lg placeholder-gray-500 outline-none resize-none"
            disabled={isTyping}
          />
        </motion.div>

        {/* Generate Button */}
        <motion.button
          onClick={() => handleSubmit()}
          className="w-full mt-3 mb-5 py-4 sm:py-5 bg-gradient-primary text-white font-bold text-base sm:text-lg rounded-xl glow-purple transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          animate={{
            boxShadow: [
              "0 0 20px rgba(139, 92, 246, 0.5)",
              "0 0 30px rgba(236, 72, 153, 0.7)",
              "0 0 20px rgba(139, 92, 246, 0.5)",
            ],
          }}
          transition={{
            boxShadow: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          <Sparkles className="w-5 h-5" />
          <span>영상 생성하기</span>
        </motion.button>

        {/* Template Chips */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {templates.map((template, index) => (
            <motion.button
              key={index}
              onClick={() => handleTemplateClick(template.text)}
              className="backdrop-blur-custom bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-left text-white text-sm sm:text-base hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300"
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="mr-2 text-xl">{template.emoji}</span>
              {template.text}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
