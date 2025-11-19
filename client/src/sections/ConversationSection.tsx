import { AnswerInput } from '../components/AnswerInput'
import { AnswerTimeline } from '../components/AnswerTimeline'
import { QuestionCard } from '../components/QuestionCard'
import { useProfileFlow } from '../context/ProfileFlowContext'

export const ConversationSection = () => {
  const { currentQuestion, currentIndex, questions, answers, status, submitAnswer } =
    useProfileFlow()

  if (!currentQuestion) {
    return (
      <section className="panel conversation">
        <div className="done-state">
          <p className="eyebrow">Great work</p>
          <h2>{status === 'processing' ? 'Preparing your roadmap…' : 'Results ready!'}</h2>
          <p className="hint">
            {status === 'processing'
              ? 'Hang tight while we analyse your responses.'
              : 'A new window with your personalised guidance is open.'}
          </p>
        </div>
        <AnswerTimeline answers={answers} questions={questions} />
      </section>
    )
  }

  return (
    <section className="panel conversation">
      <QuestionCard question={currentQuestion} progress={currentIndex + 1} />
      <AnswerInput onSubmit={submitAnswer} disabled={status !== 'collecting'} />
      <AnswerTimeline answers={answers} questions={questions} />
    </section>
  )
}