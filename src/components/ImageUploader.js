import React from 'react';

const ImageUploader = ({ handleImageChange }) => (
  <div className="mb-4">
    <input 
      type="file" 
      className="form-control" 
      onChange={handleImageChange} 
    />
  </div>
);

export default ImageUploader;
