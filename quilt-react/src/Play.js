import React, { useState, useRef, useEffect } from "react";
import styles from './App.css';
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
import parser from './parser';
import evaluator from './interpreter';

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
            console.log("PARSER", parsedInput)
            const design = evaluator(parsedInput);
            console.log("INTERPRETER", design)
            renderDesign(design); // Render design on canvas
        } catch (error) {
            console.error("Error interpreting code:", error);
            alert("Error interpreting your code. Please enter a valid design structure.");
        }
    };

    return (
        <div className="play-container">
            <div className="button-container">
                <button id="home-button"><a href="/">Home</a></button>
                <button id="example-button"><a href="/">Examples</a></button>
                <h1>Quilt Designer</h1>
                <button id="submit-button" onClick={handleSubmit}>Submit</button>
                <button id="clear-button" onClick={handleClear}>Clear</button>
            </div>
            <div className="container2">
                <div className="parser-container">
                    <CodeMirror
                        value={textInput}
                        options={{
                            mode: 'javascript',
                            theme: 'material',
                            lineNumbers: true
                        }}
                        onChange={(editor, data, value) => setTextInput(value)}
                    />
                </div>
                <div className="drawing-container">
                    <canvas id="canvas" ref={canvasRef} width={400} height={400}></canvas>
                </div>
            </div>
          </div>)

//   const handleSubmit = () => {
//     console.log("Text value: ", value);
//     window.alert("You entered: " + value)
//   };

//   useEffect(() => {
//     const keyPressed = (event) => {
//       if (event.shiftKey && event.key === "Enter") {
//         handleSubmit();
//         event.preventDefault();
//       }
//     };
//     window.addEventListener("keydown", keyPressed);

//     return() => {
//       window.removeEventListener("keydown", keyPressed);
//     };
//   }, [value]);



//   return (
//     <div className="play-container">
//    <div className="navbar">
//         <ul>
//           <li><a href="/" id="logo">Quilt Designer</a></li>
//         </ul>
//         <div className="navbar-links">
//           <ul>
//             <li><a href="/">Home</a></li>
//             <li><a href="/play">Play</a></li>
//             <li><a href="/about">About Us</a></li>
//             <li><a href="/examples">Docs</a></li>
//           </ul>
//         </div>
//       </div>
//       {/* <div className="play-header">
//         <h1>Quilt Designer</h1>
       
//       </div> */}
// {/*     
//       <div className="button-container">
//       <button id="home-button"><a href="/">Home</a></button>
//       <button id="example-button"><a href="/">Examples</a></button>
//         <h1>Quilt Designer</h1>
        
//         <button id="submit-button" onClick={handleSubmit}>Submit</button>
//         <button id="clear-button" onClick={handleClear}>Clear</button>
//       </div> */}
      
//       <div className="container2">

//       <div className="button-help">
//         <div className="btn-action">
//           <code>Shift + Enter</code> <span>to submit</span>
//         </div>
//         <div className="btn-action">
//           <code>Ctrl + Backspace</code> <span>to clear</span>
//         </div>
//       </div>  


//         <div className="parser-container">
//           <CodeMirror
//             value=''
//             options={{
//               mode: 'javascript',
//               theme: 'material',
//               lineNumbers: true
//             }}
//             onChange={(editor, data, value) => {
//               setTextareaValue(value); 
//               codeToCanvas(value);
//                 }}
//             onInputRead={(editor, canvasRef) => {
//             }}
//               />
          
//         </div>
//         <div className="drawing-container">
//           <canvas id="canvas" ref={canvasRef}></canvas>

//         </div>
//     );
}

export default Play; 
