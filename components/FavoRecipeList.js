import React from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

const FavoRecipeList = props => {
  const {favoriteList, setFavoriteList, navigation} = props;

  const handleUnFavorite = index => {
    const newFavoriteList = [...props.favoriteList];
    newFavoriteList.splice(index, 1);
    props.setFavoriteList(newFavoriteList);
  };

  return (
    <ScrollView style={styles.scrollviewstyle}>
      {favoriteList.map((recipe, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => props.navigation.navigate('Recipe', {recipe: recipe})}>
          <View style={styles.listItemStyle} key={index}>
            <Image style={styles.image} source={{uri: recipe.imagePath}} />
            <View style={styles.recipeHeader}>
              <Text style={styles.recipeName}>{recipe.title}</Text>
              <TouchableOpacity onPress={() => handleUnFavorite(index)}>
                <Text>unFavorite</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.recipeDescription}>{recipe.description}</Text>
            <View style={styles.ratingContainer}></View>
          </View>
        </TouchableOpacity>
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
