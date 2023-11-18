const { createUploadthing } = require("uploadthing/next");

const f = createUploadthing();

export const ourFileRouter = {
  media: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async ({ req }) => {
      return { userId: 1 };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.url);
    }),
};

module.exports = {
  ourFileRouter,
};
