import React, { useState, useRef } from "react";
import styles from './example.css';
import {UnControlled as CodeMirror} from 'react-codemirror2'
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/javascript/javascript";
import codemirror from "codemirror";
import { Link } from 'react-router-dom';

function Play() {

  const [value, setTextareaValue] = useState("");
  const canvasRef = useRef(null);

  const handleClear = () => {
    setTextareaValue("");
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
  };

  const codeToCanvas = (text) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "16px";
    ctx.fillText(text, 30, 50);
  }

  const handleCodeChange = (editor, data, value) => {
    setTextareaValue(value);
    codeToCanvas(value);
  };

  const handleSubmit = () => {
    console.log("Text value: ", value)
  };

  return (
    <div className="play-container">
    {/* <div className="navbar">
      <ul>
        <li>
          <a href="/" id="logo">Logo</a>
        </li>
      </ul>
      <div className="navbar-links">
        <ul>
          <li>
            <a href="/">Home</a>    
          </li>
          <li>
            <a href="/static/examples.html">Docs</a>    
          </li>
          <li>
            <a href="/static/about.html">About Us</a>
          </li>
        </ul>
      </div>
      </div> */}
      {/* <div className="play-header">
        <h1>Quilt Designer</h1>
       
      </div> */}
    
      <div className="button-container">
        <h1>Quilt Designer</h1>
        <button id="home-button"><a href="/">Home</a></button>
        <button id="submit-button" onClick={handleSubmit}>Submit</button>
        <button id="clear-button" onClick={handleClear}>Clear</button>
      </div>
      <div className="container2">
        <div className="parser-container">
          <CodeMirror
            value=''
            options={{
              mode: 'javascript',
              theme: 'material',
              lineNumbers: true
            }}
            onChange={(editor, data, value) => {
              setTextareaValue(value); 
              codeToCanvas(value);
                }}
            onInputRead={(editor, canvasRef) => {
            }}
              />
          
        </div>
        <div className="drawing-container">
          <canvas id="canvas" ref={canvasRef}></canvas>
        </div>
      </div>
    </div>
  );
}

export default Play;
