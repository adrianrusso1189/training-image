// test-jimp.js

import Jimp from "jimp";

try {
  console.log("Starting test");

  const photo = await Jimp.read(
    "https://upload.wikimedia.org/wikipedia/commons/b/bd/Golden_tabby_and_white_kitten_n01.jpg"
  );

  console.log("SUCCESS");
  console.log(photo.getWidth(), photo.getHeight());

} catch (err) {
  console.error(err);
}