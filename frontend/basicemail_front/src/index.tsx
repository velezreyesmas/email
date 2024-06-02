import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './Pages/App';
import { ActualViewProvider } from './Contexts/ViewContext';
import { SelectedEmailProvider } from './Contexts/SelectedEmailContext';
import Login from './Pages/Login';
import { ActualUserProvider } from './Contexts/UserContext';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement as HTMLElement); // Cast to HTMLElement
root.render(
  <React.StrictMode>
    <ActualUserProvider>
      <SelectedEmailProvider>
        <ActualViewProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<App />}>
              </Route>
            </Routes>
          </BrowserRouter>
        </ActualViewProvider>
      </SelectedEmailProvider>
    </ActualUserProvider>
  </React.StrictMode>
)