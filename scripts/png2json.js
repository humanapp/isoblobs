const jimp = require("jimp");
const fs = require("fs");

const png2json = async (pngPath, jsonPath) => {
  const image = await jimp.read(pngPath);
  const width = image.bitmap.width;
  const height = image.bitmap.height;
  const pixels = image.bitmap.data;

  // Reformat the pixel data to an array of RGBA values
  const pixelArray = [];
  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    const a = pixels[i + 3];
    pixelArray.push({ r, g, b, a });
  }
  
  // Write image contents to a json file
  const json = {
    width,
    height,
    pixels: Array.from(pixelArray),
  };
  fs.writeFileSync(jsonPath, JSON.stringify(json));
};

// Command line interface
const args = process.argv.slice(2);
const [pngPath, jsonPath] = args;
png2json(pngPath, jsonPath)
  .then(() => {
    console.log("PNG to JSON conversion successful");
  })
  .catch((error) => {
    console.error("PNG to JSON conversion failed:", error);
  });
