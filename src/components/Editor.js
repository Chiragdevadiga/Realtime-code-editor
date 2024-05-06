import React, { useEffect, useRef, useState } from 'react';
import Codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/theme/material-darker.css';
import 'codemirror/theme/midnight.css';
import 'codemirror/theme/twilight.css';
import 'codemirror/theme/nord.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import ACTIONS from '../Actions';

const Editor = ({ socketRef, roomId, onCodeChange }) => {
    const editorRef = useRef(null);
    const [selectedTheme, setSelectedTheme] = useState(
        localStorage.getItem('selectedTheme') || 'material-darker'
    );

    useEffect(() => {
        async function init() {
            editorRef.current = Codemirror.fromTextArea(
                document.getElementById('realtimeEditor'),
                {
                    mode: { name: 'javascript', json: true },
                    theme: selectedTheme,
                    autoCloseTags: true,
                    autoCloseBrackets: true,
                    lineNumbers: true,
                }
            );

            editorRef.current.on('change', (instance, changes) => {
                const { origin } = changes;
                const code = instance.getValue();
                onCodeChange(code);
                if (origin !== 'setValue') {
                    socketRef.current.emit(ACTIONS.CODE_CHANGE, {
                        roomId,
                        code,
                    });
                }
            });
        }
        init();
    }, [selectedTheme]);

    useEffect(() => {
        if (socketRef.current) {
            socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
                if (code !== null) {
                    editorRef.current.setValue(code);
                }
            });
        }

        return () => {
            socketRef.current.off(ACTIONS.CODE_CHANGE);
        };
    }, [socketRef.current]);

    const handleThemeChange = (theme) => {
        setSelectedTheme(theme);
        localStorage.setItem('selectedTheme', theme);
        window.location.reload();
    };

    return (
        <div>
            <select
                value={selectedTheme}
                onChange={(e) => handleThemeChange(e.target.value)}
            >
                <option value="dracula">Dracula</option>
                <option value="material-darker">Material Darker</option>
                <option value="midnight">Midnight</option>
                <option value="twilight">Twilight</option>
                <option value="nord">Nord</option>
            </select>
            <textarea id="realtimeEditor"></textarea>
        </div>
    );
};

export default Editor;
