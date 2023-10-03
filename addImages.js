const fs = require('fs');
const axios = require('axios');

// Replace with the actual URL of your REST service, including the recipeId as a path parameter
const recipeId = '9'; // Replace with the actual recipe ID
const apiUrl = `https://20231003t114700-dot-crossplatform247-397411.ew.r.appspot.com/rest/recipeservice/insertimage/${recipeId}`;

// Replace 'imageFilePath' with the path to your image file
const imageFilePath = 'assets/images/chocolate_fondue.png';
// Read the image file as a buffer
const imageBuffer = fs.readFileSync(imageFilePath);

// Make the POST request using axios
axios({
    method: 'post',
    url: apiUrl,
    data: imageBuffer, // Send the image buffer directly
    headers: {
        'Content-Type': 'application/octet-stream', // Set the content type to application/octet-stream
        // You may need to set additional headers based on your server's requirements
    },
})
    .then(response => {
        console.log(response.data); // Log the response from the server
    })
    .catch(error => {
        console.error(error); // Handle any errors that occur during the request
    });
