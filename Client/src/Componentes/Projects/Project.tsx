import './Project.css'
import { IProjectProps } from '../../Interfaces'


export const ProjectCard = (Project: IProjectProps) => {
  return (
    <article className="project-card">
      <div className="project-image">
        <img src={Project.image} alt={Project.title} />
      </div>
      <div className="project-content">
        <h3>{Project.title}</h3>
        <div className="description">
          <p>{Project.description}</p>
        </div>
        <div className="technologies">
          {Project.technologies.map((tech, index) => (
            <div key={index} className="tech-item">
              <img src={tech.icon} alt={tech.name} title={tech.name} />
            </div>
          ))}
        </div>
        <a href={Project.githubUrl} className="github-link" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      </div>
    </article>
  )
}

