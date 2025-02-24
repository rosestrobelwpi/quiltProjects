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
      <h1>Functions</h1>
      <div className="getting-started-text-container">
        <p>
          Functions make it easier to repeat certain blocks of code and reduce redundancy.<br /> <br />
          <h4>Define functions</h4>
          To define a function, use the syntax:
          <pre>
          <code>
          <span className="keyword">define</span> functionName (<span className="keyword"></span><span className="variable">rect</span> x, <span className="variable">rect</span> y) {"{"}<br />
          &emsp;&emsp;&emsp;&emsp;return expression <br/>
          {"}"}
          </code>
          </pre>
          <br />
          The function begins with the keyword <span className='keyword'>define</span>, which is then followed by the name of the function.
          Following the name, the function can either take in parameters surrounded by parenthesis, or have 0 parameters. To mark the beginning and end of a function,
          we will use curly braces. Inside of these curly braces is where we put the expression we would like to use. <br /> <br />
        </p>
        <h1>Examples</h1><br />
          <i><u>Colorful Checkboard</u></i>

          <pre>
            <code>
              <span className='variable'>define</span> checkerboard = (rect a, rect b, rect x, rect y)	&#123;<br />
              <span className='variable'>return</span> <span className='keyword'>repX</span> (4, hor(vert(a,b,x,y,a,b,x,y), vert(y,x,b,a,y,x,b,a)));<br />&#125;<br /> 	

              <span className='variable'>rect</span> theGreen =  <span className='variable'>rect</span> (1, 1, <span className='keyword'>darkseagreen</span>);<br />
              <span className='variable'>rect</span> theYellow =  <span className='variable'>rect</span> (1, 1, <span className='keyword'>khaki</span>);<br />
              <span className='variable'>rect</span> theBlue =  <span className='variable'>rect</span> (1, 1, <span className='keyword'>darkcyan</span>);<br />
              <span className='variable'>checkerboard</span>(<span className='keyword'>theGreen</span>, <span className='keyword'>theBlue</span>, <span className='keyword'>theYellow</span>, <span className='keyword'>thePurple</span>);<br />
            </code>
          </pre>
          <img src='./static/colorful-checkboard.png' className='example-pictures'></img>
      </div>
    </div>
  );
};

export default Document;
