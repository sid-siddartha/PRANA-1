"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { questions, options } from "@/data/questions";
import { analyzeScores } from "@/actions/gemini-api"; // server action

const QuestionnairePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scores, setScores] = useState({ phq9: 0, gad7: 0 });
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const handleOptionSelect = (value, text) => {
  setScores((prev) => ({
    ...prev,
    [questions[currentIndex].type]:
      prev[questions[currentIndex].type] + value,
  }));

  setAnswers((prev) => [
    ...prev,
    { question: questions[currentIndex].text, answer: text },
  ]);

  // ✅ Move past the last question
  if (currentIndex < questions.length - 1) {
    setCurrentIndex((prev) => prev + 1);
  } else {
    setCurrentIndex((prev) => prev + 1); // allow reaching questions.length
  }
};


  const handleSubmit = async () => {
    setLoading(true);
    try {
      const result = await analyzeScores({ scores, answers });
      setAnalysis(result);
    } catch (err) {
      console.error("Error analyzing:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRetake = () => {
    setCurrentIndex(0);
    setScores({ phq9: 0, gad7: 0 });
    setAnswers([]);
    setAnalysis(null);
  };

  const isCompleted = currentIndex === questions.length;

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-10 flex flex-col items-center justify-center">
      {!isCompleted ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full max-w-lg md:max-w-2x rounded-lg shadow-xl p-6 md:p-8 lg:p-10"
        >
          {/* Progress bar */}
          <div className="mb-6">
            <div className="h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 bg-purple-600 rounded-full transition-all duration-300"
                style={{ width: `${(currentIndex / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-6">
            {questions[currentIndex].text}
          </h2>

          {/* Options */}
          <div className="space-y-3 md:space-y-4">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() =>
                  handleOptionSelect(option.value, option.text)
                }
                className="w-full p-3 md:p-4 text-left rounded-lg border border-gray-200 hover:bg-purple-50 hover:border-purple-600 transition-all duration-200 text-sm md:text-base lg:text-lg"
              >
                {option.text}
              </button>
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center bg-white p-6 md:p-8 lg:p-10 rounded-lg shadow-xl w-full max-w-lg md:max-w-xl"
        >
          {!analysis ? (
            <>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6 text-purple-700">
                Assessment Completed
              </h2>
              <p className="mb-6 text-gray-600">
                PHQ-9 Score: {scores.phq9} <br />
                GAD-7 Score: {scores.gad7}
              </p>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-4 md:px-6 py-2 md:py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm md:text-base font-medium transition disabled:opacity-50"
              >
                {loading ? "Analyzing..." : "Submit for Analysis"}
              </button>
            </>
          ) : (
            <>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6 text-purple-700">
                Analysis Results
              </h2>
              <div className="text-purple-600 font-medium text-sm md:text-base lg:text-lg space-y-4 text-left">
                <p><strong>Summary:</strong> {analysis.summary}</p>
                <p><strong>Stress Level:</strong> {analysis.stressLevel}</p>
                <p><strong>Recommendation:</strong> {analysis.recommendation}</p>
              </div>
              <button
                onClick={handleRetake}
                className="mt-6 px-4 md:px-6 py-2 md:py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm md:text-base font-medium transition"
              >
                Retake Assessment
              </button>
            </>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default QuestionnairePage;
