import type { Answer, Question } from '../types/profile'

interface AnswerTimelineProps {
  answers: Answer[]
  questions: Question[]
}

export const AnswerTimeline = ({ answers, questions }: AnswerTimelineProps) => {
  const getPrompt = (id: string) =>
    questions.find((question) => question.id === id)?.prompt ?? 'Unknown prompt'

  if (!answers.length) {
    return <p className="hint">Your conversation will appear here.</p>
  }

  return (
    <ul className="answer-timeline">
      {answers.map((answer) => (
        <li key={answer.timestamp}>
          <p className="eyebrow">{getPrompt(answer.questionId)}</p>
          <p>{answer.response}</p>
          <span className="pill">{answer.mode === 'voice' ? 'Voice' : 'Text'} input</span>
        </li>
      ))}
    </ul>
  )
}


