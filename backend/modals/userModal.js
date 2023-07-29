const db = require('../database/db')
const { DataTypes } = require('sequelize-cockroachdb')

const Admin = db.define("admin",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    full_name:{
        type:DataTypes.STRING(20),
        allowNull:false
    },
    username:{
        type:DataTypes.STRING(20),
        allowNull:false
    },
    email:{
        type:DataTypes.STRING(20),
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    address:{
        type:DataTypes.TEXT,
        allowNull:false
    }
});

(async () => {
    await db.sync({ force: false });
    console.log(`sync here...`)
})()

module.exports = Admin
