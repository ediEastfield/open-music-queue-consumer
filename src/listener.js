class Listener {
  constructor(playlistsongsService, mailSender) {
    this._playlistsongsService = playlistsongsService;
    this._mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { playlistId, targetEmail } = JSON.parse(message.content.toString());

      const playlistsongs = await this._playlistsongsService.getPlaylistsongById(playlistId);
      const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(playlistsongs));
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Listener;
