import React from "react";
import { FlatList, StyleSheet } from "react-native";
import ProductCard from "./ProductCard";

const products = [
	{
		id: "1",
		name: "Vintage Chair",
		price: 150,
		image: require("../assets/placeholder.svg"),
	},
	{
		id: "2",
		name: "Retro Lamp",
		price: 80,
		image: require("../assets/placeholder.svg"),
	},
	{
		id: "3",
		name: "Antique Table",
		price: 300,
		image: require("../assets/placeholder.svg"),
	},
	{
		id: "4",
		name: "Classic Bookshelf",
		price: 200,
		image: require("../assets/placeholder.svg"),
	},
];

const ProductList = () => {
	return (
		<FlatList
			data={products}
			renderItem={({ item }) => <ProductCard product={item} />}
			keyExtractor={(item) => item.id}
			numColumns={2}
			contentContainerStyle={styles.listContainer}
		/>
	);
};

const styles = StyleSheet.create({
	listContainer: {
		padding: 8,
	},
});

export default ProductList;
