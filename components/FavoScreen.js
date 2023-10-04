import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import FavoRecipeList from './FavoRecipeList';

const FavoScreen = props => {
  const {favoriteList, setFavoriteList} = props;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.yourfavoriteIcon} source={require('../assets/icons/YourFavoritesIcon.png')} />
        <Image style={styles.logo} source={require('../assets/icons/FlavorFolioSmallIcon.png')} />
      </View>
     <FavoRecipeList favoriteList={favoriteList} setFavoriteList={setFavoriteList} navigation={props.navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    position: 'relative',
  },
  logo: {
    width: 40,
    height: 50,
    position: 'absolute',
    top: 20,
    right: 20,
  },
  yourfavoriteIcon:{
    width: 250,
    height: 40,
    marginTop: 5,
  },
});

export default FavoScreen;
