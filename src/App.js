import React, { useState } from 'react';
import ImageUploader from './components/ImageUploader';
import CompressionSlider from './components/CompressionSlider';
import ImagePreview from './components/ImagePreview';
import { useImageController } from './controllers/ImageController';
import CompressionHistory from './components/CompressionHistory';  // Import the CompressionHistory component
import { FaHistory } from 'react-icons/fa';  // Import the history icon from react-icons

const App = () => {
  const [showHistory, setShowHistory] = useState(false);  // State to toggle between History and Image Compressor
  const {
    compressedImage,
    compressionQuality,
    setCompressionQuality,
    handleImageChange,
    handleCompression,
    handleDownload,
    addToHistory,  // Pass this function to add history entries
    history,       // Pass the history to the CompressionHistory component
  } = useImageController();

  // Function to toggle history view
  const toggleHistory = () => setShowHistory(!showHistory);

  // Handle compression and add to history
  const handleCompressionWithHistory = async () => {
    await handleCompression(); // Compress the image
    if (compressedImage) {
      // Add compression details to history after successful compression
      addToHistory({
        filename: compressedImage.name, // Assuming compressedImage has 'name'
        compressionQuality,
        compressedSize: (compressedImage.size / 1024).toFixed(2) + ' KB',
        date: new Date().toLocaleDateString(),
      });
    }
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Image Compressor</h1>

      <div className="card p-4">
        <div className="d-flex justify-content-between mb-4">
          <button className="btn btn-outline-secondary" onClick={toggleHistory}>
            <FaHistory size={24} /> History
          </button>
        </div>

        {showHistory ? (
          <CompressionHistory history={history} />
        ) : (
          <>
            <ImageUploader handleImageChange={handleImageChange} />
            <CompressionSlider compressionQuality={compressionQuality} setCompressionQuality={setCompressionQuality} />
            <div className="d-grid gap-2 mt-4">
              <button className="btn btn-primary" onClick={handleCompressionWithHistory}>
                Compress Image
              </button>
            </div>

            <div className="mt-4">
              <ImagePreview compressedImage={compressedImage} />
              {compressedImage && (
                <div className="d-grid gap-2 mt-3">
                  <button className="btn btn-success" onClick={handleDownload}>
                    Download Compressed Image
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
