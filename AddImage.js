const fs = require('fs');
const axios = require('axios');

const recipeId = '9';
const apiUrl = `https://20231003t114700-dot-crossplatform247-397411.ew.r.appspot.com/rest/recipeservice/insertimage/${recipeId}`;

const imageFilePath = 'assets/images/chocolate_fondue.png';
const imageBuffer = fs.readFileSync(imageFilePath);

// Make the POST request using axios
axios({
    method: 'post',
    url: apiUrl,
    data: imageBuffer,
    headers: {
        'Content-Type': 'application/octet-stream',
    },
})
.then(response => {
    console.log(response.data);
})
.catch(error => {
    console.error(error);
});
