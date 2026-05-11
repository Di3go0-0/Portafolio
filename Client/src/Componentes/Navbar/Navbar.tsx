import { Github } from 'lucide-react'
import './nav.css'

export const Navbar = () => {
  return (
    <nav className="navbar" aria-label="Main navigation">
      <div className="navbar-container">
        <div className="navbar-content">
          <div className="navbar-logo">
            <a href="#home">Di3go0-0</a>
          </div>

          <div className="links-container">
            <a
              href="#home"
              className="link"
            >
              Home
            </a>
            <a
              href="#projects"
              className="link"
            >
              Projects
            </a>
            <a
              href="#skills"
              className="link"
            >
              Skills
            </a>
          </div>

          <div className="navbar-links md-show">
            <a
              href="https://github.com/Di3go0-0"
              target="_blank"
              rel="noopener noreferrer"
              className="github"
            >
              <Github className="icon" aria-hidden="true" />
              <span className="sr-only">GitHub Profile</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
