import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: "#F0F4F8",
	},
	title: {
		textAlign: "center",
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 16,
		color: "#2D3748",
		fontFamily: "Work Sans",
	},
	productList: {
		paddingBottom: 16,
	},
	errorText: {
		fontSize: 18,
		color: "red",
		textAlign: "center",
		marginTop: 16,
	},
	loader: {
		marginTop: 16,
		alignSelf: "center",
	},
	downloadProgress: {
		position: "absolute",
		bottom: 20,
		left: 20,
		right: 20,
		backgroundColor: "rgba(255, 255, 255, 0.9)",
		padding: 10,
		borderRadius: 8,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
});
