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
          (<span className="keyword">vert</span> (<span className="keyword">hor</span> (<span className="variable">rect</span> 2 2 blue) (<span className="variable">rect</span> 2 3 red)) (<span className="variable">rect</span> 2 3 yellow))<br />
          (<span className="keyword">vert</span> (<span className="variable">rect</span> 2 2) (<span className="keyword">hor</span> (<span className="variable">rect</span> 1 2) (<span className="variable">rect</span> 2 2)))
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
        </p>
        <p>
          <h3>rot(Angle, Patch)</h3>
          Rot rotates your design. It takes in an angle number (0, 90, 190, 270), as well a patch.
        </p>
        <p>
          <h3>over(topLeft, topRight, bottomLeft, bottomRight, Center)</h3>
          Uhhhh
        </p>
        <pre>
          <code>
            This is code<br />
            This is more code<br />
            <span className="keyword">let </span><span className="variable">editor</span> = <span className="keyword">new</span><span className="keyword"> editor</span>
          </code>
        </pre>

        <p>
          The -f iife file tells Rollup that the output file should be formatted as an "immediately-invoked function expression" (as opposed to other module styles, such as CommonJS or UMD). This means the code will be wrapped in an anonymous function that is then immediately called, using that function's scope as a local namespace so that its variables don't end up in the global scope.
        </p>
        <p>
          The -o option indicates which output file to write to, and the -p option loads the resolution plugin. You can also create a configuration file (called rollup.config.mjs) and just run rollup -c to take the configuration from that file.
        </p>
      </div>
    </div>
  );
};

export default Document;
