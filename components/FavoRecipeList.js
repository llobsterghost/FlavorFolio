import React, { useState } from "react";
import { Text, View, ScrollView, StyleSheet, TouchableOpacity, Image } from "react-native";

const FavoRecipeList = (props) => {
  const { favoriteList, setFavoriteList, navigation } = props;

  const handleUnFavorite = (index) => {
    const newFavoriteList = [...props.favoriteList];
    newFavoriteList.splice(index, 1);
    props.setFavoriteList(newFavoriteList);
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substr(0, maxLength - 3) + "...";
    }
    return text;
  };

  return (
    <ScrollView style={styles.scrollviewstyle}>
      {favoriteList.map((recipe, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => props.navigation.navigate('Recipe', { recipe: recipe })}>
          <View style={styles.listItemStyle} key={index}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={{ uri: `data:image/png;base64,${recipe.image}` }}
              />
            </View>
            <View style={styles.textContainer}>
              <View style={styles.recipeHeader}>
                <Text style={styles.recipeName}>
                  {truncateText(recipe.title, 20)}
                </Text>
                <TouchableOpacity onPress={() => handleUnFavorite(index)}>
                  <Image
                    source={require("../assets/icons/Favourite-checked.png")}
                    style={styles.imagechecked}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.recipeDescription}>
                {recipe.description}
              </Text>
            </View>
            <View style={styles.ratingContainer}></View>
          </View>
        </TouchableOpacity>
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
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#CCC",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#F8F8F8",
    elevation: 5,
    overflow: "hidden",
  },
  imageContainer: {
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  contentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  recipeName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  recipeDescription: {
    fontSize: 12,
    marginBottom: 5,
  },
  image: {
    width: 90,
    height: 90,
  },
  imagechecked: {
    width: 35,
    height: 35,
  },
  recipeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default FavoRecipeList;
