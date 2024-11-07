import React, { useState, useRef, useEffect } from "react";
import styles from './App.css';
import {UnControlled as CodeMirror} from 'react-codemirror2'
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/javascript/javascript";
import codemirror from "codemirror";
import { Link } from 'react-router-dom';
import { Alert } from "bootstrap";
// import Parser from './autogenparser';
// import { Patch, Design, evaluator } from './interpreter';
// import ASTFunction from './parserASTfunction';

function Play() {

  const [value, setTextareaValue] = useState("");
  const canvasRef = useRef(null);

  const handleClear = () => {
    setTextareaValue("");
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
  };

  // const visualizer = () => {
  //   const canvas = canvasRef.current;
  //   const ctx = canvas.getContext("2d");

  //   if (evaluator instanceof Patch) {
  //     ctx.fillStyle = evaluator.color;
  //     ctx.fillRect(evaluator.x, evaluator.y, evaluator.w, evaluator.h);
  //   }
  //   else if (evaluator instanceof Design) {
  //     evaluator.patches.forEach(patch => {
  //       visualizer(ctx, patch)
  //     });
  //   }
  // }

  // const codeToCanvas = (text) => {
  //   // const parser = Parser.parse(value);
  //   // const interpreter = evaluator({}, ASTFunction)

  //   const canvas = canvasRef.current;
  //   const ctx = canvas.getContext("2D");
  //   ctx.clearRect(0, 0, canvas.width, canvas.height);

  //   // visualizer(ctx, interpreter);
  // }

  const codeToCanvas = (value) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "16px";
    ctx.fillText(value, 100, 100);
  }

  const handleCodeChange = (editor, data, value) => {
    setTextareaValue(value);
    codeToCanvas(value);
  };

  const handleSubmit = () => {
    console.log("Text value: ", value);
    window.alert("You entered: " + value)
  };

  useEffect(() => {
    const keyPressed = (event) => {
      if (event.shiftKey && event.key === "Enter") {
        handleSubmit();
        event.preventDefault();
      }
    };
    window.addEventListener("keydown", keyPressed);

    return() => {
      window.removeEventListener("keydown", keyPressed);
    };
  }, [value]);



  return (
    <div className="play-container">
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
      {/* <div className="play-header">
        <h1>Quilt Designer</h1>
       
      </div> */}
{/*     
      <div className="button-container">
      <button id="home-button"><a href="/">Home</a></button>
      <button id="example-button"><a href="/">Examples</a></button>
        <h1>Quilt Designer</h1>
        
        <button id="submit-button" onClick={handleSubmit}>Submit</button>
        <button id="clear-button" onClick={handleClear}>Clear</button>
      </div> */}
      
      <div className="container2">

      <div className="button-help">
        <div className="btn-action">
          <code>Shift + Enter</code> <span>to submit</span>
        </div>
        <div className="btn-action">
          <code>Ctrl + Backspace</code> <span>to clear</span>
        </div>
      </div>  


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
