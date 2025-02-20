import { useQuestionStore } from "../store/questions";

export const useQuestionsData = () => {
  const questions  = useQuestionStore( state => state.questions );

  let correct = 0;
  let incorrect = 0;
  let unanswered = 0;

  questions.forEach( question => {
    const { userSelectedAnswer, isCorrectUserAnswer } = question
    if(userSelectedAnswer === undefined) unanswered++
    else if ( isCorrectUserAnswer ) correct++
    else incorrect++
  });

  return { correct, incorrect, unanswered}
}