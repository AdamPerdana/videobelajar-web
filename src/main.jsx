import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/redux/store';
import App from './App.jsx';
import './App.css';

// Provider menyediakan store Redux untuk seluruh komponen di dalam App
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
