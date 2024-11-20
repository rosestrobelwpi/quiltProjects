import React from 'react';
import './examples.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faPenFancy } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Examples() {
  // Predefined designs to preload into the Play editor
  const exampleDesigns = [
    {
      id: 1,
      code: "rect(1,1,red)",
      image: "https://www.merchpatterns.com/images/Pattern_Motifs_Calico.jpg",
      alt: "Pattern Motifs Calico",
    },
    {
      id: 2,
      code: "(hor(rect(1,2,red),rect(1,2,blue)))",
      image: "https://www.merchpatterns.com/images/Pattern_Motifs_Roses.jpg",
      alt: "Pattern Motifs Roses",
    },
    {
      id: 3,
      code: "(hor(rect(1,2,green),rect(1,2,yellow)))",
      image: "https://www.merchpatterns.com/images/Pattern_Motif_ZFloral_Leaves_3.jpg",
      alt: "Pattern Motif Z Floral Leaves",
    },
  ];

  return (
    <div className="examples-container">
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
      <div className="picture-container">
        {exampleDesigns.map((example) => (
          <Link
            key={example.id}
            to={`/play/${encodeURIComponent(example.code)}`}
          >
            <img
              src={example.image}
              alt={example.alt}
              title={example.code}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Examples;
