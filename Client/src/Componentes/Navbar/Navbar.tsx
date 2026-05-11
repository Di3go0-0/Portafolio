import { Github } from 'lucide-react'
import './nav.css'

export const Navbar = () => {
  return (
    <nav className="navbar mobile-only" aria-label="Main navigation">
      <div className="navbar-container">
        <div className="navbar-content">
          <div className="navbar-logo">
            <a href="#about">Diego API</a>
          </div>
          <div className="navbar-links">
            <a href="https://github.com/Di3go0-0" target="_blank" rel="noopener noreferrer" className="github">
              <Github className="icon" aria-hidden="true" />
              <span className="sr-only">GitHub Profile</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
