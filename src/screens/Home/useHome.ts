import { useState, useEffect } from "react";
import { ImageSourcePropType } from "react-native";
import { productsService, Product as DBProduct } from "../../services/products";

export interface Product extends DBProduct {
	image: ImageSourcePropType;
}

export const useHome = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		loadProducts();
	}, []);

	const loadProducts = async () => {
		try {
			setLoading(true);
			const dbProducts = await productsService.getProducts();

			// Format products with direct image URLs
			const formattedProducts = dbProducts.map((p: DBProduct) => ({
				...p,
				image: { uri: p.image_url },
			}));

			setProducts(formattedProducts);
			setError(null);
		} catch (err) {
			console.error("Error loading products:", err);
			setError(
				err instanceof Error ? err.message : "Failed to load products"
			);
		} finally {
			setLoading(false);
		}
	};

	return {
		products,
		loading,
		error,
		loadProducts,
	};
};
