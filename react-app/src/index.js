import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import Sentry from your framework SDK (e.g. @sentry/react) instead of @sentry/browser
import * as Sentry from "@sentry/browser";

Sentry.init({
  dsn: "https://4784fbc50de2473f9977cfce8a9adce5@o87286.ingest.sentry.io/5501941",

  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysOnErrorSampleRate: 1.0,
  debug:true,
  tunnel: "http://localhost:8000/bugs",
  // If the entire session is not sampled, use the below sample rate to sample
  // sessions when an error occurs.
  // replaysOnErrorSampleRate: 1.0,

  integrations: [
    new Sentry.Replay({
      // Additional SDK configuration goes in here, for example:
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
});
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
