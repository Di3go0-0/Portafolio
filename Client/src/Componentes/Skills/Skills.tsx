import React, { useState, useEffect } from "react";
import "./Skills.css";

const SkillsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

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

  // Duplicamos las imágenes
  const duplicatedSkills = [...skills, ...skills];

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex + 1 >= skills.length ? 0 : prevIndex + 1
        );
      }, 3000); // Cambia cada 3 segundos

      return () => clearInterval(interval); // Limpieza del intervalo
    }
  }, [isPaused, skills.length]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  // Tamaño de cada imagen con margen (ancho de imagen + margen)
  const imageWidth = 120;
  const translateX = -(currentIndex * imageWidth) % (skills.length * imageWidth);

  return (
    <section className="skills-section">
      <div className="skills-container">
        <div
          className="skills-list"
          style={{
            transform: `translateX(${translateX}px)`,
            transition: isPaused ? "none" : "transform 0.5s linear",
            width: `${duplicatedSkills.length * imageWidth}px`,
          }}
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

