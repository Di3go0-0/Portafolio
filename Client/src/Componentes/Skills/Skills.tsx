import { useEffect, useRef, useState } from "react";
import "./Skills.css";

const SkillsCarousel = () => {
  const [isPaused, setIsPaused] = useState(false);
  const skillsListRef = useRef<HTMLDivElement>(null);

  const skills = [
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/neovim/neovim-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg",
  ];

  // Duplicamos las imágenes para crear un efecto continuo
  const duplicatedSkills = [...skills, ...skills];

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        if (skillsListRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } = skillsListRef.current;

          // Si llega al final, reinicia el scroll
          if (scrollLeft + clientWidth >= scrollWidth) {
            skillsListRef.current.scrollLeft = 0;
          } else {
            // Avanza el scroll
            skillsListRef.current.scrollLeft += 1;
          }
        }
      }, 5); // Velocidad del scroll

      return () => clearInterval(interval);
    }
  }, [isPaused]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  return (
    <section className="skills-section">
      <div className="skills-container">
        <div
          className="skills-list"
          ref={skillsListRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {duplicatedSkills.map((skill, index) => (
            <img
              key={index}
              src={skill}
              alt={`Skill ${index + 1}`}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsCarousel;

