import { useEffect, useState } from 'react'
import './Terminal.css'

interface TerminalLine {
  type: 'command' | 'output'
  text: string
}

const lines: TerminalLine[] = [
  { type: 'command', text: '$ whoami' },
  { type: 'output', text: 'Diego Rincón — Backend Developer' },
  { type: 'command', text: '$ cat skills.txt' },
  { type: 'output', text: 'NestJS, .NET, FastAPI, PostgreSQL, Redis, Docker' },
  { type: 'command', text: '$ cat status.txt' },
  { type: 'output', text: 'Systems & Computing Engineering Student' },
  { type: 'output', text: 'Building scalable APIs and multi-tenant platforms' },
]

export const Terminal = () => {
  const [visibleLines, setVisibleLines] = useState<number>(0)
  const [currentText, setCurrentText] = useState('')
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    if (visibleLines >= lines.length) {
      setIsTyping(false)
      return
    }

    const line = lines[visibleLines]
    const speed = line.type === 'command' ? 50 : 20

    if (currentText.length < line.text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(line.text.slice(0, currentText.length + 1))
      }, speed)
      return () => clearTimeout(timeout)
    }

    const pause = line.type === 'command' ? 400 : 200
    const timeout = setTimeout(() => {
      setVisibleLines(prev => prev + 1)
      setCurrentText('')
    }, pause)
    return () => clearTimeout(timeout)
  }, [visibleLines, currentText])

  return (
    <div className="terminal">
      <div className="terminal-header">
        <div className="terminal-dots">
          <span className="dot dot-red" />
          <span className="dot dot-yellow" />
          <span className="dot dot-green" />
        </div>
        <span className="terminal-title">diego@portfolio:~</span>
      </div>
      <div className="terminal-body">
        {lines.slice(0, visibleLines).map((line, i) => (
          <div key={i} className={`terminal-line ${line.type}`}>
            {line.text}
          </div>
        ))}
        {visibleLines < lines.length && (
          <div className={`terminal-line ${lines[visibleLines].type}`}>
            {currentText}
            <span className="cursor">█</span>
          </div>
        )}
        {!isTyping && <span className="cursor blink">█</span>}
      </div>
    </div>
  )
}
