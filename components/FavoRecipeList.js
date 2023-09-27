import React from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

const FavoRecipeList = props => {
  const {favoriteList, setFavoriteList} = props;

  const handleUnFavorite = index => {
    const newFavoriteList = [...props.favoriteList];
    newFavoriteList.splice(index, 1);
    props.setFavoriteList(newFavoriteList);
  };

  return (
    <ScrollView style={styles.scrollviewstyle}>
      {favoriteList.map((recipe, index) => (
        <View style={styles.listItemStyle} key={index}>
          <View style={styles.recipeHeader}>
            <Text style={styles.recipeName}>{recipe.name}</Text>
            <TouchableOpacity onPress={() => handleUnFavorite(index)}>
              <Ionicons name="heart" size={24} color="black" />
            </TouchableOpacity>
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
  );
};

const styles = StyleSheet.create({
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
});

export default FavoRecipeList;
