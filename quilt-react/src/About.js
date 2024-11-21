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
        <h1>We are students at WPI this is our MQP!</h1>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos a voluptatum odio accusantium voluptatibus error necessitatibus..</p>
      </div>

      <div className="about-text-container">
        <div className="about-text-content">
          <h2>Lorem ipsum dolor sit amet</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum enim exercitationem alias, culpa corporis voluptas dolores architecto magni impedit ab hic illo praesentium sunt ad dolorum sint perferendis eum? Ab.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio quibusdam blanditiis rerum? Saepe cumque aut repudiandae tempora, delectus dolor vero? Voluptatibus recusandae non doloribus quibusdam magni! Fugiat rem vel labore.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, odio sapiente omnis at nostrum vitae consequatur ipsa repellendus quisquam ut quidem accusantium tempora cumque, ab hic dolore laudantium dolorem odit?</p>
        </div>
        <div className="about-img-container">
          <img src="https://plus.unsplash.com/premium_photo-1661715812379-23d652805042?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z3JvdXB8ZW58MHx8MHx8fDA%3D" alt="Group of people" />
        </div>
      </div>

      <div className="about-text-container">
        <img src="https://previews.123rf.com/images/antoniodiaz/antoniodiaz1506/antoniodiaz150600015/41597583-portrait-of-a-group-of-people-looking-at-a-laptop-computer-and-doing-some-work-in-an-office.jpg" alt="Group working on laptop" id="img2" />
        <div className="about-text-content">
          <h2>Lorem ipsum dolor sit amet</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum enim exercitationem alias, culpa corporis voluptas dolores architecto magni impedit ab hic illo praesentium sunt ad dolorum sint perferendis eum? Ab.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio quibusdam blanditiis rerum? Saepe cumque aut repudiandae tempora, delectus dolor vero? Voluptatibus recusandae non doloribus quibusdam magni! Fugiat rem vel labore.</p>
        </div>
      </div>
    </div>
  );
}

export default About;
