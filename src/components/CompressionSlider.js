import React from 'react';

const CompressionSlider = ({ compressionQuality, setCompressionQuality }) => (
  <div className="mb-4">
    <label className="form-label">Compression Quality: {Math.round(compressionQuality * 100)}%</label>
    <input
      type="range"
      min="0.1"
      max="1"
      step="0.01"
      value={compressionQuality}
      className="form-range"
      onChange={(e) => {
        const value = parseFloat(e.target.value);
        console.log("Slider Value Changed:", value);
        setCompressionQuality(value);
      }}
    />
  </div>
);

export default CompressionSlider;
