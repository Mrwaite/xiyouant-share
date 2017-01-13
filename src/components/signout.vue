<template>
    <div >
        <router-link to="/" class="outMessage">返回首页</router-link>
        <div class="btn">
            <button @click="submit">确认退出</button>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    import { USER_SIGNOUT } from '../store/mutations-types.js'

    export default {
        methods : {
            ...mapActions([USER_SIGNOUT]),
            submit () {
                this.USER_SIGNOUT()
                this.$router.replace({ path : '/' })
            }
        }
    }


    
</script>

<style lang="scss">
.outMessage {
    display: block;
    margin-top: 20px;
    margin-bottom: 20px;
}
.btn{
    button{
        text-rendering: auto;
        border: none;
        display: inline-block;
        float: none;
        padding: 3px 10px;
        margin: 0;
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