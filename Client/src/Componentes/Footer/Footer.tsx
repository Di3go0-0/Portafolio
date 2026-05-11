import { Github, Linkedin } from 'lucide-react'
import './Footer.css'

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="social-icons">
          <a href="https://www.linkedin.com/in/di3go00/" target="_blank" rel="noopener noreferrer" className="social-icon-wrapper">
            <Linkedin className="social-icon" aria-hidden="true" />
            <span className="sr-only">LinkedIn</span>
          </a>
          <a href="https://github.com/Di3go0-0" target="_blank" rel="noopener noreferrer" className="social-icon-wrapper">
            <Github className="social-icon" aria-hidden="true" />
            <span className="sr-only">GitHub</span>
          </a>
        </div>
        <p className="copyright">Diego Rincon - &copy; {new Date().getFullYear()}</p>
      </div>
    </footer>
  )
}
