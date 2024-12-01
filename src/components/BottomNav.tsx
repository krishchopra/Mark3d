// import React from 'react';
// import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// const BottomNav = () => {
//   const navigation = useNavigation();

//   return (
//     <View style={styles.bottomNav}>
//       <TouchableOpacity onPress={() => navigation.navigate('Home')}>
//         <Text style={styles.navText}>Home</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => navigation.navigate('Search')}>
//         <Text style={styles.navText}>Search</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => navigation.navigate('Sell')}>
//         <Text style={styles.navText}>Sell</Text>
//       </TouchableOpacity>
// 	  <TouchableOpacity onPress={() => navigation.navigate('Favourites')}>
//         <Text style={styles.navText}>Favourites</Text>
//       </TouchableOpacity>
// 	  <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
//         <Text style={styles.navText}>Profile</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   bottomNav: {
//     backgroundColor: 'rgba(135, 148, 166, 0.95)', // Increased opacity for better visibility
//     borderTopColor: 'rgba(229, 208, 255, 0.2)', // Subtle lavender border
//     borderTopWidth: 1,
//     padding: 15,
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//   },
//   navText: {
//     color: '#FFFFFF', // White text for contrast
//     fontWeight: '600', // Added fontWeight for better readability
//   }
// });

// export default BottomNav;

import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Home, Search, PlusCircle, Heart, User } from "lucide-react-native";

const BottomNav: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.bottomNav}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        let icon;
        if (route.name === 'Home') {
          icon = <Home color={isFocused ? '#4299E1' : '#FFFFFF'} size={24} />;
        } else if (route.name === 'Search') {
          icon = <Search color={isFocused ? '#4299E1' : '#FFFFFF'} size={24} />;
        } else if (route.name === 'Sell') {
          icon = <PlusCircle color={isFocused ? '#4299E1' : '#FFFFFF'} size={24} />;
        } else if (route.name === 'Favorites') {
          icon = <Heart color={isFocused ? '#4299E1' : '#FFFFFF'} size={24} />;
        } else if (route.name === 'Profile') {
          icon = <User color={isFocused ? '#4299E1' : '#FFFFFF'} size={24} />;
        }

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={styles.tabItem}
          >
            {icon}
            <Text style={[styles.tabText, isFocused && styles.tabTextFocused]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: 'rgba(68, 23, 82, 0.95)', // Updated to match the new background color
    borderTopColor: 'rgba(229, 208, 255, 0.2)',
    borderTopWidth: 1,
    paddingVertical: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    color: '#FFFFFF',
    fontSize: 12,
    marginTop: 4,
  },
  tabTextFocused: {
    color: '#4299E1',
  },
});

export default BottomNav;

