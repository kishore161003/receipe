const { generateReactHelpers } = require("@uploadthing/react/hooks");

// Importing the type from the JavaScript file
const { OurFileRouter } = require("../app/api/uploadthing/core");

// Destructuring the generated helpers
const { useUploadThing, uploadFiles } = generateReactHelpers(OurFileRouter);

// Exporting the helpers
module.exports = {
  useUploadThing,
  uploadFiles,
};

// If you want to use it in another file
// const { useUploadThing, uploadFiles } = require('./path/to/your/file');
// console.log(useUploadThing, uploadFiles);
