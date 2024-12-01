import { supabase } from "../lib/supabase";
import { Product } from "../types/product";

const API_BASE_URL = "https://api.mark3d.example.com";

// Helper function to convert camelCase to snake_case
const toSnakeCase = (obj: Record<string, any>): Record<string, any> => {
	const snakeObj: Record<string, any> = {};
	Object.keys(obj).forEach((key) => {
		const snakeKey = key.replace(
			/[A-Z]/g,
			(letter) => `_${letter.toLowerCase()}`
		);
		snakeObj[snakeKey] = obj[key];
	});
	return snakeObj;
};

// Helper function to convert snake_case to camelCase
const toCamelCase = (obj: Record<string, any>): Record<string, any> => {
	const camelObj: Record<string, any> = {};
	Object.keys(obj).forEach((key) => {
		const camelKey = key.replace(/_([a-z])/g, (_, letter) =>
			letter.toUpperCase()
		);
		camelObj[camelKey] = obj[key];
	});
	return camelObj;
};

export const productsService = {
	async getProducts() {
		const { data, error } = await supabase
			.from("products")
			.select("*")
			.order("created_at", { ascending: false });

		if (error) throw error;
		return data ? data.map((item) => toCamelCase(item) as Product) : [];
	},

	async addProduct(product: Omit<Product, "id" | "createdAt">) {
		const snakeCaseProduct = toSnakeCase(product);
		const { data, error } = await supabase
			.from("products")
			.insert(snakeCaseProduct)
			.select()
			.single();

		if (error) throw error;
		return toCamelCase(data) as Product;
	},

	async uploadImage(file: Blob, path: string) {
		console.log("Uploading image with size:", file.size, "bytes");
		const { data, error } = await supabase.storage
			.from("product-images")
			.upload(path, file, {
				contentType: "image/jpeg",
				upsert: true,
				cacheControl: "3600",
			});

		if (error) {
			console.error("Supabase storage error:", error);
			throw error;
		}

		return data;
	},

	async uploadVideo(file: Blob, path: string) {
		console.log("Uploading video with size:", file.size, "bytes");
		
		// Create form data for the video upload
		const formData = new FormData();
		formData.append('video', file);
		formData.append('path', path);

		try {
			const response = await fetch(`${API_BASE_URL}/upload-video`, {
				method: 'POST',
				body: formData,
				headers: {
					'Accept': 'application/json',
				},
			});

			if (!response.ok) {
				throw new Error(`Video upload failed: ${response.statusText}`);
			}

			const data = await response.json();
			return {
				path: data.path,
				publicUrl: data.url,
			};
		} catch (error) {
			console.error("Video upload error:", error);
			throw error;
		}
	},

	getPublicUrl(bucket: "product-images" | "product-videos", path: string) {
		if (bucket === "product-videos") {
			// For videos, construct the URL from the API
			return `${API_BASE_URL}/videos/${path}`;
		}

		// For images, use Supabase storage
		const { data } = supabase.storage.from(bucket).getPublicUrl(path);

		if (!data.publicUrl) {
			throw new Error("Failed to get public URL");
		}

		console.log("Generated public URL:", data.publicUrl);
		return data.publicUrl;
	},

	async deleteProduct(productId: string, imagePath: string, videoPath?: string) {
		// Delete the image from Supabase storage
		const { error: imageError } = await supabase.storage
			.from("product-images")
			.remove([imagePath]);

		if (imageError) {
			console.error("Image delete error:", imageError);
			throw imageError;
		}

		// Delete the video from the backend API if it exists
		if (videoPath) {
			try {
				const response = await fetch(`${API_BASE_URL}/delete-video/${videoPath}`, {
					method: 'DELETE',
				});

				if (!response.ok) {
					throw new Error(`Video delete failed: ${response.statusText}`);
				}
			} catch (error) {
				console.error("Video delete error:", error);
				throw error;
			}
		}

		// Delete the product from the database
		const { error: dbError } = await supabase
			.from("products")
			.delete()
			.eq("id", productId);

		if (dbError) {
			console.error("Database delete error:", dbError);
			throw dbError;
		}
	},
};
