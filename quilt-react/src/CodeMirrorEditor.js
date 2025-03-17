import React, { useState, useRef, useEffect } from "react";
//import { Controlled as CodeMirror } from "react-codemirror2";
import CodeMirror from 'codemirror';
import "codemirror/lib/codemirror.css";
import "codemirror/lib/codemirror.js";
import "codemirror/theme/material.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/python/python";
import "codemirror/mode/quiltdesigner/quiltdesigner";
import "codemirror/addon/edit/matchbrackets";
import "codemirror/addon/edit/closebrackets";

const CodeMirrorEditor = ({ onSendCode }) => {
    const [editorInstance, setEditorInstance] = useState(null);
    const [localCode, setLocalCode] = useState("");



    useEffect(() => {
        const editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
            mode: "text/x-quiltdesigner", //for the comment syntax highlighting
            theme: "material",
            matchBrackets: true,
            autoCloseBrackets: true,
            indentUnit: 4,
            lineNumbers: true,
            lineWrapping: true,
        });

        //editor.setValue(initialCode);
        setEditorInstance(editor);

        editor.on('change', () => {
            setLocalCode(editor.getValue());
        });

        return () => {
            editor.toTextArea();  // ensure proper unmount
        };
    }, []);


    useEffect(() => {
        const keyPressed = (event) => {
            if (event.shiftKey && event.key === "Enter") {
                handleSendCode();
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
    },);


    const handleSendCode = () => {
        if (onSendCode) {
            onSendCode(localCode);  // send the current local code to the parent component
        }
    };

    const handleClear = () => {
        if (onSendCode) {
            onSendCode(""); //set to empty string bc we don't want anything to display
        }
    };

    return (
        <div>
            <div className="button-help">
                <div className="btn-action">
                    <code id="submitBtn" onClick={handleSendCode}>Shift + Enter</code> <span>to submit</span>
                </div>
                <div className="btn-action">
                    <code id="clearBtn" onClick={handleClear}>Shift + Backspace</code> <span>to clear</span>
                </div>

            </div>
            <textarea id="editor"></textarea>
        </div>
    );
}

export default CodeMirrorEditor;