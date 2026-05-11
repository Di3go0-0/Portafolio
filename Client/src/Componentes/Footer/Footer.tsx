import './Footer.css'

export function Footer() {
  return (
    <footer className="api-footer">
      <div className="footer-divider" />
      <div className="footer-content">
        <div className="footer-left">
          <span className="footer-brand">Diego API</span>
          <span className="footer-version">v1.0.0</span>
          <span className="footer-separator">&middot;</span>
          <span className="footer-status">All systems operational</span>
        </div>
        <div className="footer-links">
          <a href="https://github.com/Di3go0-0" target="_blank" rel="noopener noreferrer" className="footer-link">
            GitHub
          </a>
          <span className="footer-separator">&middot;</span>
          <a href="https://linkedin.com/in/di3go00" target="_blank" rel="noopener noreferrer" className="footer-link">
            LinkedIn
          </a>
        </div>
        <div className="footer-right">
          <span className="footer-copy">&copy; {new Date().getFullYear()} Diego Rincon</span>
        </div>
      </div>
    </footer>
  )
}
