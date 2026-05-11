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
