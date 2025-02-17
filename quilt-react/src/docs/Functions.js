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
          Functions make it easier to repeat certain blocks of code, which makes it easier to create patterns.<br /> <br />
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
          <i><u>FUNCTIONS WHAT FOR OMGOGMOMGOMGOMGOMG</u></i>

          <pre>
            <code>
              <span className='variable'>rect</span> yellowRect = <span className='variable'>rect</span>(1, 1, yellow);<br />
              <span className='variable'>rect</span> blackRect = <span className='keyword'>rect</span>(1, 1, black);<br /><br />

              <span className='variable'>rect</span> yellowBackground = <span className='keyword'>hor</span>(<span className='keyword'>repX</span>(8, yellowRect));<br />
              <span className='variable'>rect</span> eyes = <span className='keyword'>hor</span>(yellowRect, yellowRect, blackRect, yellowRect, yellowRect, blackRect, yellowRect, yellowRect);<br />
              <span className='variable'>rect</span> topLip = <span className='keyword'>hor</span>(yellowRect, blackRect, yellowRect, yellowRect, yellowRect, yellowRect, blackRect, yellowRect);<br />
              <span className='variable'>rect</span> bottomLip = <span className='keyword'>hor</span>(yellowRect, yellowRect, blackRect, blackRect, blackRect, blackRect, yellowRect, yellowRect);<br /><br />

              <span className='keyword'>vert</span>(yellowBackground, yellowBackground, yellowBackground, eyes, yellowBackground, yellowBackground, topLip, bottomLip, yellowBackground);
            </code>
          </pre>
        
      </div>
    </div>
  );
};

export default Document;
