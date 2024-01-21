const { Storage } = require('@google-cloud/storage');
const path = require('path');


// Replace 'YOUR_PROJECT_ID' and 'YOUR_KEYFILE.json' with your actual project ID and key file
const projectId = 'decoded-pride-405106';
const keyFilename = 'serviceKey.json';

// Create a new instance of the Storage class
const storage = new Storage({
  projectId,
  keyFilename,
});

// Replace 'your-bucket-name' with your actual bucket name
const bucketName = 'sparsh-upload-store-3435';



// Upload the image to Google Cloud Storage
async function uploadImage(filePath , remoteFileName) {
  try {
    await storage.bucket(bucketName).upload(filePath, {
      destination: remoteFileName,
    });

    console.log(`Image uploaded to: gs://${bucketName}/${remoteFileName}`);
  } catch (err) {
    console.error('Error uploading image:', err);
  }
}


module.exports = {uploadImage}