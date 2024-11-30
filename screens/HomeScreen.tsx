import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import ProductCard from "../components/ProductCard";

const products = [
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

const HomeScreen = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Mark3d Marketplace</Text>
			<FlatList
				data={products}
				renderItem={({ item }) => <ProductCard product={item} />}
				keyExtractor={(item) => item.id}
				numColumns={2}
				contentContainerStyle={styles.productList}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: "#F0F4F8",
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 16,
		color: "#2D3748",
	},
	productList: {
		paddingBottom: 16,
	},
});

export default HomeScreen;
