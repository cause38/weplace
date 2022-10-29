import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import './styles/font.css';
import Switchs from './Routes';
import reportWebVitals from './reportWebVitals';
import {RecoilRoot} from '../node_modules/recoil/';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RecoilRoot>
        <Switchs />
    </RecoilRoot>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
