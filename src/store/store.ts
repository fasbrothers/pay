import { configureStore } from '@reduxjs/toolkit';
import auth from './slices/authSlice';
// import Logger from 'redux-logger';
export const store = configureStore({
	reducer: {
		auth,
	},
	// middleware: getDefaultMiddleware => getDefaultMiddleware().concat(Logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
