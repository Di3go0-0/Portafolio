import './Project.css'
import { IProjectProps } from '../../Interfaces'

export const ProjectCard = ({ title, description, architecture, technologies, highlights, githubUrl }: IProjectProps) => {
  return (
    <article className="project-card">
      <div className="project-header">
        <h3>{title}</h3>
        <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="github-link">
          GitHub
        </a>
      </div>

      <p className="project-description">{description}</p>

      <div className="project-architecture">
        <span className="arch-label">Architecture:</span> {architecture}
      </div>

      <div className="project-technologies">
        {technologies.map((tech, index) => (
          <span key={index} className="tech-badge">{tech}</span>
        ))}
      </div>

      <ul className="project-highlights">
        {highlights.map((highlight, index) => (
          <li key={index}>{highlight}</li>
        ))}
      </ul>
    </article>
  )
}
