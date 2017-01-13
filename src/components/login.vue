<template>
    <form class="login" v-on:submit.prevent="submit">
        <div class="line">
            <div>用户名 : </div>
            <input type="text" placeholder="用户名" v-model="form.username">
        </div>
        <div class="line">
            <div>密码 : </div>
            <input type="password" placeholder="密码" v-model="form.password">    
        </div>
        <div>{{ message }}</div>
        <button>登录</button>
    </form>
</template>


<script>
    import { mapActions } from 'vuex'
    import { USER_LOGIN } from '../store/mutations-types'


    export default {
        data () {
            return {
                message : '',
                form : {
                    usernmae : '',
                    password : ''
                }
            }
        },
        methods : {
            ...mapActions([USER_LOGIN]),
            submit () {
                if(!this.form.username || !this.form.password) return
                this.USER_LOGIN(this.form);
                this.$router.go(-1)
            }
        }
    }


</script>

<style lang="scss">
.login{
    width: 400px;
    margin: 0 auto;
    padding: 0 200px;
    .line{
        div{
            margin-top: 20px;
            margin-bottom: 10px;
        }
        input{
            width: 85%;
            border: none;
            resize: none;
            height: 2em;
            margin-bottom: 1em;
            box-shadow: 0 0 2px rgba(60,60,60,.8); 
            font-size: 14px;
            word-break: break-word;
            -webkit-transition: border linear .2s,box-shadow linear .2s;
            -moz-transition: border linear .2s,box-shadow linear .2s;
            -o-transition: border linear .2s,box-shadow linear .2s;
            transition: border linear .2s,box-shadow linear .2s;
            display: inline-block;
            height: 20px;
            padding: 4px 6px;
            margin-bottom: 10px;
            font-size: 14px;
            line-height: 20px;
            color: #555;
            vertical-align: middle;
            -webkit-border-radius: 4px;
            -moz-border-radius: 4px;
            border-radius: 4px;
        }
    }
    button{
        text-rendering: auto;
        border: none;
        display: inline-block;
        float: none;
        padding: 3px 10px;
        margin: 0;
        margin-top: 10px;
        font-size: 14px;
        transition: all .2s ease-in-out;
        letter-spacing: 2px;
        box-shadow: none;
        line-height: 2em;
        vertical-align: middle;
        color: #fff;
        cursor: pointer;
        border-radius: 3px;
        background-color: #42b983;
    }
}
</style>