import imageCompression from 'browser-image-compression';

class ImageModel {
  static async compressImage(image, compressionQuality) {
    const options = {
      maxSizeMB: 5,
      maxWidthOrHeight: 1920,       // Set a larger value to avoid aggressive resizing
      useWebWorker: true,
      initialQuality: compressionQuality,
    };
    

    console.log("Original Image:", image);
    console.log("Compression Quality:", compressionQuality);
    console.log("Compression Options:", options);

    try {
      const compressedFile = await imageCompression(image, options);
      console.log("Compression successful, Compressed File Size:", compressedFile.size / 1024, "KB");
      return compressedFile;
    } catch (error) {
      console.error("Error during image compression:", error);
      throw new Error('Compression failed');
    }
  }

  static getCompressedImageURL(compressedFile) {
    const url = URL.createObjectURL(compressedFile);
    console.log("Compressed Image URL:", url);
    return url;
  }
}

export default ImageModel;
