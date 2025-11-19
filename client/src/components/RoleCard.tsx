import type { RoleMatch } from '../types/profile'

interface RoleCardProps {
  role: RoleMatch
}

export const RoleCard = ({ role }: RoleCardProps) => {
  return (
    <article className="role-card">
      <header>
        <p className="eyebrow">Match score</p>
        <span className="score-pill">{role.confidence}%</span>
      </header>
      <h3>{role.title}</h3>
      <p>{role.summary}</p>
      <div className="tag-list">
        {role.keywords.map((keyword) => (
          <span key={keyword} className="tag">
            {keyword}
          </span>
        ))}
      </div>
    </article>
  )
}


