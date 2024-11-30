import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Search } from "lucide-react-native";

const Header = () => {
	return (
		<View style={styles.header}>
			<Text style={styles.logo}>Mark3d</Text>
			<Search color="#4A5568" size={24} />
		</View>
	);
};

const styles = StyleSheet.create({
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 16,
		backgroundColor: "#FFFFFF",
		borderBottomWidth: 1,
		borderBottomColor: "#E2E8F0",
	},
	logo: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#2D3748",
	},
});

export default Header;
