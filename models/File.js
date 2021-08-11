const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class File extends Model { }

File.init(
    {
        type: 
        {
            type: DataTypes.STRING
        },
        name: 
        {
            type: DataTypes.STRING
        },
        data: 
        {
            type: DataTypes.BLOB('long')
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscore: true,
        modelName: "file",
    }
);

module.exports = File;
