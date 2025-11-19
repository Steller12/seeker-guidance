import type {
  Answer,
  JobRecommendation,
  RoadmapStep,
  RoleMatch,
} from '../types/profile'

const roleCatalog: Array<Omit<RoleMatch, 'confidence'>> = [
  {
    id: 'field-sales',
    title: 'Field Sales Executive',
    summary:
      'Meet local shop owners, explain offers, and help them use simple apps for ordering.',
    keywords: ['sales', 'customer', 'outdoor', 'communication', 'targets'],
  },
  {
    id: 'delivery',
    title: 'Last-Mile Delivery Partner',
    summary: 'Deliver packages using bike with flexible timings and incentives.',
    keywords: ['driving', 'bike', 'delivery', 'outdoor', 'logistics'],
  },
  {
    id: 'data-entry',
    title: 'Junior Data Entry Associate',
    summary: 'Work with spreadsheets, update reports, and support operations teams.',
    keywords: ['computer', 'typing', 'excel', 'office', 'data'],
  },
  {
    id: 'store-ops',
    title: 'Retail Store Operator',
    summary: 'Manage shelves, billing, and customer queries inside modern stores.',
    keywords: ['retail', 'customer', 'billing', 'inventory', 'sales'],
  },
]

const jobPool: Record<string, JobRecommendation[]> = {
  'field-sales': [
    {
      id: 'job-1',
      title: 'Sales Promoter',
      company: 'BrightMart',
      location: 'Bengaluru',
      salary: '₹18-22K',
      matchReason: 'Preference for outdoor customer-facing roles.',
    },
  ],
  delivery: [
    {
      id: 'job-2',
      title: 'Delivery Partner (Electric Bike)',
      company: 'SwiftDrop',
      location: 'Hyderabad',
      salary: '₹20-26K + incentives',
      matchReason: 'Good fit for driving experience and time flexibility.',
    },
  ],
  'data-entry': [
    {
      id: 'job-3',
      title: 'Back Office Associate',
      company: 'LedgerPro',
      location: 'Remote / Pune',
      salary: '₹16-20K',
      matchReason: 'Comfort with computers and interest in indoor work.',
    },
  ],
  'store-ops': [
    {
      id: 'job-4',
      title: 'Retail Crew Member',
      company: 'FreshBasket',
      location: 'Mumbai',
      salary: '₹17-21K',
      matchReason: 'People-friendly nature aligns with store operations.',
    },
  ],
}

const roadmapCatalog: Record<string, RoadmapStep[]> = {
  'field-sales': [
    {
      id: 'fs-1',
      title: 'Customer conversation basics',
      description: 'Practice introductions and explaining offers in local language.',
      effort: 'low',
    },
    {
      id: 'fs-2',
      title: 'Smartphone CRM usage',
      description: 'Learn to record visits and leads using popular CRM apps.',
      effort: 'medium',
    },
  ],
  delivery: [
    {
      id: 'dl-1',
      title: 'Navigation mastery',
      description: 'Use Google Maps shortcuts and delivery app tips.',
      effort: 'low',
    },
    {
      id: 'dl-2',
      title: 'Safety & maintenance',
      description: 'Basic bike upkeep and safe riding guidelines.',
      effort: 'medium',
    },
  ],
  'data-entry': [
    {
      id: 'de-1',
      title: 'Typing speed booster',
      description: '15-min daily drills to reach 30 wpm.',
      effort: 'low',
    },
    {
      id: 'de-2',
      title: 'Excel for operations',
      description: 'Short videos on filters, formulas, and data cleanup.',
      effort: 'medium',
    },
  ],
  'store-ops': [
    {
      id: 'so-1',
      title: 'POS system basics',
      description: 'Hands-on tutorial on billing screens and barcode scanners.',
      effort: 'low',
    },
    {
      id: 'so-2',
      title: 'Inventory storytelling',
      description: 'Learn how to track fast-moving items and replenish smartly.',
      effort: 'medium',
    },
  ],
}

const keywordScore = (answer: string, keywords: string[]) => {
  const normalized = answer.toLowerCase()
  return keywords.reduce((score, keyword) => {
    return normalized.includes(keyword) ? score + 1 : score
  }, 0)
}

export const generateRoleMatches = (answers: Answer[]): RoleMatch[] => {
  return roleCatalog
    .map((role) => {
      const totalScore = answers.reduce(
        (sum, answer) => sum + keywordScore(answer.response, role.keywords),
        0,
      )
      const normalized = Math.min(100, 40 + totalScore * 15)
      return { ...role, confidence: normalized }
    })
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 3)
}

export const buildRoadmap = (roleId: string): RoadmapStep[] => {
  return roadmapCatalog[roleId] ?? []
}

export const recommendJobs = (roleId: string): JobRecommendation[] => {
  return jobPool[roleId] ?? []
}


