import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Playlist from "./Playlists.js"; 


const Song = sequelize.define('song', {
    song_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    artist: {
        type: DataTypes.STRING(45),
        allowNull: false,
    }

}, {
    tableName: 'songs'
});


Song.belongsToMany(Playlist, {
    through: "songs_playlists",
    foreignKey: "song_id"
});

export default Song;