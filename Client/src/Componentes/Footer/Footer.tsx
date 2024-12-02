import { Github, Linkedin } from 'lucide-react'
import './Footer.css'

import avatar from '../../Resources/IMG/about_me.gif'



export function Footer() {

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="avatar">
          <img
            src={avatar}
            alt="Avatar"
            className="avatar-image"
          />
        </div>
        <div className="social-section">
          <div className="social-icons">

            <a
              href="https://www.linkedin.com/in/di3go00/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-wrapper"
            >
              <Linkedin className="social-icon" />
            </a>
            <a
              href="https://github.com/Di3go0-0"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-wrapper"
            >
              <Github className="social-icon" />
            </a>

          </div>
          <p className="copyright">Diego Rincon - ©Copyright 2024</p>
        </div>
      </div>
    </footer>
  )
}
