import React, { useState } from "react";
import axios from "axios";

const UploadImage = ({ onUploadSuccess }) => {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      const response = await axios.post("http://localhost:8000/api/upload-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const imageUrl = response.data.url; // Nhận URL ảnh từ backend
      onUploadSuccess(imageUrl);
    } catch (error) {
      console.error("Lỗi khi tải lên ảnh:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="upload-image">
      <label className="file-upload">
        <input type="file" accept="image/*" onChange={handleFileChange} disabled={uploading} />
        {uploading ? "Đang tải lên..." : "📷 Chọn ảnh bìa"}
      </label>
    </div>
  );
};

export default UploadImage;
