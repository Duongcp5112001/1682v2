import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { store } from '~/store';

import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import history from '~/utils/history'
import '~/styles/index.scss';
import { Provider } from 'react-redux';
import { MemoryProvider as MemoryContext } from './contexts/memoryContext';
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HistoryRouter history={history}>
      <Provider store={store}>
        <MemoryContext>
          <App/>
        </MemoryContext>
      </Provider>
    </HistoryRouter>
  </React.StrictMode>,
)
