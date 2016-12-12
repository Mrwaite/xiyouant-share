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
      /*var md5 = crypto.createHash('md5'),
            password = md5.update(req.body.password).digest('hex');
      User.get(req.body.username, function(err, user){
          if(!user){
              req.flash('error','用户名不存在');
              return res.redirect('/login');//用户不存在跳转到登陆页面
          }
          //检查密码是否一致
          if(user.password !== password ){
              req.flash('error', '密码错误！');
              return res.redirect('/login');//密码错误跳转到登陆界面
          }
          //用户名和密码都匹配后，将用户信息存入session
          req.session.user = user;
          req.flash('success','登陆成功');
          res.redirect('/');
      });*/
      res.send('Mrwaite');
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
                return res.send({ err : 'err: ' + err });
            }
            if(user){
                return res.send({ err : 'err: 用户已存在' });//如果用户名不存在，返回注册页面
            }
            //把用户信息存储到session里，以后就可以通过req.session.user读取用户信息
            newUser.save(function(err, user){
                if(err){
                    return res.send({ err : 'err: ' + err });//注册失败返回注册页
                }
                req.session.user = newUser;
                res.send({ success : newUser.username });
            });

        });
  });
  app.get('/signout', function (req, res) {
      //1.擦除session
  });
  app.get('/articles/:direction', function(req, res){
      var direction = req.params.direction;
      switch(direction) {
        case 'fe' : res.json([{
                    id : '58401b8a747ab47118820af9',
                    score : '108',
                    url : 'http://baidu.com',
                    title : '前端',
                    time : '16年11月6日'
                }]);
                break;
        case 'safe' :
                    res.json([{
                              id : '58401b8a747ab47118820af9',
                              score : '108',
                              url : 'http://baidu.com',
                              title : '安全',
                              time : '16年11月6日'
                    }]); 
                    break;
        case 'net' :
                    res.json([{
                              id : '58401b8a747ab47118820af9',
                              score : '108',
                              url : 'http://baidu.com',
                              title : '网络',
                              time : '16年11月6日'
                    }]);  
                    break;
        default: 
          break;
      }
  });
  app.post('/postNew', function (req, res) {
      //1.读取当前登录用户的session信息
      //2.读取提交文章的title,tags,文章内容
      //3.保存
  })
};
