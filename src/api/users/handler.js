const ClientError = require('../../exceptions/ClientError');

class UsersHandler {
  constructor(service, validator) {
    this.service = service;
    this.validator = validator;

    this.postUserHandler = this.postUserHandler.bind(this);
  }

  async postUserHandler(request, h) {
    try {
      this.validator.validateUserPayload(request.payload);
      const { username, password, fullname } = request.payload;

      const userId = await this.service.addUser({ username, password, fullname });

      return h.response({
        status: 'success',
        message: 'User berhasil ditambahkan',
        data: {
          userId,
        },
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

module.exports = UsersHandler;
