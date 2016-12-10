var express = require('express');
var router = express.Router();

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
*/
module.exports = function (app) {
  /*app.get('/', function(req, res){
    res.send('../../index.html');
  });*/
  app.post('/login', function(req, res) {
      
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

};
