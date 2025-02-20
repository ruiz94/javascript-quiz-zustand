import { Button } from "@mui/material";
import { useQuestionsData } from "./hooks/useQuestionsData"
import { useQuestionStore } from "./store/questions";

export const Footer = () => {
  const { correct, incorrect, unanswered } = useQuestionsData();
  const reset = useQuestionStore( state => state.reset);

  return <footer>
    <strong>
  ✅ Correct { correct } | ❌ Incorrect { incorrect } | ❓Unanswered { unanswered }
    </strong>
    <div style={{ marginTop: '16px'}}>
    <Button onClick={reset}>Resetear Juego</Button>

    </div>
  </footer>
}