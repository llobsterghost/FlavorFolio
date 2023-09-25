import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './components/HomeScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  const [recipeList, setRecipeList] = useState([]);

  const addRecipe = (recipe) => {
    setRecipeList([...recipeList, recipe]);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" options={{ title: 'Flavor Folio' }}>
          {(props) => <HomeScreen {...props} recipeList={recipeList} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
