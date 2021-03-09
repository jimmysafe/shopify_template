import { createSlice } from '@reduxjs/toolkit';

export const menu = createSlice({
	name: 'menu',
	initialState: {
		open: false,
	},
	reducers: {
		openMenu: (state) => {
			state.open = true;
		},
		closeMenu: (state) => {
			state.open = false;
		},
	},
});

export const { openMenu, closeMenu } = menu.actions;

export default menu.reducer;
