module.exports = {
	purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	darkMode: false,
	theme: {
		extend: {
			fontFamily: {
				primary: ['Poppins', 'sans-serif'],
			},
			colors: {
				primary: {
					light: '#BEAAE7',
					dark: '#9F7BEB',
				},
				typo: {
					light: '#D9D9D9',
					dark: '#7B7B7B',
				},
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
