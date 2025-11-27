import { StrictMode } from 'react';
import ReactDOM from "react-dom/client";
import App from "./app/App";
import './index.css';
import { layOutDay } from './features/calendar';

(window as any).layOutDay = layOutDay;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
