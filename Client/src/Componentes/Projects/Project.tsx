import './Project.css'
import { IProjectProps } from '../../Interfaces'

export const ProjectCard = ({ title, description, architecture, technologies, highlights, githubUrl, index = 0 }: IProjectProps) => {
  return (
    <div className="api-project">
      <div className="response-block">
        <div className="response-header">
          <span className="status-code">200</span> projects[{index}]
          <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="project-github">
            GitHub ↗
          </a>
        </div>
        <pre className="json-response">
{`{
  "name": "${title}",
  "description": "${description}",
  "architecture": "${architecture}",
  "stack": ${JSON.stringify(technologies)},
  "highlights": ${JSON.stringify(highlights, null, 4).replace(/\n/g, '\n  ')}
}`}
        </pre>
      </div>
    </div>
  )
}
