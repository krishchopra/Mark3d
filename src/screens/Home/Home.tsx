import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	FlatList,
	ActivityIndicator,
	RefreshControl,
	Platform,
	Linking,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import ProductCard from "../../components/ProductCard";
import { styles } from "./styles";
import { useHome } from "./useHome";

const HomeScreen = () => {
	const { products, loading, error, loadProducts } = useHome();
	const isFocused = useIsFocused();

	const handleView3D = async () => {
		if (Platform.OS === "ios") {
			const modelUrl =
				"https://aqmzimafjvisudlvwrlb.supabase.co/storage/v1/object/public/product-images/model-mobile.usdz";
			try {
				const supported = await Linking.canOpenURL(modelUrl);
				if (supported) {
					await Linking.openURL(modelUrl);
				} else {
					alert("3D model viewing is not supported on this device");
				}
			} catch (error) {
				console.error("Error opening 3D model:", error);
				alert("Failed to open 3D model. Please try again.");
			}
		} else {
			alert(
				"3D model viewing is currently only supported on iOS devices"
			);
		}
	};

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
						<ProductCard
							product={item}
							onDelete={loadProducts}
							onView3D={handleView3D}
						/>
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
