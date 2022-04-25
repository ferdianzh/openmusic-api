const ClientError = require('../../exceptions/ClientError');

class SongsHandler {
  constructor(service, validator) {
    this.service = service;
    this.validator = validator;

    this.postSongHandler = this.postSongHandler.bind(this);
    this.getSongsHandler = this.getSongsHandler.bind(this);
    this.getSongByIdHandler = this.getSongByIdHandler.bind(this);
    this.putSongByIdHandler = this.putSongByIdHandler.bind(this);
    this.deleteSongByIdHandler = this.deleteSongByIdHandler.bind(this);
  }

  async postSongHandler({ payload }, h) {
    try {
      this.validator.validateSongPayload(payload);

      const songId = await this.service.addSong(payload);

      return h.response({
        status: 'success',
        message: 'Lagu berhasil ditambahkan',
        data: { songId },
      }).code(201);
    } catch (error) {
      if (error instanceof ClientError) {
        return h.response({
          status: 'fail',
          message: error.message,
        }).code(error.statusCode);
      }

      return h.response({
        status: 'error',
        message: 'Maaf, terjadi kesalahan pada server',
      }).code(500);
    }
  }

  async getSongsHandler(request) {
    const { title, performer } = request.query;

    const songs = await this.service.getSongs(title, performer);
    return {
      status: 'success',
      data: { songs },
    };
  }

  async getSongByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const song = await this.service.getSongById(id);

      return {
        status: 'success',
        data: { song },
      };
    } catch (error) {
      if (error instanceof ClientError) {
        return h.response({
          status: 'fail',
          message: error.message,
        }).code(error.statusCode);
      }

      return h.response({
        status: 'error',
        message: 'Maaf, terjadi kesalahan pada server',
      }).code(500);
    }
  }

  async putSongByIdHandler(request, h) {
    try {
      this.validator.validateSongPayload(request.payload);
      const { id } = request.params;
      const {
        title, year, genre, performer, duration, albumId,
      } = request.payload;

      await this.service.editSongById(id, {
        title, year, genre, performer, duration, albumId,
      });

      return {
        status: 'success',
        message: 'Album berhasil diperbarui',
      };
    } catch (error) {
      if (error instanceof ClientError) {
        return h.response({
          status: 'fail',
          message: error.message,
        }).code(error.statusCode);
      }

      console.error(error.message);
      return h.response({
        status: 'error',
        message: 'Maaf, terjadi kesalahan pada server',
      }).code(500);
    }
  }

  async deleteSongByIdHandler(request, h) {
    try {
      const { id } = request.params;
      await this.service.deleteSongById(id);

      return {
        status: 'success',
        message: 'Lagu berhasil dihapus',
      };
    } catch (error) {
      if (error instanceof ClientError) {
        return h.response({
          status: 'fail',
          message: 'Lagu gagal dihapus. Id tidak ditemukan.',
        }).code(error.statusCode);
      }

      return h.response({
        status: 'error',
        message: 'Maaf, terjadi kesalahan pada server',
      }).code(500);
    }
  }
}

module.exports = SongsHandler;
