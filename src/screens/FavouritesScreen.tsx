import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FavouritesScreen = () => {
  const favourites = [
    {
      id: '1',
      title: "Pepsi Fountain Drink",
      price: 3,
      image: require('../assets/products/pepsi.jpg'),
    },
    {
      id: '2',
      title: "Yellow Chair",
      price: 35,
      image: require('../assets/products/chair.jpg'),
    },
    {
      id: '3',
      title: "Pizza and Pizza Box",
      price: 29,
      image: require('../assets/products/pizza.jpg'),
    },
    {
      id: '4',
      title: "Water Bottle",
      price: 30,
      image: require('../assets/products/waterbottle.jpg'),
    },
    {
      id: '5',
      title: "Purell Hand Sanitizer",
      price: 6,
      image: require('../assets/products/handsanitizer.jpg'),
    },
    {
      id: '6',
      title: "Krish Chopra",
      price: 15,
      image: require('../assets/products/krish.jpg'),
    },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.imageContainer}>
        {/* Ensures proper scaling of the image */}
        <Image source={item.image} style={styles.itemImage} resizeMode="cover" />
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="ellipsis-horizontal" size={20} color="#441752" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.heartButton}>
          <Ionicons name="heart" size={24} color="#441752" />
        </TouchableOpacity>
      </View>
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <View style={styles.priceAndSize}>
          <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>You have 6 favourites!</Text>
      </View>
      <FlatList
        data={favourites}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
      />
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
    fontWeight: '600',
    color: '#441752',
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
    width: '100%',
    aspectRatio: 1, // Ensures square frames
  },
  itemImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12, // Matches container border radius
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
});

export default FavouritesScreen;
