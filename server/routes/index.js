var express = require('express');
var router = express.Router();

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
*/

var crypto = require('crypto'),
    User = require('../models/user'),
    Post = require('../models/post'),
    Comment = require('../models/comment');

module.exports = function (app) {
  /*app.get('/', function(req, res){
    res.send('../../index.html');
  });*/
  app.post('/login', function(req, res) {
      //1.生成密码的md5值
      //2.检查用户是否存在,从数据库取出username对应的对象
      //3.查看密码是否一致
      //4.都匹配的话把用户信息存入session,保存到数据库,给req.session字段填上session_id
      //5.返回用户的名字
     /* res.header('Access-Control-Allow-Credentials', true);*/
      var md5 = crypto.createHash('md5'),
            password = md5.update(req.body.password).digest('hex');
      User.get(req.body.username, function(err, user){
          if(!user){
              return res.json({ err : '用户不存在' });//用户不存在跳转到登陆页面
          }
          //检查密码是否一致
          if(user.password !== password ){
              return res.json({ err : '密码错误' });//密码错误跳转到登陆界面
          }
          //用户名和密码都匹配后，将用户信息存入session
          req.session.user = user;
          res.json({ success : user.username });
      });
  });
  app.post('/signup', function (req, res) {
      //1.生成密码的md5值,创建用户数据对象
      //2.查看用户名是都存在
      //3.不存在,就存入数据库,并把用户信息存入session中
      
        var username = req.body.username,
            password = req.body.password,
            email = req.body.email;
        var md5 = crypto.createHash('md5'),
            password = md5.update(req.body.password).digest('hex');
        var newUser = new User({
            username : username,
            password : password,
            email : email
        });
        User.get(newUser.username, function(err, user){
            if(err){
                return res.json({ err : 'err: ' + err });
            }
            if(user){
                return res.json({ err : 'err: 用户已存在' });//如果用户名不存在，返回注册页面
            }
            //把用户信息存储到session里，以后就可以通过req.session.user读取用户信息
            newUser.save(function(err, user){
                if(err){
                    return res.json({ err : 'err: ' + err });//注册失败返回注册页
                }
                req.session.user = newUser;
                res.json({ success : newUser.username });
            });

        });
  });
  app.get('/signout', function (req, res) {
        //1.擦除session
        req.session.user = null;
        res.json({ success : '登出成功' });//登出之后跳转到主界面
  });
  app.get('/check', function (req, res) {
        if(req.session.user){
            res.json({ success : req.session.user.username });
        } else {
            res.json({ err : '未登录' });
        }
  })
  app.get('/articles/:direction/:page', function(req, res){
        var direction = req.params.direction;
        var page = req.params.page;
        Post.getTen(null, page, direction, function(err, posts, total){
            if(err){
                return res.json({ err: err })
            }
            if(total === 0){
                page = 0;
            }
            res.json({ posts: posts, maxPage: Math.ceil(total / 15), page: page, direction: direction})
        });
  });
  app.post('/postNew', function (req, res) {
      //1.读取当前登录用户的session信息
      //2.传入name : this.name,
      //  time : time,
      //  title : this.title,
      //  post : this.post,
      //  comments : [],
      //  tags : this.tags,
      //  pv : 0,
      //3.保存
        const currentUser = req.session.user;
        const tags = String(req.body.tags).split(',');
        const info = {
                username : currentUser.username,
                type : req.body.type,
                title : req.body.title,
                content : req.body.content,
                tags : tags
            };
        const post = new Post(info);
        post.save(function(err){
            if(err){
                return res.json({ err : err });
            }
            res.json({ success : '发布成功' });//发布成功跳转到主页
        });
  });
  app.get('/article/:type/:_id', (req, res) => {
      const _id = req.params._id;
      const type = req.params.type;
      Post.getOne(type, _id, (err, doc) => {
          if(err) {
              return res.json({ err: err })
          }
          res.json({ article: doc })
      })
  }),
  app.post('/commentSave/:type/:_id', (req, res) => {
      const username = req.session.user.username
      const date = new Date()
      const comment = {
          _id: req.params._id,
          username: username,
          time: date,
          content: req.body.content,
          type: req.params.type
      }
      const newComment = new Comment(comment)
      newComment.save((err) => {
          if(err) {
              return res.json({ err: err })
          }
          res.json({ success: '评论成功' })
      })
  })
};
