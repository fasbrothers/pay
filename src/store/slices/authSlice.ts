import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { getFromCookie, removeFromCookie, setToken } from '../../utils/cookies';
import { AuthState } from '../../@types/auth.types';

const initialState: AuthState = {
	token: getFromCookie('token') || null,
	params: '',
	isTrusted: false,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		accessToken: (state, action: PayloadAction<string>) => {
			state.token = action.payload;
			setToken(action.payload);
		},
		deleteToken: state => {
			state.token = null;
			state.params = '';
			removeFromCookie('token');
		},
		getParams: (state, action: PayloadAction<string>) => {
			state.params = action.payload;
		},
		deleteParams: state => {
			state.params = '';
		},
		setIsTrusted: (state, action: PayloadAction<boolean>) => {
			state.isTrusted = action.payload;
		},
	},
	extraReducers(builder) {
		builder.addCase('logout', state => {
			state.params = '';
			state.token = null;
			removeFromCookie('token');
		});
	},
});

export const {
	accessToken,
	deleteToken,
	getParams,
	deleteParams,
	setIsTrusted,
} = authSlice.actions;

export const token = (state: RootState) => state.auth.token;

export const getToken = (state: RootState) => state.auth.token;

export default authSlice.reducer;
