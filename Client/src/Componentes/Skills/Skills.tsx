import './Skills.css'

interface SkillCategory {
  label: string
  skills: string[]
}

const categories: SkillCategory[] = [
  { label: 'Languages', skills: ['TypeScript', 'Python', 'C#', 'JavaScript'] },
  { label: 'Frameworks', skills: ['NestJS', 'FastAPI', '.NET Core', 'Express'] },
  { label: 'Databases', skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis'] },
  { label: 'Infrastructure', skills: ['Docker', 'Linux', 'Bash', 'Git'] },
  { label: 'Tools', skills: ['Prisma', 'Swagger', 'JWT', 'Neovim'] },
]

export const Skills = () => {
  return (
    <section className="skills-section">
      <h2 className="section-title">Skills</h2>
      <div className="skills-grid">
        {categories.map((cat) => (
          <div key={cat.label} className="skill-category">
            <h3 className="category-label">{cat.label}</h3>
            <div className="category-skills">
              {cat.skills.map((skill) => (
                <span key={skill} className="skill-badge">{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
