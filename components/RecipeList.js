import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

const RecipeList = props => {
  const {recipeList} = props;

  const handleFavorite = index => {
    const recipe = recipeList[index];
    props.setFavoriteList([...props.favoriteList, recipe]);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollviewstyle}>
        {recipeList.map((recipe, index) => (
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Recipe', {recipe})}>
            <View style={styles.listItemStyle} key={index}>
              <View style={styles.recipeHeader}>
                <Text style={styles.recipeName}>{recipe.name}</Text>
                <TouchableOpacity onPress={() => handleFavorite(index)}>
                  <Ionicons name="heart-outline" size={24} color="black" />
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
          </TouchableOpacity>
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
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default RecipeList;
