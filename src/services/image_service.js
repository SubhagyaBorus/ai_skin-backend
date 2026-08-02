const axios = require("axios");

async function imageToBase64FromUrl(imageUrl) {
  const response = await axios.get(imageUrl, {
    responseType: "arraybuffer",
  });

  return Buffer.from(response.data).toString("base64");
}

module.exports = { imageToBase64FromUrl };