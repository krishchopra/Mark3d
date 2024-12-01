// import React from "react";
// import { View, Text, StyleSheet } from "react-native";

// const ProfileScreen = () => {
// 	return (
// 		<View style={styles.container}>
// 			<Text style={styles.text}>Profile Screen</Text>
// 		</View>
// 	);
// };

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		justifyContent: "center",
// 		alignItems: "center",
// 		backgroundColor: "#F0F4F8",
// 	},
// 	text: {
// 		fontSize: 20,
// 		color: "#2D3748",
// 	},
// });

// export default ProfileScreen;

import React from "react";
import {
	View,
	Text,
	Image,
	StyleSheet,
	SafeAreaView,
	ImageBackground,
} from "react-native";

const ProfileScreen = () => {
	return (
		<View style={styles.container}>
			<ImageBackground
				source={require("../../assets/antique-table.png")}
				style={styles.backgroundImage}
			>
				<SafeAreaView style={styles.content}>
					<View style={styles.profileSection}>
						<Image
							source={require("../../assets/antique-table.png")}
							style={styles.profileImage}
						/>
						<Text style={styles.name}>Christina Slater</Text>
						<Text style={styles.location}>San Francisco, CA</Text>

						<View style={styles.statsContainer}>
							<View style={styles.statItem}>
								<Text style={styles.statNumber}>1,250</Text>
								<Text style={styles.statLabel}>Postings</Text>
							</View>
							<View style={styles.statDivider} />
							<View style={styles.statItem}>
								<Text style={styles.statNumber}>239</Text>
								<Text style={styles.statLabel}>
									Connections
								</Text>
							</View>
							<View style={styles.statDivider} />
							<View style={styles.statItem}>
								<Text style={styles.statNumber}>125</Text>
								<Text style={styles.statLabel}>Followers</Text>
							</View>
						</View>
					</View>
				</SafeAreaView>
			</ImageBackground>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	backgroundImage: {
		flex: 1,
		width: "100%",
	},
	content: {
		flex: 1,
	},
	profileSection: {
		alignItems: "center",
		paddingTop: 40,
	},
	profileImage: {
		width: 120,
		height: 120,
		borderRadius: 60,
		borderWidth: 3,
		borderColor: "white",
	},
	name: {
		fontSize: 24,
		fontWeight: "bold",
		color: "white",
		marginTop: 12,
		textShadowColor: "rgba(0, 0, 0, 0.5)",
		textShadowOffset: { width: 0, height: 2 },
		textShadowRadius: 3,
	},
	location: {
		fontSize: 16,
		color: "white",
		marginTop: 4,
		textShadowColor: "rgba(0, 0, 0, 0.5)",
		textShadowOffset: { width: 0, height: 1 },
		textShadowRadius: 2,
	},
	statsContainer: {
		flexDirection: "row",
		backgroundColor: "white",
		borderRadius: 12,
		padding: 20,
		marginTop: 24,
		marginHorizontal: 20,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	statItem: {
		flex: 1,
		alignItems: "center",
	},
	statNumber: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#333",
	},
	statLabel: {
		fontSize: 12,
		color: "#666",
		marginTop: 4,
	},
	statDivider: {
		width: 1,
		height: "100%",
		backgroundColor: "#E5E5E5",
	},
});

export default ProfileScreen;
