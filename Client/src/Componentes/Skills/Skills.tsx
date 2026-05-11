import './Skills.css'
import { JsonBlock } from '../Json/Json'

const skillsData: Record<string, unknown> = {
  languages: ['TypeScript', 'Python', 'C#', 'Rust'],
  frameworks: ['NestJS', '.NET Core', 'Express'],
  databases: ['Oracle', 'PostgreSQL', 'MySQL', 'MongoDB', 'Redis'],
  aws: { s3: true, sqs: true, lambda: true, dynamodb: true },
  infrastructure: ['Docker', 'Linux (Arch)', 'Fish', 'Git'],
  tools: ['Neovim', 'Prisma', 'Swagger', 'Ratatui'],
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
