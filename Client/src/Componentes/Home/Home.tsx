import { useState, useCallback } from 'react'
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
    title: 'Chat Hub',
    description: 'Full-stack real-time chat application with WebSocket rooms, online presence tracking, and persistent message history.',
    architecture: 'WebSocket gateway with Socket.IO rooms + REST API for auth & CRUD',
    technologies: ['React', 'NestJS', 'Socket.IO', 'Prisma', 'MySQL', 'Docker'],
    highlights: ['Real-time messaging via WebSocket', 'Room-based chat management', 'Online presence tracking', 'JWT auth with bcrypt', 'Dark/Light theme', 'Material Design UI'],
    githubUrl: 'https://github.com/Di3go0-0/chat-hub',
  },
  {
    title: 'Project Management API',
    description: 'RESTful API for managing projects, tasks, and teams with role-based access and auto-generated documentation.',
    architecture: 'Express + Prisma ORM with layered service/controller pattern',
    technologies: ['Express', 'TypeScript', 'Prisma', 'JWT', 'Swagger'],
    highlights: ['CRUD for projects, tasks & teams', 'JWT authentication', 'Prisma ORM migrations', 'Swagger auto-documentation'],
    githubUrl: 'https://github.com/Di3go0-0/ProjectManagement',
  },
  {
    title: 'API RESTful .NET',
    description: 'REST API built with .NET Core and Entity Framework demonstrating clean architecture patterns.',
    architecture: '.NET Core Web API with Entity Framework + Repository pattern',
    technologies: ['.NET Core', 'C#', 'Entity Framework', 'JWT', 'MySQL'],
    highlights: ['Entity Framework migrations', 'JWT authentication', 'Repository pattern', 'RESTful design'],
    githubUrl: 'https://github.com/Di3go0-0/LearnNET',
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
  onExecute?: (params: Record<string, string>) => void
  children: React.ReactNode
}

const Endpoint = ({ method, path, description, id, curl, params, onExecute, children }: EndpointProps) => {
  const [open, setOpen] = useState(false)
  const [tryMode, setTryMode] = useState(false)
  const [executed, setExecuted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [paramValues, setParamValues] = useState<Record<string, string>>({})

  const handleExecute = useCallback(() => {
    setLoading(true)
    onExecute?.(paramValues)
    setTimeout(() => {
      setLoading(false)
      setExecuted(true)
    }, 400)
  }, [paramValues, onExecute])

  const handleCancel = useCallback(() => {
    setTryMode(false)
    setExecuted(false)
    setLoading(false)
    setParamValues({})
    onExecute?.({})
  }, [onExecute])

  const handleClear = useCallback(() => {
    setExecuted(false)
    setLoading(false)
  }, [])

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
      <button className="endpoint-toggle" onClick={() => setOpen(!open)}>
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
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

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
                {executed && (
                  <button className="clear-btn" onClick={handleClear}>Clear</button>
                )}
              </div>
            )}
          </div>

          {curl && (
            <div className="curl-block">
              <div className="curl-header">Request</div>
              <pre className="curl-code">{buildCurl()}</pre>
            </div>
          )}

          {loading && (
            <div className="response-loading">
              <div className="loading-spinner" />
              <span>Loading response...</span>
            </div>
          )}

          {executed && !loading && (
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
  { id: 'projects', method: 'GET', path: '/projects' },
  { id: 'projects-oss', method: 'GET', path: '/projects?type=oss' },
  { id: 'skills', method: 'GET', path: '/skills' },
  { id: 'contact', method: 'POST', path: '/contact' },
]

const fullAboutResponse = {
  name: 'Diego Rincón',
  role: 'Backend Developer',
  stack: ['TypeScript', 'NestJS', '.NET', 'Rust'],
  databases: ['Oracle', 'PostgreSQL', 'MySQL', 'MongoDB', 'Redis'],
  aws: { s3: true, sqs: true, lambda: true, dynamodb: true },
  environment: { os: 'Arch Linux', wm: 'Hyprland', editor: 'Neovim', shell: 'Fish' },
  status: 'Systems & Computing Engineer',
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

export const Home = () => {
  const [projectQuery, setProjectQuery] = useState('')
  const [ossQuery, setOssQuery] = useState('')
  const [aboutField, setAboutField] = useState('')
  const [skillsCategory, setSkillsCategory] = useState('')

  const filteredApiProjects = filterProjects(apiProjects, projectQuery)
  const filteredOssProjects = filterProjects(ossProjects, ossQuery)
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
        </nav>
      </aside>

      <main className="api-content">
        <div className="api-topbar">
          <div className="server-select">
            <span className="server-label">Server</span>
            <span className="server-url">https://diego.dev</span>
          </div>
          <div className="auth-badge">
            <span className="auth-lock">&#128274;</span>
            Authorized
          </div>
        </div>

        <Endpoint
          method="GET"
          path="/about"
          description="Returns developer information"
          id="about"
          curl="curl -X GET https://diego.dev/about \
  -H 'Accept: application/json'"
          params={[
            { name: 'field', placeholder: 'e.g. stack, databases, aws', description: 'Filter response by field name' },
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
          path="/projects"
          description="Returns backend & full-stack projects"
          id="projects"
          curl={`curl -X GET https://diego.dev/projects \\
  -H 'Accept: application/json'`}
          params={[
            { name: 'q', placeholder: 'e.g. tenant, nestjs, production', description: 'Search projects by keyword' },
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
            <div className="response-block">
              <div className="response-header">
                <span className="status-code">200</span> OK &middot; 0 results
              </div>
              <JsonBlock data={{ results: [], query: projectQuery, message: 'No projects match your search' }} />
            </div>
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
            <div className="response-block">
              <div className="response-header">
                <span className="status-code">200</span> OK &middot; 0 results
              </div>
              <JsonBlock data={{ results: [], query: ossQuery, message: 'No projects match your search' }} />
            </div>
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
            { name: 'category', placeholder: 'e.g. languages, databases, aws', description: 'Filter by skill category' },
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
  -d '{"via": "linkedin"}'`}
        >
          <div className="response-block">
            <div className="response-header">
              <span className="status-code">200</span> OK
            </div>
            <JsonBlock data={{ message: 'Choose a contact method', status: 'ready' }} />
          </div>
          <div className="contact-links">
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
