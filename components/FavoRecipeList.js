import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

const FavoRecipeList = props => {
  const { favoriteList, setFavoriteList } = props;



  const handleUnFavorite = index => {
    const newFavoriteList = [...props.favoriteList];
    newFavoriteList.splice(index, 1);
    props.setFavoriteList(newFavoriteList);
  };

  return (
    <ScrollView style={styles.scrollviewstyle}>
      {favoriteList.map((recipe, index) => (
        <View style={styles.listItemStyle} key={index}>
          <Image style={styles.image} source={{ uri: recipe.imagePath }} />
          <View style={styles.recipeHeader}>
            <Text style={styles.recipeName}>{recipe.title}</Text>
            <TouchableOpacity onPress={() => handleUnFavorite(index)}>
              <Image
                source={require("../assets/icons/Favourite-checked.png")}
                style={styles.imagechecked}
              />
            </TouchableOpacity>

          </View>
          <Text style={styles.recipeDescription}>{recipe.description}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollviewstyle: {
    width: "100%",
    padding: 15,
    backgroundColor: "#FFF",
  },
  listItemStyle: {
    borderWidth: 2,
    borderColor: "#CCC",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#F8F8F8",
    elevation: 5,
    overflow: "hidden",
  },
  recipeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  recipeName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  recipeDescription: {
    fontSize: 12,
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  imagechecked: {
    width: 35,
    height: 35,
  },
});

export default FavoRecipeList;
