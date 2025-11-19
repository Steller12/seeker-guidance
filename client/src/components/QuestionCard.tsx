import type { Question } from '../types/profile'

interface QuestionCardProps {
  question: Question
  progress: number
}

export const QuestionCard = ({ question, progress }: QuestionCardProps) => {
  return (
    <div className="question-card">
      <div className="question-icon" aria-hidden>
        {question.icon}
      </div>
      <div>
        <p className="eyebrow">Question {progress}</p>
        <h2>{question.prompt}</h2>
        {question.hint && <p className="hint">{question.hint}</p>}
      </div>
    </div>
  )
}


