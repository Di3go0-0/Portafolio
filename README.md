# Diego API · Backend Developer Portfolio

Personal portfolio of **Juan Diego Rincón Franco**, Backend Developer (NestJS · Node.js · TypeScript · Microservices · AWS / Azure), presented as interactive Swagger-style API documentation.

**Live:** https://di3go0-0.github.io/Portafolio/

## Endpoints

| Method | Path                  | Returns                                   |
|--------|-----------------------|-------------------------------------------|
| GET    | `/about`              | Profile, stack, architecture, cloud, env  |
| GET    | `/experience`         | LinkTic · UTP · Freelance                 |
| GET    | `/projects`           | Backend projects (NestJS, PostgreSQL...)  |
| GET    | `/projects?type=oss`  | Open source Rust TUIs: restui, dbtui      |
| GET    | `/skills?group=true`  | Skills grouped by category                |
| POST   | `/contact`            | Email, LinkedIn, GitHub, CV download      |

Every endpoint supports **Try it out** with query parameters that filter the JSON response client-side.

## Features

- Collapsible endpoints with `curl` examples that update as you fill in parameters
- JSON responses with syntax highlighting
- 7 color schemes (Catppuccin, Dracula, Nord, Tokyo Night, Gruvbox, One Dark, Rosé Pine), persisted in `localStorage`
- No backend, no tracking, no images: a single static bundle

## Stack

React 18 · TypeScript · Vite 6 · Bun · GitHub Pages (GitHub Actions)

## Development

```bash
cd Client
bun install
bun run dev      # http://localhost:5173/Portafolio/
bun run build    # tsc -b && vite build -> Client/dist
bun run lint
```

Pushes to `main` deploy automatically through `.github/workflows`.

## Structure

```
Client/src
├── Componentes/
│   ├── Home/       # layout, endpoint component, about/experience/project data
│   ├── Json/       # JSON syntax highlighter
│   ├── Projects/   # project card rendered as a JSON response
│   ├── Skills/     # skills response
│   ├── Footer/, Navbar/
├── Interfaces/     # IProjectProps
└── Resources/PDF/  # cv.pdf
```

## Related repositories

- [tenant-platform-api](https://github.com/Di3go0-0/tenant-platform-api) · multi-tenant SaaS backend
- [auth-microservice](https://github.com/Di3go0-0/auth-microservice) · vertical fragmentation + SAGA
- [restui](https://github.com/Di3go0-0/restui) · terminal HTTP client with Vim keybindings
- [dbtui](https://github.com/Di3go0-0/dbtui) · terminal database client
