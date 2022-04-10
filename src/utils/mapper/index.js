/* eslint-disable camelcase */

const mapAlbumToModel = ({
  id,
  name,
  year,
}) => ({
  id,
  name,
  year,
});

const mapSongToModel = ({
  id,
  title,
  performer,
}) => ({
  id,
  title,
  performer,
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

module.exports = { mapAlbumToModel, mapSongToModel, mapSongToDetailedModel };
