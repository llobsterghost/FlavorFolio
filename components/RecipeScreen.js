import React, { useState } from "react";
import { StyleSheet, View, Image, Text, Button, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import StarRating from "react-native-star-rating-widget";


const RecipeScreen = props => {
  const { recipe } = props.route.params;
  const { URL } = props.route.params;
  const [count, setCount] = useState(0);

  const isEdit = true;

  const handleCookedPress = () => {
    setCount(count + 1);
  };

  const imageData = recipe.image;
  const dataUri = `data:image/png;base64,${imageData}`;

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollviewstyle}>
        {/*<View style={styles.header}>*/}
        {/*  <Image*/}
        {/*    style={styles.logo}*/}
        {/*    source={require('../assets/icons/FlavorFolioSmallIcon.png')}*/}
        {/*  />*/}
        {/*</View>*/}
        <View style={styles.recipeContainer}>
          <Text style={styles.recipeName}>{recipe.title}</Text>

          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{ uri: dataUri }}
            />
          </View>
          <Text style={styles.recipeDescription}>{recipe.description}</Text>

          <View style={styles.ratingContainer}>
            <StarRating rating={recipe.stars} onChange={() => {
            }} />
          </View>

          <View style={styles.cookedContainer}>
            <Text style={styles.cookedText}>
              How many times have you cooked this meal?
            </Text>
            <View style={styles.row}>
              <View style={styles.row}>
                <Text style={styles.cookedCount}>{count}</Text>
                <Button title="Cooked" onPress={handleCookedPress} />
              </View>
            </View>
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.timeContainer}>
              <Image
                style={styles.timeIcon}
                source={require("../assets/icons/time.png")}
              />
              <View>
                <Text style={styles.timeText}>Prep: {recipe.preptime}</Text>
                <Text style={styles.timeText}>Cook: {recipe.cooktime}</Text>
              </View>
            </View>

            <View style={styles.levelTypeContainer}>
              <View style={styles.levelContainer}>
                <Image
                  style={styles.levelIcon}
                  source={require("../assets/icons/level.png")}
                />
                <Text style={styles.levelText}>{recipe.difficultyLevel}</Text>
              </View>

              <View style={styles.typeContainer}>
                <Image
                  style={styles.typeIcon}
                  source={require("../assets/icons/type.png")}
                />
                <Text style={styles.typeText}>{recipe.type}</Text>
              </View>
            </View>
          </View>

          <View style={styles.ingridientsContainer}>
            <Text style={styles.ingridientsText}>Ingredients</Text>
            <Text style={styles.recipeIngredients}>{recipe.ingredients}</Text>
          </View>

          <View style={styles.instructionsContainer}>
            <Text style={styles.instructionsText}>How to cook</Text>
            <Text style={styles.recipeInstructions}>{recipe.preparation}</Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.customButton}
              onPress={() => props.navigation.navigate("AddRecipe", { recipe: recipe, isEdit: isEdit, URL: URL, image: dataUri })}
            >
              <Text style={styles.buttonText}>Edit Recipe</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  logo: {
    width: 50,
    height: 70,
  },
  recipeContainer: {
    padding: 20,
  },
  recipeName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    alignSelf: "center",
  },
  recipeDescription: {
    fontSize: 15,
    marginTop: 10,
  },

  ratingContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 10,
  },
  cookedContainer: {
    marginTop: 10,
  },
  cookedText: {
    fontSize: 15,
    marginRight: 10,
  },
  cookedCount: {
    fontSize: 18,
    marginRight: 10,
    fontWeight: "bold",
  },

  infoContainer: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  levelTypeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  recipeIngredients: {
    fontSize: 16,
    marginBottom: 10,
  },
  recipeInstructions: {
    fontSize: 16,
    marginBottom: 10,
  },
  timeIcon: {
    width: 35,
    height: 35,
    marginRight: 10,
  },
  timeText: {
    fontSize: 15,
    marginRight: 10,
  },
  levelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  levelIcon: {
    width: 35,
    height: 35,
    marginRight: 10,
  },
  levelText: {
    fontSize: 15,
    marginRight: 20,
  },
  typeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  typeIcon: {
    width: 35,
    height: 35,
    marginRight: 10,
  },
  typeText: {
    fontSize: 15,
    marginRight: 5,
  },
  ingridientsContainer: {
    marginTop: 20,
  },
  ingridientsText: {
    fontSize: 18,
    marginRight: 10,
    fontWeight: "bold",
    marginBottom: 5,
  },
  instructionsContainer: {
    marginTop: 20,
  },
  instructionsText: {
    fontSize: 18,
    marginRight: 10,
    fontWeight: "bold",
    marginBottom: 5,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  customButton: {
    borderWidth: 2,
    borderColor: "#CCC",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#F8F8F8", // Hintergrundfarbe des Buttons
    elevation: 5,
    overflow: "hidden",
  },
  buttonText: {
    color: "#7c7b7b",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  imageContainer: {
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 300,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default RecipeScreen;
