import './Home.css'
import { Terminal } from '../Terminal/Terminal'
import { Skills } from '../Skills/Skills'
import { Footer } from '../Footer/Footer'
import { Button } from '../Button/Button'
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

const openPage = (url: string) => {
  window.open(url, '_blank')
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

export const Home = () => {
  return (
    <div className="Home">
      <section className="hero-section" id="home">
        <Terminal />
        <div className="hero-actions">
          <Button parentMethod={() => openPage('https://www.linkedin.com/in/di3go00/')}>
            LinkedIn
          </Button>
          <Button parentMethod={() => openPage('https://github.com/Di3go0-0')}>
            GitHub
          </Button>
          <Button parentMethod={downloadCV}>
            Download CV
          </Button>
        </div>
      </section>

      <section className="projects" id="projects">
        <h2 className="section-title">Projects</h2>
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </section>

      <section id="skills">
        <Skills />
      </section>

      <section id="footer">
        <Footer />
      </section>
    </div>
  )
}
