import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { getFromCookie, removeFromCookie, setToken } from '../../utils/cookies';

// Define a type for the slice state
interface AuthState {
	token: string | undefined;
	user: {
		id: string;
		name: string;
		phone: string;
		photo_url: string | null;
		reg_date: string;
	};
}

// Define the initial state using that type
const initialState: AuthState = {
	token: getFromCookie('token'),
	user: {
		id: '',
		name: '',
		phone: '',
		photo_url: '',
		reg_date: '',
	},
};

export const authSlice = createSlice({
	name: 'auth',
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		accessToken: (state, action: PayloadAction<string>) => {
			state.token = action.payload;
			setToken(action.payload);
		},
		deleteToken: state => {
			state.token = undefined;
			state.user = {
				id: '',
				name: '',
				phone: '',
				photo_url: '',
				reg_date: '',
			};
			removeFromCookie('token');
		},
		getUserData: (state, action: PayloadAction<AuthState['user']>) => {
			state.user = action.payload;
		},
	},
});

export const { accessToken, deleteToken, getUserData } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const token = (state: RootState) => state.auth.token;

export default authSlice.reducer;
