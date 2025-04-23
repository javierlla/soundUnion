import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Song from './songs.js'


const Playlist = sequelize.define('playlist', {
    playlist_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    isPublic: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
}, {
    tableName: 'playlists'
});

Playlist.belongsToMany(Song,{through:"songs_playlists",foreignKey:"playlist_id"});
Song.belongsToMany(Playlist,{through:"songs_playlists",foreignKey:"song_id"});

export default Playlist;