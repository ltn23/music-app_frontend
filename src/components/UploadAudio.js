import React from 'react';

const UploadAudio = ({ onFileSelect }) => {
  return (
    <div>
      <h2>Chọn File Âm Thanh</h2>
      <input 
        type="file" 
        accept="audio/*" 
        onChange={(e) => onFileSelect(e.target.files[0])} 
      />
    </div>
  );
};

export default UploadAudio;
