/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('songs', {
    id: {
      type: 'varchar(50)',
      primaryKey: true,
    },
    title: {
      type: 'varchar(100)',
      notNull: true,
    },
    year: {
      type: 'integer',
      notNull: true,
    },
    genre: {
      type: 'varchar(100)',
      notNull: true,
    },
    performer: {
      type: 'varchar(100)',
      notNull: true,
    },
    duration: {
      type: 'integer',
    },
    album_id: {
      type: 'varchar(50)',
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
  pgm.dropTable('songs');
};
