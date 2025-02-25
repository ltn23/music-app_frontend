import React, { useState } from "react";
import axios from "axios";
import "../../src/styles.css"; // Import CSS

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

      <label>Hình Ảnh Bìa</label>
      <input
        type="url"
        value={coverImage}
        onChange={(e) => setCoverImage(e.target.value)}
        required
      />

      <label>Link Audio</label>
      <input
        type="url"
        value={audioUrl}
        onChange={(e) => setAudioUrl(e.target.value)}
        required
      />

      <button type="submit">➕ Thêm Bài Hát</button>
    </form>
  );
};

export default AddSongForm;
