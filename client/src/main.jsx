import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// Redux setup
import { Provider } from 'react-redux';
import { store } from '@/store/index.js';

// Toast notifications
import { Toaster } from '@/landing_section/Sonner';

// Render the root React component
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
    <Toaster />
  </Provider>
);
