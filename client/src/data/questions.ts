import type { Question } from '../types/profile'

export const onboardingQuestions: Question[] = [
  {
    id: 'background',
    prompt: 'Tell me about the kind of work you have done so far.',
    hint: 'E.g. delivery, helper, machine operator, cashier...',
    icon: '🧑‍🔧',
  },
  {
    id: 'skills',
    prompt: 'What skills or tools are you confident about?',
    hint: 'Driving, tailoring, Excel, Hindi, customer support...',
    icon: '🧰',
  },
  {
    id: 'interests',
    prompt: 'Which type of work excites you or feels comfortable?',
    hint: 'Working with people, machines, outdoor, office, etc.',
    icon: '💡',
  },
  {
    id: 'constraints',
    prompt: 'Share any limits: city, salary need, timing, education.',
    icon: '📍',
  },
  {
    id: 'learning',
    prompt: 'How much time can you spend learning every week?',
    icon: '📚',
  },
]


