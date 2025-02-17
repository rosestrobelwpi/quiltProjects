import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/javascript/javascript";
//import { Link } from 'react-router-dom';
//import { Alert } from "bootstrap";
import parser from "./parser";
import evaluator from "./interpreter";
import typechecker from "./typechecker"
import "./App.css";
//laura messing around with inserting images
//local import for now, not sure how to get image from user dynamically
import imageSRC from './laura_test_image/larry.png';
import imageSRCorange from './laura_test_image/orangeFabric.png';
import imageSRCgrey from './laura_test_image/pumpkinFabric.png';
import imageSRCblue from './laura_test_image/gooseFabric.png';
import imageSRCpurple from './laura_test_image/halloweenFabric.png';
import imageSRCbrown from './laura_test_image/woodlandFabric.png';

// Ensure it's available globally
//import CodeMirrorBase from "codemirror";
//window.CodeMirror = CodeMirrorBase;

// Define a muted color palette
const colorPalette = {
    // red: '#b57c7c',
    // orange: '#d9a078',
    // yellow: '#c8b77a',
    // green: '#85a586',
    // blue: '#6a8caf',
    // purple: '#9e86a6',
    // black: '#4d4d4d',
    // pink: '#d8a6b8',
    // brown: '#a58c72',
    // grey: '#b0b0b0',
    // white: '#ffffff', 
    // gray: '#b0b0b0',
    // larry: 'larry'
};

//Function to resize canvas
function resizeCanvas(canvas){
    const canvasSize = Math.min(window.innerWidth, window.innerHeight) * 0.8;

    if (canvasSize > 1100) {
        canvas.width = 1100;
        canvas.height = 1100;
    }
    else {
        canvas.width = canvasSize;
        canvas.height = canvasSize;
    }
}

// Function to draw a single rectangle
function drawRectangle(ctx, x, y, width, height, color) {
    const mutedColor = colorPalette[color] || color;
    console.log(mutedColor)

    //console.log("rotationFromOriginal", rotationFromOriginal)
    if (mutedColor === 'larry') {
        const image = new Image();
        image.src = imageSRC
        ctx.drawImage(image, x, y, width, height)

        //okay so the problem here is that rotate will rotate the entire canvas but we just want to rotate a specified patch
        //the interpreter just calculates a different width and height which works for solid colors
        //but we additionally need to rotate the image if we are using one. So we  
        //FIXME doesn't work with non-square rectangles since we have already changed width and height in interpreter
        // ctx.save();
        // ctx.translate(x + width / 2, y + height / 2); //move canvas to center of our patch
        // ctx.rotate(rotationFromOriginal * (Math.PI/180)); //rotate the canvas the specified amount of radians (a patch object now knows how many degrees it has been rotated since its creation)
        // ctx.drawImage(image, -width / 2, -height / 2, width, height); //draw image, rotates around its center
        // ctx.restore(); //restore canvas from ctx.save()

    // } else if (color === '#d9a078'){
    //     const image = new Image();
    //     image.src = imageSRCorange;
    //     ctx.drawImage(image, x, y, width, height);

    // } else if (color === "#b0b0b0"){
    //     const image = new Image();
    //     image.src = imageSRCgrey;
    //     ctx.drawImage(image, x, y, width, height);

    // } else if (color === "#6a8caf"){
    //     const image = new Image();
    //     image.src = imageSRCblue;
    //     ctx.drawImage(image, x, y, width, height);

    // } else if (color === "#9e86a6"){
    //     const image = new Image();
    //     image.src = imageSRCpurple;
    //     ctx.drawImage(image, x, y, width, height);

    // } else if (color === "#a58c72"){
    //     const image = new Image();
    //     image.src = imageSRCbrown;
    //     ctx.drawImage(image, x, y, width, height);
    
    } else {
        ctx.fillStyle = mutedColor;
        //ctx.fillRect(x, y, width, height)
        ctx.fillRect(Math.floor(x), Math.floor(y), Math.ceil(width), Math.ceil(height));

        //White lines caused by anti-aliasing (computer trying to get rid of jagged edges)
        //Rounding doesn't work because some rectangles may round up or down, making some squares uneven
        //floor for x and y to always round down
        //ceil for width and height to always round up
    }
}

function Play() {
    const { code } = useParams(); // Get the code from the URL
    const [textInput, setTextInput] = useState(""); // Store input for handling submission
    const canvasRef = useRef(null);

    //LAURA added
    //https://react.dev/reference/react/Component#componentwillunmount
    const editorRef = useRef(null); //set editor ref when the CodeMirror element is initialized
    const editorWillUnmount = () => {
        //setting editorRef.current = null doesn't work
        editorRef.current.display.wrapper.remove()
        //display refers to the code mirror editor
        //wrapper refers to the <div> it's in
        //remove() removes that <div> from the document tree
    }

     // Preload code from URL on component mount
     useEffect(() => {
        const canvas = canvasRef.current;
        if(canvas) {
            resizeCanvas(canvas)
        }
        if (code) {
            const decodedCode = decodeURIComponent(code);
            setTextInput(decodedCode); // Preload the code into the editor
            const parsedInput = parser.parse(decodedCode);
            //FIXME not typechecked btw
            const loadDesign = evaluator(parsedInput);
            renderDesign(loadDesign);
        }
        
    }, [code]);

    // Render design on the canvas based on input text
    const renderDesign = (design) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (!design) {
            console.error("No design provided for rendering");
            return;
        }

        // Calculate scaling factors
        const maxWidth = design.width
        const maxHeight = design.height

        const scaleX = (canvas.width) / maxWidth;
        const scaleY = (canvas.height) / maxHeight;
        const scale = Math.min(scaleX, scaleY); // Uniform scaling

        if (design.patches && Array.isArray(design.patches)) {
            design.patches.forEach(patch => {
                drawRectangle(
                    ctx,
                    patch.x * scale,
                    patch.y * scale,
                    patch.width * scale,
                    patch.height * scale,
                    colorPalette[patch.color] || patch.color,
                    //patch.rotationFromOriginal //FIXME laura added for testing images
                );
            });
        } else if (design.x !== undefined && design.y !== undefined) {
            drawRectangle(
                ctx,
                design.x * scale,
                design.y * scale,
                design.width * scale,
                design.height * scale,
                colorPalette[design.color] || design.color,
                //design.rotationFromOriginal //FIXME laura added for testing images
            );
        }
    };


    const handleClear = () => {
        setTextInput("");
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    // Only called on Submit button click
    const handleSubmit = () => {
      try {
          const parsedInput = parser.parse(textInput); // This is where the detailed error occurs
          typechecker(parsedInput);
          const design = evaluator(parsedInput);
          renderDesign(design);
  
      } catch (error) {
            console.error("Error:", error, typeof(error));
        try {
            // Extract the detailed error message from the caught error
            const errorMessage = error.message || "An unknown error occurred.";
            alert(`Parse ERROR at line ${error.location.start.line}, column ${error.location.start.column}:\n${errorMessage}`);

        } catch (error2) {
            const errorMessage = error.message || "An unknown error occurred.";
            alert(`Interpreter or Typechecker ERROR:\n${errorMessage}`);

        }
          

      }
  };
  
  function downloadCanvasDrawing() {
    var canvas = document.getElementById("canvas");
    var url = canvas.toDataURL("image/png");
    var fileName = prompt("Enter file name:")

    if (fileName === null) {
      return;
    }

    if (fileName) {
      if (!fileName.endsWith(".png")) {
        fileName += ".png";
      }
      var link = document.createElement('a');
      link.download = fileName;
      link.href = url;
      link.click();

    }
  }

//   useEffect(() => {
//     // Ensure CodeMirror is visible after mounting
//     const fixCodeMirrorVisibility = () => {
//         const editor = document.querySelector('.CodeMirror');
//         if (editor) {
//             editor.style.display = 'block';
//             editor.style.height = '300px';
//             editor.style.opacity = '1';
//             console.log("✅ CodeMirror is now visible.");
//         } else {
//             console.log("⚠️ CodeMirror not found, retrying...");
//             setTimeout(fixCodeMirrorVisibility, 500); // Retry if not found
//         }
//     };
    
//     fixCodeMirrorVisibility();
// }, []);


    useEffect(() => {
      const keyPressed = (event) => {
          if (event.shiftKey && event.key === "Enter") {
              handleSubmit();
              event.preventDefault();
          } else if (event.shiftKey && event.key === "Backspace") {
              handleClear();
              event.preventDefault();
          }
      };
      window.addEventListener("keydown", keyPressed);
      return () => {
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
                        <li><a href="/examples">Tutorial</a></li>
                    </ul>
                </div>
            </div>
            <div className="container2">
                

                <div className="parser-container">
                {/* <div className="drawingName">
                    <form>
                        <input type="text" name="drawing-name" placeholder="Enter the name of your creation here!"></input>
                    </form>
                </div> */}
                <div className="button-help">
                    <div className="btn-action">
                        <code id="submitBtn" onClick={handleSubmit}>Shift + Enter</code> <span>to submit</span>
                    </div>
                    <div className="btn-action">
                        <code id="clearBtn" onClick={handleClear}>Shift + Backspace</code> <span>to clear</span>
                    </div>
                    <div className="btn-action">
                        <code id="downloadBtn" onClick={downloadCanvasDrawing}>Download</code>
                    </div>
                </div>
                <div className="codemirror-container">
                    <CodeMirror

                        value={textInput}
                        options={{
                            mode: "javascript",
                            theme: "material",
                            lineNumbers: true,
                            lineWrapping: true,
                        }}
                        onBeforeChange={(editor,data,value) => setTextInput(value)}

                        //LAURA added
                        //https://react.dev/reference/react/Component#componentdidmount
                        editorDidMount={(editor) => {
                            editorRef.current = editor; //store in reference variable
                        }}
                        editorWillUnmount={editorWillUnmount}
                    />
                </div>
                </div>
                <div className="drawing-container">
                    <canvas id="canvas" ref={canvasRef} width={400} height={400}></canvas>
                </div>
            </div>
        </div>
        
    );
    
  }

  export default Play;

