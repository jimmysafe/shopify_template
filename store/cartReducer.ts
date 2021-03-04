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
				const newItem = action.payload;
				newItem.price = newItem.price * newItem.quantity;
				state.items[index].quantity += newItem.quantity;
				state.items[index].price += newItem.price;
			} else {
				const newItem = action.payload;
				newItem.price = newItem.price * newItem.quantity;
				state.items = [...state.items, newItem];
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
