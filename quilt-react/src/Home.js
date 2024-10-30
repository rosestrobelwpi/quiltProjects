// Home.js
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './style.css';

function Home() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const raindrops = [];

    function createRaindrop() {
      const x = Math.random() * canvas.width;
      const y = -5;
      const speed = Math.random() * 5 + 2;
      const length = Math.random() * 20 + 10;
      raindrops.push({ x, y, speed, length });
    }

    function updateRaindrop() {
      for (let i = 0; i < raindrops.length; i++) {
        const raindrop = raindrops[i];
        raindrop.y += raindrop.speed;
        if (raindrop.y > canvas.height) {
          raindrops.splice(i, 1);
          i--;
        }
      }
    }

    function drawRaindrop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;

      raindrops.forEach((raindrop) => {
        ctx.beginPath();
        ctx.moveTo(raindrop.x, raindrop.y);
        ctx.lineTo(raindrop.x, raindrop.y + raindrop.length);
        ctx.stroke();
      });
    }

    function animate() {
      createRaindrop();
      updateRaindrop();
      drawRaindrop();
      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} id="rainfall"></canvas>
      <div className="bedroom-background">
        <img src="./static/bedroom.png" alt="Bedroom background" />
      </div>
      <div className="home-container">
        <h1>Quilt Designer</h1>
        <div className="btn-container">
          <button>
            <Link to="/play">Start</Link>
          </button>
          <button>
            <a href="/examples">Examples</a>
          </button>
          <button>
            <a href="/about">About Us</a>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
