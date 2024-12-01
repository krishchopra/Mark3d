import { supabase } from "../lib/supabase";

export interface Product {
	id: string;
	name: string;
	price: number;
	image_url: string;
	created_at: string;
	user_id: string;
}

export const productsService = {
	async getProducts() {
		const { data, error } = await supabase
			.from("products")
			.select("*")
			.order("created_at", { ascending: false });

		if (error) throw error;
		return data;
	},

	async addProduct(product: Omit<Product, "id" | "created_at">) {
		const { data, error } = await supabase
			.from("products")
			.insert(product)
			.select()
			.single();

		if (error) throw error;
		return data;
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

		// Verify the upload
		const { data: checkData, error: checkError } = await supabase.storage
			.from("product-images")
			.download(path);

		if (checkError || !checkData || checkData.size === 0) {
			console.error(
				"Upload verification failed:",
				checkError || "File size is 0 bytes"
			);
			throw new Error("Failed to verify uploaded file");
		}

		return data;
	},

	getPublicUrl(path: string) {
		const { data } = supabase.storage
			.from("product-images")
			.getPublicUrl(path);

		if (!data.publicUrl) {
			throw new Error("Failed to get public URL");
		}

		console.log("Generated public URL:", data.publicUrl);
		return data.publicUrl;
	},

	async getBase64Image(path: string) {
		const { data, error } = await supabase.storage
			.from("product-images")
			.download(path);

		if (error) {
			console.error("Error downloading image:", error);
			throw error;
		}

		if (!data) {
			throw new Error("No image data received");
		}

		return new Promise<string>((resolve, reject) => {
			const fr = new FileReader();
			fr.readAsDataURL(data);
			fr.onload = () => {
				if (typeof fr.result === "string") {
					resolve(fr.result);
				} else {
					reject(new Error("Failed to convert image to base64"));
				}
			};
			fr.onerror = () => {
				reject(fr.error);
			};
		});
	},

	async deleteProduct(productId: string, imagePath: string) {
		// Delete the image from storage
		const { error: storageError } = await supabase.storage
			.from("product-images")
			.remove([imagePath]);

		if (storageError) {
			console.error("Storage delete error:", storageError);
			throw storageError;
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
