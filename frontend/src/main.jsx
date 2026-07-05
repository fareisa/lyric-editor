import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "./styles/global.css";
import { EditorProvider } from "./contexts/EditorContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <EditorProvider>
      <App />
    </EditorProvider>
  </StrictMode>
);
