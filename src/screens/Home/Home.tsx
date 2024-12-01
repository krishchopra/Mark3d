import React, { useEffect } from "react";
import {
	View,
	Text,
	FlatList,
	ActivityIndicator,
	RefreshControl,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import ProductCard from "../../components/ProductCard";
import { styles } from "./styles";
import { useHome } from "./useHome";

const HomeScreen = () => {
	const { products, loading, error, loadProducts } = useHome();
	const isFocused = useIsFocused();

	useEffect(() => {
		if (isFocused) {
			loadProducts();
		}
	}, [isFocused]);

	if (error) {
		return (
			<View style={styles.container}>
				<Text style={styles.errorText}>{error}</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Mark3d Marketplace</Text>
			{loading && !products.length ? (
				<ActivityIndicator
					size="large"
					color="#4299E1"
					style={styles.loader}
				/>
			) : (
				<FlatList
					data={products}
					renderItem={({ item }) => (
						<ProductCard product={item} onDelete={loadProducts} />
					)}
					keyExtractor={(item) => item.id}
					numColumns={2}
					contentContainerStyle={styles.productList}
					refreshControl={
						<RefreshControl
							refreshing={loading}
							onRefresh={loadProducts}
						/>
					}
				/>
			)}
		</View>
	);
};

export default HomeScreen;
