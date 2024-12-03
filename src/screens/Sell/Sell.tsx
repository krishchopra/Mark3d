import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Image,
	ActivityIndicator,
	Alert,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { styles } from "./styles";
import { productsService } from "../../services/products";
import { supabase } from "../../lib/supabase";
import { decode } from "base64-arraybuffer";

const SellScreen = () => {
	const [name, setName] = useState("");
	const [price, setPrice] = useState("");
	const [image, setImage] = useState<string | null>(null);
	const [video, setVideo] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const handlePriceChange = (text: string) => {
		const numericValue = text.replace(/[^\d.]/g, "");
		const parts = numericValue.split(".");
		if (parts.length > 2) parts.pop();
		if (parts[1]) {
			parts[1] = parts[1].slice(0, 2);
		}
		const cleanValue = parts.join(".");
		setPrice(cleanValue ? `$${cleanValue}` : "");
	};

	const takePhoto = async () => {
		const { status } = await ImagePicker.requestCameraPermissionsAsync();

		if (status !== "granted") {
			Alert.alert(
				"Permission Needed",
				"Please grant camera permissions to take photos."
			);
			return;
		}

		const result = await ImagePicker.launchCameraAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 0.5,
		});

		if (!result.canceled) {
			setImage(result.assets[0].uri);
		}
	};

	const pickImage = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 0.5,
		});

		if (!result.canceled) {
			setImage(result.assets[0].uri);
		}
	};

	const pickVideo = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Videos,
			allowsEditing: true,
			quality: 0.5,
		});

		if (!result.canceled) {
			setVideo(result.assets[0].uri);
			handleVideoUpload(result.assets[0].uri);
		}
	};

	const handleVideoUpload = async (videoUri: string) => {
		try {
			setLoading(true);
			console.log("Video URI:", videoUri);

			// Create form data
			const formData = new FormData();

			// Append the video file with type
			formData.append("video", {
				uri: videoUri,
				type: "video/mp4",
				name: "uploaded_video.mp4",
			} as any);

			console.log(
				"Uploading video to:",
				"https://3hcdsp1x-5000.use.devtunnels.ms/process-video"
			);
			const uploadResponse = await fetch(
				"https://3hcdsp1x-5000.use.devtunnels.ms/process-video",
				{
					method: "POST",
					body: formData,
				}
			);

			console.log("Response status:", uploadResponse.status);
			const responseText = await uploadResponse.text();
			console.log("Response body:", responseText);

			if (!uploadResponse.ok) {
				Alert.alert("Success", "Video uploaded successfully!");
			}

			Alert.alert("Success", "Video uploaded successfully!");
			setVideo(null);
		} catch (error) {
			console.error("Video upload error details:", {
				error: error.message,
				stack: error.stack,
			});
			// Alert.alert("Error", `Failed to upload video: ${error.message}`);
		} finally {
			setLoading(false);
		}
	};

	const handleSubmit = async () => {
		if (!name || !price || !image) {
			Alert.alert("Error", "Please fill in all fields and add an image");
			return;
		}

		try {
			setLoading(true);

			console.log("Preparing image...");
			const response = await fetch(image);
			const blob = await response.blob();

			// Convert blob to base64
			const base64Data = await new Promise<string>((resolve, reject) => {
				const reader = new FileReader();
				reader.readAsDataURL(blob);
				reader.onload = () => {
					if (typeof reader.result === "string") {
						// Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
						const base64 = reader.result.split(",")[1];
						resolve(base64);
					} else {
						reject(new Error("Failed to convert image to base64"));
					}
				};
				reader.onerror = () => reject(reader.error);
			});

			const imagePath = `${Date.now()}-${name
				.toLowerCase()
				.replace(/\s+/g, "-")}.jpg`;

			console.log("Uploading image...", imagePath);
			try {
				// Convert base64 to ArrayBuffer using decode
				const arrayBuffer = decode(base64Data);

				const { data: uploadData, error: uploadError } =
					await supabase.storage
						.from("product-images")
						.upload(imagePath, arrayBuffer, {
							contentType: "image/jpeg",
							upsert: true,
						});

				if (uploadError) {
					console.error("Image upload error:", uploadError);
					throw uploadError;
				}

				console.log("Getting image URL...");
				const { data: urlData } = supabase.storage
					.from("product-images")
					.getPublicUrl(imagePath);

				if (!urlData?.publicUrl) {
					throw new Error("Failed to get public URL");
				}

				console.log("Creating product...");
				await productsService.addProduct({
					name,
					price: parseFloat(price.replace("$", "")),
					imageUrl: urlData.publicUrl,
					userId: "guest",
				});
			} catch (error) {
				console.error("Image upload error:", error);
				throw new Error("Failed to upload image. Please try again.");
			}

			// Reset form
			setName("");
			setPrice("");
			setImage(null);
			Alert.alert("Success", "Product listed successfully!");
		} catch (error) {
			console.error("Full error:", error);
			Alert.alert(
				"Error",
				error instanceof Error
					? error.message
					: "Failed to list product. Please check your connection and try again."
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={styles.container}>
				{image ? (
					<View>
						<Image
							source={{ uri: image }}
							style={styles.previewImage}
						/>
						<TouchableOpacity
							style={styles.changePhotoButton}
							onPress={() => setImage(null)}
						>
							<Text style={styles.changePhotoText}>
								Change Photo
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[styles.uploadVideoButton]}
							onPress={pickVideo}
							disabled={loading}
						>
							<Text style={styles.buttonText}>
								Upload Video for 3D Model
							</Text>
						</TouchableOpacity>
					</View>
				) : (
					<View>
						<View style={styles.imageButtons}>
							<TouchableOpacity
								style={[
									styles.imageButton,
									styles.takePhotoButton,
								]}
								onPress={takePhoto}
							>
								<Text style={styles.buttonText}>
									Take Photo
								</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={[
									styles.imageButton,
									styles.choosePhotoButton,
								]}
								onPress={pickImage}
							>
								<Text style={styles.buttonText}>
									Choose Photo
								</Text>
							</TouchableOpacity>
						</View>
						<TouchableOpacity
							style={[styles.uploadVideoButton]}
							onPress={pickVideo}
							disabled={loading}
						>
							<Text style={styles.buttonText}>
								Upload Video for 3D Model
							</Text>
						</TouchableOpacity>
					</View>
				)}

				<TextInput
					style={styles.input}
					placeholder="Product Name"
					value={name}
					onChangeText={setName}
				/>

				<TextInput
					style={styles.input}
					placeholder="$0.00"
					value={price}
					onChangeText={handlePriceChange}
					keyboardType="decimal-pad"
					returnKeyType="done"
					onSubmitEditing={Keyboard.dismiss}
				/>

				<TouchableOpacity
					style={[styles.button, loading && styles.buttonDisabled]}
					onPress={handleSubmit}
					disabled={loading}
				>
					{loading ? (
						<ActivityIndicator color="#FFFFFF" />
					) : (
						<Text style={styles.buttonText}>List Product</Text>
					)}
				</TouchableOpacity>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default SellScreen;
