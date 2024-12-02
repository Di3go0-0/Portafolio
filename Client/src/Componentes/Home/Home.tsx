import { Button } from '../Button/Button';
import './Home.css'
import SkillsCarousel from '../Skills/Skills';




export const Home = () => {

  const openPage = (url: string) => {
    window.open(url, '_blank');
  }

  const downloadCV = () => {
    const link = document.createElement('a');
    link.href = '../../../Resources/IMG/Main.jpg';
    link.download = 'CV_Diego_Rincon.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }


  return (

    <div className='Home'>
      <section className="image-section" id='home'>

        <div className="Text-container">

          <h1 className="efect2"><span className="color-h1">WELCOME</span> TO MY PORTAFOLIO</h1>
        </div>
      </section>

      <section className='About-container' id='about'>
        <div className='About'>
          <div className="text-container">
            <h1>Diego Rincón</h1>
            <h5 className="text1">I'm a <span className="text2">Full Stack Developer</span></h5>

            <p>I am a dedicated software developer passionate about crafting creative
              and efficient solutions. While I am at the beginning of my professional
              journey, I excel at quickly adapting to new technologies and consistently
              strive to deliver exceptional results.</p>

            <div className='buttons'>
              <Button parentMethod={() => openPage("https://www.linkedin.com/in/di3go00/")}>
                Contact Me
              </Button>
              <Button parentMethod={downloadCV}>
                Download CV
              </Button>

            </div>
          </div>


          <div className="img-container">
            <img src="../../../Resources/IMG/download.gif" alt="Gif" />
          </div>

        </div>
      </section >

      <section className="Projects-container" id="projects">
        <SkillsCarousel />
      </section>
    </div >
  );
}
