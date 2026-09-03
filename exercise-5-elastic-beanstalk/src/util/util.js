import fs from "fs";
import Jimp from "jimp";
import axios from "axios";

// filterImageFromURL
export async function filterImageFromURL(inputURL) {
  try {
    console.log("INPUT URL:", inputURL);

    // Download image as binary data
    const response = await axios.get(inputURL, {
      responseType: "arraybuffer",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0 Safari/537.36"
      }
    });

    console.log("IMAGE DOWNLOADED");

    // Read image from downloaded buffer
    const photo = await Jimp.read(Buffer.from(response.data));

    console.log("IMAGE READ SUCCESS");

    const outpath =
      "/tmp/filtered." + Math.floor(Math.random() * 2000) + ".jpg";

    await photo
      .resize(256, 256)
      .quality(60)
      .greyscale()
      .writeAsync(outpath);

    console.log("FILTERED IMAGE WRITTEN:", outpath);

    return outpath;
  } catch (error) {
    console.error("FILTER ERROR:", error);
    throw error;
  }
}

// deleteLocalFiles
export async function deleteLocalFiles(files) {
  for (let file of files) {
    fs.unlinkSync(file);
  }
}
