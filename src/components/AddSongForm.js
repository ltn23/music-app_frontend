import React, { useState } from "react";
import axios from "axios";
import "../../src/styles.css"; 
import UploadAudio from "./UploadAudio";
import UploadImage from "./UploadImage";

const AddSongForm = ({ onSongAdded }) => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [audioUrl, setAudioUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newSong = {
      title,
      artist,
      cover_image: coverImage,
      audio_url: audioUrl,
    };

    axios
      .post("http://localhost:8000/api/songs", newSong)
      .then((response) => {
        onSongAdded(response.data);
        setTitle("");
        setArtist("");
        setCoverImage("");
        setAudioUrl("");
      })
      .catch((error) => console.error("Error adding song:", error));
  };

  return (
    <form onSubmit={handleSubmit} className="add-song-form">
      <h2>🎼 Thêm Bài Hát Mới</h2>

      <label>Tiêu Đề</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <label>Nghệ Sĩ</label>
      <input
        type="text"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
        required
      />

      <label>Ảnh Bìa</label>
      <UploadImage onUploadSuccess={setCoverImage} />

      {/* {coverImage && (
        <p className="text-green-600 font-medium text-center mt-3">
          🖼 Ảnh đã tải lên:{" "}
          <a href={coverImage} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
            {coverImage}
          </a>
        </p>
      )} */}

      <label>File Nhạc</label>
      <UploadAudio onUploadSuccess={setAudioUrl} />

      {/* {audioUrl && (
        <p className="text-green-600 font-medium text-center mt-3">
          🎵 File đã tải lên:{" "}
          <a href={audioUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
            {audioUrl}
          </a>
        </p>
      )} */}

      <button type="submit">➕ Thêm Bài Hát</button>
    </form>
  );
};

export default AddSongForm;
