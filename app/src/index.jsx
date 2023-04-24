import React, {Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import "./libraries/i18n";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
      <Suspense fallback={<div>Loading...</div>}> {/* TODO create fallback components or loading animation */}
        <App />
      </Suspense>
  </>
);

