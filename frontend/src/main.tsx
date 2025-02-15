import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-toastify/dist/ReactToastify.css';
import "react-image-gallery/styles/css/image-gallery.css";
import './index.css';
import App from './App.tsx'
import { ToastContainer } from 'react-toastify'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './redux/store/index.ts';

createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
        <PersistGate persistor={persistor}>
            <div className='container card shadow-sm my-4'>
                <ToastContainer position='top-right' />
                <App />
            </div>
        </PersistGate>
    </Provider>
)
