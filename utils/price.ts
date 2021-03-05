// FORMAT PRICE TO BE 2 DECIMAL NUMBER
export const Price = (price: number) => {
	const formattedPrice = (Math.round(Number(price) * 100) / 100).toFixed(2);
	return formattedPrice;
};
