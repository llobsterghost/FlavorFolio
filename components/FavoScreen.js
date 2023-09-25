import React from 'react';
import {Text, View, ScrollView, StyleSheet, Image} from 'react-native';

const FavoScreen = props => {
  const {favoriteList} = props;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Your Favorites</Text>
        <Image style={styles.logo} source={require('../assets/images/FlavorFolioSmallIcon.png')} />
      </View>

      <ScrollView style={styles.scrollviewstyle}>
        {favoriteList.map((recipe, index) => (
          <View style={styles.listItemStyle} key={index}>
            <View style={styles.recipeHeader}>
              <Text style={styles.recipeName}>{recipe.name}</Text>
            </View>
            <Text style={styles.recipeDescription}>{recipe.description}</Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={24} color="#FFD700" />
              <Ionicons name="star" size={24} color="#FFD700" />
              <Ionicons name="star" size={24} color="#FFD700" />
              <Ionicons name="star" size={24} color="#FFD700" />
              <Ionicons name="star-outline" size={24} color="#FFD700" />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  scrollviewstyle: {
    width: '100%',
  },
  listItemStyle: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
  },
  recipeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  recipeName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  recipeDescription: {
    fontSize: 16,
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    position: 'relative',
  },
  headerText: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  logo: {
    width: 50,
    height: 50,
    position: 'absolute',
    top: 20,
    right: 20,
  },
});

export default FavoScreen;
