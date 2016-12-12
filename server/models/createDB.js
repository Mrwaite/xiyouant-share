var setting = require('../config/db'),
    Db = require('mongodb').Db,
    Conection = require('mongodb').Connection,
    Server = require('mongodb').Server;

module.exports = new Db(setting.db, new Server(setting.host, setting.port), {safe : true});