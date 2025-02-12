import React, { useEffect, useRef } from "react";
import "./examples.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faPenFancy } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import parser from "./parser";
import evaluator from "./interpreter";

const colorPalette = {
  // red: '#b57c7c',
  // orange: '#d9a078',
  // yellow: '#c8b77a',
  // green: '#85a586',
  // blue: '#6a8caf',
  // purple: '#9e86a6',
  // black: '#4d4d4d',
  // pink: '#d8a6b8',
  // brown: '#a58c72',
  // grey: '#b0b0b0',
};

// Function to draw a single rectangle
const drawRectangle = (ctx, x, y, width, height, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(Math.floor(x), Math.floor(y), Math.ceil(width), Math.ceil(height));
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

    const maxWidth = design.width
    const maxHeight = design.height

    const scaleX = (canvas.width) / maxWidth;
    const scaleY = (canvas.height) / maxHeight;
    const scale = Math.min(scaleX, scaleY); // Uniform scaling

    if (design.patches && Array.isArray(design.patches)) {
      design.patches.forEach((patch) => {
        drawRectangle(
          ctx,
          patch.x * scale,
          patch.y * scale,
          patch.width * scale,
          patch.height * scale,
          colorPalette[patch.color] || patch.color
        );
      });
    } else if (design.x !== undefined && design.y !== undefined) {
      drawRectangle(
        ctx,
        design.x * scale,
        design.y * scale,
        design.width * scale,
        design.height * scale,
        colorPalette[design.color] || design.color
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
      
      code: "rect brown = rect(1,1,brown);\nrect black = rect(1,1,black);\nrect yellow = rect(1,1,yellow);\nrect background = rect(1,1,green);\nrect red = rect(1,1,red);\nrect a = hor(repX(6,background),repX(4,black),repX(6,background));\nrect b = hor(repX(5,background),repX(1,black),repX(3,red),repX(1,black),repX(6,background));\nrect c = hor(repX(4,background),repX(1,black),repX(2,red),repX(2,black),repX(7,background));\nrect d = hor(repX(3,background),repX(1,black),repX(4,brown),repX(1,black),repX(7,background));\nrect e = hor(repX(2,background),repX(1,black),repX(1,brown),repX(1,black),repX(2,brown),repX(1,black),repX(1,brown),repX(1,black),repX(1,background),repX(4,black),repX(1,background));\nrect f = hor(repX(2,background),repX(1,black),repX(1,brown),repX(1,black),repX(2,brown),repX(1,black),repX(1,brown),repX(2,black),repX(4,brown),repX(1,black));\nrect g = hor(repX(1,background),repX(1,black),repX(3,yellow),repX(2,brown),repX(1,black),repX(1,brown),repX(1,black),repX(5,brown),repX(1,black));\nrect h = hor(repX(2,background),repX(2,black),repX(10,brown),repX(1,black),repX(1,background));\nrect i = hor(repX(1,background),repX(1,black),repX(13,brown),repX(1,black));\nrect j = hor(repX(1,black),repX(8,brown),repX(1,black),repX(2,brown),repX(1,black),repX(2,brown),repX(1,black));\nrect k = hor(repX(1,black),repX(9,brown),repX(2,black),repX(2,brown),repX(1,black),repX(1,background));\nrect l = hor(repX(1,black),repX(12,brown),repX(2,black),repX(1,background));\nrect m = hor(repX(1,background),repX(2,black),repX(10,brown),repX(1,black),repX(2,background));\nrect n = hor(repX(2,background),repX(2,black),repX(8,brown),repX(2,black),repX(2,background));\nrect o = hor(repX(3,background),repX(10,black),repX(3,background));\nrect p = hor(repX(2,background),repX(1,black),repX(3,yellow),repX(1,black),repX(3,yellow),repX(1,black),repX(5,background));\nvert(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p);"
    },
    { id: 2, 
      code: "rect yellowRect = rect(1, 1, yellow);\nrect blackRect = rect(1, 1, black);\nrect yellowBackground = hor(repX(10, yellowRect));\nrect eyes = hor(yellowRect, yellowRect, yellowRect, blackRect, yellowRect, yellowRect, blackRect, yellowRect, yellowRect, yellowRect);\nrect topLip = hor(yellowRect, yellowRect, blackRect, yellowRect, yellowRect, yellowRect, yellowRect, blackRect,yellowRect, yellowRect);\nrect midLip = hor(yellowRect, yellowRect, yellowRect, blackRect, yellowRect, yellowRect, blackRect, yellowRect, yellowRect, yellowRect);\nrect bottomLip = hor(yellowRect, yellowRect, yellowRect, yellowRect, blackRect, blackRect, yellowRect, yellowRect, yellowRect, yellowRect);\nvert(yellowBackground, yellowBackground, yellowBackground, eyes, yellowBackground, yellowBackground, topLip, midLip, bottomLip, yellowBackground);" 
    },
    { id: 3,
      code: "rect grey = rect(1, 1, grey);\nrect black = rect(1, 1, black);\nrect top = hor(grey, black);\nrect bottom = hor(black, grey);\nrect repeat = repX(4, (vert(top, bottom)));\nvert(repeat, repeat, repeat, repeat);" },
    { id: 4, 
      code: "rect black = rect(1,1,black);\nrect yellow = rect(1,1,yellow);\nrect faceTop = rect(3,3,yellow);\nrect smileTop = hor(yellow,black,yellow,yellow,black,yellow);\nrect smileBottom = hor(yellow,rect(4,1,black),yellow);\nrect smile = vert(smileTop,smileBottom);\nrect facePiece = over(C,faceTop,black);\nvert(hor(facePiece,facePiece),smile,rect(6,1,yellow));"
    },    
    {
      id: 5,
      code: "rect red = rect(1,1,red);\nrect black = rect(1,1,black);\nrect X = hor(red,black,red);\nrect Y = hor(black,red,black);\nvert(X,Y,X);",
      
    },
    {
      id: 6,
      code: "rect grey = rect(1,1,grey);\nrect brown = rect(1,1,brown);\nrect black = rect(1,1,black);\nrect pink = rect(1,1,pink);\nrect rowOne = repX(6,grey);\nrect rowTwo = repX(6,brown);\nrect rowThree = hor(black,grey,brown,brown,grey,black);\nrect rowFour = rowTwo;\nrect rowFive = hor(grey,brown,pink,pink,brown,grey);\nrect rowSix = rowFive;\nvert(rowOne,rowTwo,rowThree,rowFour,rowFive,rowSix);"
    },
    {
      id: 7,
      code: "rect red = rect(1,1,red);\nrect orange = rect(1,1,orange);\nrect yellow = rect(1,1,yellow);\nrect green = rect(1,1,green);\nrect blue = rect(1,1,blue);\nrect purple = rect(1,1,purple);\nrect r = hor(red,orange,yellow,green,blue,purple);\nvert(r,r,r,r,r,r);"
    },
    {
      id: 8,
      code: "rect red = rect(5,5,red);\nrect white = rect(4,4,grey);\nrect blue = rect(3,3,blue);\nrect center = rect(1,1,black);\nover(C,red,white,blue,center);"
    },
    {
      id: 9,
      code: "define checkerboard(rect a, rect b, rect x, rect y) {\nreturn repX(4, hor(vert(a,b,x,y,a,b,x,y), vert(y,x,b,a,y,x,b,a)));\n}\nrect theGreen = rect(1, 1, green);\nrect theYellow = rect(1,1,yellow);\nrect theBlue = rect(1,1,blue);\nrect thePurple = rect(1,1,purple);\ncheckerboard(theGreen, theYellow, theBlue, thePurple);"
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
              <a href="/examples">Tutorial</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="document-links">
        <ul>
          <li>
            <a href="/gettingStarted">
              <FontAwesomeIcon icon={faHouse} className="icon" /> Definitions & Variables
            </a>
          </li>
          <li>
            <a href="/functions">
              <FontAwesomeIcon icon={faPenFancy} className="icon" /> Functions
            </a>
          </li>
        </ul>
      </div>
      <h1>Examples</h1>
      <div className="responsive-container">
      <div className="picture-container">
        {exampleDesigns.map((example, index) => (
          <Link
            key={example.id}
            to={`/play/${encodeURIComponent(example.code)}`}
          >
            <canvas
              ref={(el) => (canvasRefs.current[index] = el)}
              width={325}
              height={325}
              title={example.code}
              className="example-canvas"
            />
          </Link>
        ))}
      </div>
      </div>
    </div>
  );
}

export default Examples;