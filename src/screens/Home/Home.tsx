import React, { useEffect, useState, useRef } from "react";
import {
	View,
	Text,
	FlatList,
	ActivityIndicator,
	RefreshControl,
	Modal,
	TouchableOpacity,
	Alert,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { GLView } from "expo-gl";
import { Renderer } from "expo-three";
import * as THREE from "three";
import {
	Scene,
	PerspectiveCamera,
	AmbientLight,
	DirectionalLight,
	WebGLRenderer,
} from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import ProductCard from "../../components/ProductCard";
import { styles } from "./styles";
import { useHome } from "./useHome";

const HomeScreen = () => {
	const { products, loading, error, loadProducts } = useHome();
	const isFocused = useIsFocused();
	const [showModel, setShowModel] = useState(false);
	const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
	const modelRef = useRef<THREE.Object3D | null>(null);
	const animationFrameId = useRef<number>();

	useEffect(() => {
		return () => {
			if (animationFrameId.current) {
				cancelAnimationFrame(animationFrameId.current);
			}
		};
	}, []);

	const handleView3D = async () => {
		try {
			setShowModel(true);
		} catch (err) {
			console.error("Error loading 3D model:", err);
			Alert.alert("Error", "Failed to load 3D model. Please try again.");
		}
	};

	const handleCloseModel = () => {
		setShowModel(false);
		if (rendererRef.current) {
			rendererRef.current.dispose();
		}
		if (animationFrameId.current) {
			cancelAnimationFrame(animationFrameId.current);
		}
	};

	const onContextCreate = async (gl: WebGLRenderingContext) => {
		const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;
		const sceneColor = 0x441752;

		// Create renderer
		const renderer = new Renderer({ gl });
		renderer.setSize(width, height);
		renderer.setClearColor(sceneColor);
		rendererRef.current = renderer;

		// Create scene
		const scene = new Scene();
		scene.add(new AmbientLight(0xffffff, 0.6));

		// Add directional light
		const directionalLight = new DirectionalLight(0xffffff, 0.8);
		directionalLight.position.set(0, 10, 5);
		scene.add(directionalLight);

		// Create camera
		const camera = new PerspectiveCamera(75, width / height, 0.1, 1000);
		camera.position.z = 5;

		// Load model
		const loader = new OBJLoader();
		try {
			const modelUrl =
				"https://aqmzimafjvisudlvwrlb.supabase.co/storage/v1/object/public/product-images/bottle.obj?t=2024-12-01T08%3A19%3A20.312Z";
			const model = await loader.loadAsync(modelUrl);
			modelRef.current = model;
			scene.add(model);

			// Center and scale the model
			model.position.set(0, 0, 0);
			model.scale.set(1, 1, 1); // Adjust scale if needed

			// Start animation loop
			const animate = () => {
				if (!showModel) return;

				if (modelRef.current) {
					modelRef.current.rotation.y += 0.01;
				}

				renderer.render(scene, camera);
				animationFrameId.current = requestAnimationFrame(animate);
				gl.endFrameEXP(); // Important for Expo GL
			};

			animate();
		} catch (error) {
			console.error("Error loading model:", error);
			Alert.alert(
				"Error",
				"Failed to load 3D model. Please check your internet connection and try again."
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
			<Modal
				visible={showModel}
				transparent={true}
				onRequestClose={handleCloseModel}
			>
				<View style={styles.modalContainer}>
					<TouchableOpacity
						style={styles.closeButton}
						onPress={handleCloseModel}
					>
						<Text style={styles.closeButtonText}>✕</Text>
					</TouchableOpacity>
					<GLView
						style={styles.glView}
						onContextCreate={onContextCreate}
					/>
				</View>
			</Modal>
			{loading && !products.length ? (
				<ActivityIndicator
					size="large"
					color="#FFD8BC"
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
