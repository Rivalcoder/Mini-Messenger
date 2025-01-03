import React, { useEffect } from "react";
import "./FallingStars.css";

const Fall = () => {
  useEffect(() => {
    const starsContainer = document.querySelector(".stars-container");

    function createStar() {
      const star = document.createElement("div");
      star.className = "star";
      const size = Math.random() * 3 + 2;
      const duration = Math.random() * 5 + 2;
      const delay = Math.random() * 5;
      const left = Math.random() * 100;

      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.left = `${left}vw`;
      star.style.animationDuration = `${duration}s`;
      star.style.animationDelay = `${delay}s`;

      starsContainer.appendChild(star);

      setTimeout(() => star.remove(), duration * 1000 + delay * 1000);
    }

    const interval = setInterval(createStar, 200);
    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, []);

  return <div className="stars-container"></div>;
};

export default Fall;
