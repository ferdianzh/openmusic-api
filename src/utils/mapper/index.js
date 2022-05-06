/* eslint-disable camelcase */

const mapAlbumToModel = ({
  id, name, year, cover,
}) => ({
  id, name, year, coverUrl: cover,
});

const mapSongToDetailedModel = ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  album_id,
}) => ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  albumId: album_id,
});

module.exports = { mapAlbumToModel, mapSongToDetailedModel };
