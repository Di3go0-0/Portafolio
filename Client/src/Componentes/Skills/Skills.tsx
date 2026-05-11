import './Skills.css'
import { JsonBlock } from '../Json/Json'

const skillsData = {
  languages: ['Rust', 'TypeScript', 'Python', 'C#'],
  frameworks: ['NestJS', 'FastAPI', '.NET Core', 'Express'],
  databases: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis'],
  aws: ['S3', 'DynamoDB', 'SQS', 'Lambda'],
  infrastructure: ['Docker', 'Linux (Arch)', 'Bash', 'Git'],
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
