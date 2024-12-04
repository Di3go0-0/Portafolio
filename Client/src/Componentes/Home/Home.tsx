import './Home.css'
import SkillsCarousel from '../Skills/Skills';
import { About } from '../About/About';
import { Footer } from '../Footer/Footer';
import { IProjectProps } from '../../Interfaces';
import { ProjectCard } from '../Projects/Project';
import TaskImg from '../../Resources/IMG/Projects/Task.jpg'
import ProjectImg from '../../Resources/IMG/Projects/Project.jpeg'
import KoajClone from '../../Resources/IMG/Projects/KoajStore.png'
import NetApi from '../../Resources/IMG/Projects/NetApi.png'


const projects: IProjectProps[] = [
  {
    image: KoajClone,
    title: 'Ecommerce Koaj Clone',
    description: 'Final project of web decelopment bootcamp, fully funtional ecommerce with frontend and backend, impired by KOAJ',
    technologies: [{
      name: 'Angular',
      icon: 'https://img.icons8.com/color/48/000000/angularjs.png'
    }, {
      name: 'Node.js',
      icon: 'https://img.icons8.com/color/48/000000/nodejs.png'
    }, {
      name: 'jwt',
      icon: 'https://img.icons8.com/color/600/java-web-token.png'
    }, {
      name: 'MySQL',
      icon: 'https://img.icons8.com/color/48/000000/mysql-logo.png'
    }],
    githubUrl: "https://github.com/AngularStore"

  }, {
    image: ProjectImg,
    title: 'Project Management API',
    description: 'A project management tool that allows users to create and manage projects, tasks, and teams.',
    technologies: [
      // {
      //   name: 'React',
      //   icon: 'https://img.icons8.com/office/80/000000/react.png'
      // },

      {
        name: 'Express',
        icon: 'https://img.icons8.com/color/48/000000/nodejs.png'
      }, {
        name: 'jwt',
        icon: 'https://img.icons8.com/color/600/java-web-token.png'
      }, {
        name: 'Prisma orm',
        icon: 'https://img.icons8.com/color/48/000000/prisma-orm.png'

      }, {
        name: 'Swagger',
        icon: 'https://static-00.iconduck.com/assets.00/swagger-icon-2048x2048-563qbzey.png'
      }],
    githubUrl: "https://github.com/Di3go0-0/ProjectManagement"

  }, {
    image: NetApi,
    title: 'API RestFull .Net',
    description: 'API RestFull with .Net Core, Entity Framework, JWT, Swagger, and more',
    technologies: [{
      name: '.net-framework',
      icon: 'https://img.icons8.com/color/48/000000/net-framework.png'
    }, {
      name: 'jwt',
      icon: 'https://img.icons8.com/color/600/java-web-token.png'
    }, {
      name: 'Mysql',
      icon: 'https://img.icons8.com/color/48/000000/mysql-logo.png'
    },
    ],

    githubUrl: "https://github.com/Di3go0-0/ProjectManagement"

  }, {
    image: TaskImg,
    title: 'Task Management',
    description: 'A Task management full stack application that allows users to create and manage tasks.',
    technologies: [{
      name: 'React',
      icon: 'https://img.icons8.com/office/80/000000/react.png'
    }, {
      name: 'FastAPI',
      icon: 'https://cdn.worldvectorlogo.com/logos/fastapi.svg'
    }, {
      name: 'jwt',
      icon: 'https://img.icons8.com/color/600/java-web-token.png'
    }, {
      name: 'Swagger',
      icon: 'https://static-00.iconduck.com/assets.00/swagger-icon-2048x2048-563qbzey.png'
    }],
    githubUrl: "https://github.com/Di3go0-0/Tasks"

  },

]


export const Home = () => {
  return (

    <div className='Home'>
      <section className="image-section" id='home'>

        <div className="Text-container">
          <h1 className="efect2"><span className="color-h1">WELCOME</span> TO MY PORTAFOLIO</h1>
          <img src="https://readme-typing-svg.herokuapp.com?font=Time+New+Roman&color=cyan&size=25&center=true&vCenter=true&width=600&height=100&lines=Self-taught+Full+Stack+Junior+Developer,;System+and+Computing+Engineering+Student" />
        </div>
      </section>

      <section className='projects' id="projects">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </section>

      <section id='about'>
        <About />
      </section>

      <section >
        <SkillsCarousel />
      </section>

      <section id="footer">
        <Footer />
      </section>
    </div >
  );
}
