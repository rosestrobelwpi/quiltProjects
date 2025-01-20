import React from 'react';
import './about.css';

function About() {
  return (
    <div className="about-container">
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

      <div className="about-top-container">
        <h1>Meet the Developers</h1>
        <div className='about-img-container'>
          <div className='about-img-person'>
            <img src='./static/abby.jpg'></img>
            <h3>Abigail Haller</h3>
            <p>Computer Science, 2025<br />Backend Developer</p>
          </div>
          <div className='about-img-person'>
            <img src='./static/laura.jpg'></img>
            <h3>Laura Pellowski</h3>
            <p>Computer Science, 2025<br />Backend Developer</p>
          </div>
          <div className='about-img-person'>
            <img src='./static/ben.jpg'></img>
            <h3>E. Ben Tyler</h3>
            <p>Computer Science, 2025<br />Frontend Developer</p>
          </div>
          <div className='about-img-person'>
            <img src='./static/rose.jpg'></img>
            <h3>Rose Strobel</h3>
            <p>Computer Science, 2025<br />Frontend Developer</p>
          </div>
        </div>
      </div>

      <div className="about-text-container">
          <h1>Research Question</h1>
          <p>Our primary research goal is to decide how we can best design a programming language in order to best supplement creativity through producing quilt patterns. This was accomplished in a number of steps, as the grammar was solidified first, and further implementation was decided after. Seemingly small choices, such as syntax differences and naming conventions, all add up to a bigger picture where the user is either more comfortable or less. Reliability is also important, as is conciseness and readability. Balancing these ideas with the relative ease of implementation led us to the programming language as it is now. Furthermore, the website was designed with the user in mind, such that it is easy to navigate and learn more about the programming language before jumping into coding.</p>
      </div>

      <div className="about-text-container">
          <h1>Purpose of the Project</h1>
          <p>	Our purpose in designing this programming language is twofold. First, the intrinsic joy received in creativity is enough on its own, and should not be overlooked. It is important to remember to have fun, and expression through the arts can be fulfilling to the everyday programmer. The purpose of coding is restricted to advancing technical skills and employment reasons too often. While these reasons are productive, gratification through creativity is just as necessary. Secondly, we created this to reach a larger audience of programmers who may not have experience with quilting. This is partly due to the stereotypical gendering of each hobby. The majority of quilters are women (98% in America, according to the Quilting in America survey), and the majority of programmers in the workforce are men (80% in America, according to Data USA information). Thus, we are able to tackle gender inequalities in quilting by introducing it through a typically male passion. We connect programming, which users already enjoy, to an unfamiliar concept, such that fulfillment is increased by association.</p>
      </div>
    </div>
  );
}

export default About;
