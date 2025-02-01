import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import persistedReducer from './PersistReducer.jsx';


const store = configureStore({
    reducer: persistedReducer, 
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };