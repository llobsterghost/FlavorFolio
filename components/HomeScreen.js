import React, {useCallback, useEffect} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import RecipeList from './RecipeList';

const HomeScreen = props => {
  const {recipeList, setRecipeList, favoriteList, setFavoriteList, URL} = props;
  const [text, setText] = React.useState('');
  const textInputHandler = enteredText => {
    setText(enteredText);
  };

  const refreshOnFocus = useCallback(() => {
    handleRefresh();
  }, []);

  useEffect(() => {
    const focusListener = props.navigation.addListener('focus', refreshOnFocus);
  }, [refreshOnFocus]);

  const handleRefresh = async () => {
    try {
      const response = await fetch(URL + "readallrecipes");
      const data = await response.json();
      setRecipeList(data);
    } catch (error) {
      console.error(error);
    }
  };

  const searchFilterFunction = recipe => {
    const searchText = text.toLowerCase();
    return recipe.title.toLowerCase().includes(searchText);
  };

  const filteredRecipeList = recipeList.filter(searchFilterFunction);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Favorites')}>
          <Image
            style={styles.iconFavorites}
            source={require('../assets/icons/IconFavoritePage.png')}
          />
        </TouchableOpacity>
        <Image
          style={styles.logo}
          source={require('../assets/icons/FlavorFolioIcon.png')}
        />
        <TouchableOpacity
          onPress={() => props.navigation.navigate("AddRecipe", {URL: URL})}>
          <Image
            style={styles.iconAdd}
            source={require('../assets/icons/IconAddPage.png')}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.backgroundInputField}>
        <View style={styles.iconContainer}>
          <Image
            style={styles.iconSearch}
            source={require('../assets/icons/IconSearch.png')}
          />
        </View>
        <TextInput
          style={styles.input}
          onChangeText={textInputHandler}
          value={text}
          placeholder="Search for recipes..."
        />
        <TouchableOpacity onPress={handleRefresh}>
        <Image
          style={styles.iconRefresh}
          source={require('../assets/icons/refresh.png')}
        />
      </TouchableOpacity>
      </View>

      <RecipeList
        navigation={props.navigation}
        recipeList={recipeList}
        setRecipeList={setRecipeList}
        favoriteList={favoriteList}
        setFavoriteList={setFavoriteList}
        filteredRecipeList={filteredRecipeList}
        URL={URL}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#dadada',
    borderRadius: 25,
    padding: 10,
    width: 315,
    height: 50,
    backgroundColor: '#F9F9F9',
    flexShrink: 0,
    marginRight: 5,
  },
  button: {
    width: '100%',
    padding: 10,
    backgroundColor: 'blue',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  listStyle: {
    width: '100%',
    flex: 1,
    backgroundColor: '#ccc',
  },
  listItemStyle: {
    padding: 10,
    backgroundColor: '#ccc',
    marginBottom: 10,
  },
  scrollviewstyle: {
    width: '100%',
  },
  logo: {
    width: 160,
    height: 80,
  },
  iconFavorites: {
    width: 60,
    height: 60,
  },
  iconAdd: {
    width: 60,
    height: 60,
  },
  iconSearch: {
    width: 30,
    height: 30,
    flexShrink: 0,
  },
  backgroundInputField: {
    width: 360,
    height: 60,
    flexShrink: 0,
    backgroundColor: '#E6E6E6',
    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
    borderRadius: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginLeft: 10,
    marginRight: 5,
  },
  iconRefresh: {
    width: 25,
    height: 25,
    flexShrink: 0,
    marginRight: 10,
  },
});

export default HomeScreen;
