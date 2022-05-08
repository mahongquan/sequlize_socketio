import React from 'react';
import * as ReactDOMClient from 'react-dom/client'
import App from './indexRouter.jsx';
import 'bootstrap/dist/css/bootstrap.css';
import './react-datetime.css';
import './index.css';
import './autosuggest.css';
const root=ReactDOMClient.createRoot(document.getElementById('root'));
root.render(<App />)


