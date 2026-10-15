import './Skills.css'
import { JsonBlock } from '../Json/Json'

const skillsData: Record<string, unknown> = {
  languages: ['TypeScript', 'JavaScript', 'SQL', 'C#', 'Rust'],
  backend: ['Node.js', 'NestJS', 'Express', 'TypeORM', 'Jest', 'Swagger/OpenAPI', '.NET'],
  architecture: ['Microservices', 'DDD', 'Hexagonal', 'Event-Driven', 'Serverless', 'SAGA', 'Outbox', 'gRPC', 'REST'],
  cloud: { aws: ['Lambda', 'SQS'], azure: ['Service Bus', 'Azure DevOps'] },
  databases: ['PostgreSQL', 'SQL Server', 'MySQL', 'Oracle DB', 'MongoDB', 'Redis'],
  devops: ['Docker', 'CI/CD', 'Git', 'Linux (Arch)'],
  security: ['JWT', 'RBAC', 'OWASP'],
  practices: ['SOLID', 'Clean Code', 'Scrum'],
  tools: ['Neovim', 'Fish', 'Ratatui'],
}

const filterSkills = (category: string): object => {
  if (!category.trim()) return skillsData
  const q = category.toLowerCase()
  const matched: Record<string, unknown> = {}
  for (const [k, v] of Object.entries(skillsData)) {
    if (k.toLowerCase().includes(q)) {
      matched[k] = v
    }
  }
  if (Object.keys(matched).length === 0) {
    return { error: 'No matching categories', available: Object.keys(skillsData) }
  }
  return matched
}

export const Skills = ({ category = '' }: { category?: string }) => {
  const data = filterSkills(category)
  const keys = Object.keys(data)
  const hasError = 'error' in data

  return (
    <div className="response-block">
      <div className="response-header">
        <span className="status-code">200</span> OK &middot; {hasError ? '0 matches' : `${keys.length} categories`}
      </div>
      <JsonBlock data={data} />
    </div>
  )
}
