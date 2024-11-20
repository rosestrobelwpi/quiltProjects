import React, { useState, useRef, useEffect } from "react";
import styles from './App.css';
import { Controlled as CodeMirror } from 'react-codemirror2';
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/javascript/javascript";
import { Link } from 'react-router-dom';
import { Alert } from "bootstrap";
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

//Debugger Function
function debugInput(input) {
  const errors = [];
  const context = {}; // Stores declared variables
  const VALID_FUNCTIONS = ["rect", "hor", "vert", "rot", "rep", "over"];
  const VALID_COLORS = [
      "red", "blue", "green", "yellow", "orange", "purple",
      "black", "pink", "brown", "grey"
  ];
  const VALID_ANGLES = [0, 90, 180, 270];

  // Split input into lines
  const lines = input.split('\n');
  const nonEmptyLines = lines.map((line, index) => ({ line, index }))
      .filter(({ line }) => line.trim() !== "");

  if (nonEmptyLines.length === 0) {
      return ["No code provided."];
  }

  // Step 1: Variable Declaration
  nonEmptyLines.forEach(({ line, index }) => {
      const trimmedLine = line.trim();
      const lineNumber = index + 1;

      // Check for missing semicolon
      if (!trimmedLine.endsWith(";")) {
          errors.push({
              message: "Missing semicolon at the end of the line.",
              line: lineNumber,
              column: trimmedLine.length,
          });
      }

      // Match variable declarations
      const variableRegex = /^(int|rect)\s+(\w+)\s*=\s*(.*);$/;
      const variableMatch = trimmedLine.match(variableRegex);
      if (variableMatch) {
          const [, type, name, value] = variableMatch;

          if (type === "int") {
              if (!/^\d+$/.test(value.trim())) {
                  errors.push({
                      message: `Invalid int value '${value}'.`,
                      line: lineNumber,
                      column: trimmedLine.indexOf(value) + 1,
                  });
              } else {
                  context[name] = parseInt(value.trim(), 10); // Store variable
              }
          } else if (type === "rect") {
              const rectRegex = /^rect\(\d+,\d+,[a-z]+\)$/;
              if (!rectRegex.test(value.trim())) {
                  errors.push({
                      message: `Invalid rect value '${value}'. Ensure it matches 'rect(int, int, color)'.`,
                      line: lineNumber,
                      column: trimmedLine.indexOf(value) + 1,
                  });
              } else {
                  context[name] = value.trim(); // Store variable
              }
          }
          return; // Skip further validation for this line
      }
  });

  // Step 2: Function Validation
  nonEmptyLines.forEach(({ line, index }) => {
      const trimmedLine = line.trim();
      const lineNumber = index + 1;

      // Function Syntax Validation
      const functionRegex = /^(\w+)\((.*)\);$/;
      const functionMatch = trimmedLine.match(functionRegex);
      if (functionMatch) {
          const [, functionName, args] = functionMatch;

          // Check function name
          if (!VALID_FUNCTIONS.includes(functionName.toLowerCase())) {
              errors.push({
                  message: `Unknown or invalid function '${functionName}'.`,
                  line: lineNumber,
                  column: trimmedLine.indexOf(functionName) + 1,
              });
              return;
          }

          // Parse and validate arguments
          const argsList = args.split(",").map(arg => arg.trim());
          argsList.forEach((arg, argIndex) => {
              const argStartIndex = trimmedLine.indexOf(arg);

              // Substitute variable values
              const substitutedArg = context[arg] !== undefined ? context[arg] : arg;

              if (functionName === "rect" && argIndex < 2 && !/^\d+$/.test(substitutedArg)) {
                  errors.push({
                      message: `Invalid numeric argument '${substitutedArg}' in 'rect'.`,
                      line: lineNumber,
                      column: argStartIndex + 1,
                  });
              } else if (functionName === "rect" && argIndex === 2) {
                  if (!VALID_COLORS.includes(substitutedArg.toLowerCase())) {
                      errors.push({
                          message: `Invalid color '${substitutedArg}'. Ensure it matches a valid lowercase color.`,
                          line: lineNumber,
                          column: argStartIndex + 1,
                      });
                  }
              } else if (functionName === "rot" && argIndex === 0) {
                  const angle = parseInt(substitutedArg, 10);
                  if (!VALID_ANGLES.includes(angle)) {
                      errors.push({
                          message: `Invalid rotation angle '${substitutedArg}'. Allowed angles are 0, 90, 180, and 270.`,
                          line: lineNumber,
                          column: argStartIndex + 1,
                      });
                  }
              }
          });
      }
  });

  // Step 3: Capitalization and Spacing Validation
  nonEmptyLines.forEach(({ line, index }) => {
      const trimmedLine = line.trim();
      const lineNumber = index + 1;

      // Check for spaces before commas or parentheses
      const spacingIssues = trimmedLine.match(/ ,| \( /g);
      if (spacingIssues) {
          spacingIssues.forEach(match => {
              errors.push({
                  message: "Unexpected space before a comma or parenthesis.",
                  line: lineNumber,
                  column: trimmedLine.indexOf(match) + 1,
              });
          });
      }

      // Check for capitalization issues in function names and color arguments
      const functionRegex = /^(\w+)\(/;
      const functionMatch = trimmedLine.match(functionRegex);
      if (functionMatch) {
          const functionName = functionMatch[1];
          if (VALID_FUNCTIONS.includes(functionName.toLowerCase()) && functionName !== functionName.toLowerCase()) {
              errors.push({
                  message: `Function '${functionName}' must be lowercase.`,
                  line: lineNumber,
                  column: trimmedLine.indexOf(functionName) + 1,
              });
          }
      }

      const colorRegex = /,(\w+)\)/g;
      let colorMatch;
      while ((colorMatch = colorRegex.exec(trimmedLine)) !== null) {
          const color = colorMatch[1];
          const colorStartIndex = colorMatch.index + 1;
          if (VALID_COLORS.includes(color.toLowerCase()) && color !== color.toLowerCase()) {
              errors.push({
                  message: `Color '${color}' must be lowercase.`,
                  line: lineNumber,
                  column: colorStartIndex + 1,
              });
          }
      }
  });

  return errors.length > 0 ? errors : ["No errors detected."];
}



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

      if (design.patches && Array.isArray(design.patches)) {
          design.patches.forEach(patch => {
              drawRectangle(
                  ctx,
                  patch.x * 50,
                  patch.y * 50,
                  patch.width * 50,
                  patch.height * 50,
                  patch.color
              );
          });
      } else if (design.x !== undefined && design.y !== undefined) {
          drawRectangle(
              ctx,
              design.x * 50,
              design.y * 50,
              design.width * 50,
              design.height * 50,
              design.color
          );
      }
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
          const debugErrors = debugInput(textInput);
          if (debugErrors.length && debugErrors[0] !== "No errors detected.") {
              const formattedErrors = debugErrors
                  .map(error => `Line ${error.line}, Column ${error.column}: ${error.message}`)
                  .join("\n");
              alert(`Debugging issues:\n${formattedErrors}`);
              return;
          }
  
          const parsedInput = parser.parse(textInput);
          const design = evaluator(parsedInput);
          renderDesign(design);
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
      else if (event.shiftKey && event.key === "Backspace") {
        handleClear();
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
          <code>Shift + Backspace</code> <span>to clear</span>
        </div>
      </div>  


        <div className="parser-container">
          <CodeMirror
            value={textInput}
            options={{
              mode: 'javascript',
              theme: 'material',
              lineNumbers: true,
              lineWrapping: true
            }}
            onBeforeChange={(editor, data, value) => setTextInput(value)}
        />
          
          </div>
          <div className="drawing-container">
            <canvas id="canvas" ref={canvasRef} width={400} height={400}></canvas>
          </div>
        </div>
        </div>
        
    );
    
  }

  export default Play;