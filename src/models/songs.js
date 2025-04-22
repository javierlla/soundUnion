import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Playlist from './Playlist.js'; 


const User = sequelize.define('user', {
    user_id: {
        type: DataTypes.INTEGER,
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
    tableName: 'users' // Nombre de la tabla en la base de datos
});

User.hasMany(Playlist,{foreignKey:"user_id"});
Playlist.belongsTo(User,{foreignKey:"user_id"});


export default User;