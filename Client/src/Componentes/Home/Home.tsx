import './Home.css'


export const Home = () => {
  return (
    <div className='Home'>
      <section className="image-section">

        <div className="Text-container">

          <h1 className="efect2"><span className="color-h1">WELCOME</span> TO MY PORTAFOLIO</h1>
        </div>
      </section>

      <section className='About-container'>
        <div className='About'>
          <div className="text-container">
            <h1>Diego Rincón</h1>
            <h5 className="text1">I'm a <span className="text2">Full Stack Developer</span></h5>

            <p>I am a dedicated software developer passionate about crafting creative and efficient solutions. While I am at the beginning of my professional journey, I excel at quickly adapting to new technologies and consistently strive to deliver exceptional results.            </p>
          </div>
          <div className="img-container">
            <img src="../../../Resources/IMG/download.gif" alt="Gif" />
          </div>

        </div>
      </section >
    </div >
  );
}
