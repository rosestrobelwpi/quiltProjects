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

    // 1. Rotated Mirror
    {
      id: 9,
      code: `
  rect base = rect(2,2,green);
  rot(90,base);
  vert(base,rot(90,base));`,
    },
    // 2. Four Quadrants Mirror
    {
      id: 10,
      code: `
  rect a = rect(2,2,red);
  rect b = rot(90,a);
  rect c = rot(180,a);
  rect d = rot(270,a);
  vert(hor(a,b),hor(d,c));`,
    },
    // 3. Simple Checkerboard
    {
      id: 11,
      code: `
  rect x = rect(1,1,black);
  rect y = rect(1,1,white);
  rect line = hor(rep(5,hor(x,y)));
  vert(line,line,line,line,line);`,
    },
    // 4. Centered Circle Design
    {
      id: 12,
      code: `
  over(C,rect(4,4,blue),rect(2,2,white),rect(1,1,red));`,
    },
    // 5. Nested Squares
    {
      id: 13,
      code: `
  over(C,rect(4,4,yellow),rect(3,3,red),rect(2,2,blue),rect(1,1,green));`,
    },
    // 6. Rotated Pattern with Rep
    {
      id: 14,
      code: `
  rect base = rect(1,1,red);
  rect line = hor(rep(4,base));
  rot(90,line);
  vert(line,rot(90,line));`,
    },
    // 7. Smiley Face
    {
      id: 15,
      code: `
  rect face = rect(6,6,yellow);
  rect eyeL = rect(1,1,black);
  rect eyeR = rect(1,1,black);
  rect smile = hor(rep(4,rect(1,1,black)));
  over(C,face,over(TL,eyeL),over(TR,eyeR),over(BL,smile));`,
    },
    // 8. Horizontal Repetition
    {
      id: 16,
      code: `
  rect block = rect(1,1,red);
  rep(10,block);`,
    },
    // 9. Vertical Repetition
    {
      id: 17,
      code: `
  rect block = rect(1,1,blue);
  rot(90,rep(10,block));`,
    },
    // 10. Concentric Rectangles
    {
      id: 18,
      code: `
  over(C,rect(5,5,green),rect(4,4,blue),rect(3,3,red),rect(2,2,yellow));`,
    },
    // 11. Zig-Zag Design
    {
      id: 19,
      code: `
  rect a = rect(1,1,red);
  rect b = rect(1,1,blue);
  vert(hor(a,b),hor(b,a),hor(a,b));`,
    },
    // 12. Vertical Gradient
    {
      id: 20,
      code: `
  rect top = rect(4,1,red);
  rect mid = rect(4,1,orange);
  rect bot = rect(4,1,yellow);
  vert(top,mid,bot);`,
    },
    // 13. Spiral
    {
      id: 21,
      code: `
  rect small = rect(1,1,blue);
  rot(90,small);
  rot(180,small);
  rot(270,small);
  over(C,small,rot(90,small),rot(180,small),rot(270,small));`,
    },
    // 14. Diamond Design
    {
      id: 22,
      code: `
  rect base = rect(2,2,red);
  rot(45,base);
  vert(base,rot(45,base));`,
    },
    // 15. Crossed Stripes
    {
      id: 23,
      code: `
  rect stripeH = rect(5,1,blue);
  rect stripeV = rot(90,rect(5,1,green));
  over(C,stripeH,stripeV);`,
    },
    // 16. Concentric Gradient
    {
      id: 24,
      code: `
  over(C,rect(5,5,red),rect(4,4,orange),rect(3,3,yellow),rect(2,2,green));`,
    },
    // 17. Symmetrical Reflection
    {
      id: 25,
      code: `
  rect a = rect(2,2,blue);
  rect b = rot(90,a);
  rect c = rot(180,a);
  rect d = rot(270,a);
  vert(hor(a,b),hor(d,c));`,
    },
    // 18. Flower Petals
    {
      id: 26,
      code: `
  rect petal = rect(2,1,pink);
  vert(rot(45,petal),rot(135,petal),rot(225,petal),rot(315,petal));`,
    },
    // 19. Bold Stripe Overlay
    {
      id: 27,
      code: `
  rect bg = rect(5,5,blue);
  rect stripe = rect(1,5,red);
  over(C,bg,stripe);`,
    },
    // 20. Diagonal Overlay
    {
      id: 28,
      code: `
  rect bg = rect(6,6,yellow);
  rect diag1 = rot(45,rect(6,1,red));
  rect diag2 = rot(135,rect(6,1,blue));
  over(C,bg,diag1,diag2);`,
    },
  ];
  

    // { id: 1, code: "rect(1,1,red);" },
    // { id: 2, code: "hor(rect(1,1,red),rect(1,1,blue));" },
    // { id: 3, code: "vert(rect(1,1,green),rect(1,1,blue));" },
    // { id: 4, code: "rect x = rect(1,1,black);\nrect y = rect(1,1,yellow);\nhor(rep(5,hor(x,y)),rep(5,hor(y,x)));" },
    // { id: 5, code: "rect x = rect(1,1,red);\nrect y = rect(1,1,blue);\nhor(rep(5,hor(x,y)));" },
    // { id: 6, code: "rect x = rect(1,1,blue);\nvert(rep(5,x),rep(5,x));" },
    // { id: 7, code: "rect x = rect(1,1,green);\nrect y = rect(1,1,red);\nhor(rep(10,hor(x,y)));" },
    // { id: 8, code: "rect x = rect(1,1,blue);\nrect y = rect(1,1,orange);\nrect z = hor(x,y);\nvert(z,z,z,z,z);" },
    // { id: 9, code: "rect x = rect(1,1,blue);\nrect y = rect(1,1,red);\nrect q1 = hor(rep(5,hor(x,y)));\nvert(q1,q1,q1,q1,q1);" },
    // { id: 10, code: "rect x = rect(1,1,red);\nrect y = rect(1,1,blue);\nrect line = hor(rep(5,hor(x,y)));\nvert(line,line,line,line,line);" },
    // { id: 11, code: "rect x = rect(1,1,green);\nrect y = rect(1,1,yellow);\nrect line = hor(rep(5,hor(x,y)));\nvert(line,line,line,line,line);" },
    // { id: 12, code: "rect x = rect(1,1,pink);\nrect y = rect(1,1,black);\nrect z = hor(x,y);\nover(C, rect(2,2,red), z, z);" },
    // { id: 13, code: "rect x = rect(1,1,blue);\nrect y = rect(1,1,red);\nrect z = hor(x,y);\nover(BL, rect(3,3,green), z, z);" },
    // { id: 14, code: "rect x = rect(1,1,orange);\nrect y = rect(1,1,pink);\nrect z = hor(x,y);\nover(TR, rect(3,3,black), z, z);" },
    // { id: 15, code: "rect x = rect(1,1,yellow);\nrect y = rect(1,1,purple);\nrect z = hor(x,y);\nover(TL, rect(3,3,red), z, z);" },
    // { id: 16, code: "rect x = rect(1,1,red);\nrect y = rect(1,1,blue);\nrect z = hor(x,y);\nover(BR, rect(3,3,green), z, z);" },
    // { id: 17, code: "rect x = rect(1,1,blue);\nrect y = rect(1,1,red);\nvert(hor(rep(3,x),rep(3,y)),hor(rep(3,x),rep(3,y)));" },
    // { id: 18, code: "rect x = rect(1,1,yellow);\nrect y = rect(1,1,black);\nrect z = hor(x,y);\nvert(z,z,z,z,z);" },
    // { id: 19, code: "rect x = rect(1,1,green);\nrect y = rect(1,1,blue);\nrect z = hor(x,y);\nover(C, rect(3,3,red), z, z);" },
    // { id: 20, code: "rect x = rect(1,1,red);\nrect y = rect(1,1,blue);\nvert(rep(5,hor(x,y)),rep(5,hor(y,x)));" },
    // { id: 1, code: "rect grey = rect(1,1,grey);\nrect brown = rect(1,1,brown);\nrect black = rect(1,1,black);\nrect pink = rect(1,1,pink);\nrect rowOne = rep(6, grey);\nrect rowTwo = rep(6, brown);\nrect rowThree = hor(black, grey, brown, brown, grey, black);\nrect rowFour = rowTwo;\nrect rowFive = hor(grey, brown, pink, pink, brown, grey);\nrect rowSix = rowFive;\nvert(rowOne, rowTwo, rowThree, rowFour, rowFive, rowSix);" },
    // { id: 2, code: "rect brown = rect(1,1,brown);\nrect black = rect(1,1,black);\nrect yellow = rect(1,1,yellow);\nrect background = rect(1,1,green);\nrect red = rect(1,1,red);\nrect a = hor(rep(6,background),rep(4,black),rep(6, background));\nrect b = hor(rep(5,background),rep(1, black),rep(3,red),rep(1, black),rep(6,background));\nrect c = hor(rep(4, background),rep(1,black),rep(2,red),rep(2,black),rep(7,background));\nrect d = hor(rep(3,background),rep(1,black),rep(4,brown),rep(1,black),rep(7,background));\nrect e = hor(rep(2,background),rep(1,black),rep(1,brown),rep(1,black),rep(2,brown),rep(1,black),rep(1,brown),rep(1,black),rep(1,background),rep(4,black),rep(1,background));\nrect f = hor(rep(2,background),rep(1,black),rep(1,brown),rep(1,black),rep(2,brown),rep(1,black),rep(1,brown),rep(2,black),rep(4,brown),rep(1,black));\nrect g = hor(rep(1,background),rep(1,black),rep(3,yellow),rep(2,brown),rep(1,black),rep(1,brown),rep(1,black),rep(5,brown),rep(1,black));\nrect h = hor(rep(2,background),rep(2,black),rep(10,brown),rep(1,black),rep(1,background));\nrect i = hor(rep(1,background),rep(1,black),rep(13,brown),rep(1,black));\nrect j = hor(rep(1,black),rep(8,brown),rep(1,black),rep(2,brown),rep(1,black),rep(2,brown),rep(1,black));\nrect k = hor(rep(1,black),rep(9,brown),rep(2,black),rep(2,brown),rep(1,black),rep(1,background));\nrect l = hor(rep(1,black),rep(12,brown),rep(2,black),rep(1,background));\nrect m = hor(rep(1,background),rep(2,black),rep(10,brown),rep(1,black),rep(2,background));\nrect n = hor(rep(2,background),rep(2,black),rep(8,brown),rep(2,black),rep(2,background));\nrect o = hor(rep(3,background),rep(10,black),rep(3,background));\nrect p = hor(rep(2,background),rep(1,black),rep(3,yellow),rep(1,black),rep(3,yellow),rep(1,black),rep(5,background));\nvert(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p);" },
    // { id: 3, code: "rect yellowRect = rect(1, 1, yellow);\nrect blackRect = rect(1, 1, black);\nrect yellowBackground = hor(rep(10, yellowRect));\nrect eyes = hor(yellowRect, yellowRect, yellowRect, blackRect, yellowRect, yellowRect, blackRect, yellowRect, yellowRect, yellowRect);\nrect topLip = hor(yellowRect, yellowRect, blackRect, yellowRect, yellowRect, yellowRect, yellowRect, blackRect,yellowRect, yellowRect);\nrect midLip = hor(yellowRect, yellowRect, yellowRect, blackRect, yellowRect, yellowRect, blackRect, yellowRect, yellowRect, yellowRect);\nrect bottomLip = hor(yellowRect, yellowRect, yellowRect, yellowRect, blackRect, blackRect, yellowRect, yellowRect, yellowRect, yellowRect);\nvert(yellowBackground, yellowBackground, yellowBackground, eyes, yellowBackground, yellowBackground, topLip, midLip, bottomLip, yellowBackground);" },
    // { id: 4, code: "rect grey = rect(1, 1, grey);\nrect black = rect(1, 1, black);\nrect top = hor(grey, black);\nrect bottom = hor(black, grey);\nrect repeat = rep(4, (vert(top, bottom)));\nvert(repeat, repeat, repeat, repeat);" },
  ];
  
  // { id: 21, code: "rect grey = rect(1,1,grey);\nrect brown = rect(1,1,brown);\nrect black = rect(1,1,black);\nrect pink = rect(1,1,pink);\nrect rowOne = rep(6, grey);\nrect rowTwo = rep(6, brown);\nrect rowThree = hor(black, grey, brown, brown, grey, black);\nrect rowFour = rowTwo;\nrect rowFive = hor(grey, brown, pink, pink, brown, grey);\nrect rowSix = rowFive;\nvert(rowOne, rowTwo, rowThree, rowFour, rowFive, rowSix);" },
  

  
  
  
  
  

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
