import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';
import Store from './Redux/Store.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <SnackbarProvider>
        <Provider store={Store}>
          <App />
        </Provider>
      </SnackbarProvider>
    </BrowserRouter>
);