
import './App.css'
import { Container, Typography, Stack } from '@mui/material'
import { JavascriptLogo } from './JavascriptLogo'
import { Start } from './Start'
import { useQuestionStore } from './store/questions'
import { Game } from './Game'

function App() {
  const questions = useQuestionStore( state => state.questions);

  const isThereQuestions = questions.length > 0;
  
  return (
    <main>
      <Container>
        <Stack direction='row' gap={2} alignItems='center' justifyContent='center'>
          <JavascriptLogo />
          <Typography variant='h2' component='h1'>
              JavaScript Quiz
          </Typography>
        </Stack>

        { !isThereQuestions && <Start/> }
        { isThereQuestions && <Game/> }
      </Container>
    </main>
  )
}

export default App
