import React from 'react'
import ReactDOM from 'react-dom/client'
import DatingRouter from './DatingRouter'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <DatingRouter />
  </BrowserRouter>,
)
