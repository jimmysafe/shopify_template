import { createSlice } from '@reduxjs/toolkit';

export const menu = createSlice({
	name: 'menu',
	initialState: {
		open: false,
		subMenu: [],
	},
	reducers: {
		openMenu: (state) => {
			state.open = true;
		},
		closeMenu: (state) => {
			state.open = false;
		},
		showSubMenu: (state, action) => {
			const items = action.payload;
			state.subMenu = items;
		},
		hideSubMenu: (state) => {
			state.subMenu = [];
		},
	},
});

export const { openMenu, closeMenu, showSubMenu, hideSubMenu } = menu.actions;

export default menu.reducer;
