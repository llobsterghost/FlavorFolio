import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import { Swipeable } from 'react-native-gesture-handler';

const RecipeList = props => {
  const {recipeList, favoriteList, setFavoriteList} = props;

  const handleFavorite = index => {
    const recipe = recipeList[index];
    props.setFavoriteList([...props.favoriteList, recipe]);
  };

  const handleDeleteRecipe = index => {
    const newRecipeList = [...props.recipeList];
    newRecipeList.splice(index, 1);
    props.setRecipeList(newRecipeList);

    if (props.favoriteList.includes(props.recipeList[index])) {
      const newFavoriteList = [...props.favoriteList];
      newFavoriteList.splice(index, 1);
      props.setFavoriteList(newFavoriteList);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollviewstyle}>
        {recipeList.map((recipe, index) => (
          <Swipeable
          renderRightActions={() => (
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteRecipe(index)}
            >
              <Text style={styles.deleteButtonText}>Are you sure you want to delete this recipe?</Text>
              <Ionicons name="trash-outline" size={24} color="white" />
            </TouchableOpacity>
          )}
        >
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
          </Swipeable>
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
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: '100%',
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default RecipeList;
