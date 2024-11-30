import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Home, Search, PlusCircle, Heart, User } from "lucide-react-native";

const BottomNavigation = () => {
	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.tab}>
				<Home color="#4A5568" size={24} />
				<Text style={styles.tabText}>Home</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.tab}>
				<Search color="#4A5568" size={24} />
				<Text style={styles.tabText}>Search</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.tab}>
				<PlusCircle color="#4299E1" size={32} />
				<Text style={[styles.tabText, styles.sellText]}>Sell</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.tab}>
				<Heart color="#4A5568" size={24} />
				<Text style={styles.tabText}>Favorites</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.tab}>
				<User color="#4A5568" size={24} />
				<Text style={styles.tabText}>Profile</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		backgroundColor: "#FFFFFF",
		borderTopWidth: 1,
		borderTopColor: "#E2E8F0",
		paddingVertical: 8,
	},
	tab: {
		alignItems: "center",
	},
	tabText: {
		fontSize: 12,
		color: "#4A5568",
		marginTop: 4,
	},
	sellText: {
		color: "#4299E1",
		fontWeight: "bold",
	},
});

export default BottomNavigation;
