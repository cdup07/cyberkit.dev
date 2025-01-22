// ParticlesBackground.js
import React from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const ParticlesContainer = () => {
  const particlesInit = async (main: any) => {
    await loadFull(main);
  };

  const particlesOptions = {
    fullScreen: {
      enable: true,
      zIndex: -1, // Put particles behind other elements
    },
    particles: {
      number: {
        value: 100, // Adjust the number of particles
      },
      color: {
        value: "#ffffff", // Change the color of particles to white (you can use any hex color code)
      },
      size: {
        value: 3, // Adjust the size of particles
      },
      opacity: {
        value: 0,  // Initial opacity of particles
        animation: {
          enable: true,  // Enable the animation
          speed: 0.5,  // Speed of opacity change
          minimumValue: .6,  // Minimum opacity (faded out)
          sync: true,  // Make all particles fade in/out at the same time
        },
      },
      links: {
        enable: true,
        distance: 50, // Link distance
        color: "#ffffff", // Link color
        opacity: 0, // Link opacity
        width: 1, // Link width
      },
      move: {
        enable: true,
        speed: 0.4, // Speed of particles
      },
    },
  };

  return <Particles init={particlesInit} options={particlesOptions} />;
};

export default ParticlesContainer;
