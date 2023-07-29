const Sequelize = require("sequelize-cockroachdb");
require("dotenv").config();

// const ca_cert = process.env.SSL_CERT ? process.env.SSL_CERT : false
const db = new Sequelize(process.env.DATABASE_STRING,
    {
        dialectOptions: {
            application_name: "docs_simplecrud_node-sequelize",
            dialect: 'mysql', 
        },
      
        logging: false
    });
    

db
    .authenticate()
    .then(() => {
        console.log('connected')
    })
    .catch((err) => {
        console.log(err)
    })

module.exports = db;