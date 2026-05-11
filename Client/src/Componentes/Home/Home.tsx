import './Home.css'
import { Skills } from '../Skills/Skills'
import { Footer } from '../Footer/Footer'
import { IProjectProps } from '../../Interfaces'
import { ProjectCard } from '../Projects/Project'

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

const aboutData = {
  name: 'Diego Rincón',
  role: 'Backend Developer',
  stack: ['Rust', 'TypeScript', 'NestJS', 'FastAPI', 'PostgreSQL', 'AWS'],
  os: 'Arch Linux',
  editor: 'Neovim',
  status: 'Systems & Computing Engineering Student',
  links: {
    github: 'https://github.com/Di3go0-0',
    linkedin: 'https://linkedin.com/in/di3go00',
  },
}

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

const sections = [
  { id: 'about', method: 'GET', path: '/about' },
  { id: 'projects', method: 'GET', path: '/projects' },
  { id: 'skills', method: 'GET', path: '/skills' },
  { id: 'contact', method: 'POST', path: '/contact' },
]

export const Home = () => {
  return (
    <div className="api-layout">
      <aside className="api-sidebar">
        <div className="sidebar-header">
          <span className="api-version">v1.0.0</span>
          <h2>Diego API</h2>
        </div>
        <nav className="sidebar-nav">
          {sections.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="sidebar-link">
              <span className={`method method-${s.method.toLowerCase()}`}>{s.method}</span>
              <span className="path">{s.path}</span>
            </a>
          ))}
        </nav>
      </aside>

      <main className="api-content">
        <section className="endpoint-section" id="about">
          <div className="endpoint-header">
            <span className="method method-get">GET</span>
            <span className="endpoint-path">/about</span>
            <span className="endpoint-desc">Returns developer information</span>
          </div>
          <div className="response-block">
            <div className="response-header">
              <span className="status-code">200</span> OK
            </div>
            <pre className="json-response">
{`{
  "name": "${aboutData.name}",
  "role": "${aboutData.role}",
  "stack": ${JSON.stringify(aboutData.stack, null, 4).replace(/\n/g, '\n  ')},
  "environment": {
    "os": "${aboutData.os}",
    "editor": "${aboutData.editor}"
  },
  "status": "${aboutData.status}"
}`}
            </pre>
          </div>
        </section>

        <section className="endpoint-section" id="projects">
          <div className="endpoint-header">
            <span className="method method-get">GET</span>
            <span className="endpoint-path">/projects</span>
            <span className="endpoint-desc">Returns all projects</span>
          </div>
          <div className="response-block">
            <div className="response-header">
              <span className="status-code">200</span> OK &middot; {projects.length} results
            </div>
          </div>
          <div className="projects-list">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} index={index} />
            ))}
          </div>
        </section>

        <section className="endpoint-section" id="skills">
          <div className="endpoint-header">
            <span className="method method-get">GET</span>
            <span className="endpoint-path">/skills?group=true</span>
            <span className="endpoint-desc">Returns skills grouped by category</span>
          </div>
          <Skills />
        </section>

        <section className="endpoint-section" id="contact">
          <div className="endpoint-header">
            <span className="method method-post">POST</span>
            <span className="endpoint-path">/contact</span>
            <span className="endpoint-desc">Get in touch</span>
          </div>
          <div className="contact-links">
            <a href={aboutData.links.linkedin} target="_blank" rel="noopener noreferrer" className="contact-btn">
              LinkedIn
            </a>
            <a href={aboutData.links.github} target="_blank" rel="noopener noreferrer" className="contact-btn">
              GitHub
            </a>
            <button onClick={downloadCV} className="contact-btn">
              Download CV
            </button>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  )
}
