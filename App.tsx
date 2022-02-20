import React from 'react';

import { Provider } from 'react-redux';
import { store } from './store/store';

import Screens from './views/Screens';

export default function App() {
    return (
        <Provider store={store}>
            <Screens />
        </Provider>
    );
}
