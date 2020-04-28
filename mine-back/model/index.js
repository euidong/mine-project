'use strict';
import fs from "fs";
import path from "path";
import Sequelize from "sequelize";
import "../src/env";

const basename = path.basename(__filename);
const db = {};

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_ID,
    process.env.DB_PW,
    {
        'host': process.env.DB_HOST,
        'port': process.env.DB_PORT,
        'dialect': process.env.DB_TYPE,
        'pool': {
            max:5,
            min:0,
            acquire: 30000,
            idle: 10000 //TODO: timeout setting  하기
        }
    }
);

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
    });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;