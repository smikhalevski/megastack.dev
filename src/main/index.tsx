import './index.css';
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';

if (process.env.NODE_ENV === 'production') {
  disableReactDevTools();
}

const root = createRoot(document.body);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

function disableReactDevTools(): void {
  // https://github.com/facebook/react-devtools/blob/master/shells/chrome/src/checkForReact.js
  const reactHook = (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__;

  if (reactHook === undefined) {
    return;
  }
  for (const prop in reactHook) {
    reactHook[prop] = prop === 'renderers' ? new Map() : typeof reactHook[prop] === 'function' ? () => undefined : null;
  }
}
