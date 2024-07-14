import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContextProvider.tsx';
import { Toaster } from 'react-hot-toast';
import { store } from './store';
import { Provider } from 'react-redux';
import SocketContextProvider from './context/SocketContextProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AuthContextProvider>
          <SocketContextProvider>
            <App />
            <Toaster />
          </SocketContextProvider>
        </AuthContextProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
