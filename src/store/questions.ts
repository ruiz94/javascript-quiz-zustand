import { create } from "zustand";
import type { Question } from "../types";
import { persist } from "zustand/middleware";

interface State {
  questions: Question[],
  currentQuestion: number,
  fetchQuestion: () => Promise<void>,
  selectAnswer: (questionId: number, answerIndex: number) => void,
  goNextQuestion: () => void,
  goPreviousQuestion: () => void,
  reset: () => void,
}

export const useQuestionStore = create<State>()(persist((set, get) => {
  return {
    questions: [],
    currentQuestion: 0,
    fetchQuestion: async () => {
      const res = await fetch('https://ruiz94.github.io/json-data/questions.json');
      const data = await res.json();
      const sortedQuestions = data.sort(() => Math.random() - 0.5);
      set({ questions: sortedQuestions});
    },
    selectAnswer: (questionId: number, answerIndex: number) => {
      set( state => {
        const updatedAnswer = state.questions.map( question => 
          question.id === questionId ? 
          { 
            ...question,
            userSelectedAnswer: answerIndex,
            isCorrectUserAnswer: question.correctAnswer === answerIndex
          } : question);
        
        return { questions: updatedAnswer }
      })
    },
    goNextQuestion: () => {
      const { currentQuestion, questions } = get();
      const nextQuestion = currentQuestion + 1;

      if(nextQuestion < questions.length){
        set({ currentQuestion: nextQuestion })
      }
    },
    goPreviousQuestion: () => {
      const { currentQuestion } = get();
      const previewsQuestion = currentQuestion - 1;
      if( previewsQuestion >= 0){
        set({ currentQuestion: previewsQuestion})
      }
    },
    reset: () => {
      set({ currentQuestion: 0, questions: []})
    }
  }
}, {
  name: 'questions'
}))