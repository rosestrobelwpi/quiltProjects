import React, { useEffect, useRef } from 'react';
import { useParams } from "react-router-dom";
import parser from "./parser";
import evaluator from "./interpreter";
import typechecker from "./typechecker"


function resizeCanvas(canvas) {
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
    const mutedColor = color;
    console.log(mutedColor)

    if (mutedColor === 'larry') {
        //const image = new Image();
        //image.src = imageSRC
        //ctx.drawImage(image, x, y, width, height)

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

const CanvasDisplay = ({ code , render}) => {
    const { urlCode } = useParams(); // Get the code from the URL
    const canvasRef = useRef(null);

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
                patch.color,
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
            design.color,
            //design.rotationFromOriginal //FIXME laura added for testing images
        );
    }
    };

    
    // Preload code from URL on component mount
    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            resizeCanvas(canvas)
        }
        if (code) {
            const decodedCode = decodeURIComponent(code);
            code = decodedCode; // Preload the code into the editor
            const parsedInput = parser.parse(decodedCode);
            //FIXME not typechecked btw
            const loadDesign = evaluator(parsedInput);
            renderDesign(loadDesign);
        }

    }, [urlCode]);

    useEffect(() => {
        if (code === "") {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        } else {
            try {
                console.log("visualizer code", code)
                const parsedInput = parser.parse(code); // This is where the detailed error occurs
                typechecker(parsedInput);
                const design = evaluator(parsedInput);
                renderDesign(design);
    
            } catch (error) {
                console.error("Error:", error, typeof (error));
                try {
                    // Extract the detailed error message from the caught error
                    const errorMessage = error.message || "An unknown error occurred.";
                    alert(`Parse ERROR at line ${error.location.start.line}, column ${error.location.start.column}:\n${errorMessage}`);
    
                } catch (error2) {
                    const errorMessage = error.message || "An unknown error occurred.";
                    alert(`Interpreter or Typechecker ERROR:\n${errorMessage}`);
    
                }
            }
        }

    }, [render]); 

  return <canvas id="canvas" ref={canvasRef} width="600" height="400"></canvas>;
};

export default CanvasDisplay;
