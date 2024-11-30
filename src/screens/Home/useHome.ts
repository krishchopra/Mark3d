interface Product {
	id: string;
	name: string;
	price: number;
	image: string;
}

export const useHome = () => {
	const products: Product[] = [
		{
			id: "1",
			name: "Vintage Chair",
			price: 150,
			image: "/placeholder.svg?height=200&width=200",
		},
		{
			id: "2",
			name: "Retro Lamp",
			price: 80,
			image: "/placeholder.svg?height=200&width=200",
		},
		{
			id: "3",
			name: "Antique Table",
			price: 300,
			image: "/placeholder.svg?height=200&width=200",
		},
		{
			id: "4",
			name: "Classic Bookshelf",
			price: 200,
			image: "/placeholder.svg?height=200&width=200",
		},
	];

	return {
		products,
	};
};
