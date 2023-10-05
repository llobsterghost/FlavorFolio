import { is } from '@babel/types';
import React, {useState} from 'react';
import {StyleSheet, View, Image, Text, Button} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import StarRating from 'react-native-star-rating-widget';

const RecipeScreen = props => {
  const { recipe } = props.route.params;
  const { URL } = props.route.params;
  const [count, setCount] = useState(0);

  const isEdit = true;

  const handleCookedPress = () => {
    setCount(count + 1);
  };

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
              source={{ uri: `data:image/png;base64,${recipe.image}` }}
            />
          </View>

          <View style={styles.ratingContainer}>
            <Text style={styles.recipeDescription}>{recipe.description}</Text>
            <View style={styles.ratingContainer}>
              <StarRating rating={recipe.stars} onChange={() => {}}/>
            </View>
          </View>

          <View style={styles.cookedContainer}>
            <Text style={styles.cookedText}>
              How many times have you cooked this meal?
            </Text>
            <View class={styles.row}>
            <Text style={styles.cookedCount}>{count}</Text>
            <Button title="Cooked" onPress={handleCookedPress} />
            </View>
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.timeContainer}>
              <Image
                style={styles.timeIcon}
                source={require('../assets/icons/time.png')}
              />
              <Text style={styles.timeText}>Prep: {recipe.preptime}</Text>
              <Text style={styles.timeText}>Cook: {recipe.cooktime}</Text>
            </View>

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

          <View style={styles.ingridientsContainer}>
            <Text style={styles.ingridientsText}>Ingredients</Text>
            <Text style={styles.recipeIngredients}>{recipe.ingredients}</Text>
          </View>

          <View style={styles.instructionsContainer}>
            <Text style={styles.instructionsText}>How to cook</Text>
            <Text style={styles.recipeInstructions}>{recipe.preparation}</Text>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title="Edit"
              onPress={() =>
                props.navigation.navigate('AddRecipe', {recipe: recipe, isEdit: isEdit, URL: URL})
              }
            />
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
    alignItems: "center",
    marginBottom: 10,
  },
  infoContainer: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  cookedContainer: {
    alignItems: "center",
    marginBottom: 10,
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
  recipeIngredients: {
    fontSize: 18,
    marginBottom: 10,
  },
  recipeInstructions: {
    fontSize: 18,
    marginBottom: 10,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  timeIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  timeText: {
    fontSize: 18,
    marginRight: 10,
  },
  levelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  levelIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  levelText: {
    fontSize: 18,
    marginRight: 10,
  },
  typeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  typeIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  typeText: {
    fontSize: 18,
    marginRight: 10,
  },
  ingridientsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  ingridientsText: {
    fontSize: 18,
    marginRight: 10,
  },
  instructionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  instructionsText: {
    fontSize: 18,
    marginRight: 10,
  },
  buttonContainer: {
    width: "100%",
    padding: 10,
    backgroundColor: "blue",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
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
    marginBottom: 10,
  },
});

export default RecipeScreen;
