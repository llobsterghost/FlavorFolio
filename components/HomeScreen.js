import React from 'react';
import { Button, StyleSheet, Text, TextInput, View, ScrollView} from 'react-native';

const HomeScreen = (props) => {
    const { recipeList } = props;
  
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text>Drawer icon</Text>
          <Text style={styles.title}>Flavor Folio</Text>
          <Button title="Add recipe" onPress={() => props.navigation.navigate('AddRecipe')} />
        </View>
        <TextInput style={styles.input} placeholder="Search" />
  
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
        marginBottom: 20,
        padding: 20,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: '100%',
        padding: 10,
        marginBottom: 20,
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
    },
    listItemStyle: {
        padding: 10,
        backgroundColor: '#ccc',
        marginBottom: 10,
    },
    scrollviewstyle: {
        width: '100%',
    },
})

export default HomeScreen