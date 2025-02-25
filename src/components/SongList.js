import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import AddSongForm from "./AddSongForm";
import "../../src/styles.css"; // Import CSS

const SongList = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/songs")
      .then((response) => setSongs(response.data))
      .catch((error) => console.error("Error fetching songs:", error));
  }, []);

  const handleSongAdded = (newSong) => {
    setSongs([...songs, newSong]);
  };

  return (
    <div className="container">
      <h2>🎵 Danh Sách Bài Hát 🎵</h2>

      {songs.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">Không có bài hát nào</p>
      ) : (
        <div className="song-list">
          {songs.map((song) => (
            <div key={song.id} className="song-card">
              <h3>{song.title} - {song.artist}</h3>
              <img src={song.cover_image} alt={song.title} />
              <ReactPlayer url={song.audio_url} controls width="100%" height="50px" />
            </div>
          ))}
        </div>
      )}

      <div className="add-song-form-container">
        <AddSongForm onSongAdded={handleSongAdded} />
      </div>
    </div>
  );
};

export default SongList;
