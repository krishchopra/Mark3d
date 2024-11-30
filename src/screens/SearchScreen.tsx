import React from "react";
import { View, Text, StyleSheet } from "react-native";

const SearchScreen = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>Search Screen</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#F0F4F8",
	},
	text: {
		fontSize: 20,
		color: "#2D3748",
	},
});

export default SearchScreen;
