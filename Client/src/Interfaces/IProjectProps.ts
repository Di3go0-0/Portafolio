export interface IProjectProps {
  image: string
  title: string
  description: string
  technologies: {
    name: string
    icon: string
  }[]
  githubUrl: string
}
