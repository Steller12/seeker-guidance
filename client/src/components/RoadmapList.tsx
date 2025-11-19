import type { RoadmapStep } from '../types/profile'

interface RoadmapListProps {
  steps: RoadmapStep[]
}

export const RoadmapList = ({ steps }: RoadmapListProps) => {
  if (!steps.length) {
    return <p className="hint">Roadmap will unlock after you finish the questions.</p>
  }
  return (
    <ol className="roadmap-list">
      {steps.map((step) => (
        <li key={step.id}>
          <div>
            <h4>{step.title}</h4>
            <p>{step.description}</p>
          </div>
          <span className={`pill effort-${step.effort}`}>{step.effort} effort</span>
        </li>
      ))}
    </ol>
  )
}


