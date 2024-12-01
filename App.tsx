import React from "react";
import { SafeAreaView, StyleSheet, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, PlusCircle, Heart, User } from "lucide-react-native";

import HomeScreen from "./src/screens/Home/Home";
import SellScreen from "./src/screens/Sell/Sell";
import FavoritesScreen from "./src/screens/FavouritesScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
// import SignIn from "./src/screens/SignIn";

const Tab = createBottomTabNavigator();

const App = () => {
	return (
		<NavigationContainer>
			<SafeAreaView style={styles.container}>
				<StatusBar barStyle="dark-content" />
				<Tab.Navigator
					screenOptions={({ route }) => ({
						tabBarIcon: ({ color, size }) => {
							let icon;
							if (route.name === "Home") {
								icon = <Home color={color} size={size} />;
							// } else if (route.name === "Search") {
							// 	icon = <Search color={color} size={size} />;
							} else if (route.name === "Sell") {
								icon = <PlusCircle color={color} size={size} />;
							} else if (route.name === "Favorites") {
								icon = <Heart color={color} size={size} />;
							} else if (route.name === "Profile") {
								icon = <User color={color} size={size} />;
							}
							return icon;
						},
						tabBarActiveTintColor: "#FFD8BC",
						tabBarInactiveTintColor: "#FFFFFF",
						tabBarStyle: {
							backgroundColor: "#441752", 
							borderTopWidth: 0, 
						  },
						  headerStyle: {
							backgroundColor: "#441752", 
						  },
						  headerTintColor: "#FFFFFF",
					})}
				>
					<Tab.Screen name="Home" component={HomeScreen} />
					{/* <Tab.Screen name="Search" component={SignIn} /> */}
					<Tab.Screen name="Sell" component={SellScreen} />
					<Tab.Screen name="Favorites" component={FavoritesScreen} />
					<Tab.Screen name="Profile" component={ProfileScreen} />
				</Tab.Navigator>
			</SafeAreaView>
		</NavigationContainer>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#441752",
	},
});

export default App;
