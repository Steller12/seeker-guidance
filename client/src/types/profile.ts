export type AnswerMode = 'voice' | 'text'

export interface Question {
  id: string
  prompt: string
  hint?: string
  icon: string
}

export interface Answer {
  questionId: string
  response: string
  mode: AnswerMode
  timestamp: number
}

export interface RoleMatch {
  id: string
  title: string
  confidence: number
  summary: string
  keywords: string[]
}

export interface RoadmapStep {
  id: string
  title: string
  description: string
  effort: 'low' | 'medium' | 'high'
}

export interface JobRecommendation {
  id: string
  title: string
  company: string
  location: string
  salary: string
  matchReason: string
}


