import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './components/HomeScreen';
import FavoScreen from './components/FavoScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  const [recipeList, setRecipeList] = useState([]);
  const [favoriteList, setFavoriteList] = useState([]);

  const addRecipe = (recipe) => {
    setRecipeList([...recipeList, recipe]);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" options={{ title: 'Flavor Folio' }}>
          {(props) => <HomeScreen {...props} recipeList={recipeList} favoriteList={favoriteList} setFavoriteList={setFavoriteList} />}
        </Stack.Screen>
        <Stack.Screen name="Favorites" options={{ title: 'Favorites' }}>
          {(props) => <FavoScreen {...props} favoriteList={favoriteList} setFavoriteList={setFavoriteList} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
