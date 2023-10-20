import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { getFromCookie, removeFromCookie, setToken } from '../../utils/cookies';

// Define a type for the slice state
interface AuthState {
	token: string | undefined;
	params: string;
}

// Define the initial state using that type
const initialState: AuthState = {
	token: getFromCookie('token'),
	params: '',
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
			state.token = undefined;
			removeFromCookie('token');
		},
		getParams: (state, action: PayloadAction<string>) => {
			state.params = action.payload;
		},
		deleteParams: state => {
			state.params = '';
		},
	},
});

export const { accessToken, deleteToken, getParams, deleteParams } =
	authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const token = (state: RootState) => state.auth.token;

export const getToken = (state: RootState) => state.auth.token;

export default authSlice.reducer;
