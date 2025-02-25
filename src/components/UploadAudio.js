import React, { useState } from "react";
import axios from "axios";

const UploadAudio = ({ onUploadSuccess }) => {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("audio", file);

    try {
      setUploading(true);
      const response = await axios.post("http://localhost:8000/api/upload-audio", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const audioUrl = response.data.url; // Backend trả về link nhạc
      onUploadSuccess(audioUrl);
    } catch (error) {
      console.error("Lỗi khi tải lên file:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="upload-audio">
      <label className="file-upload">
        <input type="file" accept="audio/*" onChange={handleFileChange} disabled={uploading} />
        {uploading ? "Đang tải lên..." : "📤 Chọn file nhạc"}
      </label>
    </div>
  );
};

export default UploadAudio;
