import React from "react";
import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity,
	Alert,
} from "react-native";
import { Box, Trash2 } from "lucide-react-native";
import { Product } from "../types/product";
import { productsService } from "../services/products";

interface ProductCardProps {
	product: Product;
	onView3D?: () => void;
	onDelete?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
	product,
	onView3D,
	onDelete,
}) => {
	const handleDelete = () => {
		Alert.alert(
			"Delete Listing",
			"Are you sure you want to delete this listing?",
			[
				{
					text: "Cancel",
					style: "cancel",
				},
				{
					text: "",
					style: "destructive",
					onPress: async () => {
						try {
							// Extract image path from URL
							const url = new URL(product.imageUrl);
							const imagePath = url.pathname.split("/").pop()!;

							// Extract video path if it exists
							let videoPath: string | undefined;
							if (product.videoUrl) {
								const videoUrl = new URL(product.videoUrl);
								videoPath = videoUrl.pathname.split("/").pop()!;
							}

							await productsService.deleteProduct(
								product.id,
								imagePath,
								videoPath
							);
							onDelete?.();
						} catch (error) {
							console.error("Delete error:", error);
							Alert.alert(
								"Error",
								"Failed to delete the listing. Please try again."
							);
						}
					},
				},
			]
		);
	};

	return (
		<View style={styles.card}>
			<Image source={{ uri: product.imageUrl }} style={styles.image} />
			<View style={styles.content}>
				<Text style={styles.name}>{product.name}</Text>
				<Text style={styles.price}>${product.price}</Text>
				<View style={styles.buttonContainer}>
					{onView3D && (
						<TouchableOpacity
							style={styles.button}
							onPress={onView3D}
						>
							<Box size={20} color="#000" />
							<Text style={styles.buttonText}>View 3D</Text>
						</TouchableOpacity>
					)}
					{onDelete && (
						<TouchableOpacity
							style={[styles.button, styles.deleteButton]}
							onPress={handleDelete}
						>
							<Trash2 size={20} color="#FF0000" />
						</TouchableOpacity>
					)}
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	card: {
		flex: 1,
		margin: 8,
		backgroundColor: "#fff",
		borderRadius: 8,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	image: {
		width: "100%",
		height: 200,
		borderTopLeftRadius: 8,
		borderTopRightRadius: 8,
	},
	content: {
		padding: 12,
	},
	name: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 4,
	},
	price: {
		fontSize: 16,
		color: "#666",
		marginBottom: 8,
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 8,
	},
	button: {
		flexDirection: "row",
		alignItems: "center",
		padding: 8,
		borderRadius: 4,
		backgroundColor: "#f0f0f0",
	},
	deleteButton: {
		backgroundColor: "#ffe0e0",
	},
	buttonText: {
		marginLeft: 4,
		fontSize: 14,
	},
	deleteText: {
		color: "#FF0000",
	},
});

export default ProductCard;
