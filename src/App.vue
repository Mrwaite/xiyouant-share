<template>
  <div id="app">
    <div class="header">
      <div class="inner">
        <router-link to="/" exact>
          <img class="logo" src="./public/images/logo.png" alt="logo">
        </router-link>
        <router-link to="/path/fe/1">前端</router-link>
        <router-link to="/path/net/1">网络</router-link>
        <router-link to="/path/safe/1">安全</router-link>
        <div v-if="!user.loginStatus" class="userinfo">
          <router-link to="/login">登录</router-link>
          <router-link to="/signup">注册</router-link>
        </div>
        <div v-if="user.loginStatus" class="userinfo">
          <div class="username">{{user.username}}</div>
          <router-link to="/postNew">发表文章</router-link>
          <router-link to="/signout">登出</router-link>
        </div>
      </div>
    </div>
    <div class="alertMessage">
      {{alertMessage}}
    </div>
    <transition name="fade" mode="out-in">
      <router-view class="view" name="main"></router-view>
      <router-view class="view" name="login"></router-view>
    </transition>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { USER_CHECK } from './store/mutations-types'


export default {
  name: 'app',
  created () {
    this.$store.dispatch(USER_CHECK)
  },
  components: {   
  },
  computed: mapState({ 
    user: state => state.user,
    alertMessage: state => state.alertMessage 
  }),
}
</script>

<style lang="scss">
$base_backgroundColor : #42b983;
$base_fontSize : 15px;
$base_color : #34495e;
body {
  font-family: "Roboto", "Helvetica Neue", Helvetica, "PingFang SC", "Microsoft Yahei", "WenQuanYi Micro Hei", Arial, Verdana, 'Open Sans', sans-serif;
  font-size : $base_fontSize;
  background-color : #f2f3f5;
  margin : 0;
  padding-top: 55px;
  color : $base_color;
  overflow-y : scroll;
}

a {
  color : $base_color;
  text-decoration : none;
}

.alertMessage {
  display: none;
  position: absolute;
  right: 0;
  bottom: 50px;
  margin-bottom: 20px;
}

.succcess {
  background-color: #42b983;
}

.err{
  background-color: red;
}


.header {
  background-color: $base_backgroundColor;
  position : fixed;
  z-index : 999;
  height : 55px;
  top : 0;
  left : 0;
  right : 0;
  .inner {
    max-width : 800px;
    box-sizing : border-box;
    margin : 0px auto;
    padding : 15px 5px;
  }
  a {
    color : rgba(255, 255, 255, 0.8);
    line-height : 24px;
    transition: color 0.15s ease;
    display: inline-block;
    vertical-align: middle;
    font-weight: 300px;
    letter-spacing: 0.075em;
    margin-right: 1.8em;
    &:hover {color: #fff;}
    &:router-link-active {color: #fff;font-weight: 400;}
    &::nth-child(6) {margin-right: 0}
    &.router-link-active{
          color: #fff;
          font-weight: 800;
    }
  }
  .github{
    color: #fff;
    font-size: 0.9em;
    margin: 0;
    float: right;
  }
  .userinfo{
    display: inline-block;
    float: right;
  }
  .username{
    color: rgba(255, 255, 255, 0.8);
    line-height: 24px;
    transition: color 0.15s ease;
    display: inline-block;
    vertical-align: middle;
    font-weight: 300px;
    letter-spacing: 0.075em;
    margin-right: 1.8em;
  }
}

.logo {
  width: 24px;
  margin-right: 10px;
  display: inline-block;
  vertical-align: middle;
}

.view {
  max-width: 800px;
  margin: 0px auto;
  /*position: relative;*/
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.2s ease;
}

.fade-enter, .fade-leave-active{
  opacity: 0;
}

@media (max-width : 860px){
  .header .inner {
    padding: 15px 30px;
  }
}

@media (max-width : 600px) {
  body {
    font-size: 14px;
  }
  .header{
    .inner{
      padding: 15px;
    }
    a {
      margin-right: 1em;
    }
    .github {
      display: none;
    }
  }
}
</style>
