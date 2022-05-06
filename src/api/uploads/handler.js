const ClientError = require('../../exceptions/ClientError');

class UploadsHandler {
  constructor(storageService, albumsService, validator) {
    this.storageService = storageService;
    this.albumsService = albumsService;
    this.validator = validator;

    this.postUploadAlbumImageHandler = this.postUploadAlbumImageHandler.bind(this);
  }

  async postUploadAlbumImageHandler(request, h) {
    try {
      const { cover: data } = request.payload;
      this.validator.validateImageHeaders(data.hapi.headers);
      const { id } = request.params;

      const filename = await this.storageService.writeFile(data, data.hapi);
      const cover = `http://${process.env.HOST}:${process.env.PORT}/upload/images/${filename}`;

      await this.albumsService.editAlbumById(id, { cover });

      return h.response({
        status: 'success',
        message: 'Sampul berhasil diunggah',
      }).code(201);
    } catch (error) {
      console.error(error);
      if (error instanceof ClientError) {
        return h.response({
          status: 'fail',
          message: error.message,
        }).code(error.statusCode);
      }

      return h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      }).code(500);
    }
  }
}

module.exports = UploadsHandler;
