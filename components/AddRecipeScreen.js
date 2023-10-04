import React, {useState, useEffect} from 'react';
import {Picker} from '@react-native-picker/picker';

import {
  Text,
  Button,
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  Image,
  PermissionsAndroid,
  Platform,
  Alert,
} from 'react-native';

import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import StarRating from 'react-native-star-rating-widget';

const AddRecipeScreen = props => {
  const recipe = props.route?.params?.recipe;

  const [recipeName, setRecipeName] = useState(recipe ? recipe.name : '');
  const [recipeDescription, setRecipeDescription] = useState(
    recipe ? recipe.description : '',
  );
  const [ingredients, setIngredients] = useState(
    recipe ? recipe.ingredients.join('\n') : '',
  );
  const [howToCook, setHowToCook] = useState(
    recipe ? recipe.howToCook.join('\n') : '',
  );
  const [selectedImage, setSelectedImage] = useState(
    recipe ? recipe.image : null,
  );

  const [level, setLevel] = useState(recipe ? recipe.level : 'easy');
  const [type, setType] = useState(recipe ? recipe.type : 'Pre-meal');
  const [cookTime, setCookTime] = useState(recipe ? recipe.cookTime : '');
  const [rating, setRating] = useState(recipe ? recipe.rating : 0);

  const timeIcon = require('../assets/icons/time.png');
  const levelIcon = require('../assets/icons/level.png');
  const typeIcon = require('../assets/icons/type.png');

  const handleLevelChange = value => {
    setLevel(value);
  };

  const handleTypeChange = value => {
    setType(value);
  };

  const handleRatingChange = rating => {
    setRating(rating);
  };

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const cameraPermission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'App Camera Permission',
            message: 'App needs access to your camera',
          },
        );

        const storagePermission = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        ]);

        if (
          cameraPermission === PermissionsAndroid.RESULTS.GRANTED &&
          storagePermission['android.permission.WRITE_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          storagePermission['android.permission.READ_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('Camera and storage permissions granted');
        } else {
          console.log('Permissions denied');
          // You can display an error message to the user if permissions are denied.
          Alert.alert(
            'Permissions Denied',
            'Please allow camera and storage permissions to use this feature.',
          );
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  // Request permissions when the component mounts
  useEffect(() => {
    requestPermissions();
  }, []);

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
        // Display an error message to the user
        Alert.alert(
          'Image Picker Error',
          'There was an error while picking an image. Please try again.',
        );
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage(imageUri);
      }
    });
  };

  const handleCameraLaunch = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.error) {
        console.log('Camera error: ', response.error);
        // Display an error message to the user
        Alert.alert(
          'Camera Error',
          'There was an error while opening the camera. Please try again.',
        );
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage(imageUri);
      }
    });
  };

  const handleSave = async () => {
    // Convert the selected image to byte[] format
    let imageBytes = null;
    if (selectedImage) {
      try {
        const response = await fetch(selectedImage);
        const blob = await response.blob();
        imageBytes = await blobToBase64(blob);
      } catch (error) {
        console.error('Error converting image to byte[]:', error);
        // Handle the error accordingly
      }
    }

    // Prepare the recipe object to be sent to the REST endpoint
    const recipeData = {
      title: recipeName,
      description: recipeDescription,
      image: imageBytes,
      stars: rating,
      preptime: cookTime,
      difficultyLevel: level,
      ingredients: ingredients,
      preparation: howToCook,
    };

    try {
      // Make a POST request to the REST endpoint
      const response = await fetch('https://20231003t155003-dot-crossplatform247-397411.ew.r.appspot.com/rest/recipeservice/addrecipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipeData),
      });

      if (response.ok) {
        console.log('Recipe saved successfully');

      } else {
        // Log the response code
        console.error('Response code:', response.status);
        // Log the response data (if available)
        response.text().then((responseData) => {
          console.error('Response data:', responseData);
          // TODO: You can also alert the user here with responseData
        });
        console.error('Failed to save recipe');
        // TODO: alert to user that recipe was not saved
      }
    } catch (error) {
      console.error('Error saving recipe:', error);
      // TODO: alert to user that recipe was not saved
    }
  };

  const blobToBase64 = async (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(',')[1];
        resolve(base64String);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Add Recipe</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Recipe Name"
        value={recipeName}
        onChangeText={text => setRecipeName(text)}
      />
      <View style={{flex: 1, justifyContent: 'center'}}>
        {selectedImage ? (
          <Image
            source={{uri: selectedImage}}
            style={styles.image} // Adjust image dimensions as needed
            resizeMode="contain"
          />
        ) : (
          <View style={styles.placeholderContainer}>
            <Text style={styles.placeholderText}>No Image Selected</Text>
          </View>
        )}
        <View style={{marginTop: 20}}>
          <Button title="Choose from Device" onPress={openImagePicker} />
        </View>
        <View style={{marginTop: 20, marginBottom: 50}}>
          <Button title="Open Camera" onPress={handleCameraLaunch} />
        </View>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Description"
        multiline={true}
        numberOfLines={4}
        value={recipeDescription}
        onChangeText={text => setRecipeDescription(text)}
      />
      <View style={styles.inputGroup}>
        <Image source={timeIcon} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Cook Time (minutes)"
          keyboardType="numeric"
          value={cookTime}
          onChangeText={text => setCookTime(text)}
        />
      </View>
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>Rate this recipe:</Text>
        <StarRating rating={rating} onChange={setRating} />
      </View>
      <View style={styles.inputGroup}>
        <Image source={levelIcon} style={styles.icon} />
        <Picker
          selectedValue={level}
          style={styles.levelPicker}
          onValueChange={handleLevelChange}>
          <Picker.Item label="Easy" value="easy" />
          <Picker.Item label="Medium" value="medium" />
          <Picker.Item label="Hard" value="hard" />
        </Picker>
      </View>
      <View style={styles.inputGroup}>
        <Image source={typeIcon} style={styles.icon} />
        <Picker
          selectedValue={type}
          style={styles.typePicker}
          onValueChange={handleTypeChange}>
          <Picker.Item label="Pre-meal" value="pre-meal" />
          <Picker.Item label="Main spit" value="main spit" />
          <Picker.Item label="Dessert" value="dessert" />
        </Picker>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Ingredients"
        multiline={true}
        numberOfLines={4}
        value={ingredients}
        onChangeText={text => setIngredients(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="How to cook"
        multiline={true}
        numberOfLines={4}
        value={howToCook}
        onChangeText={text => setHowToCook(text)}
      />

      <Button title="Save" onPress={handleSave} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // Make the content take as much space as needed
    backgroundColor: '#fff',
    padding: 20,
  },
  scrollViewStyle: {
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
  headerText: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 8,
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  placeholderContainer: {
    width: '100%',
    height: 200,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  placeholderText: {
    fontSize: 16,
    color: '#555',
  },
  selectImageButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  selectImageText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  ratingContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  ratingText: {
    fontSize: 18,
    marginBottom: 10,
  },
  starStyle: {
    marginRight: 5,
  },

  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
    marginBottom: 16,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },

  levelPicker: {
    width: 200,
    height: 44,
    backgroundColor: '#FFF',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 10,
  },
  typePicker: {
    width: 200,
    height: 44,
    backgroundColor: '#FFF',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  saveCancelButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddRecipeScreen;
