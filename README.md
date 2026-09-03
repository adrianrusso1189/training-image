# Training Image Processing Service

This repository contains a Node.js image-processing service built for a cloud deployment exercise. The application downloads an image from a URL, applies a grayscale resize filter, and returns the filtered result through a RESTful endpoint. The project was also deployed to AWS Elastic Beanstalk and validated with local and cloud API checks.

## Overview

The service is designed to:

- accept an image URL as input
- fetch and process the image server-side
- return a filtered version of the image
- handle invalid requests with appropriate HTTP error responses
- deploy cleanly to AWS Elastic Beanstalk using the Elastic Beanstalk CLI

This repository includes the application code, deployment assets, and screenshot evidence used to document the deployment process.

## Project Structure

```text
training-imageprocessing/
├── README.md
├── deployment_screenshot/
│   └── Screenshot 2026-09-03 155339.png
├── adrianrusso_imageexercise.docx
├── deployment.tar.gz
├── filtered.jpg
├── package-lock.json
├── exercise-5-elastic-beanstalk/
│   ├── README.md
│   ├── package.json
│   ├── package-lock.json
│   ├── src/
│   │   ├── server.js
│   │   ├── util/
│   │   │   └── util.js
│   │   ├── routes/
│   │   │   └── imageRoutes.js
│   │   └── middleware/
│   │       └── uploadImageToS3Middleware.js
│   ├── prisma/
│   ├── test.js
│   ├── test-local.js
│   ├── filtered.jpg
│   └── puppy.jpeg
├── .elasticbeanstalk/
│   └── config.yml
└── .github/
```

## Tech Stack

- Node.js
- Express.js
- Jimp for image processing
- Axios for remote image retrieval
- AWS Elastic Beanstalk
- AWS S3 integration for image upload support
- Prisma (included for the broader exercise setup)

## Local Setup

From the project directory:

```bash
npm install
```

For the service application in `exercise-5-elastic-beanstalk/`:

```bash
cd exercise-5-elastic-beanstalk
npm install
npm run dev
```

The server is configured to start on port `8083` by default unless `PORT` is set in the environment.

## Running the Application

Start the service:

```bash
cd exercise-5-elastic-beanstalk
npm run dev
```

The app exposes the following root-level response:

```http
GET /
```

Example response:

```json
{
  "html_code": "200",
  "message": "Try GET /filteredimage?image_url={{URL}}"
}
```

## API Endpoint

### GET /filteredimage

This endpoint accepts a valid remote image URL and returns a filtered image.

```http
GET /filteredimage?image_url=https://example.com/image.jpg
```

### Success behavior

- returns HTTP `200`
- sends the processed filtered image as the response body
- cleans up the generated temporary file after sending

### Validation behavior

If the `image_url` query parameter is missing or invalid, the service returns an HTTP `400` or `422` error with a JSON message.

Example invalid request:

```http
GET /filteredimage
```

Example error response:

```json
{
  "html_code": "400",
  "message": "image_url query parameter is required"
}
```

## Image Processing Logic

The application uses Jimp to:

- download the source image
- resize it to a fixed dimension
- apply a grayscale filter
- reduce image quality
- save the filtered output to a temporary file

This service is intentionally lightweight and resource-oriented, making it suitable for image processing demos and cloud deployment validation.

## AWS Elastic Beanstalk Deployment

The project was configured for AWS Elastic Beanstalk deployment using the EB CLI workflow:

```bash
eb init
eb create
eb deploy
```

The deployment is intended to expose a public environment URL similar to:

```text
http://<your-environment-name>.us-east-1.elasticbeanstalk.com/filteredimage?image_url=https://upload.wikimedia.org/wikipedia/commons/b/bd/Golden_tabby_and_white_kitten_n01.jpg
```

## Screenshot Evidence

The repository includes deployment evidence under `deployment_screenshot/` and the assignment document `adrianrusso_imageexercise.docx` covering:

- local service startup without errors
- successful local GET requests
- invalid request handling with HTTP error status
- EB CLI deployment evidence
- Elastic Beanstalk dashboard confirmation
- functional cloud endpoint validation

> Note for reviewers: please refer to the Word document `adrianrusso_imageexercise.docx` in the repository root for the full assignment brief, requirement mapping, and screenshot evidence documentation.

## Notes

- The project is structured as a training exercise and demonstration app.
- The source code for the core service is in `exercise-5-elastic-beanstalk/src/`.
- The root of the repository is mainly used to collect deployment evidence and project-level documentation.

## Example Usage

```bash
curl "http://localhost:8083/filteredimage?image_url=https://upload.wikimedia.org/wikipedia/commons/b/bd/Golden_tabby_and_white_kitten_n01.jpg" --output filtered-output.jpg
```

If you are deploying to Elastic Beanstalk, replace `localhost:8083` with the deployed environment URL.

## License

This repository is provided for educational and exercise purposes.
