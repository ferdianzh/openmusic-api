const ClientError = require('../../exceptions/ClientError');

class ExportsHandler {
  constructor(exportsService, playlistsService, validator) {
    this.exportsService = exportsService;
    this.playlistsService = playlistsService;
    this.validator = validator;

    this.postExportPlaylistsHandler = this.postExportPlaylistsHandler.bind(this);
  }

  async postExportPlaylistsHandler(request, h) {
    try {
      this.validator.validateExportPlaylistsPayload(request.payload);
      const { playlistId } = request.params;
      const { id: credentialId } = request.auth.credentials;

      await this.playlistsService.verifyPlaylistOwner(playlistId, credentialId);
      await this.playlistsService.getPlaylistById(playlistId);

      const message = {
        playlistId,
        targetEmail: request.payload.targetEmail,
      };

      await this.exportsService.sendMessage('export:playlists', JSON.stringify(message));

      return h.response({
        status: 'success',
        message: 'Permintaan Anda dalam antrean',
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
        message: 'Maaf, terjadi kegagalan pada server kami.',
      }).code(500);
    }
  }
}

module.exports = ExportsHandler;
