import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

const rootElement = document.getElementById('root');
const app = document.getElementById('app');

document.body.classList.add('desktop-body');
app.classList.add('desktop-app');

import App from './App';
import './style.js';
import { store, actions } from './store/index.js';

function getScaleRatio() {
  const { innerWidth, innerHeight } = window;
  const r = Math.min(innerWidth / 1152, innerHeight / 648);
  window.scaleRatio = r;
  return r;
}

function scaleUI() {
  app.style.transform = 'scale('.concat(getScaleRatio(), ')');
}

const setupResponsive = () => {
  var timeout;
  window.addEventListener(
    'resize',
    function () {
      if (timeout) {
        window.cancelAnimationFrame(timeout);
      }

      timeout = window.requestAnimationFrame(scaleUI);
    },
    false
  );

  scaleUI();
};

const mountApp = () => {
  ReactDOM.createRoot(rootElement).render(
    <Provider store={store}>
      <App />
    </Provider>
  );
};
mountApp();
setupResponsive();

const handleStoreState = (StoreState) => {
  store.dispatch(actions.config.configSet(StoreState.config));
  store.dispatch(actions.attendant.AttanderUpdate(StoreState.attendant));
};

if (window.ipcRenderer) {
  console.log('Electron IPC available');
  window.ipcRenderer.invoke('server:InitialStoreRequest').then((StoreState) => {
    console.log('Sending server:InitialStoreRequest');
    handleStoreState(StoreState);
  });

  window.ipcRenderer.on('server:UpdateStore', (e, StoreState) => {
    console.log('Handling server:UpdateStore');
    handleStoreState(StoreState);
  });
}
