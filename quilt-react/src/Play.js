import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/javascript/javascript";
import { Link } from 'react-router-dom';
import { Alert } from "bootstrap";
import parser from "./parser";
import evaluator from "./interpreter";
import "./App.css";

// Define a muted color palette
const colorPalette = {
    red: '#b57c7c',
    orange: '#d9a078',
    yellow: '#c8b77a',
    green: '#85a586',
    blue: '#6a8caf',
    purple: '#9e86a6',
    black: '#4d4d4d',
    pink: '#d8a6b8',
    brown: '#a58c72',
    grey: '#b0b0b0',
};

// Debugger Function
function debugInput(input) {
    const errors = [];
    const context = {}; 
    const VALID_FUNCTIONS = ["rect", "hor", "vert", "rot", "rep", "over"];
    const VALID_COLORS = [
        "red", "blue", "green", "yellow", "orange", "purple",
        "black", "pink", "brown", "grey"
    ];

    // Split input into lines, keeping track of original line numbers
    const lines = input.split("\n");
    const nonEmptyLines = lines.map((line, index) => ({ line, index }))
        .filter(({ line }) => line.trim() !== "");

    if (nonEmptyLines.length === 0) {
        return ["No code provided."];
    }

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
            } 
            return; // Skip further validation for this line
        }

        // Match function calls
        const functionRegex = /^(\w+)\((.*)\);$/;
        const functionMatch = trimmedLine.match(functionRegex);
        if (functionMatch) {
            const [, functionName, args] = functionMatch;

            // Check for capitalization errors in function names
            if (!VALID_FUNCTIONS.includes(functionName.toLowerCase())) {
                const isCapitalized = functionName !== functionName.toLowerCase();
                const message = isCapitalized
                    ? `Function '${functionName}' must be lowercase.`
                    : `Unknown or invalid function '${functionName}'.`;
                errors.push({
                    message,
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

                if (functionName === "rect" && argIndex === 2) {
                    if (!VALID_COLORS.includes(substitutedArg.toLowerCase())) {
                        const isCapitalized = substitutedArg !== substitutedArg.toLowerCase();
                        const message = isCapitalized
                            ? `Color '${substitutedArg}' must be lowercase.`
                            : `Invalid color '${substitutedArg}' in 'rect'.`;
                        errors.push({
                            message,
                            line: lineNumber,
                            column: argStartIndex + 1,
                        });
                    }
                }
            });
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
    const { code } = useParams(); // Get the code from the URL
    const [textInput, setTextInput] = useState(""); // Store input for handling submission
    const canvasRef = useRef(null);

    // Preload code from URL on component mount
    useEffect(() => {
        if (code) {
            const decodedCode = decodeURIComponent(code);
            setTextInput(decodedCode); // Preload the code into the editor
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

        //FIXME remove minus 100 later, just fitting it to my screen -laura
        const scaleX = (canvas.width-100) / maxWidth;
        const scaleY = (canvas.height-100) / maxHeight;
        const scale = Math.min(scaleX, scaleY); // Uniform scaling

        if (design.patches && Array.isArray(design.patches)) {
            design.patches.forEach(patch => {
                drawRectangle(
                    ctx,
                    patch.x * scale,
                    patch.y * scale,
                    patch.width * scale,
                    patch.height * scale,
                    colorPalette[patch.color]
                );
            });
        } else if (design.x !== undefined && design.y !== undefined) {
            drawRectangle(
                ctx,
                design.x * scale,
                design.y * scale,
                design.width * scale,
                design.height * scale,
                colorPalette[design.color]
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
            const debugErrors = debugInput(textInput);
            if (debugErrors.length && debugErrors[0] !== "No errors detected.") {
                const formattedErrors = debugErrors
                    .map(error => `Line ${error.line}, Column ${error.column}: ${error.message}`)
                    .join("\n");
                console.warn("Debugging issues detected:\n", formattedErrors); // Log errors to the console
                alert(`Debugging issues:\n${formattedErrors}`);
                return;
            }

            const parsedInput = parser.parse(textInput);
            const design = evaluator(parsedInput);
            renderDesign(design);
        } catch (error) {
            console.error("Error interpreting code:", error);
            alert(error)
            //alert("Error interpreting your code. Please check for syntax errors.");
        }
    };

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
                            mode: "javascript",
                            theme: "material",
                            lineNumbers: true,
                            lineWrapping: true,
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
