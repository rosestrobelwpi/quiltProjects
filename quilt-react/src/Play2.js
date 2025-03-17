import React, { useState } from 'react';
import CodeEditor from './CodeMirrorEditor';
import CanvasDisplay from './visualizer';

const Play = () => {
    const [code, setCode] = useState('');
    const [renderCanvas, setRenderCanvas] = useState(false);

    const handleSendCode = (newCode) => {
        console.log("new code", newCode)
        setCode(newCode);  // Update the code state with the sent code
        setRenderCanvas(!renderCanvas) //force rerender even if code didn't change (want error to show again even if code didn't change)
        console.log("code", code)
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
                <div className="button-help">
                    <div className="btn-action">
                        <code id="downloadBtn" onClick={downloadCanvasDrawing}>Download</code>
                    </div>
                </div>
                <div className="codemirror-container">
                    <CodeEditor onSendCode={handleSendCode} initialCode={code} />
                </div>
            </div>
            <div className="drawing-container">
                <CanvasDisplay id="canvas" code={code} render={renderCanvas}/> 
            </div>

        </div>
    </div>
  );
};

export default Play;
