import express from "express";
import bodyParser from "body-parser";
import { filterImageFromURL, deleteLocalFiles } from "./util/util.js";

// Init the Express application
const app = express();

// Set the network port
const port = process.env.PORT || 8083;

// Use the body parser middleware
app.use(bodyParser.json());

/**
 * GET /filteredimage?image_url={{URL}}
 */
app.get("/filteredimage", async (req, res) => {
  console.log("GET /filteredimage called");

  const imageUrl = req.query.image_url;

  console.log("image_url:", imageUrl);

  // Validate query parameter
  if (!imageUrl) {
    console.log("Missing image_url parameter");

    return res.status(400).json({
      html_code: "400",
      message: "image_url query parameter is required",
    });
  }

  try {
    console.log("Calling filterImageFromURL");

    // Filter the image
    const filteredPath = await filterImageFromURL(imageUrl);

    console.log("Filtered image created:", filteredPath);

    // Send filtered image
    res.sendFile(filteredPath, () => {
      console.log("Image sent to client");

      deleteLocalFiles([filteredPath]);
    });
  } catch (error) {
    console.error("Filtering failed:", error);

    return res.status(422).json({
      html_code: "422",
      message: "Unable to process image",
    });
  }
});

// Root Endpoint
app.get("/", (req, res) => {
  res.json({
    html_code: "200",
    message: "Try GET /filteredimage?image_url={{URL}}",
  });
});

// Start the Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  console.log("Press CTRL+C to stop server");
});