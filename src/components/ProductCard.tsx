import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Box } from "lucide-react-native";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface ProductCardProps {
  product: Product;
  onView3D?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onView3D }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </View>
      <TouchableOpacity style={styles.viewButton} onPress={onView3D}>
        <Box color="#FFFFFF" size={16} />
        <Text style={styles.viewButtonText}>View 3D</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    overflow: "hidden",
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  info: {
    padding: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2D3748",
  },
  price: {
    fontSize: 14,
    color: "#4A5568",
    marginTop: 4,
  },
  viewButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4299E1",
    padding: 8,
  },
  viewButtonText: {
    color: "#FFFFFF",
    marginLeft: 4,
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default ProductCard;
