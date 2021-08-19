const { Pool } = require('pg');

class PlaysongsService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylistsongById(playlistId) {
    const query = {
      text: `SELECT songs.id,title,performer
              FROM songs
              LEFT JOIN playlistsongs ON playlistsongs.song_id = songs.id 
              WHERE playlistsongs.playlist_id = $1
              GROUP BY songs.id`,
      values: [playlistId],
    };
    const result = await this._pool.query(query);
    return result.rows;
  }
}

module.exports = PlaysongsService;
