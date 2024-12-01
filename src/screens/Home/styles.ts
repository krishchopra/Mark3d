import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: "#F0F4F8",
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 16,
		color: "#2D3748",
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
});
