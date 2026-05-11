import './Project.css'
import { IProjectProps } from '../../Interfaces'
import { JsonBlock } from '../Json/Json'

export const ProjectCard = ({ title, description, architecture, technologies, highlights, githubUrl, index = 0 }: IProjectProps) => {
  const data = {
    name: title,
    description,
    architecture,
    stack: technologies,
    highlights,
  }

  return (
    <div className="api-project">
      <div className="response-block">
        <div className="response-header">
          <span className="status-code">200</span> projects[{index}]
          <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="project-github">
            GitHub ↗
          </a>
        </div>
        <JsonBlock data={data} />
      </div>
    </div>
  )
}
