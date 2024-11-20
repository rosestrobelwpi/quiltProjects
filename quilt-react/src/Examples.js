import React, { useEffect, useRef } from 'react';
import './examples.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faPenFancy } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import parser from './parser';
import evaluator from './interpreter';

// Function to draw a single rectangle
const drawRectangle = (ctx, x, y, width, height, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

// Function to render a design on a canvas
const renderDesign = (canvas, code) => {
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;

  ctx.clearRect(0, 0, width, height);

  try {
    const parsedInput = parser.parse(code);
    const design = evaluator(parsedInput);

    const maxWidth = design.patches
      ? Math.max(...design.patches.map(p => p.x + p.width))
      : design.x + design.width;
    const maxHeight = design.patches
      ? Math.max(...design.patches.map(p => p.y + p.height))
      : design.y + design.height;

    const scale = Math.min(width / maxWidth, height / maxHeight);

    if (design.patches && Array.isArray(design.patches)) {
      design.patches.forEach(patch => {
        drawRectangle(
          ctx,
          patch.x * scale,
          patch.y * scale,
          patch.width * scale,
          patch.height * scale,
          patch.color
        );
      });
    } else if (design.x !== undefined && design.y !== undefined) {
      drawRectangle(
        ctx,
        design.x * scale,
        design.y * scale,
        design.width * scale,
        design.height * scale,
        design.color
      );
    }
  } catch (error) {
    console.error("Error visualizing code:", error);
  }
};

function Examples() {
  const exampleDesigns = [
    { id: 1, code: "rect(1,1,red);" },
    { id: 2, code: "hor(rect(1,2,red),rect(1,2,blue));" },
    { id: 3, code: "vert(rect(1,2,green),rect(1,2,yellow));" },
  ];

  const canvasRefs = useRef([]);

  useEffect(() => {
    exampleDesigns.forEach((example, index) => {
      const canvas = canvasRefs.current[index];
      if (canvas) {
        renderDesign(canvas, example.code);
      }
    });
  }, [exampleDesigns]);

  return (
    <div className="examples-container">
      <div className="navbar">
        <ul>
          <li><a href="/" id="logo">Quilt Designer</a></li>
        </ul>
        <div className="navbar-links">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/play">Play</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/examples">Docs</a></li>
          </ul>
        </div>
      </div>
      <div className="document-links">
        <ul>
          <li>
            <a href="/gettingStarted">
              <FontAwesomeIcon icon={faHouse} className="icon" /> Getting Started
            </a>
          </li>
          <li>
            <a href="#">
              <FontAwesomeIcon icon={faPenFancy} className="icon" /> Creating Patterns
            </a>
          </li>
        </ul>
      </div>
      <h1>Examples</h1>
      <div className="picture-container">
        {exampleDesigns.map((example, index) => (
          <Link
            key={example.id}
            to={`/play/${encodeURIComponent(example.code)}`}
          >
            <canvas
              ref={(el) => canvasRefs.current[index] = el}
              width={200}
              height={200}
              title={example.code}
              style={{ border: "1px solid #ccc" }}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Examples;
