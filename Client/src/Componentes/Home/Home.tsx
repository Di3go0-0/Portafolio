import './Home.css'
import SkillsCarousel from '../Skills/Skills';
import { About } from '../About/About';
import { Footer } from '../Footer/Footer';

export const Home = () => {
  return (

    <div className='Home'>
      <section className="image-section" id='home'>

        <div className="Text-container">
          <h1 className="efect2"><span className="color-h1">WELCOME</span> TO MY PORTAFOLIO</h1>
          <img src="https://readme-typing-svg.herokuapp.com?font=Time+New+Roman&color=cyan&size=25&center=true&vCenter=true&width=600&height=100&lines=Self-taught+Full+Stack+Junior+Developer,;System+and+Computing+Engineering+Student" />
        </div>
      </section>

      <section id='about'>
        <About />
      </section>

      <section id="projects">
        <SkillsCarousel />
      </section>


      <section id="footer">
        <Footer />
      </section>
    </div >
  );
}
