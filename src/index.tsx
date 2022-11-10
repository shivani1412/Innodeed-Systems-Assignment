import React from 'react';
import ReactDOM from 'react-dom';
// @ts-ignore
import { StyleProvider, ThemePicker } from 'vcc-ui';
import App from './App';
import '../src/styles/App.css';

ReactDOM.render(
    <StyleProvider>
        <ThemePicker variant="light">
            <div className="container">
                <App />
            </div>
        </ThemePicker>
    </StyleProvider>,
    document.getElementById('root')
);