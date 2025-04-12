import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Error handling for React 18
const handleRenderError = (error) => {
  console.error('Error rendering application:', error);
  
  // Display a fallback UI
  const rootElement = document.getElementById('root');
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="padding: 20px; text-align: center; font-family: sans-serif;">
        <h1 style="color: #e74c3c;">Application Error</h1>
        <p>We're sorry, but something went wrong while loading the application.</p>
        <div style="margin: 20px 0; padding: 10px; background: #f8f9fa; border-radius: 4px; text-align: left;">
          <pre style="white-space: pre-wrap;">${error.message}</pre>
        </div>
        <button 
          style="background: #3498db; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer;"
          onclick="window.location.reload()">
          Refresh Page
        </button>
      </div>
    `;
  }
};

// Render the app with error handling
try {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (error) {
  handleRenderError(error);
}
