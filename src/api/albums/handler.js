const ClientError = require('../../utils/exceptions/ClientError');

class AlbumsHandler {
  constructor(service, validator) {
    this.service = service;
    this.validator = validator;

    this.postAlbumHandler = this.postAlbumHandler.bind(this);
    this.getAlbumsHandler = this.getAlbumsHandler.bind(this);
    this.getAlbumByIdHandler = this.getAlbumByIdHandler.bind(this);
    this.putAlbumByIdHandler = this.putAlbumByIdHandler.bind(this);
    this.deleteAlbumByIdHandler = this.deleteAlbumByIdHandler.bind(this);
  }

  async postAlbumHandler(request, h) {
    try {
      this.validator.validateAlbumPayload(request.payload);
      const { name, year } = request.payload;

      const albumId = await this.service.addAlbum({ name, year });

      return h.response({
        status: 'success',
        message: 'Album berhasil ditambahkan',
        data: { albumId },
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

  async getAlbumsHandler() {
    const albums = await this.service.getAlbums();
    return {
      status: 'success',
      data: { albums },
    };
  }

  async getAlbumByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const album = await this.service.getAlbumById(id);
      const songs = await this.service.getAlbumSongs(id);

      return {
        status: 'success',
        data: {
          album: {
            ...album,
            songs,
          },
        },
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

  async putAlbumByIdHandler(request, h) {
    try {
      this.validator.validateAlbumPayload(request.payload);
      const { id } = request.params;
      const { name, year } = request.payload;

      await this.service.editAlbumById(id, { name, year });

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

      return h.response({
        status: 'error',
        message: 'Maaf, terjadi kesalahan pada server',
      }).code(500);
    }
  }

  async deleteAlbumByIdHandler(request, h) {
    try {
      const { id } = request.params;
      await this.service.deleteAlbumById(id);

      return {
        status: 'success',
        message: 'Album berhasil dihapus',
      };
    } catch (error) {
      if (error instanceof ClientError) {
        return h.response({
          status: 'fail',
          message: 'Album gagal dihapus. Id tidak ditemukan.',
        }).code(error.statusCode);
      }

      return h.response({
        status: 'error',
        message: 'Maaf, terjadi kesalahan pada server',
      }).code(500);
    }
  }
}

module.exports = AlbumsHandler;
