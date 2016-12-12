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
        <div>
            <div>email不能为空</div>
            <input type="text" placeholder="密码" v-model="form.email">    
        </div>
        <div>{{ message }}</div>
        <button>注册</button>
    </form>
</template>

<script>
    import { mapActions } from 'vuex'
    import { USER_SIGNUP } from '../store/mutations-types'

    export default {
        data () {
            return {
                message : '',
                form : {
                    username : '',
                    password : '',
                    email : ''
                }
            }
        },
        methods: {
            ...mapActions([USER_SIGNUP]),
            submit () {
                //if(!this.from.username || !this.from.password || !this.from.email) return 
                this.USER_SIGNUP(this.form);
                this.$router.replace({ path: '/' })
            }
        }
    }



</script>

<style lang="scss">

</style>