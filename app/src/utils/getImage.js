/**
 * Function to convert an image from an array of bits to an image for display
 * @param {string} image
 * @param {string} type
 * @returns objectURL
 */
export const getImage = (image, type) => {
    const imageBlob = new Blob([new Uint8Array(image.data)], {type: type});
    return URL.createObjectURL(imageBlob);
}