import React from 'react';
import './getting-started.css';

const Document = () => {
  return (
    <div className="getting-started-container">
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
      <h1>Getting Started</h1>
      <div className="getting-started-text-container">
        <p>
          Quilt Designer is a student project designed to help programmers express themselves creatively. To create your first shape, we have to go over a few main definitions and variables:
        </p>
        <p>
          <h3>rect(width, height, color)</h3>
          Rect creates a simple rectangle. We define the dimensions of this rectangle with its parameters, width, height, and color.
        </p>

        <p>
        <h3>hor(Patch, Patch, ...)</h3>
          Hor places your designs horizontally. You can nest directional patterns inside of each other. <br />
          <pre>
          <code>
          <span className="keyword">hor</span> (<span className="keyword"></span><span className="variable">rect</span> (1, 1, blue), <span className="variable">rect</span>(1, 1, red), <span className="variable">rect</span>(1, 1, yellow))<br />
          <span className="keyword">hor</span> (<span className="keyword">vert</span> (<span className="variable">rect</span>(1, 2, green), <span className="variable">rect</span>(2, 2, green))
          </code>
        </pre>
        </p>
        <p>
        <h3>vert(Patch, Patch, ...)</h3>
          Vert is similar to hor, but rather than placing your designs horizontally, it places it vertically. Similarly, you can also nest directional patterns inside each of each other with vert.
        </p>
        <p>
        <h3>rep(Number, Patch)</h3>
          Rep allows you to repeat a design. It takes in a number of how many times you want to repeat, and the patch.
          <pre>
          <code>
          <span className="keyword">rep</span> (3, <span className="variable">rect</span>(1, 1, green), <span className="variable">rect</span>(1, 1, red))<br />
          <span className="keyword">hor</span> (<span className="keyword">vert</span> (<span className="variable">rect</span>(1, 2, green), <span className="variable">rect</span>(2, 2, green))
          </code>
        </pre>
        </p>
        <p>
          <h3>rot(Angle, Patch)</h3>
          Rot rotates your design. It takes in an angle number (0, 90, 190, 270), as well a patch.
          <pre>
          <code>
          <span className="keyword">rot</span> (180, <span className="variable">rect</span>(3, 3, red))<br />
          </code>
        </pre>
        </p>
        <p>
          <h3>over(Position, Patch)</h3>
          Over allows you to overlay shapes over another. The first parameter is a position. All of the possible positions are top left (TL), top right (TR), bottom left (BL), bottom right (BR), and center. The first rectangle you code is the rectangle on the bottom.
          <pre>
          <code>
          <span className="keyword">over</span> (TL, <span className="variable">rect</span>(1, 1, green), <span className="variable">rect</span>(1, 1, yellow))<br />
          </code>
        </pre>
        </p>
      </div>
    </div>
  );
};

export default Document;
