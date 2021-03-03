import { createSlice } from '@reduxjs/toolkit';

export const cart = createSlice({
	name: 'cart',
	initialState: {
		open: false,
		items: [],
	},
	reducers: {
		initCart: (state) => {
			const existingCart = localStorage.getItem('cart');
			if (existingCart) state.items = JSON.parse(existingCart);
			else state.items = [];
		},
		openCart: (state) => {
			state.open = true;
		},
		closeCart: (state) => {
			state.open = false;
		},
		addToCart: (state, action) => {
			const index = state.items.findIndex((item) => item.variantId === action.payload.variantId);

			const existingItem = index !== -1;

			if (existingItem) {
				state.items[index].quantity += action.payload.quantity;
				state.items[index].price = state.items[index].price * state.items[index].quantity;
			} else {
				state.items = [...state.items, action.payload];
			}

			localStorage.setItem('cart', JSON.stringify(state.items));
		},
		removeFromCart: (state, action) => {
			const variantId = action.payload;
			const itemIndex = state.items.findIndex((item) => item.variantId === variantId);
			state.items.splice(itemIndex, 1);

			localStorage.setItem('cart', JSON.stringify(state.items));
		},
	},
});

export const { initCart, addToCart, removeFromCart, openCart, closeCart } = cart.actions;

export default cart.reducer;
