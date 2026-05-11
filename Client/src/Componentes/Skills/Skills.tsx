import './Skills.css'
import { JsonBlock } from '../Json/Json'

const skillsData = {
  languages: ['TypeScript', 'Python', 'C#', 'Rust'],
  frameworks: ['NestJS', '.NET Core', 'Express'],
  databases: ['Oracle', 'PostgreSQL', 'MySQL', 'MongoDB', 'Redis'],
  aws: { s3: true, sqs: true, lambda: true, dynamodb: true },
  infrastructure: ['Docker', 'Linux (Arch)', 'Fish', 'Git'],
  tools: ['Neovim', 'Prisma', 'Swagger', 'Ratatui'],
}

export const Skills = () => {
  return (
    <div className="response-block">
      <div className="response-header">
        <span className="status-code">200</span> OK &middot; 6 categories
      </div>
      <JsonBlock data={skillsData} />
    </div>
  )
}
