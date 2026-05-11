import './Json.css'

const colorize = (json: string): string => {
  return json
    .replace(/"([^"]+)":/g, '<span class="json-key">"$1"</span>:')
    .replace(/: "([^"]+)"/g, ': <span class="json-string">"$1"</span>')
    .replace(/: (\d+)/g, ': <span class="json-number">$1</span>')
    .replace(/: (true|false|null)/g, ': <span class="json-bool">$1</span>')
}

export const JsonBlock = ({ data }: { data: object }) => {
  const raw = JSON.stringify(data, null, 2)
  return (
    <pre
      className="json-highlighted"
      dangerouslySetInnerHTML={{ __html: colorize(raw) }}
    />
  )
}
