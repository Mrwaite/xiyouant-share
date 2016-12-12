var mongodb = require("./createDB");
var crypto = require("crypto");

function User(user){
    this.username = user.username;
    this.password = user.password;
    this.email = user.email;
};

module.exports = User;

User.prototype = {
    save : function(callback) {
        //要存入数据库的用户信息
        var md5 = crypto.createHash('md5'),
            email_MD5 = md5.update(this.email.toLowerCase()).digest('hex');
        var user = {
            username: this.username,
            password: this.password,
            email: this.email
        };
        //打开数据库
        mongodb.open(function (err, db) {
            if (err) {
                return callback(err);//错误，返回err信息
            }
            //读取users 集合
            db.collection('users', function (err, collection) {
                if (err) {
                    mongodb.close();
                    return callback(err);//错误， 返回err信息
                }
                //将用户信息插入用户集合
                collection.insert(user, {safe: true}, function (err, user) {
                    mongodb.close();
                    if (err) {
                        return callback(err);//错误，返回err信息
                    }
                    callback(null, user[0]);//成功！err为null , 返回存储后用户的文档
                });
            });
        });
    }
};

User.get = function(username, callback){
    //打开数据科
    mongodb.open(function(err, db){
        if(err){
            return callback(err);//错误返回错误信息
        }
        //读物users 集合
        db.collection('users', function(err, collection){
            if(err){
                mongodb.close();
                return callback(err);//错误，返回err信息
            }
            //查找用户名（name键）值为 name 一个文档
            collection.findOne({username : username}, function(err, user){
                mongodb.close();
                if(err){
                    return callback(err);//错误，返回err信息
                }
                callback(null , user);//成功!  返回查询的用户信息
            });
        });
    });
};