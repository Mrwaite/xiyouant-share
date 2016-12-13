<template>
    <div>
        <router-link to="/">返回</router-link>
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

</style>