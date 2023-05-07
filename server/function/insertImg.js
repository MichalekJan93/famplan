const fs = require("fs");

const insertImg = () => {
    const imageData = fs.readFileSync('../app/src/assets/images/userIcon/icon-user-fox.png');
    const newImage = new Image({
        name: "userIcon",
        data: imageData
    })
    return newImage;
}

module.exports = insertImg;