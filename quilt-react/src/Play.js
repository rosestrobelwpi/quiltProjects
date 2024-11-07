import React, { useState, useRef } from "react";
import styles from './App.css';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/javascript/javascript";
import { Link } from 'react-router-dom';

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

    const handleClear = () => {
        setTextInput("");
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    // Only called on Submit button click
    const handleSubmit = () => {
        try {
            const design = eval(`(${textInput})`); // Interpret input as design object
            renderDesign(design);              // Render design on canvas
        } catch (error) {
            console.error("Error interpreting code:", error);
            alert("Error interpreting your code. Please enter a valid design object.");
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
        </div>
    );
}

export default Play;
