import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Playlist from './playlists.js'; 


const User = sequelize.define('user', {
    user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(45),
        allowNull: false,
        unique:true
    },
    password: {
        type: DataTypes.STRING(85),
        allowNull: false
    }
}, {
    tableName: 'users'
});

User.hasMany(Playlist,{foreignKey:"user_id"});
Playlist.belongsTo(User,{foreignKey:"user_id"});


export default User;