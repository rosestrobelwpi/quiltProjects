import React, { useEffect, useRef } from "react";
import "./examples.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faPenFancy } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import parser from "./parser";
import evaluator from "./interpreter";

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
      ? Math.max(...design.patches.map((p) => p.x + p.width))
      : design.x + design.width;
    const maxHeight = design.patches
      ? Math.max(...design.patches.map((p) => p.y + p.height))
      : design.y + design.height;

    const scale = Math.min(width / maxWidth, height / maxHeight);

    if (design.patches && Array.isArray(design.patches)) {
      design.patches.forEach((patch) => {
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
    // Design 1: Perfect Checkerboard
    {
      id: 1,
      code: `rect x = rect(1,1,red);
  rect y = rect(1,1,blue);
  vert(hor(rep(4,hor(x,y))),hor(rep(4,hor(y,x))),hor(rep(4,hor(x,y))),hor(rep(4,hor(y,x))));`
    },
  
    // Design 2: Target (Updated from "white" to "yellow")
    {
      id: 2,
      code: `over(C,rect(4,4,red),rect(3,3,yellow),rect(2,2,red));`
    },
  
    // Design 3: Framed Square
    {
      id: 3,
      code: `rect outer = rect(5,5,blue);
  rect inner = rect(3,3,green);
  over(C,outer,inner);`
    },
  
    // Design 4: Alternating Layers
    {
      id: 4,
      code: `rect a = rect(1,1,orange);
  rect b = rect(1,1,purple);
  vert(rep(4,hor(rep(4,hor(a,b)))),rep(4,hor(rep(4,hor(b,a)))));`
    },
  
    // Design 5: Diamond Overlay
    {
      id: 5,
      code: `over(C,rect(5,5,yellow),rect(3,3,blue),rect(1,1,green));`
    },
  
    // Design 6: Spiral-Inspired
    {
      id: 6,
      code: `rect big = rect(5,5,red);
  rect mid = rect(3,3,blue);
  rect small = rect(1,1,green);
  over(C,big,mid,small);`
    },
  
    // Design 7: Gradient Rows
    {
      id: 7,
      code: `rect r1 = rect(1,1,red);
  rect r2 = rect(1,1,orange);
  rect r3 = rect(1,1,yellow);
  rect r4 = rect(1,1,green);
  rect r5 = rect(1,1,blue);
  vert(hor(r1,r2,r3,r4,r5),hor(r2,r3,r4,r5,r1),hor(r3,r4,r5,r1,r2),hor(r4,r5,r1,r2,r3),hor(r5,r1,r2,r3,r4));`
    },
  
    // Design 8: Multi-Layer Checkerboard
    {
      id: 8,
      code: `rect x = rect(1,1,red);
  rect y = rect(1,1,blue);
  vert(hor(rep(5,hor(x,y))),hor(rep(5,hor(y,x))),hor(rep(5,hor(x,y))),hor(rep(5,hor(y,x))),hor(rep(5,hor(x,y))));`
    },
  
    // Design 9: Full Grid
    {
      id: 9,
      code: `rect cell = rect(1,1,green);
  vert(rep(5,hor(rep(5,hor(cell)))));`
    },
  
    // Design 10: Stacked Rectangles
    {
      id: 10,
      code: `rect x = rect(1,5,blue);
  rect y = rect(1,5,orange);
  hor(x,y,x,y,x);`
    }
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
          <li>
            <a href="/" id="logo">
              Quilt Designer
            </a>
          </li>
        </ul>
        <div className="navbar-links">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/play">Play</a>
            </li>
            <li>
              <a href="/about">About Us</a>
            </li>
            <li>
              <a href="/examples">Docs</a>
            </li>
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
              ref={(el) => (canvasRefs.current[index] = el)}
              width={150}
              height={150}
              title={example.code}
              className="example-canvas"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Examples;
