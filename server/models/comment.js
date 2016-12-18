var mongodb = require('./createDB');
var ObjectId = require('mongodb').ObjectID;

//创建comment模型来存储新的留言到数据库
function Comment(comment){
    this._id = comment._id;
    this.username = comment.username ;
    this.time = comment.time;
    this.content = comment.content;
    this.type = comment.type
    this.comment = comment
}

module.exports = Comment;

//存储一条留言信息
Comment.prototype.save = function (callback) {
    var _id = this._id,
        type = this.type,
        comment = this.comment
    //打开数据库
    mongodb.open(function(err, db){
       if(err) {
           return callback(err);
       }
        //获取数据库posts集合
        db.collection(type, function (err, collection) {
            if(err) {
                mongodb.close();
                return callback(err);
            }
            //通过用户名，时间以及标题查找文档，并把留言信息添加到post对象comments 数组里面
            collection.update({
                "_id" : ObjectId(_id)
            }, {
                $push : {"comments" : comment}
            }, function (err) {
                mongodb.close();
                if(err) {
                    return callback(err);
                }
                callback(null);
            });
        });
    });
} 