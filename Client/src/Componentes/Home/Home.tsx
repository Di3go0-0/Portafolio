import { useState, useCallback, useEffect } from 'react'
import './Home.css'
import { Skills } from '../Skills/Skills'
import { Footer } from '../Footer/Footer'
import { IProjectProps } from '../../Interfaces'
import { ProjectCard } from '../Projects/Project'
import { JsonBlock } from '../Json/Json'

const projects: IProjectProps[] = [
  {
    title: 'Tenant Platform API',
    description: 'Production-ready multi-tenant SaaS backend with tenant isolation, access control, usage limits, and audit logging.',
    architecture: 'Guard chain: JWT → Tenant isolation → Rate limiting → RBAC',
    technologies: ['NestJS', 'TypeScript', 'PostgreSQL', 'Redis', 'Docker', 'JWT'],
    highlights: ['38+ REST endpoints', '50+ unit tests', 'Refresh token rotation', 'Redis rate limiting per tenant', 'Raw SQL (no ORM)', 'Subscription plans with usage limits'],
    githubUrl: 'https://github.com/Di3go0-0/tenant-platform-api',
  },
  {
    title: 'Auth Microservice',
    description: 'Authentication microservice with vertical fragmentation across three logical databases and SAGA compensations for distributed writes.',
    architecture: 'NestJS AuthService orchestrating 3 TypeORM connections (emails / passwords / links) with SAGA compensating actions',
    technologies: ['NestJS', 'TypeScript', 'PostgreSQL', 'TypeORM', 'Docker', 'Swagger'],
    highlights: ['Vertical fragmentation: 3 isolated databases', 'SAGA pattern with compensating actions', 'One service per data domain', 'Hashed credentials isolated from identities', 'Docker Compose with DB init scripts', 'Swagger UI'],
    githubUrl: 'https://github.com/Di3go0-0/auth-microservice',
  },
  {
    title: 'Chat Hub',
    description: 'Full-stack real-time chat application with WebSocket rooms, online presence tracking, and persistent message history.',
    architecture: 'WebSocket gateway with Socket.IO rooms + REST API for auth & CRUD',
    technologies: ['React', 'NestJS', 'Socket.IO', 'Prisma', 'MySQL', 'Docker'],
    highlights: ['Real-time messaging via WebSocket', 'Room-based chat management', 'Online presence tracking', 'JWT auth with bcrypt', 'Dark/Light theme', 'Material Design UI'],
    githubUrl: 'https://github.com/Di3go0-0/chat-hub',
  },
  {
    title: 'restui',
    description: 'Terminal UI HTTP client with full Vim keybindings. A Vim-friendly alternative to Postman/Insomnia that runs entirely in the terminal.',
    architecture: 'Rust TUI with ratatui + async HTTP via reqwest + custom Vim modal editor',
    technologies: ['Rust', 'Ratatui', 'Tokio', 'Reqwest'],
    highlights: ['Open source', 'Full Vim modal editing (normal/insert/visual)', 'Request chaining with variable extraction', '.http file collections', 'Syntax-highlighted responses', 'Neovim plugin integration', 'Environment profiles', 'Fuzzy matching autocomplete'],
    githubUrl: 'https://github.com/Di3go0-0/restui',
  },
  {
    title: 'dbtui',
    description: 'Terminal-based database client combining DBeaver\'s depth with lazygit\'s UX. Browse schemas, write SQL, and explore data from the terminal.',
    architecture: 'Rust TUI with ratatui + sqlx for multi-DB support + encrypted credential storage',
    technologies: ['Rust', 'Ratatui', 'SQLx', 'Tokio'],
    highlights: ['Open source', 'Multi-DB: PostgreSQL, MySQL, Oracle', 'Vim-style SQL editor with syntax highlighting', 'Schema explorer (tables, views, packages, functions)', 'Smart query execution at cursor', 'Encrypted credentials (ChaCha20 + Argon2)', 'Multiple result tabs', '6 built-in themes'],
    githubUrl: 'https://github.com/Di3go0-0/dbtui',
  },
]

interface ExperienceEntry {
  company: string
  role: string
  period: { from: string; to: string }
  location: string
  domain: string
  stack: string[]
  highlights: string[]
}

const experience: ExperienceEntry[] = [
  {
    company: 'LinkTic',
    role: 'Backend Developer',
    period: { from: '2026-05', to: 'present' },
    location: 'Pereira, Colombia (Hybrid)',
    domain: 'Financial platform for judicial deposits',
    stack: ['NestJS', 'TypeScript', 'gRPC', 'Azure Service Bus', 'SQL Server', 'MySQL', 'PostgreSQL', 'Docker', 'Azure DevOps'],
    highlights: [
      'Multiple microservices built with DDD / hexagonal architecture',
      'Inter-service communication via gRPC and event-driven messaging over Azure Service Bus',
      'SAGA and Outbox patterns for eventual consistency in distributed transactions',
      'Migrations, seeds and complex queries modeled around financial business rules',
      'Dockerized deployments through Azure DevOps CI/CD pipelines across DEV, QA and PROD',
    ],
  },
  {
    company: 'Universidad Tecnológica de Pereira',
    role: 'Backend Developer',
    period: { from: '2024-01', to: '2026-05' },
    location: 'Pereira, Colombia',
    domain: 'Institutional academic systems',
    stack: ['NestJS', 'TypeScript', 'Oracle DB', 'PostgreSQL', 'Jest', 'Swagger', 'Docker'],
    highlights: [
      'Designed microservices for critical institutional systems with JWT auth and role-based access',
      'Co-led the Internship Management Portal, automating the student-company workflow',
      'Optimized SQL queries and data models on Oracle and PostgreSQL for the Institutional Analytics Dashboard',
      'Built modules for the Deans academic system and the grading system, ensuring data integrity',
      'Jest coverage above 80% on critical modules, Swagger documentation, Scrum',
    ],
  },
  {
    company: 'Freelance',
    role: 'Full Stack Developer (Backend focus)',
    period: { from: '2022-01', to: '2023-12' },
    location: 'Remote',
    domain: 'E-commerce, authentication and management systems',
    stack: ['NestJS', 'Express', 'TypeScript', 'PostgreSQL', 'MongoDB', 'MySQL', 'AWS Lambda', 'AWS SQS', 'Docker'],
    highlights: [
      'Catalog, cart and payment APIs for e-commerce platforms',
      'Serverless async order processing with AWS Lambda and SQS, decoupled from the main API',
      'Authentication & authorization microservice with roles and permissions (JWT, RBAC, OWASP)',
      'Gym management app with decision-making reports; Docker and CI/CD deployments',
    ],
  },
]

const downloadCV = () => {
  const link = document.createElement('a')
  import('../../Resources/PDF/cv.pdf').then((module) => {
    link.href = module.default
    link.download = 'CV_Diego_Rincon.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  })
}

interface ParamDef {
  name: string
  placeholder: string
  description: string
}

interface EndpointProps {
  method: string
  path: string
  description: string
  id: string
  curl?: string
  params?: ParamDef[]
  defaultOpen?: boolean
  onExecute?: (params: Record<string, string>) => void
  children: React.ReactNode
}

const Endpoint = ({ method, path, description, id, curl, params, defaultOpen = false, onExecute, children }: EndpointProps) => {
  const [open, setOpen] = useState(defaultOpen)
  const [tryMode, setTryMode] = useState(false)
  const [loading, setLoading] = useState(false)
  const [paramValues, setParamValues] = useState<Record<string, string>>({})

  const handleExecute = useCallback(() => {
    setLoading(true)
    setTimeout(() => {
      onExecute?.(paramValues)
      setLoading(false)
    }, 400)
  }, [paramValues, onExecute])

  const handleCancel = useCallback(() => {
    setTryMode(false)
    setLoading(false)
    setParamValues({})
    onExecute?.({})
  }, [onExecute])

  const buildCurl = () => {
    if (!curl) return ''
    let result = curl
    if (params) {
      const filled = Object.entries(paramValues).filter(([, v]) => v.trim())
      if (filled.length > 0) {
        const queryStr = filled.map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join('&')
        result = result.replace(/(https:\/\/diego\.dev\/[^\s'\\]+)/, (match) => {
          return match.includes('?') ? `${match}&${queryStr}` : `${match}?${queryStr}`
        })
      }
    }
    return result
  }

  return (
    <section className="endpoint-section" id={id}>
      <button className="endpoint-toggle" onClick={() => setOpen(!open)} aria-expanded={open}>
        <div className="endpoint-header">
          <span className={`method method-${method.toLowerCase()}`}>{method}</span>
          <span className="endpoint-path">{path}</span>
          <span className="endpoint-desc">{description}</span>
        </div>
        <span className={`chevron ${open ? 'open' : ''}`}>&#9662;</span>
      </button>
      {open && (
        <div className="endpoint-body">
          {params && params.length > 0 && (
            <div className="params-section">
              <div className="params-header">Parameters</div>
              <div className="params-table">
                {params.map((p) => (
                  <div key={p.name} className="param-row">
                    <div className="param-info">
                      <span className="param-name">{p.name}</span>
                      <span className="param-type">string</span>
                      <span className="param-desc">{p.description}</span>
                    </div>
                    {tryMode && (
                      <input
                        type="text"
                        className="param-input"
                        placeholder={p.placeholder}
                        value={paramValues[p.name] || ''}
                        onChange={(e) => setParamValues({ ...paramValues, [p.name]: e.target.value })}
                        onKeyDown={(e) => { if (e.key === 'Enter') handleExecute() }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {params && params.length > 0 && (
            <div className="tryout-bar">
              {!tryMode ? (
                <button className="tryout-btn" onClick={() => setTryMode(true)}>
                  Try it out
                </button>
              ) : (
                <div className="tryout-actions">
                  <button className="execute-btn" onClick={handleExecute} disabled={loading}>
                    {loading ? 'Sending...' : 'Execute'}
                  </button>
                  <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
                </div>
              )}
            </div>
          )}

          {curl && (
            <div className="curl-block">
              <div className="curl-header">Request</div>
              <pre className="curl-code">{buildCurl()}</pre>
            </div>
          )}

          {loading ? (
            <div className="response-loading">
              <div className="loading-spinner" />
              <span>Loading response...</span>
            </div>
          ) : (
            <div className="response-wrapper">
              {children}
            </div>
          )}
        </div>
      )}
    </section>
  )
}

const sections = [
  { id: 'about', method: 'GET', path: '/about' },
  { id: 'experience', method: 'GET', path: '/experience' },
  { id: 'projects', method: 'GET', path: '/projects' },
  { id: 'projects-oss', method: 'GET', path: '/projects?type=oss' },
  { id: 'skills', method: 'GET', path: '/skills' },
  { id: 'contact', method: 'POST', path: '/contact' },
]

const fullAboutResponse = {
  name: 'Juan Diego Rincón Franco',
  role: 'Backend Developer',
  current: 'Backend Developer @ LinkTic',
  location: 'Pereira, Colombia',
  experience: '~5 years',
  stack: ['TypeScript', 'Node.js', 'NestJS', 'SQL'],
  architecture: ['Microservices', 'DDD', 'Hexagonal', 'Event-Driven', 'Serverless', 'SAGA', 'Outbox', 'gRPC', 'REST'],
  databases: ['PostgreSQL', 'SQL Server', 'MySQL', 'Oracle', 'MongoDB', 'Redis'],
  cloud: { aws: ['Lambda', 'SQS'], azure: ['Service Bus', 'Azure DevOps'] },
  open_source: ['restui', 'dbtui'],
  education: 'Systems & Computing Engineer · Universidad Tecnológica de Pereira (2026)',
  languages: { es: 'native', en: 'B1' },
  environment: { os: 'Arch Linux', wm: 'Hyprland', editor: 'Neovim', shell: 'Fish' },
}

const ossProjects = projects.filter(p => p.highlights.includes('Open source'))
const apiProjects = projects.filter(p => !p.highlights.includes('Open source'))

const filterProjects = (list: IProjectProps[], query: string): IProjectProps[] => {
  if (!query.trim()) return list
  const q = query.toLowerCase()
  return list.filter(p =>
    p.title.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q) ||
    p.architecture.toLowerCase().includes(q) ||
    p.technologies.some(t => t.toLowerCase().includes(q)) ||
    p.highlights.some(h => h.toLowerCase().includes(q))
  )
}

const filterExperience = (list: ExperienceEntry[], query: string): ExperienceEntry[] => {
  if (!query.trim()) return list
  const q = query.toLowerCase()
  return list.filter(e =>
    e.company.toLowerCase().includes(q) ||
    e.role.toLowerCase().includes(q) ||
    e.domain.toLowerCase().includes(q) ||
    e.stack.some(t => t.toLowerCase().includes(q)) ||
    e.highlights.some(h => h.toLowerCase().includes(q))
  )
}

const themes = [
  { id: 'catppuccin', label: 'Catppuccin Mocha' },
  { id: 'dracula', label: 'Dracula' },
  { id: 'nord', label: 'Nord' },
  { id: 'tokyo-night', label: 'Tokyo Night' },
  { id: 'gruvbox', label: 'Gruvbox Dark' },
  { id: 'one-dark', label: 'One Dark Pro' },
  { id: 'rose-pine', label: 'Rosé Pine' },
]

const filterAbout = (field: string): object => {
  if (!field.trim()) return fullAboutResponse
  const key = field.toLowerCase()
  const matched: Record<string, unknown> = {}
  for (const [k, v] of Object.entries(fullAboutResponse)) {
    if (k.toLowerCase().includes(key)) {
      matched[k] = v
    }
  }
  if (Object.keys(matched).length === 0) {
    return { error: 'No matching fields', available_fields: Object.keys(fullAboutResponse) }
  }
  return matched
}

const EmptyResult = ({ query }: { query: string }) => (
  <div className="response-block">
    <div className="response-header">
      <span className="status-code">200</span> OK &middot; 0 results
    </div>
    <JsonBlock data={{ results: [], query, message: 'No entries match your search' }} />
  </div>
)

export const Home = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem('portfolio-theme') || 'catppuccin')
  const [projectQuery, setProjectQuery] = useState('')
  const [ossQuery, setOssQuery] = useState('')
  const [experienceQuery, setExperienceQuery] = useState('')
  const [aboutField, setAboutField] = useState('')
  const [skillsCategory, setSkillsCategory] = useState('')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  const filteredApiProjects = filterProjects(apiProjects, projectQuery)
  const filteredOssProjects = filterProjects(ossProjects, ossQuery)
  const filteredExperience = filterExperience(experience, experienceQuery)
  const aboutResponse = filterAbout(aboutField)

  return (
    <div className="api-layout">
      <aside className="api-sidebar">
        <div className="sidebar-header">
          <span className="api-version">v1.0.0</span>
          <h2>Diego API</h2>
          <p className="sidebar-sub">Backend Developer Portfolio</p>
        </div>
        <div className="sidebar-section-label">Endpoints</div>
        <nav className="sidebar-nav">
          {sections.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="sidebar-link">
              <span className={`method method-${s.method.toLowerCase()}`}>{s.method}</span>
              <span className="path">{s.path}</span>
            </a>
          ))}
        </nav>
        <div className="sidebar-section-label">Links</div>
        <nav className="sidebar-nav">
          <a href="https://github.com/Di3go0-0" target="_blank" rel="noopener noreferrer" className="sidebar-link">
            <span className="sidebar-icon">↗</span>
            <span className="path">GitHub</span>
          </a>
          <a href="https://linkedin.com/in/di3go00" target="_blank" rel="noopener noreferrer" className="sidebar-link">
            <span className="sidebar-icon">↗</span>
            <span className="path">LinkedIn</span>
          </a>
          <button onClick={downloadCV} className="sidebar-link sidebar-button">
            <span className="sidebar-icon">↓</span>
            <span className="path">Download CV</span>
          </button>
        </nav>
      </aside>

      <main className="api-content">
        <div className="api-topbar">
          <div className="server-select">
            <span className="server-label">Server</span>
            <span className="server-url">https://diego.dev</span>
          </div>
          <div className="topbar-right">
            <div className="theme-selector">
              <span className="theme-label">Theme</span>
              <select
                className="theme-select"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
              >
                {themes.map((t) => (
                  <option key={t.id} value={t.id}>{t.label}</option>
                ))}
              </select>
            </div>
            <div className="auth-badge">
              <span className="auth-lock">&#128274;</span>
              Authorized
            </div>
          </div>
        </div>

        <header className="api-intro">
          <h1 className="intro-name">Juan Diego Rincón Franco</h1>
          <p className="intro-headline">
            Backend Developer · NestJS · Node.js · TypeScript · Microservices · Cloud (AWS / Azure)
          </p>
          <p className="intro-summary">
            Systems Engineer with ~5 years building microservices and distributed systems.
            DDD / hexagonal architecture, gRPC, event-driven messaging, SAGA and Outbox patterns
            on financial platforms. Currently at LinkTic.
          </p>
        </header>

        <Endpoint
          method="GET"
          path="/about"
          description="Returns developer information"
          id="about"
          defaultOpen
          curl="curl -X GET https://diego.dev/about \
  -H 'Accept: application/json'"
          params={[
            { name: 'field', placeholder: 'e.g. stack, databases, cloud', description: 'Filter response by field name' },
          ]}
          onExecute={(p) => setAboutField(p.field || '')}
        >
          <div className="response-block">
            <div className="response-header">
              <span className="status-code">200</span> OK
            </div>
            <JsonBlock data={aboutResponse} />
          </div>
        </Endpoint>

        <Endpoint
          method="GET"
          path="/experience"
          description="Returns professional experience"
          id="experience"
          defaultOpen
          curl={`curl -X GET https://diego.dev/experience \\
  -H 'Accept: application/json'`}
          params={[
            { name: 'q', placeholder: 'e.g. linktic, grpc, oracle', description: 'Search experience by company, stack or keyword' },
          ]}
          onExecute={(p) => setExperienceQuery(p.q || '')}
        >
          {filteredExperience.length > 0 ? (
            <>
              <div className="response-block">
                <div className="response-header">
                  <span className="status-code">200</span> OK &middot; {filteredExperience.length} results
                </div>
              </div>
              <div className="projects-list">
                {filteredExperience.map((entry, index) => (
                  <div className="api-project" key={entry.company}>
                    <div className="response-block">
                      <div className="response-header">
                        <span className="status-code">200</span> experience[{index}]
                        <span className="experience-period">
                          {entry.period.from} → {entry.period.to}
                        </span>
                      </div>
                      <JsonBlock data={entry} />
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <EmptyResult query={experienceQuery} />
          )}
        </Endpoint>

        <Endpoint
          method="GET"
          path="/projects"
          description="Returns backend & full-stack projects"
          id="projects"
          curl={`curl -X GET https://diego.dev/projects \\
  -H 'Accept: application/json'`}
          params={[
            { name: 'q', placeholder: 'e.g. tenant, saga, websocket', description: 'Search projects by keyword' },
          ]}
          onExecute={(p) => setProjectQuery(p.q || '')}
        >
          {filteredApiProjects.length > 0 ? (
            <>
              <div className="response-block">
                <div className="response-header">
                  <span className="status-code">200</span> OK &middot; {filteredApiProjects.length} results
                </div>
              </div>
              <div className="projects-list">
                {filteredApiProjects.map((project, index) => (
                  <ProjectCard key={project.title} {...project} index={index} />
                ))}
              </div>
            </>
          ) : (
            <EmptyResult query={projectQuery} />
          )}
        </Endpoint>

        <Endpoint
          method="GET"
          path="/projects?type=oss"
          description="Returns open source projects"
          id="projects-oss"
          curl={`curl -X GET 'https://diego.dev/projects?type=oss' \\
  -H 'Accept: application/json'`}
          params={[
            { name: 'q', placeholder: 'e.g. rust, vim, database', description: 'Search OSS projects by keyword' },
          ]}
          onExecute={(p) => setOssQuery(p.q || '')}
        >
          {filteredOssProjects.length > 0 ? (
            <>
              <div className="response-block">
                <div className="response-header">
                  <span className="status-code">200</span> OK &middot; {filteredOssProjects.length} results
                </div>
              </div>
              <div className="projects-list">
                {filteredOssProjects.map((project, index) => (
                  <ProjectCard key={project.title} {...project} index={index} />
                ))}
              </div>
            </>
          ) : (
            <EmptyResult query={ossQuery} />
          )}
        </Endpoint>

        <Endpoint
          method="GET"
          path="/skills?group=true"
          description="Returns skills grouped by category"
          id="skills"
          curl={`curl -X GET 'https://diego.dev/skills?group=true' \\
  -H 'Accept: application/json'`}
          params={[
            { name: 'category', placeholder: 'e.g. architecture, databases, cloud', description: 'Filter by skill category' },
          ]}
          onExecute={(p) => setSkillsCategory(p.category || '')}
        >
          <Skills category={skillsCategory} />
        </Endpoint>

        <Endpoint
          method="POST"
          path="/contact"
          description="Get in touch"
          id="contact"
          curl={`curl -X POST https://diego.dev/contact \\
  -H 'Content-Type: application/json' \\
  -d '{"via": "email"}'`}
        >
          <div className="response-block">
            <div className="response-header">
              <span className="status-code">200</span> OK
            </div>
            <JsonBlock data={{
              status: 'ready',
              email: 'juandiegorinconfranco@gmail.com',
              linkedin: 'linkedin.com/in/di3go00',
              github: 'github.com/Di3go0-0',
              location: 'Pereira, Colombia',
            }} />
          </div>
          <div className="contact-links">
            <a href="mailto:juandiegorinconfranco@gmail.com" className="contact-btn">
              Email
            </a>
            <a href="https://linkedin.com/in/di3go00" target="_blank" rel="noopener noreferrer" className="contact-btn">
              LinkedIn
            </a>
            <a href="https://github.com/Di3go0-0" target="_blank" rel="noopener noreferrer" className="contact-btn">
              GitHub
            </a>
            <button onClick={downloadCV} className="contact-btn">
              Download CV
            </button>
          </div>
        </Endpoint>

        <Footer />
      </main>
    </div>
  )
}
