import React from 'react';

const ImagePreview = ({ compressedImage }) => (
  <div className="text-center">
    {compressedImage && <img src={compressedImage} alt="Compressed Preview" className="img-fluid" />}
  </div>
);

export default ImagePreview;
