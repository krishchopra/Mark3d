import { ImageSourcePropType } from "react-native";

interface Product {
	id: string;
	name: string;
	price: number;
	image: ImageSourcePropType;
}

export const useHome = () => {
	const products: Product[] = [
		{
			id: "1",
			name: "Vintage Chair",
			price: 150,
			image: require("../../assets/products/vintage-chair.png"),
		},
		{
			id: "2",
			name: "Retro Lamp",
			price: 80,
			image: require("../../assets/products/retro-lamp.png"),
		},
		{
			id: "3",
			name: "Antique Table",
			price: 300,
			image: require("../../assets/products/antique-table.png"),
		},
		{
			id: "4",
			name: "Classic Bookshelf",
			price: 200,
			image: require("../../assets/products/classic-bookshelf.png"),
		},
	];

	return {
		products,
	};
};
