import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';
import AddSongForm from './AddSongForm';

const SongList = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    // Lấy danh sách bài hát từ API
    axios.get('http://localhost:8000/api/songs')
      .then(response => setSongs(response.data))
      .catch(error => console.error('Error fetching songs:', error));
  }, []);

  const handleSongAdded = (newSong) => {
    // Thêm bài hát mới vào danh sách mà không phải gọi lại API
    setSongs([...songs, newSong]);
  };

  return (
    <div>
      <h2>Danh sách bài hát</h2>
      {songs.length === 0 ? (
        <p>Không có bài hát nào</p>
      ) : (
        songs.map(song => (
          <div key={song.id} style={{ marginBottom: '20px' }}>
            <h3>{song.title} - {song.artist}</h3>
            <img src={song.cover_image} alt={song.title} style={{ width: 100, height: 100 }} />
            <ReactPlayer url={song.audio_url} controls />
            {/* ) : (
              <audio src={song.audio_url} controls />
            ) */}

          </div>
        ))
      )}

      <AddSongForm onSongAdded={handleSongAdded} />
    </div>
  );
};

export default SongList;
