import React from "react";
import { View, Text, FlatList } from "react-native";
import ProductCard from "../../components/ProductCard";
import { styles } from "./styles";
import { useHome } from "./useHome";

const HomeScreen = () => {
	const { products } = useHome();

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

export default HomeScreen;
