/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('albums', {
    id: {
      type: 'varchar(50)',
      primaryKey: true,
    },
    name: {
      type: 'varchar(100)',
      notNull: true,
    },
    year: {
      type: 'integer',
      notNull: true,
    },
    cover: {
      type: 'varchar(100)',
    },
    created_at: {
      type: 'varchar(50)',
      notNull: true,
    },
    updated_at: {
      type: 'varchar(50)',
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('albums');
};
