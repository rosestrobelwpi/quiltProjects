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
          <h3>rect(width, height, color);</h3>
          <br />
          <span className='keyword'>Rect</span> creates a simple rectangle. We define the dimensions of this rectangle with its parameters, width, height, and color. In this document, I will reference <strong>patches</strong>, which is another word for a rectangle design.<br />
          <pre>
            <code>
            <span className="keyword"></span><span className="variable">rect</span>(1, 1, blue); <br /><br />
            <span className="keyword"></span><span className="variable">rect</span>(4, 3, red); <br /><br />
            <span className="keyword"></span><span className="variable">rect</span>(2, 2, green); <br />
            </code>
          </pre>
          In all of the examples, we are creating rectangle designs with different widths and heights. The first rectangle has a width of 1, height of 1, and a blue color. The pattern is the same for the rest of the rectangles; the only difference are their dimensions.<br /><br />
        </p>

        <p>
        <h3>hor(Patch, Patch, ...);</h3>
        <br />
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
        <h3>vert(Patch, Patch, ...);</h3>
        <br />
          <span className='keyword'>Vert</span> is similar to <span className='keyword'>hor</span>, but rather than placing your designs horizontally, it places them vertically. The widths of rectangles in the same row must be the same. Similarly, you can nest directional patterns with vert.<br />
          <pre>
            <code>
            <span className="keyword">vert</span>(<span className="keyword"></span><span className="variable">rect</span>(1, 2, green), <span className="variable">rect</span>(1,2,yellow));<br /><br />
            <span className="keyword">vert</span>(<span className="keyword"></span><span className="variable">rect</span>(1, 2, blue), <span className="variable">rect</span>(1,5,red));<br /><br />
            <span className="keyword">vert</span>(<span className="keyword">hor</span>(<span className="variable">rect</span>(3, 2, black), <span className="variable">rect</span>(3, 2, orange)), hor(<span className="variable">rect</span>(3, 2, yellow), <span className="variable">rect</span>(3, 2, red)));<br />
            </code>
        </pre>
        In the first example, we are placing 2 rectangles with widths of 1 and heights of 2 in a vertical row.<br /><br />
        In the second example, we are placing 2 rectangles in a vertical row. But <strong>wait, not again!</strong> They are different heights! Remember, rectangles in vertical rows do not have to be the same height!<br /><br />
        In the third example, we are placing 2 rectangles in a horizontal row. Then we place 2 more rectangles in a horizontal row. Finally, we wrap all of the horizontal rows <i>nice and tight</i> with a <span className='keyword'>vert</span> definition. <br /><br />
        </p>
        <p>
        <h3 id='repeatTutorialID'>rep(Number, Patch);</h3>
        <br />
          <span className='keyword'>Rep</span> allows you to repeat a design. It takes in a number of how many times you want to repeat, and the patch.
          <pre>
          <code>
          <span className="keyword">rep</span>(3, <span className="variable">rect</span>(1, 2, green));<br /><br />
          <span className="keyword">rep</span>(4, <span className="keyword">hor</span>(<span className="variable">rect</span>(1, 2, red), <span className="variable">rect</span>(1, 2, blue)));<br /><br />
          <span className='keyword'>rep</span>(2, <span className="keyword">vert</span>(<span className="keyword">hor</span>(<span className="variable">rect</span>(1, 1, purple), <span className="variable">rect</span>(1, 1, pink)), <span className="variable">rect</span>(2, 2, orange)));<br />
          </code>
        </pre>
        In the first example, we are creating a simple green rectangle. We are then repeating the rectangle 3 times.<br /><br />
        In the second example, we are creating a <span className='keyword'>hor</span> design containing 1 red rectangle and 1 blue rectangle. But we want this to repeat 4 times! It's time to <i>wrap</i>! We now wrap our rectangles in a <span className='keyword'>rep</span> definition, specifying that we want to repeat this design 4 times.<br /><br />
        In the third example, we are really <strong>ramping</strong> things up! This design will look more like an oddly colored cake. First, we make a horizontal row with 1 purple rectangle and 1 pink rectangle. Now it's time for the next two rows! We are wrapping our <span className='keyword'>hor</span> design in a <span className='keyword'>vert</span> design. For the vertical row, we create 1 orange rectangle. Now we want this to repeat. Yup, <strong>you guessed it!</strong> We're wrapping it all in a <span className='keyword'>rep</span> definition, specifying that we want this pattern to repeat twice.<br /><br />
        </p>
        <p>
          <h3 id='overlayTutorialID'>over(Position, Patch, Patch...);</h3>
          <br />
          <span className='keyword'>Over</span> allows you to overlay rectangles over each other. The first parameter is a position. All of the possible positions are <i>top left</i> <strong>(TL)</strong>, <i>top right</i> <strong>(TR)</strong>, <i>bottom left</i> <strong>(BL)</strong>, <i>bottom right</i> <strong>(BR)</strong>, and <i>center</i> <strong>(C)</strong>.
          <br /><br /><i>Note:</i> Rectangles wrapped in the <span className='keyword'>over</span> definition can be different widths and heights, but the width and height of the first rectangle must be <strong><i>greater than or equal</i></strong> to the width and height of the rectangle after it, and so on.!
          <pre>
          <code>
          <span className='keyword'>over</span>(TL, <span className='variable'>rect</span>(3, 4, red), <span className='variable'>rect</span>(2, 3, blue), <span className='variable'>rect</span>(1, 2, yellow));<br /><br />
          <span className='keyword'>over</span>(C, <span className='variable'>rect</span>(20, 15, red), <span className='variable'>rect</span>(3, 10, grey), <span className='variable'>rect</span>(10, 3, grey));
          </code>
        </pre>
        In the first example, we create rectangles of varying sizes. Notice how the first rectangle is both wider and taller than the next rectangle, and so on. This is because the first rectangle is your <strong>base</strong>. It is at the bottom in the overlay order. We then wrap these rectangles in the overlay definition, and specify that we want the corresponding rectangles to be in the top left corner.<br /><br />
        In the second example, we're going to make the Switzerland flag! We start with the background color, which is red. Next, we make two grey rectangles. One tall and thin one, and one wide and short one. Time to <i>overlay</i>! We are going to position the grey rectangles in the center of the red rectangle, and <i>voila!</i> You've made the Switzerland flag.<br /><br />
        </p>
        <p>
          <h3>rot(Angle, Patch);</h3>
          <br />
          Rot rotates your design. It takes an angle number <strong>(0, 90, 180, 270)</strong>, as well as a patch.
          <pre>
          <code>
          <span className='keyword'>rot</span>(270, <span className='keyword'>over</span>(TL, <span className='variable'>rect</span>(3, 4, red), <span className='variable'>rect</span>(2, 3, blue), <span className='variable'>rect</span>(1, 2, yellow)));<br /><br />
          <span className='keyword'>rot</span>(180, <span className='keyword'>rep</span>(2, <span className='keyword'>vert</span>(<span className='keyword'>hor</span>(<span className='variable'>rect</span>(1, 1, purple),  <span className='variable'>rect</span>(1, 1, pink)),  <span className='variable'>rect</span>(2, 2, orange))));
          </code>
        </pre>
        Let's keep it simple and reuse older designs!
        <br /><br />
        In the first example, we are using the first design from the <a href='#overlayTutorialID'>over</a> section. The code is <i>exactly</i> the same. The only difference is that we <strong>wrapped</strong> it with the <span className='keyword'>rot</span> definition! We then specified that we wanted the design to rotate <strong>270 degrees</strong> clockwise.<br /><br />
        In the second example, we are doing the exact same thing. The design we are using is from the <a href='#repeatTutorialID'>rep</a> section. Once again, we have a carbon copy of the code, except we rotated it <strong>180 degrees</strong> clockwise! Talk about nice and easy!
        </p>
        

        <h1>Variables</h1>
        <p>
          You can use variables to reduce how often you need to retype code. It may even simplify the entire coding process by making <strong>wrapping</strong> easier to visualize.
          <br /><br />
          <h3>Types</h3><br />
          <strong>int</strong><br />
          An <span className='keyword'>int</span> is short for an integer, which can be useful if you are building a patch that requires a lot of the same number.
          <pre>
          <code>
            <span className='keyword'>int</span> x = 3;
          </code>
          </pre>
          <i>Note</i>: ints can only be set to <strong>unsigned integers</strong>, which means you cannot use a negative number or a number with a decimal. Numbers from 0 and up are valid to use.<br /><br />
          <strong>rect</strong><br />
          A <span className='keyword'>rect</span> is short for rectangle. It is used to return patches.
          <pre>
          <code>
          <span className='keyword'>rect</span> redRect = <span className='keyword'>rect</span>(1, 1, red);
          </code>
          </pre>
          The syntax begins with the type: <span className='keyword'>rect</span>, the name of the variable, and then the patch.<br /><br />

          <h1>Examples</h1><br />
          <i><u>Smiley Face Design:</u></i>
          {/* <pre>
            <code>
              <span className='keyword'>rect</span> yellowRect = <span className='keyword'>rect</span>(1, 1, yellow);<br />
              <span className='keyword'>rect</span> blackRect = <span className='keyword'>rect</span>(1, 1, black);<br /><br />

              <span className='keyword'>rect</span> rowOne = hor(rep(8, yellowRect));<br />
              <span className='keyword'>rect</span> rowTwo = rowOne;<br />
              <span className='keyword'>rect</span> rowThree = rowOne;<br />
              <span className='keyword'>rect</span> rowFour = hor(yellowRect, yellowRect, blackRect, yellowRect, yellowRect, blackRect, yellowRect, yellowRect);<br />
              <span className='keyword'>rect</span> rowFive = rowOne;<br />
              <span className='keyword'>rect</span> rowSix = rowOne;<br />
              <span className='keyword'>rect</span> rowSeven = hor(yellowRect, blackRect, yellowRect, yellowRect, yellowRect, yellowRect, blackRect, yellowRect);<br />
              <span className='keyword'>rect</span> rowEight = hor(yellowRect, yellowRect, blackRect, blackRect, blackRect, blackRect, yellowRect, yellowRect);<br />
              <span className='keyword'>rect</span> rowNine = rowOne;<br /><br />

              <span className='keyword'>vert</span>(rowOne, rowTwo, rowThree, rowFour, rowFive, rowSix, rowSeven, rowEight, rowNine);
            </code>
          </pre>
          This is much easier to read and understand compared to doing everything on one line! But it's extremely long. Let's see if we can condense it into something more readable. */}

          <pre>
            <code>
              <span className='variable'>rect</span> yellowRect = <span className='variable'>rect</span>(1, 1, yellow);<br />
              <span className='variable'>rect</span> blackRect = <span className='keyword'>rect</span>(1, 1, black);<br /><br />

              <span className='variable'>rect</span> yellowBackground = <span className='keyword'>hor</span>(<span className='keyword'>rep</span>(8, yellowRect));<br />
              <span className='variable'>rect</span> eyes = <span className='keyword'>hor</span>(yellowRect, yellowRect, blackRect, yellowRect, yellowRect, blackRect, yellowRect, yellowRect);<br />
              <span className='variable'>rect</span> topLip = <span className='keyword'>hor</span>(yellowRect, blackRect, yellowRect, yellowRect, yellowRect, yellowRect, blackRect, yellowRect);<br />
              <span className='variable'>rect</span> bottomLip = <span className='keyword'>hor</span>(yellowRect, yellowRect, blackRect, blackRect, blackRect, blackRect, yellowRect, yellowRect);<br /><br />

              <span className='keyword'>vert</span>(yellowBackground, yellowBackground, yellowBackground, eyes, yellowBackground, yellowBackground, topLip, bottomLip, yellowBackground);
            </code>
          </pre>
          {/* Perfect! We made use of the <span className='keyword'>rep</span> variable to condense the yellow horizontal row into one line of code!<br /><br /> */}
          <i><u>Checkboard Design:</u></i>
          <pre>
            <code>
            <span className='variable'>rect</span> grey = <span className='variable'>rect</span>(1, 1, grey);<br />
            <span className='variable'>rect</span> black = <span className='variable'>rect</span>(1, 1, black);<br />

            <span className='variable'>rect</span> top = <span className='keyword'>hor</span>(grey, black);<br />
            <span className='variable'>rect</span> bottom = <span className='keyword'>hor</span>(black, grey);<br />
            <span className='variable'>rect</span> repeat = <span className='keyword'>rep</span>(4, (vert(top, bottom)));<br /><br />

            <span className='keyword'>vert</span>(repeat, repeat, repeat, repeat);
            </code>
          </pre>
        </p>
      </div>
    </div>
  );
};

export default Document;
