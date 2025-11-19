import { JobList } from '../components/JobList'
import { RoadmapList } from '../components/RoadmapList'
import { RoleCard } from '../components/RoleCard'
import { useProfileFlow } from '../context/ProfileFlowContext'

export const ResultsOverlay = () => {
  const { status, roleMatches, roadmap, jobs, reset } = useProfileFlow()
  const visible = status === 'ready'

  if (!visible) return null

  return (
    <section className="results-overlay" role="dialog" aria-modal="true">
      <div className="results-panel">
        <header>
          <div>
            <p className="eyebrow">Your guidance hub</p>
            <h2>Based on your answers, here is a custom plan</h2>
          </div>
          <button className="ghost" onClick={reset}>
            Start another interview
          </button>
        </header>

        <div className="results-grid">
          <div>
            <h3>Top role matches</h3>
            <div className="role-grid">
              {roleMatches.map((role) => (
                <RoleCard key={role.id} role={role} />
              ))}
            </div>
          </div>

          <div>
            <h3>Learning roadmap</h3>
            <RoadmapList steps={roadmap} />
          </div>

          <div>
            <h3>Job recommendations</h3>
            <JobList jobs={jobs} />
          </div>
        </div>
      </div>
    </section>
  )
}


