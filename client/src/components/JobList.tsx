import type { JobRecommendation } from '../types/profile'

interface JobListProps {
  jobs: JobRecommendation[]
}

export const JobList = ({ jobs }: JobListProps) => {
  if (!jobs.length) {
    return <p className="hint">Jobs appear automatically after selecting a role.</p>
  }
  return (
    <div className="job-grid">
      {jobs.map((job) => (
        <article key={job.id} className="job-card">
          <header>
            <h4>{job.title}</h4>
            <p>{job.company}</p>
          </header>
          <p className="job-meta">
            📍 {job.location} • 💰 {job.salary}
          </p>
          <p>{job.matchReason}</p>
          <button className="ghost">View details</button>
        </article>
      ))}
    </div>
  )
}


