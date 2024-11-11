import React, { useState, useRef, useEffect } from "react";
import styles from './example.css';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/javascript/javascript";
import { Link } from 'react-router-dom';
import { Alert } from "bootstrap";
// import Parser from './autogenparser';
// import { Patch, Design, evaluator } from './interpreter';
// import ASTFunction from './parserASTfunction';

// Import custom parser and interpreter
import parser from '../parser';
import interpreter from '../interpreter';

// Define a muted color palette
const colorPalette = {
    Red: '#b57c7c',        // Muted red
    Orange: '#d9a078',     // Muted orange
    Yellow: '#c8b77a',     // Muted yellow
    Green: '#85a586',      // Muted green
    Blue: '#6a8caf',       // Muted blue
    Purple: '#9e86a6',     // Muted purple
    Black: '#4d4d4d',      // Muted black
    Pink: '#d8a6b8',       // Muted pink
    Brown: '#a58c72',      // Muted brown
    Grey: '#b0b0b0'        // Muted grey
};

// Function to draw a single rectangle
function drawRectangle(ctx, x, y, width, height, color) {
    const mutedColor = colorPalette[color] || color;
    ctx.fillStyle = mutedColor;
    ctx.fillRect(x, y, width, height);
}

function Play() {
    const [textInput, setTextInput] = useState(""); // Store input for handling submission
    const canvasRef = useRef(null);

    // Render design on the canvas based on input text
    const renderDesign = (design) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        design.patches.forEach(patch => {
            drawRectangle(
                ctx,
                patch.x * 50,       // Scale position for better visibility
                patch.y * 50,
                patch.width * 50,    // Scale width for better visibility
                patch.height * 50,
                patch.color
            );
        });
    };


  const codeToCanvas = (textInput) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "16px";
    ctx.fillText(textInput, 100, 100);
  }


    const handleClear = () => {
        setTextInput("");
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    // Only called on Submit button click
    const handleSubmit = () => {
        try {
            // Parse and interpret custom language input
            const parsedInput = parser.parse(textInput);
            const design = interpreter.evaluate(parsedInput);
            renderDesign(design); // Render design on canvas
        } catch (error) {
            console.error("Error interpreting code:", error);
            alert("Error interpreting your code. Please enter a valid design structure.");
        }
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
  }, [textInput]);



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
            onChange={(editor, data, textInput) => {
              setTextInput(textInput); 
              codeToCanvas(textInput);
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
