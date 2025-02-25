import React, { useState } from 'react';
import axios from 'axios';
import UploadAudio from './UploadAudio';

const AddSongForm = ({ onSongAdded }) => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [album, setAlbum] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [audioUrl, setAudioUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!audioUrl) {
      alert('Vui lòng tải lên file âm thanh trước khi thêm bài hát!');
      return;
    }
    const newSong = {
      title,
      artist,
      album,
      cover_image: coverImage,
      audio_url: audioUrl,
    };

    console.log("Dữ liệu gửi đi:", newSong);

    // Gửi yêu cầu POST tới backend để thêm bài hát mới
    axios.post('http://localhost:8000/api/songs', newSong)
      .then(response => {
        // Sau khi bài hát được thêm thành công, gọi callback onSongAdded để cập nhật danh sách bài hát
        onSongAdded(response.data);
        // Reset form sau khi thêm thành công
        setTitle('');
        setArtist('');
        setAlbum('');
        setCoverImage('');
        setAudioUrl('');
      })
      .catch(error => {
        console.error('Error adding song:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Thêm Bài Hát Mới</h2>
      <label>
        Tiêu Đề:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      <label>
        Nghệ Sĩ:
        <input
          type="text"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          required
        />
      </label>
      <label>
        Album:
        <input
          type="text"
          value={album}
          onChange={(e) => setAlbum(e.target.value)}
        />
      </label>
      <label>
        Hình Ảnh Bìa:
        <input
          type="url"
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
          required
        />
      </label>
      <UploadAudio onUploadSuccess={setAudioUrl} />
      {audioUrl && <p>🎵 File đã tải lên: <a href={audioUrl} target="_blank" rel="noopener noreferrer">{audioUrl}</a></p>}
      <button type="submit">Thêm Bài Hát</button>
    </form>
  );
};

export default AddSongForm;
