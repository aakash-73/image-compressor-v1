import { useState } from 'react';
import ImageModel from '../models/ImageModel';

export const useImageController = () => {
  const [image, setImage] = useState(null);
  const [compressedImage, setCompressedImage] = useState(null);
  const [compressionQuality, setCompressionQuality] = useState(0.8);
  const [history, setHistory] = useState([]); // State to track compression history

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Uploaded Image:", file);
      setImage(file);
      setCompressedImage(null); // Reset compressed image on new upload
    }
  };

  const handleCompression = async () => {
    if (image) {
      try {
        console.log("Starting Compression with Quality:", compressionQuality);
        const compressedFile = await ImageModel.compressImage(image, compressionQuality);
        const compressedImageURL = ImageModel.getCompressedImageURL(compressedFile);
        setCompressedImage(compressedImageURL);

        // Add compression history entry
        addToHistory({
          filename: image.name,
          compressionQuality,
          compressedSize: (compressedFile.size / 1024).toFixed(2) + ' KB',
          date: new Date().toLocaleDateString(),
        });
      } catch (error) {
        console.error("Compression failed:", error);
      }
    } else {
      console.warn("No image uploaded for compression.");
    }
  };

  const handleDownload = () => {
    if (compressedImage) {
      console.log("Downloading Compressed Image:", compressedImage);
      const link = document.createElement('a');
      link.href = compressedImage;
      link.download = 'compressed_image.jpg';
      link.click();
    } else {
      console.warn("No compressed image available for download.");
    }
  };

  // Function to add history to the list
  const addToHistory = (entry) => {
    setHistory((prevHistory) => [...prevHistory, entry]);
  };

  return {
    compressedImage,
    compressionQuality,
    setCompressionQuality,
    handleImageChange,
    handleCompression,
    handleDownload,
    addToHistory,  // Return the addToHistory function
    history,       // Return the history data
  };
};
