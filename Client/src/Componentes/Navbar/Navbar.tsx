import { Github } from 'lucide-react'
import { Link } from 'react-router-dom'
import './nav.css'

export const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <div className="navbar-logo">
            <Link to="/">Di3go0-0</Link>
          </div>

          <div className="links-container">
            <a
              href="#home"
              className="link"
            >
              Home
            </a>
            <a
              href="#about"
              className="link"
            >
              About
            </a>
            <a
              href="#projects"
              className="link"
            >
              Projects
            </a>
          </div>


          <div className="navbar-links md-show">
            <a
              href="https://github.com/Di3go0-0"
              target="_blank"
              rel="noopener noreferrer"
              className="github"
            >
              <Github className="icon" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
