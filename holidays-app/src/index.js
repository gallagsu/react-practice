import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as Sentry from "@sentry/react";
import { ChakraProvider } from "@chakra-ui/react";
import { system } from "@chakra-ui/react/preset";

Sentry.init({
  dsn: "https://7b35a0b7397a1357f8b3178d59d2d0bd@o4509321053732864.ingest.de.sentry.io/4509321055109200",

  // This enables automatic instrumentation (highly recommended)
  // If you only want to use custom instrumentation:
  // * Remove the `BrowserTracing` integration
  // * add `Sentry.addTracingExtensions()` above your Sentry.init() call
  integrations: [
    Sentry.browserTracingIntegration(),
    // Or, if you are using react router, use the appropriate integration
    // See docs for support for different versions of react router
    // https://docs.sentry.io/platforms/javascript/guides/react/configuration/integrations/react-router/
  ],

  // For finer control of sent transactions you can adjust this value, or
  // use tracesSampler
  tracesSampleRate: 1.0,

  // Set `tracePropagationTargets` to control for which URLs trace propagation should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider value={system}> 
      <App />
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
