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
		marginBottom: 36,
		color: "#2D3748",
	},
	imageButtons: {
		flexDirection: "row",
		justifyContent: "space-between",
		margin: 16,
	},
	imageButton: {
		flex: 1,
		padding: 16,
		borderRadius: 8,
		alignItems: "center",
		marginHorizontal: 4,
	},
	takePhotoButton: {
		backgroundColor: "#4299E1",
	},
	choosePhotoButton: {
		backgroundColor: "#63B3ED",
	},
	uploadVideoButton: {
		backgroundColor: "#4C51BF",
        padding: 16,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 16,
	},
	changePhotoButton: {
		backgroundColor: "#4299E1",
		padding: 10,
		borderRadius: 8,
		alignItems: "center",
		marginTop: 8,
		marginBottom: 16,
	},
	changePhotoText: {
		color: "#FFFFFF",
		fontWeight: "500",
	},
	previewImage: {
		width: "100%",
		height: 200,
		borderRadius: 8,
		marginBottom: 8,
	},
	input: {
		backgroundColor: "#FFFFFF",
		padding: 12,
		borderRadius: 8,
		marginBottom: 16,
	},
	button: {
		backgroundColor: "#66BB6A",
		padding: 16,
		borderRadius: 8,
		alignItems: "center",
	},
	buttonDisabled: {
		opacity: 0.5,
	},
	buttonText: {
		color: "#FFFFFF",
		fontWeight: "500",
	},
});
