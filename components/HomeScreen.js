import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Image,
} from 'react-native';

const HomeScreen = props => {
  const {recipeList} = props;
  const [text, setText] = React.useState('');
  const textInputHandler = enteredText => {
    setText(enteredText);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
        style={styles.logo}
         source={require('../assets/images/FlavorFolioIcon.png')} 
         />
        <Button
          title="Add recipe"
          onPress={() => props.navigation.navigate('AddRecipe')}
        />
      </View>
        <TextInput
            style={styles.input}
            onChangeText={textInputHandler}
            value={text}
            placeholder="Search"
        />

      <View style={styles.listStyle}>
        <ScrollView style={styles.scrollviewstyle}>
          {recipeList.map((item, index) => {
            return (
              <View style={styles.listItemStyle} key={index}>
                <Text>
                  {index}: {item}
                </Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
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
    justifyContent: "space-between",
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#fff',
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
    backgroundColor : '#ccc',
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
});

export default HomeScreen;
