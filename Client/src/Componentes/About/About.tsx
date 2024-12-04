import { Button } from "../Button/Button"
import './About.css'
import avatar from '../../Resources/IMG/download.gif'


export const About = () => {

  const openPage = (url: string) => {
    window.open(url, '_blank');
  }

  const downloadCV = () => {
    const link = document.createElement('a');
    import('../../Resources/PDF/cv.pdf').then((module) => {
      link.href = module.default;
      link.download = 'CV_Diego_Rincon.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }).catch((error) => {
      console.error('Error loading CV:', error);
    });
  }


  return (
    <>
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
            <img
              src={avatar}
              alt="Gif"
            />
          </div>
        </div>
      </section >

    </>

  )

}
