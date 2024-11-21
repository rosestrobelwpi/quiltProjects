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
            <li><a href="/examples">Tutorial</a></li>
          </ul>
        </div>
      </div>
      <h1>Definitions</h1>
      <div className="getting-started-text-container">
        <p>
          Quilt Designer is a student project designed to help programmers express themselves creatively. To create your first shape, we have to go over a few main definitions and variables: <br /> <br />
        </p>
        <p>
          <h3>rect(width, height, color)</h3>
          <span className='keyword'>Rect</span> creates a simple rectangle. We define the dimensions of this rectangle with its parameters, width, height, and color. In this document, I will reference <strong>patches</strong>, which is another word for a rectangle design.<br />
          <pre>
            <code>
            <span className="keyword"></span><span className="variable">rect</span>(1, 1, red); <br /><br />
            <span className="keyword"></span><span className="variable">rect</span>(4, 3, blue); <br /><br />
            <span className="keyword"></span><span className="variable">rect</span>(2, 2, green); <br />
            </code>
          </pre>
          In all of the examples, we are creating rectangle designs with different widths and heights. The first rectangle has a width of 1, height of 1, and a blue color. The pattern is the same for the rest of the rectangles; the only difference are their dimensions.<br /><br />
        </p>

        <p>
        <h3>hor(Patch, Patch, ...)</h3>
          <span className='keyword'>Hor</span> places your designs horizontally. The heights of rectangles in the same row must be the same. You can also nest directional patterns inside of each other. <br />
          <pre>
            <code>
            <span className="keyword">hor</span>(<span className="keyword"></span><span className="variable">rect</span>(1, 1, blue), <span className="variable">rect</span>(1,1,red));<br /><br />
            <span className="keyword">hor</span>(<span className="keyword"></span><span className="variable">rect</span>(5, 3, blue), <span className="variable">rect</span>(8, 3, red));<br /><br />
            <span className="keyword">hor</span>(<span className="keyword">vert</span>(<span className="variable">rect</span>(1, 2, red), <span className="variable">rect</span>(1, 2, green), <span className="variable">rect</span>(1, 2, blue)), <span className="keyword">vert</span>(<span className="variable">rect</span>(1, 2, green), <span className="variable">rect</span>(1, 2, blue), <span className="variable">rect</span>(1, 2, red)));<br />
            </code>
        </pre>
        In the first example, we are placing two rectangles with widths of 1 and heights of 1 in a horizontal row.<br /><br />
        In the second example, we are placing 2 rectangles in a horizontal row. But <strong>wait!</strong> They are different widths! Remember, rectangles in horizontal rows do not have to be the same width!<br /><br />
        In the third example, we are first creating a vertical row with 3 rectangles in a row. Next, we make another vertical row with three more rectangles. Finally, we wrap it all in a <span className='keyword'>hor</span> container to place the vertical rows side by side!<br /><br />
        </p>
        <p>
        <h3>vert(Patch, Patch, ...)</h3>
          <span className='keyword'>Vert</span> is similar to <span className='keyword'>hor</span>, but rather than placing your designs horizontally, it places them vertically. The widths of rectangles in the same row must be the same. Similarly, you can nest directional patterns with vert.<br />
          <pre>
            <code>
            <span className="keyword">vert</span>(<span className="keyword"></span><span className="variable">rect</span>(1, 2, green), <span className="variable">rect</span>(1,2,yellow));<br /><br />
            <span className="keyword">vert</span>(<span className="keyword"></span><span className="variable">rect</span>(1, 2, blue), <span className="variable">rect</span>(1,5,red));<br /><br />
            <span className="keyword">vert</span>(<span className="keyword">hor</span>(<span className="variable">rect</span>(3, 2, black), <span className="variable">rect</span>(3, 2, orange)), hor(<span className="variable">rect</span>(3, 2, yellow), <span className="variable">rect</span>(3, 2, red)));<br />
            </code>
        </pre>
        In the first example, we are placing 2 rectangles with widths of 3 and heights of 2 in a vertical row.<br /><br />
        In the second example, we are placing 2 rectangles in a vertical row. But <strong>wait, not again!</strong> They are different heights! Remember, rectangles in vertical rows do not have to be the same height!<br /><br />
        In the third example, we are placing 2 rectangles in a horizontal row. Then we place 2 more rectangles in a horizontal row. Finally, we wrap all of the horizontal rows <i>nice and tight</i> with a <span className='keyword'>vert</span> definition. <br /><br />
        </p>
        <p>
        <h3>rep(Number, Patch)</h3>
          Rep allows you to repeat a design. It takes in a number of how many times you want to repeat, and the patch.
          <pre>
          <code>
          <span className="keyword">rep</span> (3, <span className="variable">rect</span>(1, 1, green), <span className="variable">rect</span>(1, 1, red))<br /><br />
          <span className="keyword">hor</span> (<span className="keyword">vert</span> (<span className="variable">rect</span>(1, 2, green), <span className="variable">rect</span>(2, 2, green))<br /><br />
          <span className="keyword">hor</span>(<span className="keyword">rep</span>(3,<span className="variable">rect</span>(1,1,red)),<span className="keyword">rep</span>(3,<span className="variable">rect</span>(1,1,blue)));
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

        <h1>Variables</h1>
        <p>
          You can use variables to reduce how often you need to retype code. Types can be ints or rect, as long as it returns a rectangle.
          <pre>
          <code>
          <span className="keyword"></span><span className="variable">int</span> x = 3<br />
          <span className="keyword">rect</span> y = <span className="variable">rect</span>(1, 2, green), <span className="variable">rect</span>(2, 2, green))
          </code>
        </pre>
        </p>
        
      </div>
    </div>
  );
};

export default Document;
