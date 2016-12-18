<template>
    <form class="login" v-on:submit.prevent="submit">
        <div class="line">
            <div>username不能为空</div>
            <input type="text" placeholder="用户名" v-model="form.username">
        </div>
        <div>
            <div>password不能为空</div>
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

</style>