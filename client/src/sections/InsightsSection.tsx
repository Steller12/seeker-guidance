import { JobList } from '../components/JobList'
import { RoadmapList } from '../components/RoadmapList'
import { RoleCard } from '../components/RoleCard'
import { useProfileFlow } from '../context/ProfileFlowContext'

export const InsightsSection = () => {
  const { roleMatches, roadmap, jobs, status, reset } = useProfileFlow()
  const ready = status === 'ready'

  return (
    <section className="panel insights">
      <header className="insights-header">
        <div>
          <p className="eyebrow">Your guidance hub</p>
          <h2>{ready ? 'Recommended path' : 'Complete the questions to unlock suggestions'}</h2>
        </div>
        {ready && (
          <button className="ghost" onClick={reset}>
            Start over
          </button>
        )}
      </header>

      <div className="insights-grid">
        <div>
          <h3>Top role matches</h3>
          <div className="role-grid">
            {roleMatches.map((role) => (
              <RoleCard key={role.id} role={role} />
            ))}
            {!roleMatches.length && <p className="hint">We will shortlist roles soon.</p>}
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
    </section>
  )
}


