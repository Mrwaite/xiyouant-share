<template>
    <form class="login" @submit.prevent="submit">
        <div class="line">
            <div>username不能为空</div>
            <input type="text" placeholder="用户名" v-model="form.username">
        </div>
        <div>
            <div>password不能为空</div>
            <input type="password" placeholder="密码" v-model="form.password">    
        </div>
        <div>{{ message }}</div>
        <button type="submit">登录</button>
    </form>
</template>


<script>
    import { mapActions } from 'vuex'
    import { USER_LOGIN } from '../store/user'


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
                /*this.$router.replace({path : '/'});*/
            }
        }
    }


</script>

<style lang="scss">

</style>