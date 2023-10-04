import React, {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import HomeScreen from './components/HomeScreen';
import FavoScreen from './components/FavoScreen';
import AddRecipeScreen from "./components/AddRecipeScreen";
import RecipeScreen from './components/RecipeScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  const [recipeList, setRecipeList] = useState([]);
  const [favoriteList, setFavoriteList] = useState([]);

  const addRecipe = recipe => {
    setRecipeList([...recipeList, recipe]);
  };

  const fetchRecipes = async () => {
    try {
      const response = await fetch(
        'https://20231004t113619-dot-crossplatform247-397411.ew.r.appspot.com/rest/recipeservice/readallrecipes',
      );
      const data = await response.json();
      setRecipeList(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const RenderRecipeScreen = ({ navigation, route }) => (
    <RecipeScreen
      navigation={navigation}
      route={route}
      recipeList={recipeList}
      setRecipeList={setRecipeList}
      favoriteList={favoriteList}
      setFavoriteList={setFavoriteList}
    />
  );

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" options={{title: 'Flavor Folio'}}>
            {props => (
              <HomeScreen
                {...props}
                recipeList={recipeList}
                setRecipeList={setRecipeList}
                favoriteList={favoriteList}
                setFavoriteList={setFavoriteList}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Favorites" options={{title: 'Favorites'}}>
            {props => (
              <FavoScreen
                {...props}
                favoriteList={favoriteList}
                setFavoriteList={setFavoriteList}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="Recipe"
            options={{ title: 'Recipe' }}
            component={RenderRecipeScreen}
          />
          <Stack.Screen name="AddRecipe" component={AddRecipeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
