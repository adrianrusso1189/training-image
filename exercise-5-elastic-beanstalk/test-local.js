import Jimp from "jimp";

try {
  const photo = await Jimp.read("./test.jpg");
  console.log("SUCCESS");
  console.log(photo.getWidth(), photo.getHeight());
} catch (err) {
  console.error(err);
}