import React from 'react';
import './examples.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faPenFancy } from '@fortawesome/free-solid-svg-icons';

function Examples() {
  return (
    <div className="examples-container">
      <div className="navbar">
        <ul>
          <li><a href="/" id="logo">Logo</a></li>
        </ul>
        <div className="navbar-links">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/play">Play</a></li>
            <li><a href="/about">About Us</a></li>
          </ul>
        </div>
      </div>
      <div className='document-links'>
        <ul>
          <li><a href='/gettingStarted'><FontAwesomeIcon icon={faHouse} className='icon' />Getting Started</a></li>
          <li><a href='#'><FontAwesomeIcon icon={faPenFancy} className='icon' /> Creating Patterns</a></li>
        </ul>
      </div>
      <h1>Examples</h1>
      <div className="picture-container">
        <a href="/exampleOne"><img src="https://www.merchpatterns.com/images/Pattern_Motifs_Calico.jpg" alt="Pattern Motifs Calico" /></a>
        <a href="/examples/example-one.html"><img src="https://www.merchpatterns.com/images/Pattern_Motifs_Roses.jpg" alt="Pattern Motifs Roses" /></a>
        <a href="/examples/example-one.html"><img src="https://www.merchpatterns.com/images/Pattern_Motif_ZFloral_Leaves_3.jpg" alt="Pattern Motif Z Floral Leaves" /></a>
        <a href="/examples/example-one.html"><img src="https://www.merchpatterns.com/images/Pattern_Motifs_Calico.jpg" alt="Pattern Motifs Calico" /></a>
        <a href="/examples/example-one.html"><img src="https://www.merchpatterns.com/images/Pattern_Motifs_Roses.jpg" alt="Pattern Motifs Roses" /></a>
        <a href="/examples/example-one.html"><img src="https://www.merchpatterns.com/images/Pattern_Motif_ZFloral_Leaves_3.jpg" alt="Pattern Motif Z Floral Leaves" /></a>
        <a href="/examples/example-one.html"><img src="https://www.merchpatterns.com/images/Pattern_Motifs_Roses.jpg" alt="Pattern Motifs Roses" /></a>
        <a href="/examples/example-one.html"><img src="https://www.merchpatterns.com/images/Pattern_Motif_ZFloral_Leaves_3.jpg" alt="Pattern Motif Z Floral Leaves" /></a>
        <a href="/examples/example-one.html"><img src="https://www.merchpatterns.com/images/Pattern_Motifs_Roses.jpg" alt="Pattern Motifs Roses" /></a>
        <a href="/examples/example-one.html"><img src="https://www.merchpatterns.com/images/Pattern_Motifs_Calico.jpg" alt="Pattern Motifs Calico" /></a>
        <a href="/examples/example-one.html"><img src="https://www.merchpatterns.com/images/Pattern_Motif_ZFloral_Leaves_3.jpg" alt="Pattern Motif Z Floral Leaves" /></a>
        <a href="/examples/example-one.html"><img src="https://www.merchpatterns.com/images/Pattern_Motifs_Calico.jpg" alt="Pattern Motifs Calico" /></a>
      </div>
    </div>
  );
}

export default Examples;
