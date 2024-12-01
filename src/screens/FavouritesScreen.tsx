// import React from "react";
// import { View, Text, StyleSheet } from "react-native";

// const FavouritesScreen = () => {
// 	return (
// 		<View style={styles.container}>
// 			<Text style={styles.text}>Favorites Screen</Text>
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

// export default FavouritesScreen;





import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FavouritesScreen = () => {
  const favourites = [
    {
      id: '1',
      title: "Blue Puff Sleeve Dress",
      price: 24,
      // size: "MEDIUM",
      image: "https://via.placeholder.com/150",
    },
    {
      id: '2',
      title: "Women's Jeans",
      price: 35,
      // size: "MEDIUM",
      image: "https://via.placeholder.com/150",
    },
    {
      id: '3',
      title: "Checkered Jacket",
      price: 29,
      // size: "MEDIUM",
      image: "https://via.placeholder.com/150",
    },
    {
      id: '4',
      title: "Nike Blazers",
      price: 30,
      // size: "SIZE 9",
      image: "https://via.placeholder.com/150",
    },
    {
      id: '5',
      title: "Leather Jacket",
      price: 45,
      // size: "MEDIUM",
      image: "https://via.placeholder.com/150",
    },
    {
      id: '6',
      title: "Winter Parka",
      price: 15,
      // size: "MEDIUM",
      image: "https://via.placeholder.com/150",
    },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.itemImage} />
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="ellipsis-horizontal" size={20} color="#441752" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.heartButton}>
          <Ionicons name="heart" size={24} color="#441752" />
        </TouchableOpacity>
      </View>
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle} numberOfLines={2}>{item.title}</Text>
        <View style={styles.priceAndSize}>
          <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
          <Text style={styles.itemSize}>{item.size}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {/* <Text style={styles.headerTitle}>Favorites</Text> */}
        <Text style={styles.headerTitle}>You have 23 favourites!</Text>
      </View>
      <FlatList
        data={favourites}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
      />
      {/* <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home-outline" size={24} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="compass-outline" size={24} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="cart-outline" size={24} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
          <Ionicons name="heart" size={24} color="#4A5759" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person-outline" size={24} color="#666" />
        </TouchableOpacity>
      </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    padding: 16,
    backgroundColor: 'white',
  },
  headerTitle: {
    fontSize: 15,
    textAlign: 'center',
    fontFamily: "Work Sans",
    // fontWeight: 'bold',
    fontWeight: '600',
    color: '#441752',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  listContent: {
    padding: 8,
  },
  itemContainer: {
    flex: 1,
    margin: 8,
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  imageContainer: {
    position: 'relative',
  },
  itemImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 12,
  },
  menuButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  heartButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 8,
  },
  itemDetails: {
    padding: 12,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4A5759',
    marginBottom: 4,
  },
  priceAndSize: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A5759',
  },
  itemSize: {
    fontSize: 12,
    color: '#666',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeNavItem: {
    opacity: 1,
  },
});

export default FavouritesScreen;

