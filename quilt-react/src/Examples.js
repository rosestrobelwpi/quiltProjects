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
    {
      id: 1,
      code: "rect black = rect(1,1,black); rect yellow = rect(1,1,yellow); rect faceTop = rect(3,3,yellow); rect smileTop = hor(yellow,black,yellow,yellow,black,yellow); rect smileBottom = hor(yellow,rect(4,1,black),yellow); rect smile = vert(smileTop,smileBottom); rect facePiece = over(C,faceTop,black); vert(hor(facePiece,facePiece),smile,rect(6,1,yellow));"
    },    
    {
      id: 2,
      code: "rect red = rect(1,1,red);\nrect black = rect(1,1,black);\nrect X = hor(red,black,red);\nrect Y = hor(black,red,black);\nvert(X,Y,X);"
    },
    {
      id: 3,
      code: "rect brown = rect(1,1,brown);\nrect black = rect(1,1,black);\nrect yellow = rect(1,1,yellow);\nrect background = rect(1,1,green);\nrect red = rect(1,1,red);\nrect a = hor(rep(6,background),rep(4,black),rep(6,background));\nrect b = hor(rep(5,background),rep(1,black),rep(3,red),rep(1,black),rep(6,background));\nrect c = hor(rep(4,background),rep(1,black),rep(2,red),rep(2,black),rep(7,background));\nrect d = hor(rep(3,background),rep(1,black),rep(4,brown),rep(1,black),rep(7,background));\nrect e = hor(rep(2,background),rep(1,black),rep(1,brown),rep(1,black),rep(2,brown),rep(1,black),rep(1,brown),rep(1,black),rep(1,background),rep(4,black),rep(1,background));\nrect f = hor(rep(2,background),rep(1,black),rep(1,brown),rep(1,black),rep(2,brown),rep(1,black),rep(1,brown),rep(2,black),rep(4,brown),rep(1,black));\nrect g = hor(rep(1,background),rep(1,black),rep(3,yellow),rep(2,brown),rep(1,black),rep(1,brown),rep(1,black),rep(5,brown),rep(1,black));\nrect h = hor(rep(2,background),rep(2,black),rep(10,brown),rep(1,black),rep(1,background));\nrect i = hor(rep(1,background),rep(1,black),rep(13,brown),rep(1,black));\nrect j = hor(rep(1,black),rep(8,brown),rep(1,black),rep(2,brown),rep(1,black),rep(2,brown),rep(1,black));\nrect k = hor(rep(1,black),rep(9,brown),rep(2,black),rep(2,brown),rep(1,black),rep(1,background));\nrect l = hor(rep(1,black),rep(12,brown),rep(2,black),rep(1,background));\nrect m = hor(rep(1,background),rep(2,black),rep(10,brown),rep(1,black),rep(2,background));\nrect n = hor(rep(2,background),rep(2,black),rep(8,brown),rep(2,black),rep(2,background));\nrect o = hor(rep(3,background),rep(10,black),rep(3,background));\nrect p = hor(rep(2,background),rep(1,black),rep(3,yellow),rep(1,black),rep(3,yellow),rep(1,black),rep(5,background));\nvert(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p);"
    },
    {
      id: 4,
      code: "rect grey = rect(1,1,grey);\nrect brown = rect(1,1,brown);\nrect black = rect(1,1,black);\nrect pink = rect(1,1,pink);\nrect rowOne = rep(6,grey);\nrect rowTwo = rep(6,brown);\nrect rowThree = hor(black,grey,brown,brown,grey,black);\nrect rowFour = rowTwo;\nrect rowFive = hor(grey,brown,pink,pink,brown,grey);\nrect rowSix = rowFive;\nvert(rowOne,rowTwo,rowThree,rowFour,rowFive,rowSix);"
    },
    {
      id: 5,
      code: "rect red = rect(1,1,red);\nrect orange = rect(1,1,orange);\nrect yellow = rect(1,1,yellow);\nrect green = rect(1,1,green);\nrect blue = rect(1,1,blue);\nrect purple = rect(1,1,purple);\nrect r = hor(red,orange,yellow,green,blue,purple);\nvert(r,r,r,r,r,r);"
    },
    {
      id: 6,
      code: "rect red = rect(5,5,red);\nrect white = rect(4,4,grey);\nrect blue = rect(3,3,blue);\nrect center = rect(1,1,black);\nover(C,red,white,blue,center);"
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