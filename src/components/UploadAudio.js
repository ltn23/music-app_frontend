import React, { useState } from 'react';
import axios from 'axios';

const UploadAudio = ({ onUploadSuccess }) => {
  const [audio, setAudio] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleAudioChange = (e) => {
    setAudio(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!audio) {
      alert('Vui lòng chọn một file âm thanh!');
      return;
    }

    const formData = new FormData();
    formData.append('audio', audio);
    setUploading(true);

    try {
      const response = await axios.post('http://localhost:8000/api/upload-audio', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setUploading(false);
      alert('Tải lên thành công!');
      onUploadSuccess(response.data.url);
    } catch (error) {
      setUploading(false);
      console.error('Lỗi khi tải file:', error);
      alert('Tải lên thất bại!');
    }
  };

  return (
    <div>
      <h2>Upload Audio</h2>
      <input type="file" accept="audio/*" onChange={handleAudioChange} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? 'Đang tải lên...' : 'Upload'}
      </button>
    </div>
  );
};

export default UploadAudio;
