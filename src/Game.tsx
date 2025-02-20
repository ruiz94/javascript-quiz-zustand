import { Card, IconButton, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from "@mui/material";
import { useQuestionStore } from "./store/questions";
import type { Question as QuestionType } from "./types";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { Footer } from "./Footer";

type questionProps = {
  info: QuestionType
}
const Question = ({ info }: questionProps) => {
  const selectAnswer = useQuestionStore( state => state.selectAnswer);

  const handleSelectAnswer = (answerIndex: number) => {
    if(info.userSelectedAnswer) return null;
    selectAnswer(info.id, answerIndex)
  }
  
  return (
    <Card variant="outlined" sx={{ bgcolor: '#222', p: 2, textAlign: 'left'}}>
      <Typography variant="h5">
        { info.question }
      </Typography>
      <List sx={{ bgcolor: '#333', marginTop: 4}} disablePadding>
        { info.answers.map( (question, index) => {
          const hasSelectedAnAnswer = info.userSelectedAnswer !== undefined;
          const bgColor = hasSelectedAnAnswer && info.correctAnswer === index 
            ? 'green' : !info.isCorrectUserAnswer && info.userSelectedAnswer === index 
            ? 'red' : 'transparent';

          return (
            <ListItem key={index} disablePadding divider 
            sx={{ bgcolor: bgColor }}>
            <ListItemButton disabled={info.userSelectedAnswer !== undefined} onClick={ () => handleSelectAnswer(index)}>
              <ListItemText primary={ question } />
            </ListItemButton>
          </ListItem>
          )
        })}
      </List>
      
    </Card>
  )
}

export const Game = () => {
  const questions = useQuestionStore( state => state.questions );
  const currentQuestion = useQuestionStore( state => state.currentQuestion );
  const goNextQuestion = useQuestionStore( state => state.goNextQuestion );
  const goPreviousQuestion = useQuestionStore( state => state.goPreviousQuestion );
  const questionInfo = questions[currentQuestion];

  return <>
    <Stack direction={'row'} gap={2} alignItems={'center'} justifyContent={'center'}>
      <IconButton onClick={goPreviousQuestion} disabled={currentQuestion === 0}>
        <ArrowBackIosNew/>
      </IconButton>
      <Typography> {currentQuestion + 1} / {questions.length}</Typography>
      <IconButton onClick={goNextQuestion} disabled={currentQuestion >= questions.length - 1}>
        <ArrowForwardIos/>
      </IconButton>
    </Stack>
    
    <Question info={questionInfo} />
    <Footer/>
  </>
}