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
import { Product } from "../screens/Home/useHome";
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
					text: "Delete",
					style: "destructive",
					onPress: async () => {
						try {
							// Extract image path from URL
							const url = new URL(product.image_url);
							const imagePath = url.pathname.split("/").pop()!;

							await productsService.deleteProduct(
								product.id,
								imagePath
							);
							onDelete?.();
						} catch (error) {
							console.error("Delete error:", error);
							Alert.alert(
								"Error",
								"Failed to delete listing. Please try again."
							);
						}
					},
				},
			]
		);
	};

	// Add query parameter for image compression
	const imageUrl = new URL(product.image_url);
	imageUrl.searchParams.set("quality", "50");

	return (
		<View style={styles.card}>
			<View style={styles.imageContainer}>
				<Image
					source={{ uri: imageUrl.toString() }}
					style={styles.image}
					resizeMode="cover"
					onError={(error) =>
						console.error("Image loading error:", error)
					}
				/>
			</View>
			<View style={styles.info}>
				<Text style={styles.name}>{product.name}</Text>
				<Text style={styles.price}>${product.price.toFixed(2)}</Text>
			</View>
			<View style={styles.buttonContainer}>
				<TouchableOpacity style={styles.viewButton} onPress={onView3D}>
					<Box color="#FFFFFF" size={16} />
					<Text style={styles.viewButtonText}>View 3D</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.deleteButton}
					onPress={handleDelete}
				>
					<Trash2 color="#FFFFFF" size={16} />
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	card: {
		flex: 1,
		margin: 8,
		backgroundColor: "#FFFFFF",
		borderRadius: 8,
		overflow: "hidden",
		elevation: 2,
	},
	imageContainer: {
		width: "100%",
		height: 150,
	},
	image: {
		width: "100%",
		height: "100%",
	},
	info: {
		padding: 8,
	},
	name: {
		fontSize: 16,
		fontWeight: "500",
		marginBottom: 4,
	},
	price: {
		fontSize: 16,
		color: "#4299E1",
		fontWeight: "600",
	},
	buttonContainer: {
		flexDirection: "row",
		padding: 8,
		justifyContent: "space-between",
		alignItems: "center",
	},
	viewButton: {
		backgroundColor: "#4299E1",
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 6,
		gap: 4,
	},
	viewButtonText: {
		color: "#FFFFFF",
		marginLeft: 4,
		fontWeight: "500",
	},
	deleteButton: {
		backgroundColor: "#EF4444",
		padding: 6,
		borderRadius: 6,
	},
});

export default ProductCard;
